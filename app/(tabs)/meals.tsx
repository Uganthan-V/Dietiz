// // // import AIFoodRecommendation from '@/components/AIFoodRecommendation';
// // // import { useMealPlan } from '@/components/MealPlanContext';
// // // import StorageService from '@/services/StorageService';
// // // import { Ionicons } from '@expo/vector-icons';
// // // import React, { useEffect, useState } from 'react';
// // // import { SafeAreaView } from 'react-native-safe-area-context';
// // // import {
// // //   ActivityIndicator,
// // //   Alert,
// // //   Modal,
// // //   ScrollView,
// // //   StyleSheet,
// // //   Text,
// // //   TextInput,
// // //   TouchableOpacity,
// // //   View
// // // } from 'react-native';

// // // const MealsScreen = () => {
// // //   const [showAIRecommendations, setShowAIRecommendations] = useState(false);
// // //   const [showCustomMealModal, setShowCustomMealModal] = useState(false);
// // //   const [selectedMealId, setSelectedMealId] = useState<string | null>(null);
// // //   const [customMealData, setCustomMealData] = useState({
// // //     name: '',
// // //     calories: '',
// // //     protein: '',
// // //     carbs: '',
// // //     fat: '',
// // //   });
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [hasCompletedSetup, setHasCompletedSetup] = useState(false);
// // //   const [hasApiKey, setHasApiKey] = useState(false);
  
// // //   const { 
// // //     meals, 
// // //     updateMeal, 
// // //     removeMeal, 
// // //     getTotalNutrition, 
// // //     addCustomMeal, 
// // //     clearAllMeals,
// // //     personalInfo,
// // //     isLoading: contextLoading 
// // //   } = useMealPlan();
  
// // //   const totalNutrition = getTotalNutrition();

// // //   useEffect(() => {
// // //     checkSetupStatus();
// // //   }, []);

// // //   const checkSetupStatus = async () => {
// // //     try {
// // //       const [hasSetup, apiKey] = await Promise.all([
// // //         StorageService.hasCompletedSetup(),
// // //         StorageService.getGeminiApiKey(),
// // //       ]);
// // //       setHasCompletedSetup(hasSetup);
// // //       setHasApiKey(!!apiKey);
// // //     } catch (error) {
// // //       console.error('Error checking setup status:', error);
// // //     }
// // //   };

// // //   const handleSelectFood = (food: any) => {
// // //     if (selectedMealId) {
// // //       updateMeal(selectedMealId, food);
// // //     }
// // //     setShowAIRecommendations(false);
// // //     setSelectedMealId(null);
// // //   };

// // //   const handleRemoveMeal = (mealId: string) => {
// // //     Alert.alert(
// // //       'Remove Meal',
// // //       'Are you sure you want to remove this meal?',
// // //       [
// // //         { text: 'Cancel', style: 'cancel' },
// // //         { text: 'Remove', style: 'destructive', onPress: () => removeMeal(mealId) },
// // //       ]
// // //     );
// // //   };

// // //   const handleClearAllMeals = () => {
// // //     Alert.alert(
// // //       'Clear All Meals',
// // //       'Are you sure you want to clear all meals? This action cannot be undone.',
// // //       [
// // //         { text: 'Cancel', style: 'cancel' },
// // //         { text: 'Clear All', style: 'destructive', onPress: clearAllMeals },
// // //       ]
// // //     );
// // //   };

// // //   const handleAddCustomMeal = () => {
// // //     if (!customMealData.name || !customMealData.calories) {
// // //       Alert.alert('Error', 'Please enter at least a meal name and calories.');
// // //       return;
// // //     }

// // //     const calories = parseInt(customMealData.calories) || 0;
// // //     const protein = parseInt(customMealData.protein) || 0;
// // //     const carbs = parseInt(customMealData.carbs) || 0;
// // //     const fat = parseInt(customMealData.fat) || 0;

// // //     if (selectedMealId) {
// // //       addCustomMeal(selectedMealId, customMealData.name, calories, protein, carbs, fat);
// // //       setShowCustomMealModal(false);
// // //       setSelectedMealId(null);
// // //       setCustomMealData({ name: '', calories: '', protein: '', carbs: '', fat: '' });
// // //     }
// // //   };

// // //   const handleAIRecommendations = () => {
// // //     if (!hasCompletedSetup) {
// // //       Alert.alert(
// // //         'Profile Setup Required',
// // //         'Please complete your profile setup to get personalized AI recommendations. We need your age, gender, height, weight, activity level, and goals.',
// // //         [
// // //           { text: 'Cancel', style: 'cancel' },
// // //           { text: 'Complete Setup', onPress: () => setShowAIRecommendations(true) },
// // //         ]
// // //       );
// // //       return;
// // //     }

// // //     if (!hasApiKey) {
// // //       Alert.alert(
// // //         'API Key Required',
// // //         'Please set your Gemini API key in Settings to use AI recommendations.',
// // //         [
// // //           { text: 'Cancel', style: 'cancel' },
// // //           { text: 'Go to Settings', onPress: () => {
// // //             // Navigate to settings
// // //           }},
// // //         ]
// // //       );
// // //       return;
// // //     }

// // //     setShowAIRecommendations(true);
// // //   };

// // //   const MealItem = ({ meal }: { meal: any }) => (
// // //     <View style={styles.mealItem}>
// // //       <View style={styles.mealHeader}>
// // //         <View style={styles.mealInfo}>
// // //           <Text style={styles.mealTitle}>{meal.title}</Text>
// // //           <Text style={styles.mealTime}>{meal.time}</Text>
// // //         </View>
// // //         <View style={styles.mealActions}>
// // //           {meal.hasFood && (
// // //             <TouchableOpacity
// // //               style={styles.removeButton}
// // //               onPress={() => handleRemoveMeal(meal.id)}
// // //             >
// // //               <Ionicons name="trash-outline" size={20} color="#FF5722" />
// // //             </TouchableOpacity>
// // //           )}
// // //           <TouchableOpacity
// // //             style={styles.addButton}
// // //             onPress={() => {
// // //               setSelectedMealId(meal.id);
// // //               setShowAIRecommendations(true);
// // //             }}
// // //           >
// // //             <Ionicons name="add-circle-outline" size={24} color="#4CAF50" />
// // //           </TouchableOpacity>
// // //         </View>
// // //       </View>
      
