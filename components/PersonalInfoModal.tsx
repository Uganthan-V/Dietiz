import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface PersonalInfo {
  name: string;
  age: string;
  gender: string;
  weight: string;
  height: string;
  activityLevel: string;
  goal: string;
  dietaryRestrictions: string[];
  allergies: string[];
  targetCalories: string; // Calculated automatically based on user data
}

interface PersonalInfoModalProps {
  visible: boolean;
  onClose: () => void;
  onComplete: (info: PersonalInfo) => void;
}

const PersonalInfoModal: React.FC<PersonalInfoModalProps> = ({
  visible,
  onClose,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: '',
    age: '',
    gender: '',
    weight: '',
    height: '',
    activityLevel: '',
    goal: '',
    dietaryRestrictions: [],
    allergies: [],
    targetCalories: '', // This will be calculated automatically
  });

  const [dietaryRestrictionInput, setDietaryRestrictionInput] = useState('');
  const [allergyInput, setAllergyInput] = useState('');

  const steps = [
    'Basic Info',
    'Physical Stats',
    'Activity & Goals',
    'Dietary Preferences',
  ];

  const activityLevels = [
    { label: 'Sedentary (little or no exercise)', value: 'sedentary' },
    { label: 'Lightly active (light exercise 1-3 days/week)', value: 'lightly_active' },
    { label: 'Moderately active (moderate exercise 3-5 days/week)', value: 'moderately_active' },
    { label: 'Very active (hard exercise 6-7 days/week)', value: 'very_active' },
    { label: 'Extremely active (very hard exercise, physical job)', value: 'extremely_active' },
  ];

  const goals = [
    { label: 'Lose Weight', value: 'lose_weight' },
    { label: 'Maintain Weight', value: 'maintain_weight' },
    { label: 'Gain Weight', value: 'gain_weight' },
    { label: 'Build Muscle', value: 'build_muscle' },
    { label: 'Improve Health', value: 'improve_health' },
  ];

  const dietaryRestrictions = [
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Dairy-Free',
    'Keto',
    'Paleo',
    'Mediterranean',
    'Low-Carb',
    'Low-Fat',
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    // Validate required fields
    if (!personalInfo.name || !personalInfo.age || !personalInfo.gender || 
        !personalInfo.weight || !personalInfo.height || !personalInfo.activityLevel || 
        !personalInfo.goal) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    // Always calculate target calories automatically
    const calculatedCalories = calculateTargetCalories();
    const finalPersonalInfo = { 
      ...personalInfo, 
      targetCalories: calculatedCalories.toString() 
    };
    
    onComplete(finalPersonalInfo);
  };

  const calculateTargetCalories = (): number => {
    const age = parseInt(personalInfo.age);
    const weight = parseFloat(personalInfo.weight);
    const height = parseFloat(personalInfo.height);
    
    // Basic BMR calculation (Mifflin-St Jeor Equation)
    let bmr = 10 * weight + 6.25 * height - 5 * age;
    bmr = personalInfo.gender === 'male' ? bmr + 5 : bmr - 161;
    
    // Activity multiplier
    const activityMultipliers = {
      sedentary: 1.2,
      lightly_active: 1.375,
      moderately_active: 1.55,
      very_active: 1.725,
      extremely_active: 1.9,
    };
    
    let tdee = bmr * activityMultipliers[personalInfo.activityLevel as keyof typeof activityMultipliers];
    
    // Goal adjustment
    switch (personalInfo.goal) {
      case 'lose_weight':
        tdee -= 500; // 500 calorie deficit
        break;
      case 'gain_weight':
        tdee += 300; // 300 calorie surplus
        break;
      case 'build_muscle':
        tdee += 200; // 200 calorie surplus
        break;
    }
    
    return Math.round(tdee);
  };

  const toggleDietaryRestriction = (restriction: string) => {
    setPersonalInfo(prev => ({
      ...prev,
      dietaryRestrictions: prev.dietaryRestrictions.includes(restriction)
        ? prev.dietaryRestrictions.filter(r => r !== restriction)
        : [...prev.dietaryRestrictions, restriction],
    }));
  };

  const toggleAllergy = (allergy: string) => {
    setPersonalInfo(prev => ({
      ...prev,
      allergies: prev.allergies.includes(allergy)
        ? prev.allergies.filter(a => a !== allergy)
        : [...prev.allergies, allergy],
    }));
  };

  const addCustomDietaryRestriction = () => {
    if (dietaryRestrictionInput.trim()) {
      setPersonalInfo(prev => ({
        ...prev,
        dietaryRestrictions: [...prev.dietaryRestrictions, dietaryRestrictionInput.trim()],
      }));
      setDietaryRestrictionInput('');
    }
  };

  const addCustomAllergy = () => {
    if (allergyInput.trim()) {
      setPersonalInfo(prev => ({
        ...prev,
        allergies: [...prev.allergies, allergyInput.trim()],
      }));
      setAllergyInput('');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Basic Information</Text>
            <Text style={styles.stepDescription}>Let's start with some basic details about you.</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Name *</Text>
              <TextInput
                style={styles.textInput}
                value={personalInfo.name}
                onChangeText={(text) => setPersonalInfo(prev => ({ ...prev, name: text }))}
                placeholder="Enter your name"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Age *</Text>
              <TextInput
                style={styles.textInput}
                value={personalInfo.age}
                onChangeText={(text) => setPersonalInfo(prev => ({ ...prev, age: text }))}
                placeholder="Enter your age"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Gender *</Text>
              <View style={styles.radioGroup}>
                <TouchableOpacity
                  style={[
                    styles.radioButton,
                    personalInfo.gender === 'male' && styles.radioButtonActive,
                  ]}
                  onPress={() => setPersonalInfo(prev => ({ ...prev, gender: 'male' }))}
                >
                  <View style={[
                    styles.radioCircle,
                    personalInfo.gender === 'male' && styles.radioCircleActive,
                  ]} />
                  <Text style={styles.radioLabel}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.radioButton,
                    personalInfo.gender === 'female' && styles.radioButtonActive,
                  ]}
                  onPress={() => setPersonalInfo(prev => ({ ...prev, gender: 'female' }))}
                >
                  <View style={[
                    styles.radioCircle,
                    personalInfo.gender === 'female' && styles.radioCircleActive,
                  ]} />
                  <Text style={styles.radioLabel}>Female</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );

      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Physical Statistics</Text>
            <Text style={styles.stepDescription}>Help us understand your current physical stats.</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Weight (kg) *</Text>
              <TextInput
                style={styles.textInput}
                value={personalInfo.weight}
                onChangeText={(text) => setPersonalInfo(prev => ({ ...prev, weight: text }))}
                placeholder="Enter your weight in kg"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Height (cm) *</Text>
              <TextInput
                style={styles.textInput}
                value={personalInfo.height}
                onChangeText={(text) => setPersonalInfo(prev => ({ ...prev, height: text }))}
                placeholder="Enter your height in cm"
                keyboardType="numeric"
              />
            </View>
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Activity Level & Goals</Text>
            <Text style={styles.stepDescription}>Tell us about your activity level and what you want to achieve.</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Activity Level *</Text>
              {activityLevels.map((level) => (
                <TouchableOpacity
                  key={level.value}
                  style={[
                    styles.radioButton,
                    personalInfo.activityLevel === level.value && styles.radioButtonActive,
                  ]}
                  onPress={() => setPersonalInfo(prev => ({ ...prev, activityLevel: level.value }))}
                >
                  <View style={[
                    styles.radioCircle,
                    personalInfo.activityLevel === level.value && styles.radioCircleActive,
                  ]} />
                  <Text style={styles.radioLabel}>{level.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Goal *</Text>
              {goals.map((goal) => (
                <TouchableOpacity
                  key={goal.value}
                  style={[
                    styles.radioButton,
                    personalInfo.goal === goal.value && styles.radioButtonActive,
                  ]}
                  onPress={() => setPersonalInfo(prev => ({ ...prev, goal: goal.value }))}
                >
                  <View style={[
                    styles.radioCircle,
                    personalInfo.goal === goal.value && styles.radioCircleActive,
                  ]} />
                  <Text style={styles.radioLabel}>{goal.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.calorieInfo}>
              <Text style={styles.calorieInfoTitle}>Target Calories</Text>
              <Text style={styles.calorieInfoDescription}>
                Your daily calorie target will be automatically calculated based on your age, gender, weight, height, activity level, and goal.
              </Text>
              {personalInfo.age && personalInfo.gender && personalInfo.weight && 
               personalInfo.height && personalInfo.activityLevel && personalInfo.goal && (
                <View style={styles.calculatedCalories}>
                  <Text style={styles.calculatedCaloriesLabel}>Estimated Daily Target:</Text>
                  <Text style={styles.calculatedCaloriesValue}>
                    {calculateTargetCalories()} calories
                  </Text>
                </View>
              )}
            </View>
          </View>
        );

      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Dietary Preferences</Text>
            <Text style={styles.stepDescription}>Let us know about any dietary restrictions or allergies.</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Dietary Restrictions</Text>
              <View style={styles.checkboxGrid}>
                {dietaryRestrictions.map((restriction) => (
                  <TouchableOpacity
                    key={restriction}
                    style={[
                      styles.checkboxButton,
                      personalInfo.dietaryRestrictions.includes(restriction) && styles.checkboxButtonActive,
                    ]}
                    onPress={() => toggleDietaryRestriction(restriction)}
                  >
                    <Ionicons
                      name={personalInfo.dietaryRestrictions.includes(restriction) ? 'checkmark-circle' : 'ellipse-outline'}
                      size={20}
                      color={personalInfo.dietaryRestrictions.includes(restriction) ? '#4CAF50' : '#666'}
                    />
                    <Text style={styles.checkboxLabel}>{restriction}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              
              <View style={styles.customInputContainer}>
                <TextInput
                  style={styles.customInput}
                  value={dietaryRestrictionInput}
                  onChangeText={setDietaryRestrictionInput}
                  placeholder="Add custom restriction"
                />
                <TouchableOpacity style={styles.addButton} onPress={addCustomDietaryRestriction}>
                  <Ionicons name="add" size={20} color="#4CAF50" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Allergies</Text>
              <View style={styles.customInputContainer}>
                <TextInput
                  style={styles.customInput}
                  value={allergyInput}
                  onChangeText={setAllergyInput}
                  placeholder="Add allergy"
                />
                <TouchableOpacity style={styles.addButton} onPress={addCustomAllergy}>
                  <Ionicons name="add" size={20} color="#4CAF50" />
                </TouchableOpacity>
              </View>
              
              {personalInfo.allergies.length > 0 && (
                <View style={styles.tagContainer}>
                  {personalInfo.allergies.map((allergy, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>{allergy}</Text>
                      <TouchableOpacity
                        onPress={() => toggleAllergy(allergy)}
                        style={styles.tagRemove}
                      >
                        <Ionicons name="close" size={16} color="#FF5722" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Personal Information</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${((currentStep + 1) / steps.length) * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            Step {currentStep + 1} of {steps.length}
          </Text>
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {renderStep()}
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          {currentStep > 0 && (
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[
              styles.nextButton,
              currentStep === steps.length - 1 && styles.completeButton,
            ]}
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>
              {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1e3ec',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stepContainer: {
    paddingVertical: 20,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  radioGroup: {
    flexDirection: 'row',
    gap: 16,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    flex: 1,
  },
  radioButtonActive: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E8',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    marginRight: 8,
  },
  radioCircleActive: {
    borderColor: '#4CAF50',
    backgroundColor: '#4CAF50',
  },
  radioLabel: {
    fontSize: 14,
    color: '#333',
  },
  checkboxGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  checkboxButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    minWidth: '45%',
  },
  checkboxButtonActive: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E8',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  customInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
  },
  customInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  addButton: {
    padding: 12,
    backgroundColor: '#E8F5E8',
    borderRadius: 12,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF5722',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    color: 'white',
    marginRight: 4,
  },
  tagRemove: {
    padding: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  backButtonText: {
    fontSize: 16,
    color: '#666',
  },
  nextButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#4CAF50',
    borderRadius: 12,
  },
  completeButton: {
    backgroundColor: '#2196F3',
  },
  nextButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
  calorieInfo: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  calorieInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  calorieInfoDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  calculatedCalories: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  calculatedCaloriesLabel: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  calculatedCaloriesValue: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default PersonalInfoModal; 