// // //       {meal.food ? (
// // //         <View style={styles.foodInfo}>
// // //           <Text style={styles.foodName}>{meal.food.name}</Text>
// // //           <View style={styles.nutritionRow}>
// // //             <Text style={styles.nutritionText}>
// // //               {meal.food.calories} kcal
// // //             </Text>
// // //             <Text style={styles.nutritionText}>
// // //               {meal.food.protein}g protein
// // //             </Text>
// // //             <Text style={styles.nutritionText}>
// // //               {meal.food.carbs}g carbs
// // //             </Text>
// // //             <Text style={styles.nutritionText}>
// // //               {meal.food.fat}g fat
// // //             </Text>
// // //           </View>
// // //         </View>
// // //       ) : (
// // //         <View style={styles.emptyMeal}>
// // //           <Text style={styles.emptyText}>No meal planned</Text>
// // //           <Text style={styles.emptySubtext}>Tap + to add a meal</Text>
// // //         </View>
// // //       )}
// // //     </View>
// // //   );

// // //   const NutritionSummary = () => (
// // //     <View style={styles.nutritionSummary}>
// // //       <Text style={styles.summaryTitle}>Today's Nutrition</Text>
// // //       <View style={styles.summaryGrid}>
// // //         <View style={styles.summaryItem}>
// // //           <Text style={styles.summaryLabel}>Calories</Text>
// // //           <Text style={styles.summaryValue}>{totalNutrition.calories} kcal</Text>
// // //         </View>
// // //         <View style={styles.summaryItem}>
// // //           <Text style={styles.summaryLabel}>Protein</Text>
// // //           <Text style={styles.summaryValue}>{totalNutrition.protein}g</Text>
// // //         </View>
// // //         <View style={styles.summaryItem}>
// // //           <Text style={styles.summaryLabel}>Carbs</Text>
// // //           <Text style={styles.summaryValue}>{totalNutrition.carbs}g</Text>
// // //         </View>
// // //         <View style={styles.summaryItem}>
// // //           <Text style={styles.summaryLabel}>Fat</Text>
// // //           <Text style={styles.summaryValue}>{totalNutrition.fat}g</Text>
// // //         </View>
// // //       </View>
      
// // //       {personalInfo && (
// // //         <View style={styles.targetInfo}>
// // //           <Text style={styles.targetLabel}>Target: {personalInfo.targetCalories} kcal</Text>
// // //           <View style={styles.progressBar}>
// // //             <View 
// // //               style={[
// // //                 styles.progressFill, 
// // //                 { width: `${Math.min((totalNutrition.calories / parseInt(personalInfo.targetCalories)) * 100, 100)}%` }
// // //               ]} 
// // //             />
// // //           </View>
// // //         </View>
// // //       )}
// // //     </View>
// // //   );

// // //   const CustomMealModal = () => (
// // //     <Modal
// // //       visible={showCustomMealModal}
// // //       animationType="slide"
// // //       presentationStyle="pageSheet"
// // //       onRequestClose={() => setShowCustomMealModal(false)}
// // //     >
// // //       <SafeAreaView style={styles.modalContainer}>
// // //         <View style={styles.modalHeader}>
// // //           <TouchableOpacity onPress={() => setShowCustomMealModal(false)}>
// // //             <Ionicons name="close" size={24} color="#333" />
// // //           </TouchableOpacity>
// // //           <Text style={styles.modalTitle}>Add Custom Meal</Text>
// // //           <View style={{ width: 24 }} />
// // //         </View>

// // //         <ScrollView style={styles.modalContent}>
// // //           <View style={styles.inputGroup}>
// // //             <Text style={styles.inputLabel}>Meal Name</Text>
// // //             <TextInput
// // //               style={styles.textInput}
// // //               value={customMealData.name}
// // //               onChangeText={(text) => setCustomMealData(prev => ({ ...prev, name: text }))}
// // //               placeholder="Enter meal name"
// // //             />
// // //           </View>

// // //           <View style={styles.inputGroup}>
// // //             <Text style={styles.inputLabel}>Calories</Text>
// // //             <TextInput
// // //               style={styles.textInput}
// // //               value={customMealData.calories}
// // //               onChangeText={(text) => setCustomMealData(prev => ({ ...prev, calories: text }))}
// // //               placeholder="Enter calories"
// // //               keyboardType="numeric"
// // //             />
// // //           </View>

// // //           <View style={styles.nutritionInputs}>
// // //             <View style={styles.inputGroup}>
// // //               <Text style={styles.inputLabel}>Protein (g)</Text>
// // //               <TextInput
// // //                 style={styles.textInput}
// // //                 value={customMealData.protein}
// // //                 onChangeText={(text) => setCustomMealData(prev => ({ ...prev, protein: text }))}
// // //                 placeholder="0"
// // //                 keyboardType="numeric"
// // //               />
// // //             </View>

// // //             <View style={styles.inputGroup}>
// // //               <Text style={styles.inputLabel}>Carbs (g)</Text>
// // //               <TextInput
// // //                 style={styles.textInput}
// // //                 value={customMealData.carbs}
// // //                 onChangeText={(text) => setCustomMealData(prev => ({ ...prev, carbs: text }))}
// // //                 placeholder="0"
// // //                 keyboardType="numeric"
// // //               />
// // //             </View>

// // //             <View style={styles.inputGroup}>
// // //               <Text style={styles.inputLabel}>Fat (g)</Text>
// // //               <TextInput
// // //                 style={styles.textInput}
// // //                 value={customMealData.fat}
// // //                 onChangeText={(text) => setCustomMealData(prev => ({ ...prev, fat: text }))}
// // //                 placeholder="0"
// // //                 keyboardType="numeric"
// // //               />
// // //             </View>
// // //           </View>

// // //           <TouchableOpacity style={styles.addCustomButton} onPress={handleAddCustomMeal}>
// // //             <Text style={styles.addCustomButtonText}>Add Meal</Text>
// // //           </TouchableOpacity>
// // //         </ScrollView>
// // //       </SafeAreaView>
// // //     </Modal>
// // //   );

// // //   if (contextLoading) {
// // //     return (
// // //       <SafeAreaView style={styles.container}>
// // //         <View style={styles.loadingContainer}>
// // //           <ActivityIndicator size="large" color="#4CAF50" />
// // //           <Text style={styles.loadingText}>Loading your meals...</Text>
// // //         </View>
// // //       </SafeAreaView>
// // //     );
// // //   }

// // //   return (
// // //     <SafeAreaView style={styles.container}>
// // //       <ScrollView showsVerticalScrollIndicator={false}>
// // //         {/* Header */}
// // //         <View style={styles.header}>
// // //           <Text style={styles.headerTitle}>My Meals</Text>
// // //           <View style={styles.headerActions}>
// // //             <TouchableOpacity style={styles.headerButton} onPress={handleClearAllMeals}>
// // //               <Ionicons name="trash-outline" size={20} color="#FF5722" />
// // //             </TouchableOpacity>
// // //             <TouchableOpacity style={styles.headerButton}>
// // //               <Ionicons name="calendar-outline" size={24} color="#333" />
// // //             </TouchableOpacity>
// // //           </View>
// // //         </View>

// // //         {/* Nutrition Summary */}
// // //         <NutritionSummary />

// // //         {/* Meals List */}
// // //         <View style={styles.mealsContainer}>
// // //           <Text style={styles.sectionTitle}>Today's Meals</Text>
// // //           {meals.map((meal) => (
// // //             <MealItem key={meal.id} meal={meal} />
// // //           ))}
// // //         </View>

// // //         {/* Quick Actions */}
// // //         <View style={styles.quickActions}>
// // //           <TouchableOpacity 
// // //             style={styles.actionButton}
// // //             onPress={handleAIRecommendations}
// // //           >
// // //             <Ionicons name="bulb" size={20} color="#4CAF50" />
// // //             <Text style={styles.actionText}>
// // //               {!hasCompletedSetup ? 'Complete Setup' : 'AI Recommendations'}
// // //             </Text>
// // //           </TouchableOpacity>
          
// // //           <TouchableOpacity 
// // //             style={styles.actionButton}
// // //             onPress={() => {
// // //               setSelectedMealId('breakfast'); // Default to breakfast
// // //               setShowCustomMealModal(true);
// // //             }}
// // //           >
// // //             <Ionicons name="add" size={20} color="#4CAF50" />
// // //             <Text style={styles.actionText}>Add Custom Meal</Text>
// // //           </TouchableOpacity>
// // //         </View>
// // //       </ScrollView>

// // //       {/* AI Food Recommendation Modal */}
// // //       <AIFoodRecommendation
// // //         visible={showAIRecommendations}
// // //         onClose={() => {
// // //           setShowAIRecommendations(false);
// // //           setSelectedMealId(null);
// // //         }}
// // //         onSelectFood={handleSelectFood}
// // //         selectedMealType={selectedMealId || 'breakfast'}
// // //       />

// // //       {/* Custom Meal Modal */}
// // //       <CustomMealModal />
// // //     </SafeAreaView>
// // //   );
// // // };

// // // export default MealsScreen;

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     backgroundColor: '#f1e3ec',
// // //   },
// // //   loadingContainer: {
// // //     flex: 1,
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //   },
// // //   loadingText: {
// // //     fontSize: 16,
// // //     color: '#666',
// // //     marginTop: 16,
// // //   },
// // //   header: {
// // //     flexDirection: 'row',
// // //     justifyContent: 'space-between',
// // //     alignItems: 'center',
// // //     paddingHorizontal: 20,
// // //     paddingTop: 10,
// // //     paddingBottom: 20,
// // //   },
// // //   headerTitle: {
// // //     fontSize: 24,
// // //     fontWeight: 'bold',
// // //     color: '#333',
// // //   },
// // //   headerActions: {
// // //     flexDirection: 'row',
// // //     gap: 12,
// // //   },
// // //   headerButton: {
// // //     padding: 8,
// // //   },
// // //   nutritionSummary: {
// // //     backgroundColor: 'white',
// // //     marginHorizontal: 20,
// // //     marginBottom: 20,
// // //     borderRadius: 16,
// // //     padding: 20,
// // //   },
// // //   summaryTitle: {
// // //     fontSize: 18,
// // //     fontWeight: 'bold',
// // //     color: '#333',
// // //     marginBottom: 16,
// // //   },
// // //   summaryGrid: {
// // //     flexDirection: 'row',
// // //     flexWrap: 'wrap',
// // //     gap: 16,
// // //   },
// // //   summaryItem: {
// // //     flex: 1,
// // //     minWidth: '45%',
// // //   },
// // //   summaryLabel: {
// // //     fontSize: 12,
// // //     color: '#666',
// // //     marginBottom: 4,
// // //   },
// // //   summaryValue: {
// // //     fontSize: 16,
// // //     fontWeight: '600',
// // //     color: '#333',
// // //   },
// // //   targetInfo: {
// // //     marginTop: 16,
// // //     paddingTop: 16,
// // //     borderTopWidth: 1,
// // //     borderTopColor: '#F0F0F0',
// // //   },
// // //   targetLabel: {
// // //     fontSize: 14,
// // //     color: '#666',
// // //     marginBottom: 8,
// // //   },
// // //   progressBar: {
// // //     height: 6,
// // //     backgroundColor: '#F0F0F0',
// // //     borderRadius: 3,
// // //   },
// // //   progressFill: {
// // //     height: '100%',
// // //     backgroundColor: '#4CAF50',
// // //     borderRadius: 3,
// // //   },
// // //   mealsContainer: {
// // //     paddingHorizontal: 20,
// // //     marginBottom: 20,
// // //   },
// // //   sectionTitle: {
// // //     fontSize: 18,
// // //     fontWeight: 'bold',
// // //     color: '#333',
// // //     marginBottom: 16,
// // //   },
// // //   mealItem: {
// // //     backgroundColor: 'white',
// // //     borderRadius: 16,
// // //     padding: 16,
// // //     marginBottom: 12,
// // //   },
// // //   mealHeader: {
// // //     flexDirection: 'row',
// // //     justifyContent: 'space-between',
// // //     alignItems: 'center',
// // //     marginBottom: 12,
// // //   },
// // //   mealInfo: {
// // //     flex: 1,
// // //   },
// // //   mealTitle: {
// // //     fontSize: 16,
// // //     fontWeight: 'bold',
// // //     color: '#333',
// // //   },
// // //   mealTime: {
// // //     fontSize: 12,
// // //     color: '#666',
// // //     marginTop: 2,
// // //   },
// // //   mealActions: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     gap: 8,
// // //   },
// // //   addButton: {
// // //     padding: 4,
// // //   },
// // //   removeButton: {
// // //     padding: 4,
// // //   },
// // //   foodInfo: {
// // //     borderTopWidth: 1,
// // //     borderTopColor: '#F0F0F0',
// // //     paddingTop: 12,
// // //   },
// // //   foodName: {
// // //     fontSize: 14,
// // //     fontWeight: '600',
// // //     color: '#333',
// // //     marginBottom: 8,
// // //   },
// // //   nutritionRow: {
// // //     flexDirection: 'row',
// // //     flexWrap: 'wrap',
// // //     gap: 12,
// // //   },
// // //   nutritionText: {
// // //     fontSize: 12,
// // //     color: '#666',
// // //   },
// // //   emptyMeal: {
// // //     borderTopWidth: 1,
// // //     borderTopColor: '#F0F0F0',
// // //     paddingTop: 12,
// // //     alignItems: 'center',
// // //   },
// // //   emptyText: {
// // //     fontSize: 14,
// // //     color: '#999',
// // //     marginBottom: 4,
// // //   },
// // //   emptySubtext: {
// // //     fontSize: 12,
// // //     color: '#CCC',
// // //   },
// // //   quickActions: {
// // //     flexDirection: 'column',
// // //     paddingHorizontal: 20,
// // //     gap: 12,
// // //   },
// // //   actionButton: {
// // //     flex: 1,
// // //     justifyContent: 'center',
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     backgroundColor: '#E8F5E8',
// // //     paddingHorizontal: 16,
// // //     paddingVertical: 12,
// // //     borderRadius: 12,
// // //     gap: 8,
// // //   },
// // //   actionText: {
// // //     flex: 1,
// // //     textAlign: 'center',
// // //     fontSize: 14,
// // //     color: '#4CAF50',
// // //     fontWeight: '600',
// // //   },
// // //   // Modal styles
// // //   modalContainer: {
// // //     flex: 1,
// // //     backgroundColor: '#f1e3ec',
// // //   },
// // //   modalHeader: {
// // //     flexDirection: 'row',
// // //     justifyContent: 'space-between',
// // //     alignItems: 'center',
// // //     paddingHorizontal: 20,
// // //     paddingTop: 20,
// // //     paddingBottom: 20,
// // //     borderBottomWidth: 1,
// // //     borderBottomColor: '#E0E0E0',
// // //   },
// // //   modalTitle: {
// // //     fontSize: 18,
// // //     fontWeight: 'bold',
// // //     color: '#333',
// // //   },
// // //   modalContent: {
// // //     flex: 1,
// // //     paddingHorizontal: 20,
// // //     paddingTop: 20,
// // //   },
// // //   inputGroup: {
// // //     marginBottom: 20,
// // //   },
// // //   inputLabel: {
// // //     fontSize: 16,
// // //     fontWeight: '600',
// // //     color: '#333',
// // //     marginBottom: 8,
// // //   },
// // //   textInput: {
// // //     backgroundColor: 'white',
// // //     borderRadius: 12,
// // //     paddingHorizontal: 16,
// // //     paddingVertical: 12,
// // //     fontSize: 16,
// // //     borderWidth: 1,
// // //     borderColor: '#E0E0E0',
// // //   },
// // //   nutritionInputs: {
// // //     flexDirection: 'row',
// // //     gap: 12,
// // //   },
// // //   addCustomButton: {
// // //     backgroundColor: '#4CAF50',
// // //     borderRadius: 12,
// // //     paddingVertical: 16,
// // //     alignItems: 'center',
// // //     marginTop: 20,
// // //   },
// // //   addCustomButtonText: {
// // //     color: 'white',
// // //     fontSize: 16,
// // //     fontWeight: '600',
// // //   },
// // // }); 





// import AIFoodRecommendation from '@/components/AIFoodRecommendation';
// import { useMealPlan } from '@/components/MealPlanContext';
// import StorageService from '@/services/StorageService';
// import { Ionicons } from '@expo/vector-icons';
// import React, { useEffect, useState, useMemo, useCallback } from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import {
//   ActivityIndicator,
//   Alert,
//   Modal,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { FoodItem, Meal } from '@/components/types';

// const MealsScreen = () => {
//   const [showAIRecommendations, setShowAIRecommendations] = useState(false);
//   const [showCustomMealModal, setShowCustomMealModal] = useState(false);
//   const [selectedMealId, setSelectedMealId] = useState<string | null>(null);
//   const [customMealData, setCustomMealData] = useState({
//     name: '',
//     calories: '',
//     protein: '',
//     carbs: '',
//     fat: '',
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [hasCompletedSetup, setHasCompletedSetup] = useState(false);
//   const [hasApiKey, setHasApiKey] = useState(false);
//   const [showPreviousMeals, setShowPreviousMeals] = useState(false);

//   const {
//     meals,
//     updateMeal,
//     removeMeal,
//     getTotalNutrition,
//     addCustomMeal,
//     clearAllMeals,
//     personalInfo,
//     isLoading: contextLoading,
//     loadMealsFromStorage,
//   } = useMealPlan();

//   const totalNutrition = getTotalNutrition();

//   // Compute previousMeals for the selected meal
//   const previousMeals = useMemo((): FoodItem[] => {
//     if (!selectedMealId) return [];
//     return meals
//       .filter((meal: Meal) => meal.hasFood && meal.id === selectedMealId)
//       .map((meal: Meal) => meal.food as FoodItem);
//   }, [meals, selectedMealId]);

//   // Check setup status and handle daily reset
//   const checkSetupStatus = useCallback(async () => {
//     try {
//       setIsLoading(true);
//       // Check and reset meals
//       const lastResetTimestamp = await StorageService.getLastResetTimestamp();
//       const now = new Date();
//       const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//       const lastResetDate = lastResetTimestamp ? new Date(lastResetTimestamp) : null;

//       if (!lastResetDate || lastResetDate < todayMidnight) {
//         await StorageService.clearMeals();
//         await StorageService.setLastResetTimestamp(now.getTime());
//         await loadMealsFromStorage(); // Sync MealPlanContext meals
//         console.log('Meals reset at:', now);
//         Alert.alert('Meals Reset', 'Your meal plan has been reset for a new day.');
//       }

//       // Check setup and API key
//       const [hasSetup, apiKey] = await Promise.all([
//         StorageService.hasCompletedSetup(),
//         StorageService.getGeminiApiKey(),
//       ]);
//       setHasCompletedSetup(hasSetup);
//       setHasApiKey(!!apiKey);
//     } catch (error) {
//       console.error('Error checking setup status:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [loadMealsFromStorage]);

//   useEffect(() => {
//     checkSetupStatus();
//   }, [checkSetupStatus]);

//   const handleSelectFood = useCallback(
//     (food: FoodItem) => {
//       if (selectedMealId) {
//         updateMeal(selectedMealId, food);
//       }
//       setShowAIRecommendations(false);
//       setSelectedMealId(null);
//       setShowPreviousMeals(false);
//     },
//     [selectedMealId, updateMeal]
//   );

//   const handleRemoveMeal = useCallback(
//     (mealId: string) => {
//       Alert.alert(
//         'Remove Meal',
//         'Are you sure you want to remove this meal?',
//         [
//           { text: 'Cancel', style: 'cancel' },
//           { text: 'Remove', style: 'destructive', onPress: () => removeMeal(mealId) },
//         ]
//       );
//     },
//     [removeMeal]
//   );

//   const handleClearAllMeals = useCallback(() => {
//     Alert.alert(
//       'Clear All Meals',
//       'Are you sure you want to clear all meals? This action cannot be undone.',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         { text: 'Clear All', style: 'destructive', onPress: clearAllMeals },
//       ]
//     );
//   }, [clearAllMeals]);

//   const handleAddCustomMeal = useCallback(() => {
//     if (!customMealData.name || !customMealData.calories) {
//       Alert.alert('Error', 'Please enter at least a meal name and calories.');
//       return;
//     }

//     const calories = parseInt(customMealData.calories) || 0;
//     const protein = parseInt(customMealData.protein) || 0;
//     const carbs = parseInt(customMealData.carbs) || 0;
//     const fat = parseInt(customMealData.fat) || 0;

//     if (selectedMealId) {
//       addCustomMeal(selectedMealId, customMealData.name, calories, protein, carbs, fat);
//       setShowCustomMealModal(false);
//       setSelectedMealId(null);
//       setCustomMealData({ name: '', calories: '', protein: '', carbs: '', fat: '' });
//     }
//   }, [customMealData, selectedMealId, addCustomMeal]);

//   const handleAIRecommendations = useCallback(() => {
//     if (!hasCompletedSetup) {
//       Alert.alert(
//         'Profile Setup Required',
//         'Please complete your profile setup to get personalized AI recommendations. We need your age, gender, height, weight, activity level, and goals.',
//         [
//           { text: 'Cancel', style: 'cancel' },
//           { text: 'Complete Setup', onPress: () => setShowAIRecommendations(true) },
//         ]
//       );
//       return;
//     }

//     if (!hasApiKey) {
//       Alert.alert(
//         'API Key Required',
//         'Please set your Gemini API key in Settings to use AI recommendations.',
//         [
//           { text: 'Cancel', style: 'cancel' },
//           {
//             text: 'Go to Settings',
//             onPress: () => {
//               // Navigate to settings (implement navigation logic)
//             },
//           },
//         ]
//       );
//       return;
//     }

//     setShowAIRecommendations(true);
//   }, [hasCompletedSetup, hasApiKey]);

//   const MealItem = ({ meal }: { meal: Meal }) => (
//     <View style={styles.mealItem}>
//       <View style={styles.mealHeader}>
//         <View style={styles.mealInfo}>
//           <Text style={styles.mealTitle}>{meal.title}</Text>
//           <Text style={styles.mealTime}>{meal.time}</Text>
//         </View>
//         <View style={styles.mealActions}>
//           {meal.hasFood && (
//             <TouchableOpacity
//               style={styles.removeButton}
//               onPress={() => handleRemoveMeal(meal.id)}
//             >
//               <Ionicons name="trash-outline" size={20} color="#FF5722" />
//             </TouchableOpacity>
//           )}
//           <TouchableOpacity
//             style={styles.addButton}
//             onPress={() => {
//               setSelectedMealId(meal.id);
//               setShowAIRecommendations(true);
//             }}
//           >
//             <Ionicons name="add-circle-outline" size={24} color="#4CAF50" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {meal.hasFood && meal.food ? (
//         <View style={styles.foodInfo}>
//           <Text style={styles.foodName}>{meal.food.name}</Text>
//           <View style={styles.nutritionRow}>
//             <Text style={styles.nutritionText}>
//               {meal.food.calories} kcal
//             </Text>
//             <Text style={styles.nutritionText}>
//               {meal.food.protein}g protein
//             </Text>
//             <Text style={styles.nutritionText}>
//               {meal.food.carbs}g carbs
//             </Text>
//             <Text style={styles.nutritionText}>
//               {meal.food.fat}g fat
//             </Text>
//           </View>
//         </View>
//       ) : (
//         <View style={styles.emptyMeal}>
//           <Text style={styles.emptyText}>No meal planned</Text>
//           <Text style={styles.emptySubtext}>Tap + to add a meal</Text>
//         </View>
//       )}
//     </View>
//   );

//   const NutritionSummary = () => (
//     <View style={styles.nutritionSummary}>
//       <Text style={styles.summaryTitle}>Today's Nutrition</Text>
//       <View style={styles.summaryGrid}>
//         <View style={styles.summaryItem}>
//           <Text style={styles.summaryLabel}>Calories</Text>
//           <Text style={styles.summaryValue}>{totalNutrition.calories} kcal</Text>
//         </View>
//         <View style={styles.summaryItem}>
//           <Text style={styles.summaryLabel}>Protein</Text>
//           <Text style={styles.summaryValue}>{totalNutrition.protein}g</Text>
//         </View>
//         <View style={styles.summaryItem}>
//           <Text style={styles.summaryLabel}>Carbs</Text>
//           <Text style={styles.summaryValue}>{totalNutrition.carbs}g</Text>
//         </View>
//         <View style={styles.summaryItem}>
//           <Text style={styles.summaryLabel}>Fat</Text>
//           <Text style={styles.summaryValue}>{totalNutrition.fat}g</Text>
//         </View>
//       </View>

//       {personalInfo && (
//         <View style={styles.targetInfo}>
//           <Text style={styles.targetLabel}>Target: {personalInfo.targetCalories} kcal</Text>
//           <View style={styles.progressBar}>
//             <View
//               style={[
//                 styles.progressFill,
//                 { width: `${Math.min((totalNutrition.calories / parseInt(personalInfo.targetCalories)) * 100, 100)}%` },
//               ]}
//             />
//           </View>
//         </View>
//       )}
//     </View>
//   );

//   const CustomMealModal = () => (
//     <Modal
//       visible={showCustomMealModal}
//       animationType="slide"
//       presentationStyle="pageSheet"
//       onRequestClose={() => setShowCustomMealModal(false)}
//     >
//       <SafeAreaView style={styles.modalContainer}>
//         <View style={styles.modalHeader}>
//           <TouchableOpacity onPress={() => setShowCustomMealModal(false)}>
//             <Ionicons name="close" size={24} color="#333" />
//           </TouchableOpacity>
//           <Text style={styles.modalTitle}>Add Custom Meal</Text>
//           <View style={{ width: 24 }} />
//         </View>

//         <ScrollView style={styles.modalContent}>
//           <View style={styles.inputGroup}>
//             <Text style={styles.inputLabel}>Meal Name</Text>
//             <TextInput
//               style={styles.textInput}
//               value={customMealData.name}
//               onChangeText={(text) => setCustomMealData((prev) => ({ ...prev, name: text }))}
//               placeholder="Enter meal name"
//             />
//           </View>

//           <View style={styles.inputGroup}>
//             <Text style={styles.inputLabel}>Calories</Text>
//             <TextInput
//               style={styles.textInput}
//               value={customMealData.calories}
//               onChangeText={(text) => setCustomMealData((prev) => ({ ...prev, calories: text }))}
//               placeholder="Enter calories"
//               keyboardType="numeric"
//             />
//           </View>

//           <View style={styles.nutritionInputs}>
//             <View style={styles.inputGroup}>
//               <Text style={styles.inputLabel}>Protein (g)</Text>
//               <TextInput
//                 style={styles.textInput}
//                 value={customMealData.protein}
//                 onChangeText={(text) => setCustomMealData((prev) => ({ ...prev, protein: text }))}
//                 placeholder="0"
//                 keyboardType="numeric"
//               />
//             </View>

//             <View style={styles.inputGroup}>
//               <Text style={styles.inputLabel}>Carbs (g)</Text>
//               <TextInput
//                 style={styles.textInput}
//                 value={customMealData.carbs}
//                 onChangeText={(text) => setCustomMealData((prev) => ({ ...prev, carbs: text }))}
//                 placeholder="0"
//                 keyboardType="numeric"
//               />
//             </View>

//             <View style={styles.inputGroup}>
//               <Text style={styles.inputLabel}>Fat (g)</Text>
//               <TextInput
//                 style={styles.textInput}
//                 value={customMealData.fat}
//                 onChangeText={(text) => setCustomMealData((prev) => ({ ...prev, fat: text }))}
//                 placeholder="0"
//                 keyboardType="numeric"
//               />
//             </View>
//           </View>

//           <TouchableOpacity style={styles.addCustomButton} onPress={handleAddCustomMeal}>
//             <Text style={styles.addCustomButtonText}>Add Meal</Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </SafeAreaView>
//     </Modal>
//   );

//   if (contextLoading || isLoading) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#4CAF50" />
//           <Text style={styles.loadingText}>Loading your meals...</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* Header */}
//         <View style={styles.header}>
//           <Text style={styles.headerTitle}>My Meals</Text>
//           <View style={styles.headerActions}>
//             <TouchableOpacity style={styles.headerButton} onPress={handleClearAllMeals}>
//               <Ionicons name="trash-outline" size={20} color="#FF5722" />
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.headerButton}>
//               <Ionicons name="calendar-outline" size={24} color="#333" />
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Nutrition Summary */}
//         <NutritionSummary />

//         {/* Meals List */}
//         <View style={styles.mealsContainer}>
//           <Text style={styles.sectionTitle}>Today's Meals</Text>
//           {meals.map((meal) => (
//             <MealItem key={meal.id} meal={meal} />
//           ))}
//         </View>

//         {/* Quick Actions */}
//         <View style={styles.quickActions}>
//           <TouchableOpacity style={styles.actionButton} onPress={handleAIRecommendations}>
//             <Ionicons name="bulb" size={20} color="#4CAF50" />
//             <Text style={styles.actionText}>
//               {!hasCompletedSetup ? 'Complete Setup' : 'AI Recommendations'}
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.actionButton}
//             onPress={() => {
//               setSelectedMealId('breakfast'); // Default to breakfast
//               setShowCustomMealModal(true);
//             }}
//           >
//             <Ionicons name="add" size={20} color="#4CAF50" />
//             <Text style={styles.actionText}>Add Custom Meal</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>

//       {/* AI Food Recommendation Modal */}
//       <AIFoodRecommendation
//         visible={showAIRecommendations}
//         onClose={() => {
//           setShowAIRecommendations(false);
//           setSelectedMealId(null);
//           setShowPreviousMeals(false);
//         }}
//         onSelectFood={handleSelectFood}
//         selectedMealType={selectedMealId || 'breakfast'}
//         previousMeals={previousMeals}
//         showPreviousMeals={showPreviousMeals}
//         setShowPreviousMeals={setShowPreviousMeals}
//       />

//       {/* Custom Meal Modal */}
//       <CustomMealModal />
//     </SafeAreaView>
//   );
// };

// export default MealsScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#e8f1eaff',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     fontSize: 16,
//     color: '#666',
//     marginTop: 16,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingTop: 10,
//     paddingBottom: 20,
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   headerActions: {
//     flexDirection: 'row',
//     gap: 12,
//   },
//   headerButton: {
//     padding: 8,
//   },
//   nutritionSummary: {
//     backgroundColor: 'white',
//     marginHorizontal: 20,
//     marginBottom: 20,
//     borderRadius: 16,
//     padding: 20,
//   },
//   summaryTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 16,
//   },
//   summaryGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 16,
//   },
//   summaryItem: {
//     flex: 1,
//     minWidth: '45%',
//   },
//   summaryLabel: {
//     fontSize: 12,
//     color: '#666',
//     marginBottom: 4,
//   },
//   summaryValue: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//   },
//   targetInfo: {
//     marginTop: 16,
//     paddingTop: 16,
//     borderTopWidth: 1,
//     borderTopColor: '#F0F0F0',
//   },
//   targetLabel: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 8,
//   },
//   progressBar: {
//     height: 6,
//     backgroundColor: '#F0F0F0',
//     borderRadius: 3,
//   },
//   progressFill: {
//     height: '100%',
//     backgroundColor: '#4CAF50',
//     borderRadius: 3,
//   },
//   mealsContainer: {
//     paddingHorizontal: 20,
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 16,
//   },
//   mealItem: {
//     backgroundColor: 'white',
//     borderRadius: 16,
//     padding: 16,
//     marginBottom: 12,
//   },
//   mealHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   mealInfo: {
//     flex: 1,
//   },
//   mealTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   mealTime: {
//     fontSize: 12,
//     color: '#666',
//     marginTop: 2,
//   },
//   mealActions: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   addButton: {
//     padding: 4,
//   },
//   removeButton: {
//     padding: 4,
//   },
//   foodInfo: {
//     borderTopWidth: 1,
//     borderTopColor: '#F0F0F0',
//     paddingTop: 12,
//   },
//   foodName: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 8,
//   },
//   nutritionRow: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 12,
//   },
//   nutritionText: {
//     fontSize: 12,
//     color: '#666',
//   },
//   emptyMeal: {
//     borderTopWidth: 1,
//     borderTopColor: '#F0F0F0',
//     paddingTop: 12,
//     alignItems: 'center',
//   },
//   emptyText: {
//     fontSize: 14,
//     color: '#999',
//     marginBottom: 4,
//   },
//   emptySubtext: {
//     fontSize: 12,
//     color: '#CCC',
//   },
//   quickActions: {
//     flexDirection: 'column',
//     paddingHorizontal: 20,
//     gap: 12,
//   },
//   actionButton: {
//     flex: 1,
//     justifyContent: 'center',
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#E8F5E8',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderRadius: 12,
//     gap: 8,
//   },
//   actionText: {
//     flex: 1,
//     textAlign: 'center',
//     fontSize: 14,
//     color: '#4CAF50',
//     fontWeight: '600',
//   },
//   modalContainer: {
//     flex: 1,
//     backgroundColor: '#e8f1eaff',
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingTop: 20,
//     paddingBottom: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E0E0E0',
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   modalContent: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingTop: 20,
//   },
//   inputGroup: {
//     marginBottom: 20,
//   },
//   inputLabel: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 8,
//   },
//   textInput: {
//     backgroundColor: 'white',
//     borderRadius: 12,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     fontSize: 16,
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//   },
//   nutritionInputs: {
//     flexDirection: 'row',
//     gap: 12,
//   },
//   addCustomButton: {
//     backgroundColor: '#4CAF50',
//     borderRadius: 12,
//     paddingVertical: 16,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   addCustomButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });


import AIFoodRecommendation from '@/components/AIFoodRecommendation';
import { useMealPlan } from '@/components/MealPlanContext';
import StorageService from '@/services/StorageService';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { FoodItem, Meal } from '@/components/types';

const MealsScreen = () => {
  const [showAIRecommendations, setShowAIRecommendations] = useState(false);
  const [showCustomMealModal, setShowCustomMealModal] = useState(false);
  const [selectedMealId, setSelectedMealId] = useState<string | null>(null);
  const [customMealData, setCustomMealData] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasCompletedSetup, setHasCompletedSetup] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [showPreviousMeals, setShowPreviousMeals] = useState(false);

  const {
    meals,
    updateMeal,
    getTotalNutrition,
    addCustomMeal,
    clearAllMeals,
    personalInfo,
    isLoading: contextLoading,
    loadMealsFromStorage,
  } = useMealPlan();

  const totalNutrition = getTotalNutrition();

  // Compute previousMeals for the selected meal
  const previousMeals = useMemo((): FoodItem[] => {
    if (!selectedMealId) return [];
    return meals
      .filter((meal: Meal) => meal.hasFood && meal.id === selectedMealId)
      .map((meal: Meal) => meal.food as FoodItem);
  }, [meals, selectedMealId]);

  // Check setup status and handle daily reset
  const checkSetupStatus = useCallback(async () => {
    try {
      setIsLoading(true);
      const lastResetTimestamp = await StorageService.getLastResetTimestamp();
      const now = new Date();
      const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const lastResetDate = lastResetTimestamp ? new Date(lastResetTimestamp) : null;

      if (!lastResetDate || lastResetDate < todayMidnight) {
        // ✅ Save yesterday's meals to history BEFORE clearing
        const yesterday = new Date(todayMidnight);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayDate = yesterday.toISOString().split('T')[0];
        await StorageService.saveCurrentMealsToHistory(yesterdayDate);
        
        await StorageService.clearMeals();
        await StorageService.setLastResetTimestamp(now.getTime());
        await loadMealsFromStorage();
        console.log('Meals reset at:', now);
        Alert.alert('Meals Reset', 'Your meal plan has been reset for a new day.');
      }

      const [hasSetup, apiKey] = await Promise.all([
        StorageService.hasCompletedSetup(),
        StorageService.getGeminiApiKey(),
      ]);
      setHasCompletedSetup(hasSetup);
      setHasApiKey(!!apiKey);
    } catch (error) {
      console.error('Error checking setup status:', error);
    } finally {
      setIsLoading(false);
    }
  }, [loadMealsFromStorage]);

  useEffect(() => {
    checkSetupStatus();
  }, [checkSetupStatus]);

  const handleSelectFood = useCallback(
    (food: FoodItem) => {
      if (selectedMealId) {
        updateMeal(selectedMealId, food);
      }
      setShowAIRecommendations(false);
      setSelectedMealId(null);
      setShowPreviousMeals(false);
    },
    [selectedMealId, updateMeal]
  );

  // ✅ FIXED: Clear meal WITHOUT touching history
  const handleRemoveMeal = useCallback(
    (mealId: string) => {
      Alert.alert(
        'Remove Meal',
        'Remove this meal from today\'s plan? (History preserved)',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Remove', 
            style: 'destructive', 
            onPress: () => {
              // ✅ ONLY clear food from CURRENT meals, history stays safe
              updateMeal(mealId, null);
            }
          },
        ]
      );
    },
    [updateMeal]
  );

  const handleClearAllMeals = useCallback(() => {
    Alert.alert(
      'Clear All Meals',
      'Clear today\'s plan? Previous days preserved.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear All', 
          style: 'destructive', 
          onPress: async () => {
            const todayDate = new Date().toISOString().split('T')[0];
            await StorageService.saveCurrentMealsToHistory(todayDate);
            clearAllMeals();
          }
        },
      ]
    );
  }, [clearAllMeals]);

  const handleAddCustomMeal = useCallback(() => {
    if (!customMealData.name || !customMealData.calories) {
      Alert.alert('Error', 'Please enter at least a meal name and calories.');
      return;
    }

    const calories = parseInt(customMealData.calories) || 0;
    const protein = parseInt(customMealData.protein) || 0;
    const carbs = parseInt(customMealData.carbs) || 0;
    const fat = parseInt(customMealData.fat) || 0;

    if (selectedMealId) {
      addCustomMeal(selectedMealId, customMealData.name, calories, protein, carbs, fat);
      setShowCustomMealModal(false);
      setSelectedMealId(null);
      setCustomMealData({ name: '', calories: '', protein: '', carbs: '', fat: '' });
    }
  }, [customMealData, selectedMealId, addCustomMeal]);

  const handleAIRecommendations = useCallback(() => {
    if (!hasCompletedSetup) {
      Alert.alert(
        'Profile Setup Required',
        'Please complete your profile setup to get personalized AI recommendations.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Complete Setup', onPress: () => setShowAIRecommendations(true) },
        ]
      );
      return;
    }

    if (!hasApiKey) {
      Alert.alert(
        'API Key Required',
        'Please set your Gemini API key in Settings.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Go to Settings', onPress: () => {} },
        ]
      );
      return;
    }

    setShowAIRecommendations(true);
  }, [hasCompletedSetup, hasApiKey]);

  const MealItem = ({ meal }: { meal: Meal }) => (
    <View style={styles.mealItem}>
      <View style={styles.mealHeader}>
        <View style={styles.mealInfo}>
          <Text style={styles.mealTitle}>{meal.title}</Text>
          <Text style={styles.mealTime}>{meal.time}</Text>
        </View>
        <View style={styles.mealActions}>
          {meal.hasFood && (
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemoveMeal(meal.id)}
            >
              <Ionicons name="trash-outline" size={20} color="#FF5722" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              setSelectedMealId(meal.id);
              setShowAIRecommendations(true);
            }}
          >
            <Ionicons name="add-circle-outline" size={24} color="#4CAF50" />
          </TouchableOpacity>
        </View>
      </View>

      {meal.hasFood && meal.food ? (
        <View style={styles.foodInfo}>
          <Text style={styles.foodName}>{meal.food.name}</Text>
          <View style={styles.nutritionRow}>
            <Text style={styles.nutritionText}>{meal.food.calories} kcal</Text>
            <Text style={styles.nutritionText}>{meal.food.protein}g protein</Text>
            <Text style={styles.nutritionText}>{meal.food.carbs}g carbs</Text>
            <Text style={styles.nutritionText}>{meal.food.fat}g fat</Text>
          </View>
        </View>
      ) : (
        <View style={styles.emptyMeal}>
          <Text style={styles.emptyText}>No meal planned</Text>
          <Text style={styles.emptySubtext}>Tap + to add a meal</Text>
        </View>
      )}
    </View>
  );

  const NutritionSummary = () => (
    <View style={styles.nutritionSummary}>
      <Text style={styles.summaryTitle}>Today's Nutrition</Text>
      <View style={styles.summaryGrid}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Calories</Text>
          <Text style={styles.summaryValue}>{totalNutrition.calories} kcal</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Protein</Text>
          <Text style={styles.summaryValue}>{totalNutrition.protein}g</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Carbs</Text>
          <Text style={styles.summaryValue}>{totalNutrition.carbs}g</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Fat</Text>
          <Text style={styles.summaryValue}>{totalNutrition.fat}g</Text>
        </View>
      </View>

      {personalInfo && (
        <View style={styles.targetInfo}>
          <Text style={styles.targetLabel}>Target: {personalInfo.targetCalories} kcal</Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${Math.min((totalNutrition.calories / parseInt(personalInfo.targetCalories)) * 100, 100)}%` },
              ]}
            />
          </View>
        </View>
      )}
    </View>
  );

  const CustomMealModal = () => (
    <Modal
      visible={showCustomMealModal}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setShowCustomMealModal(false)}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setShowCustomMealModal(false)}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Add Custom Meal</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView style={styles.modalContent}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Meal Name</Text>
            <TextInput
              style={styles.textInput}
              value={customMealData.name}
              onChangeText={(text) => setCustomMealData((prev) => ({ ...prev, name: text }))}
              placeholder="Enter meal name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Calories</Text>
            <TextInput
              style={styles.textInput}
              value={customMealData.calories}
              onChangeText={(text) => setCustomMealData((prev) => ({ ...prev, calories: text }))}
              placeholder="Enter calories"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.nutritionInputs}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Protein (g)</Text>
              <TextInput
                style={styles.textInput}
                value={customMealData.protein}
                onChangeText={(text) => setCustomMealData((prev) => ({ ...prev, protein: text }))}
                placeholder="0"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Carbs (g)</Text>
              <TextInput
                style={styles.textInput}
                value={customMealData.carbs}
                onChangeText={(text) => setCustomMealData((prev) => ({ ...prev, carbs: text }))}
                placeholder="0"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Fat (g)</Text>
              <TextInput
                style={styles.textInput}
                value={customMealData.fat}
                onChangeText={(text) => setCustomMealData((prev) => ({ ...prev, fat: text }))}
                placeholder="0"
                keyboardType="numeric"
              />
            </View>
          </View>

          <TouchableOpacity style={styles.addCustomButton} onPress={handleAddCustomMeal}>
            <Text style={styles.addCustomButtonText}>Add Meal</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  if (contextLoading || isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Loading your meals...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Meals</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton} onPress={handleClearAllMeals}>
              <Ionicons name="trash-outline" size={20} color="#FF5722" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Ionicons name="calendar-outline" size={24} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        <NutritionSummary />

        <View style={styles.mealsContainer}>
          <Text style={styles.sectionTitle}>Today's Meals</Text>
          {meals.map((meal) => (
            <MealItem key={meal.id} meal={meal} />
          ))}
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleAIRecommendations}>
            <Ionicons name="bulb" size={20} color="#4CAF50" />
            <Text style={styles.actionText}>
              {!hasCompletedSetup ? 'Complete Setup' : 'AI Recommendations'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              setSelectedMealId('breakfast');
              setShowCustomMealModal(true);
            }}
          >
            <Ionicons name="add" size={20} color="#4CAF50" />
            <Text style={styles.actionText}>Add Custom Meal</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <AIFoodRecommendation
        visible={showAIRecommendations}
        onClose={() => {
          setShowAIRecommendations(false);
          setSelectedMealId(null);
          setShowPreviousMeals(false);
        }}
        onSelectFood={handleSelectFood}
        selectedMealType={selectedMealId || 'breakfast'}
        previousMeals={previousMeals}
        showPreviousMeals={showPreviousMeals}
        setShowPreviousMeals={setShowPreviousMeals}
      />

      <CustomMealModal />
    </SafeAreaView>
  );
};

export default MealsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f1eaff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    padding: 8,
  },
  nutritionSummary: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  summaryItem: {
    flex: 1,
    minWidth: '45%',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  targetInfo: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  targetLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 3,
  },
  mealsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  mealItem: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  mealInfo: {
    flex: 1,
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  mealTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  mealActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addButton: {
    padding: 4,
  },
  removeButton: {
    padding: 4,
  },
  foodInfo: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
  },
  foodName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  nutritionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  nutritionText: {
    fontSize: 12,
    color: '#666',
  },
  emptyMeal: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 12,
    color: '#CCC',
  },
  quickActions: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  actionText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#e8f1eaff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputGroup: {
    marginBottom: 20,
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
  nutritionInputs: {
    flexDirection: 'row',
    gap: 12,
  },
  addCustomButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  addCustomButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});