// // // // components/AnalyzeImage.tsx
// // // import GeminiService from "@/services/GeminiService";
// // // import StorageService from "@/services/StorageService";
// // // import { Ionicons } from "@expo/vector-icons";
// // // import * as ImagePicker from "expo-image-picker";
// // // import * as FileSystem from "expo-file-system";
// // // import React, { useState, useCallback } from "react";
// // // import {
// // //   ActivityIndicator,
// // //   Alert,
// // //   Modal,
// // //   SafeAreaView,
// // //   ScrollView,
// // //   StyleSheet,
// // //   Text,
// // //   TouchableOpacity,
// // //   View,
// // // } from "react-native";
// // // import { useMealPlan } from "./MealPlanContext";
// // // import { FoodItem, PersonalInfo } from "./types";

// // // interface AnalyzeImageProps {
// // //   visible: boolean;
// // //   onClose: () => void;
// // //   onSelectFood: (food: FoodItem) => void;
// // //   selectedMealType: string;
// // // }

// // // const AnalyzeImage: React.FC<AnalyzeImageProps> = ({
// // //   visible,
// // //   onClose,
// // //   onSelectFood,
// // //   selectedMealType,
// // // }) => {
// // //   const [isAnalyzing, setIsAnalyzing] = useState(false);
// // //   const [recommendations, setRecommendations] = useState<FoodItem[]>([]);
// // //   const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
// // //   const [hasApiKey, setHasApiKey] = useState(false);

// // //   const { meals } = useMealPlan();

// // //   const handleAnalyze = useCallback(async () => {
// // //     try {
// // //       const permission = await ImagePicker.requestCameraPermissionsAsync();
// // //       if (!permission.granted) {
// // //         Alert.alert("Permission Required", "Camera permission is required to take photos.");
// // //         return;
// // //       }

// // //       const result = await ImagePicker.launchCameraAsync({
// // //         allowsEditing: true,
// // //         aspect: [4, 3],
// // //         quality: 0.5,
// // //         base64: false, // We'll handle base64 separately
// // //       });

// // //       if (result.canceled) {
// // //         return;
// // //       }

// // //       const uri = result.assets[0].uri;
// // //       const base64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });

// // //       setIsAnalyzing(true);

// // //       // Load personal info and API key
// // //       const info = await StorageService.getPersonalInfo();
// // //       setPersonalInfo(info);

// // //       const apiKey = await StorageService.getGeminiApiKey();
// // //       if (!apiKey) {
// // //         Alert.alert("API Key Required", "Please set your Gemini API key in Settings.");
// // //         return;
// // //       }
// // //       GeminiService.setApiKey(apiKey);
// // //       setHasApiKey(true);

// // //       if (!info) {
// // //         Alert.alert("Profile Required", "Please complete your profile setup.");
// // //         return;
// // //       }

// // //       const analyzedMeals = await GeminiService.analyzeFoodImage(base64, info, selectedMealType, meals);
// // //       setRecommendations(analyzedMeals);
// // //     } catch (error) {
// // //       console.error("Error analyzing image:", error);
// // //       Alert.alert("Error", "Failed to analyze image. Please try again.");
// // //     } finally {
// // //       setIsAnalyzing(false);
// // //     }
// // //   }, [selectedMealType, meals]);

// // //   const handleSelect = (food: FoodItem) => {
// // //     onSelectFood(food);
// // //     onClose();
// // //   };

// // //   const FoodCard = ({ food }: { food: FoodItem }) => (
// // //     <TouchableOpacity style={styles.foodCard} onPress={() => handleSelect(food)}>
// // //       <View style={styles.foodHeader}>
// // //         <Text style={styles.foodName}>{food.name}</Text>
// // //         <Text style={styles.foodCalories}>{food.calories} kcal</Text>
// // //       </View>
// // //       <View style={styles.nutritionInfo}>
// // //         <View style={styles.nutritionItem}>
// // //           <Text style={styles.nutritionLabel}>Protein</Text>
// // //           <Text style={styles.nutritionValue}>{food.protein}g</Text>
// // //         </View>
// // //         <View style={styles.nutritionItem}>
// // //           <Text style={styles.nutritionLabel}>Carbs</Text>
// // //           <Text style={styles.nutritionValue}>{food.carbs}g</Text>
// // //         </View>
// // //         <View style={styles.nutritionItem}>
// // //           <Text style={styles.nutritionLabel}>Fat</Text>
// // //           <Text style={styles.nutritionValue}>{food.fat}g</Text>
// // //         </View>
// // //       </View>
// // //       {food.ingredients && food.ingredients.length > 0 && (
// // //         <View style={styles.ingredientsInfo}>
// // //           <Text style={styles.ingredientsTitle}>Main Ingredients:</Text>
// // //           {food.ingredients.map((ingredient, index) => (
// // //             <Text key={index} style={styles.ingredientText}>
// // //               • {ingredient.name}: {ingredient.weight}
// // //             </Text>
// // //           ))}
// // //         </View>
// // //       )}
// // //     </TouchableOpacity>
// // //   );

// // //   const renderContent = () => {
// // //     if (isAnalyzing) {
// // //       return (
// // //         <View style={styles.loadingContainer}>
// // //           <ActivityIndicator size="large" color="#4CAF50" />
// // //           <Text style={styles.loadingText}>Analyzing image...</Text>
// // //         </View>
// // //       );
// // //     }

// // //     if (recommendations.length > 0) {
// // //       return (
// // //         <ScrollView style={styles.recommendationsContainer}>
// // //           <Text style={styles.headerTitle}>Analyzed Meals</Text>
// // //           <View style={styles.recommendationsList}>
// // //             {recommendations.map((food) => (
// // //               <FoodCard key={food.id} food={food} />
// // //             ))}
// // //           </View>
// // //         </ScrollView>
// // //       );
// // //     }

// // //     return (
// // //       <View style={styles.emptyContainer}>
// // //         <Ionicons name="camera-outline" size={64} color="#CCC" />
// // //         <Text style={styles.emptyTitle}>Analyze Food Image</Text>
// // //         <Text style={styles.emptyDescription}>
// // //           Take a photo of your meal to analyze its nutritional content.
// // //         </Text>
// // //         <TouchableOpacity style={styles.analyzeButton} onPress={handleAnalyze}>
// // //           <Ionicons name="camera" size={20} color="white" />
// // //           <Text style={styles.analyzeButtonText}>Take Photo & Analyze</Text>
// // //         </TouchableOpacity>
// // //       </View>
// // //     );
// // //   };

// // //   return (
// // //     <Modal
// // //       visible={visible}
// // //       animationType="slide"
// // //       presentationStyle="pageSheet"
// // //       onRequestClose={onClose}
// // //     >
// // //       <SafeAreaView style={styles.container}>
// // //         <View style={styles.modalHeader}>
// // //           <TouchableOpacity onPress={onClose}>
// // //             <Ionicons name="close" size={24} color="#333" />
// // //           </TouchableOpacity>
// // //           <Text style={styles.modalTitle}>Image Analyzer</Text>
// // //           <View />
// // //         </View>
// // //         {renderContent()}
// // //       </SafeAreaView>
// // //     </Modal>
// // //   );
// // // };

// // // export default AnalyzeImage;

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     backgroundColor: "#e8f1eaff",
// // //   },
// // //   modalHeader: {
// // //     flexDirection: "row",
// // //     justifyContent: "space-between",
// // //     alignItems: "center",
// // //     paddingHorizontal: 20,
// // //     paddingVertical: 20,
// // //     borderBottomWidth: 1,
// // //     borderBottomColor: "#E0E0E0",
// // //   },
// // //   modalTitle: {
// // //     fontSize: 20,
// // //     fontWeight: "bold",
// // //     color: "#333",
// // //   },
// // //   loadingContainer: {
// // //     flex: 1,
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //   },
// // //   loadingText: {
// // //     fontSize: 16,
// // //     color: "#666",
// // //     marginTop: 16,
// // //   },
// // //   emptyContainer: {
// // //     flex: 1,
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     paddingHorizontal: 40,
// // //   },
// // //   emptyTitle: {
// // //     fontSize: 24,
// // //     fontWeight: "bold",
// // //     color: "#333",
// // //     marginTop: 16,
// // //     marginBottom: 8,
// // //   },
// // //   emptyDescription: {
// // //     fontSize: 16,
// // //     color: "#666",
// // //     textAlign: "center",
// // //     marginBottom: 32,
// // //   },
// // //   analyzeButton: {
// // //     backgroundColor: "#4CAF50",
// // //     paddingHorizontal: 24,
// // //     paddingVertical: 12,
// // //     borderRadius: 12,
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //     gap: 8,
// // //   },
// // //   analyzeButtonText: {
// // //     color: "white",
// // //     fontSize: 16,
// // //     fontWeight: "600",
// // //   },
// // //   recommendationsContainer: {
// // //     flex: 1,
// // //     paddingHorizontal: 20,
// // //   },
// // //   headerTitle: {
// // //     fontSize: 24,
// // //     fontWeight: "bold",
// // //     color: "#333",
// // //     marginBottom: 16,
// // //     marginTop: 20,
// // //   },
// // //   recommendationsList: {
// // //     gap: 12,
// // //   },
// // //   foodCard: {
// // //     backgroundColor: "white",
// // //     borderRadius: 16,
// // //     padding: 16,
// // //     marginBottom: 12,
// // //   },
// // //   foodHeader: {
// // //     flexDirection: "row",
// // //     justifyContent: "space-between",
// // //     alignItems: "center",
// // //     marginBottom: 12,
// // //   },
// // //   foodName: {
// // //     fontSize: 16,
// // //     fontWeight: "600",
// // //     color: "#333",
// // //     flex: 1,
// // //   },
// // //   foodCalories: {
// // //     fontSize: 14,
// // //     color: "#4CAF50",
// // //     fontWeight: "600",
// // //   },
// // //   nutritionInfo: {
// // //     flexDirection: "row",
// // //     gap: 16,
// // //     marginBottom: 12,
// // //   },
// // //   nutritionItem: {
// // //     flex: 1,
// // //   },
// // //   nutritionLabel: {
// // //     fontSize: 12,
// // //     color: "#666",
// // //     marginBottom: 2,
// // //   },
// // //   nutritionValue: {
// // //     fontSize: 14,
// // //     fontWeight: "600",
// // //     color: "#333",
// // //   },
// // //   ingredientsInfo: {
// // //     marginTop: 8,
// // //   },
// // //   ingredientsTitle: {
// // //     fontSize: 14,
// // //     fontWeight: "600",
// // //     color: "#333",
// // //     marginBottom: 4,
// // //   },
// // //   ingredientText: {
// // //     fontSize: 12,
// // //     color: "#666",
// // //   },
// // // });

// // import React, { useState, useCallback, useRef } from 'react';
// // import {
// //   ActivityIndicator,
// //   Modal,
// //   SafeAreaView,
// //   ScrollView,
// //   StyleSheet,
// //   Text,
// //   TouchableOpacity,
// //   View,
// //   Image,
// //   Dimensions,
// // } from 'react-native';
// // import { CameraView, useCameraPermissions } from 'expo-camera';
// // import * as ImageManipulator from 'expo-image-manipulator';
// // import { readAsStringAsync } from 'expo-file-system/legacy'; // ✅ PERFECT FIX!
// // import { Ionicons } from '@expo/vector-icons';
// // import GeminiService from '@/services/GeminiService';
// // import StorageService from '@/services/StorageService';
// // import { useMealPlan } from './MealPlanContext';
// // import { FoodItem, PersonalInfo } from './types';

// // const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// // interface AnalyzeImageProps {
// //   visible: boolean;
// //   onClose: () => void;
// //   onSelectFood: (food: FoodItem) => void;
// //   selectedMealType: string;
// // }

// // const AnalyzeImage: React.FC<AnalyzeImageProps> = ({
// //   visible,
// //   onClose,
// //   onSelectFood,
// //   selectedMealType,
// // }) => {
// //   const [step, setStep] = useState<'camera' | 'analyzing' | 'results'>('camera');
// //   const [permission, requestPermission] = useCameraPermissions();
// //   const [capturedImage, setCapturedImage] = useState<string | null>(null);
// //   const [recommendations, setRecommendations] = useState<FoodItem[]>([]);
// //   const [isAnalyzing, setIsAnalyzing] = useState(false);
// //   const [error, setError] = useState<string | null>(null);
// //   const [flashMode, setFlashMode] = useState<'off' | 'on'>('off');
// //   const [showGrid, setShowGrid] = useState(false);

// //   const cameraRef = useRef<CameraView>(null);
// //   const { meals } = useMealPlan();

// //   const takePicture = async () => {
// //     if (!cameraRef.current) return;

// //     try {
// //       setError(null);
// //       const photo = await cameraRef.current.takePictureAsync({
// //         quality: 0.8,
// //         base64: false,
// //         exif: false,
// //       });

// //       setCapturedImage(photo.uri);
// //       setStep('analyzing');
// //       await analyzeImage(photo.uri);
// //     } catch (err: any) {
// //       console.error('Camera capture error:', err);
// //       setError('Failed to capture photo. Please try again.');
// //     }
// //   };

// //   // ✅ LEGACY API - NO DEPRECATION WARNINGS + PERFECTLY WORKS!
// //   const analyzeImage = async (uri: string) => {
// //     try {
// //       setIsAnalyzing(true);
// //       setError(null);

// //       const optimized = await ImageManipulator.manipulateAsync(
// //         uri,
// //         [{ resize: { width: 1024, height: 1024 } }],
// //         { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
// //       );

// //       // ✅ CORRECT LEGACY API - NO ERRORS!
// //       const base64 = await readAsStringAsync(optimized.uri, {
// //         encoding: 'base64',
// //       });

// //       if (!base64) {
// //         throw new Error('Failed to process image.');
// //       }

// //       if (base64.length > 15_000_000) {
// //         throw new Error('Image too large. Please try again.');
// //       }

// //       const [info, apiKey] = await Promise.all([
// //         StorageService.getPersonalInfo(),
// //         StorageService.getGeminiApiKey(),
// //       ]);

// //       if (!info) throw new Error('Profile not found. Please complete setup.');
// //       if (!apiKey) throw new Error('API key not found. Please set in Settings.');

// //       GeminiService.setApiKey(apiKey);

// //       const analyzedMeals = await GeminiService.analyzeFoodImage(
// //         base64,
// //         info,
// //         selectedMealType,
// //         meals
// //       );

// //       if (analyzedMeals.length === 0) {
// //         throw new Error('Could not analyze image. Try clearer photo with good lighting.');
// //       }

// //       setRecommendations(analyzedMeals);
// //       setStep('results');
// //     } catch (err: any) {
// //       console.error('Analysis error:', err);
// //       setError(err.message || 'Failed to analyze image. Please try again.');
// //       setStep('camera');
// //     } finally {
// //       setIsAnalyzing(false);
// //     }
// //   };

// //   const toggleFlash = () => {
// //     setFlashMode(prev => prev === 'off' ? 'on' : 'off');
// //   };

// //   const toggleGrid = () => {
// //     setShowGrid(prev => !prev);
// //   };

// //   const handleSelect = (food: FoodItem) => {
// //     onSelectFood(food);
// //     onClose();
// //   };

// //   const FoodCard = ({ food }: { food: FoodItem }) => (
// //     <TouchableOpacity style={styles.foodCard} onPress={() => handleSelect(food)}>
// //       <View style={styles.foodHeader}>
// //         <Text style={styles.foodName} numberOfLines={1}>{food.name}</Text>
// //         <Text style={styles.foodCalories}>{food.calories} kcal</Text>
// //       </View>
// //       <View style={styles.nutritionRow}>
// //         <View style={styles.nutritionItem}>
// //           <Text style={styles.nutritionLabel}>P</Text>
// //           <Text style={styles.nutritionValue}>{food.protein}g</Text>
// //         </View>
// //         <View style={styles.nutritionItem}>
// //           <Text style={styles.nutritionLabel}>C</Text>
// //           <Text style={styles.nutritionValue}>{food.carbs}g</Text>
// //         </View>
// //         <View style={styles.nutritionItem}>
// //           <Text style={styles.nutritionLabel}>F</Text>
// //           <Text style={styles.nutritionValue}>{food.fat}g</Text>
// //         </View>
// //       </View>
// //       {food.ingredients?.length ? (
// //         <View style={styles.ingredientsPreview}>
// //           <Text style={styles.ingredientsTitle}>Ingredients:</Text>
// //           <Text style={styles.ingredientsText} numberOfLines={2}>
// //             {food.ingredients.map(i => i.name).join(', ')}
// //           </Text>
// //         </View>
// //       ) : null}
// //     </TouchableOpacity>
// //   );

// //   if (step === 'camera') {
// //     if (!permission) {
// //       return (
// //         <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
// //           <SafeAreaView style={styles.container}>
// //             <View style={styles.centerContent}>
// //               <ActivityIndicator size="large" color="#4CAF50" />
// //               <Text style={styles.loadingText}>Loading camera...</Text>
// //             </View>
// //           </SafeAreaView>
// //         </Modal>
// //       );
// //     }

// //     if (!permission.granted) {
// //       return (
// //         <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
// //           <SafeAreaView style={styles.container}>
// //             <View style={styles.centerContent}>
// //               <Ionicons name="camera-outline" size={80} color="#FF6B6B" />
// //               <Text style={styles.errorTitle}>Camera Permission Required</Text>
// //               <Text style={styles.errorText}>
// //                 Please enable camera permission to analyze food photos.
// //               </Text>
// //               <TouchableOpacity style={styles.retryButton} onPress={requestPermission}>
// //                 <Text style={styles.retryButtonText}>Grant Permission</Text>
// //               </TouchableOpacity>
// //               <TouchableOpacity style={styles.closeButton} onPress={onClose}>
// //                 <Text style={styles.closeButtonText}>Close</Text>
// //               </TouchableOpacity>
// //             </View>
// //           </SafeAreaView>
// //         </Modal>
// //       );
// //     }

// //     return (
// //       <Modal visible={visible} animationType="slide" presentationStyle="fullScreen">
// //         <SafeAreaView style={styles.cameraContainer}>
// //           <View style={styles.cameraHeader}>
// //             <TouchableOpacity onPress={onClose} style={styles.headerButton}>
// //               <Ionicons name="close" size={24} color="white" />
// //             </TouchableOpacity>
// //             <Text style={styles.cameraTitle}>Food Analyzer</Text>
// //             <View style={styles.headerButtons}>
// //               <TouchableOpacity style={styles.iconButton} onPress={toggleGrid}>
// //                 <Ionicons 
// //                   name={showGrid ? "grid" : "grid-outline"} 
// //                   size={20} 
// //                   color="white" 
// //                 />
// //               </TouchableOpacity>
// //               <TouchableOpacity style={styles.iconButton} onPress={toggleFlash}>
// //                 <Ionicons 
// //                   name={flashMode === 'on' ? "flash" : "flash-off"} 
// //                   size={20} 
// //                   color="white" 
// //                 />
// //               </TouchableOpacity>
// //             </View>
// //           </View>

// //           <View style={styles.cameraView}>
// //             <CameraView
// //               ref={cameraRef}
// //               style={styles.camera}
// //               facing="back"
// //               flash={flashMode}
// //             >
// //               {showGrid && (
// //                 <View style={styles.focusGrid}>
// //                   <View style={styles.gridLineVertical} />
// //                   <View style={styles.gridLineVertical} />
// //                   <View style={styles.gridLineHorizontal} />
// //                   <View style={styles.gridLineHorizontal} />
// //                 </View>
// //               )}
// //             </CameraView>

// //             <View style={styles.cameraControls}>
// //               <Text style={styles.cameraHint}>📸 Tap to capture your meal</Text>
              
// //               <View style={styles.captureArea}>
// //                 <TouchableOpacity 
// //                   style={styles.captureButton} 
// //                   onPress={takePicture}
// //                   activeOpacity={0.7}
// //                 >
// //                   <View style={styles.captureInner} />
// //                 </TouchableOpacity>
// //               </View>

// //               <View style={styles.cameraTips}>
// //                 <Text style={styles.tipText}>✨ Good lighting • Close-up • Fill frame</Text>
// //               </View>
// //             </View>
// //           </View>
// //         </SafeAreaView>
// //       </Modal>
// //     );
// //   }

// //   if (step === 'analyzing') {
// //     return (
// //       <Modal visible={true} animationType="fade">
// //         <SafeAreaView style={styles.container}>
// //           <View style={styles.header}>
// //             <TouchableOpacity 
// //               onPress={() => { 
// //                 setStep('camera'); 
// //                 setCapturedImage(null); 
// //               }} 
// //               style={styles.headerButton}
// //             >
// //               <Ionicons name="chevron-back" size={24} color="#333" />
// //             </TouchableOpacity>
// //             <Text style={styles.title}>AI Analyzing</Text>
// //             <View style={styles.placeholder} />
// //           </View>

// //           <View style={styles.analyzingScreen}>
// //             <Ionicons name="nutrition-outline" size={80} color="#4CAF50" />
// //             <Text style={styles.analyzingTitle}>Analyzing Your Meal</Text>
// //             <Text style={styles.analyzingSubtitle}>
// //               AI is identifying ingredients and calculating nutrition...
// //             </Text>
// //             <ActivityIndicator size="large" color="#4CAF50" style={styles.analyzingSpinner} />
// //             {capturedImage ? (
// //               <Image source={{ uri: capturedImage }} style={styles.analyzingPreview} />
// //             ) : null}
// //           </View>
// //         </SafeAreaView>
// //       </Modal>
// //     );
// //   }

// //   return (
// //     <Modal visible={true} animationType="slide" presentationStyle="pageSheet">
// //       <SafeAreaView style={styles.container}>
// //         <View style={styles.header}>
// //           <TouchableOpacity onPress={onClose} style={styles.headerButton}>
// //             <Ionicons name="close" size={24} color="#333" />
// //           </TouchableOpacity>
// //           <Text style={styles.title}>AI Food Analysis</Text>
// //           <TouchableOpacity 
// //             onPress={() => { 
// //               setStep('camera'); 
// //               setRecommendations([]); 
// //             }}
// //           >
// //             <Ionicons name="camera" size={24} color="#4CAF50" />
// //           </TouchableOpacity>
// //         </View>

// //         <ScrollView style={styles.resultsScroll} showsVerticalScrollIndicator={false}>
// //           <Text style={styles.resultsTitle}>Smart Recommendations</Text>
// //           <Text style={styles.resultsSubtitle}>
// //             Based on your photo analysis for {selectedMealType}
// //           </Text>
          
// //           <View style={styles.foodGrid}>
// //             {recommendations.map((food) => (
// //               <FoodCard key={food.id} food={food} />
// //             ))}
// //           </View>

// //           {error ? (
// //             <View style={styles.errorContainer}>
// //               <Ionicons name="alert-circle-outline" size={20} color="#FF6B6B" />
// //               <Text style={styles.errorText}>{error}</Text>
// //               <TouchableOpacity 
// //                 style={styles.retryButton} 
// //                 onPress={() => { 
// //                   setStep('camera'); 
// //                   setError(null); 
// //                 }}
// //               >
// //                 <Text style={styles.retryButtonText}>📸 Take New Photo</Text>
// //               </TouchableOpacity>
// //             </View>
// //           ) : null}
// //         </ScrollView>
// //       </SafeAreaView>
// //     </Modal>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: { flex: 1, backgroundColor: '#F8FAFC' },
// //   cameraContainer: { flex: 1, backgroundColor: '#000' },
  
// //   header: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     paddingHorizontal: 20,
// //     paddingVertical: 16,
// //     backgroundColor: 'white',
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#E2E8F0',
// //   },
// //   headerButton: { padding: 8 },
// //   title: { fontSize: 18, fontWeight: 'bold', color: '#1E293B' },
// //   placeholder: { width: 24 },

// //   cameraView: { flex: 1 },
// //   camera: { flex: 1 },
// //   cameraHeader: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     paddingHorizontal: 16,
// //     paddingVertical: 12,
// //     backgroundColor: 'rgba(0,0,0,0.4)',
// //   },
// //   cameraTitle: { fontSize: 18, fontWeight: 'bold', color: 'white' },
// //   headerButtons: { flexDirection: 'row', gap: 12 },
// //   iconButton: { 
// //     padding: 8, 
// //     borderRadius: 12, 
// //     backgroundColor: 'rgba(255,255,255,0.2)' 
// //   },
// //   focusGrid: {
// //     ...StyleSheet.absoluteFillObject,
// //     justifyContent: 'space-between',
// //     paddingHorizontal: 40,
// //     paddingVertical: 40,
// //   },
// //   gridLineVertical: {
// //     width: 1,
// //     height: '100%',
// //     backgroundColor: 'rgba(255,255,255,0.4)',
// //   },
// //   gridLineHorizontal: {
// //     height: 1,
// //     width: '100%',
// //     backgroundColor: 'rgba(255,255,255,0.4)',
// //   },
// //   cameraControls: {
// //     padding: 24,
// //     alignItems: 'center',
// //     gap: 24,
// //     backgroundColor: 'rgba(0,0,0,0.4)',
// //   },
// //   cameraHint: {
// //     fontSize: 16,
// //     color: 'white',
// //     textAlign: 'center',
// //     fontWeight: '600',
// //   },
// //   captureArea: { alignItems: 'center' },
// //   captureButton: {
// //     width: 84,
// //     height: 84,
// //     borderRadius: 42,
// //     backgroundColor: '#4CAF50',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     shadowColor: '#4CAF50',
// //     shadowOffset: { width: 0, height: 8 },
// //     shadowOpacity: 0.4,
// //     shadowRadius: 16,
// //     elevation: 12,
// //   },
// //   captureInner: {
// //     width: 64,
// //     height: 64,
// //     borderRadius: 32,
// //     backgroundColor: 'white',
// //   },
// //   cameraTips: { alignItems: 'center' },
// //   tipText: {
// //     fontSize: 14,
// //     color: 'rgba(255,255,255,0.8)',
// //     textAlign: 'center',
// //     lineHeight: 20,
// //   },

// //   centerContent: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     padding: 40,
// //   },
// //   loadingText: { fontSize: 16, color: '#64748B', marginTop: 16 },
// //   errorTitle: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //     color: '#1E293B',
// //     marginTop: 24,
// //     marginBottom: 12,
// //   },
// //   errorText: {
// //     fontSize: 16,
// //     color: '#64748B',
// //     textAlign: 'center',
// //     lineHeight: 22,
// //     marginBottom: 32,
// //   },
// //   analyzingScreen: { 
// //     flex: 1, 
// //     justifyContent: 'center', 
// //     alignItems: 'center', 
// //     padding: 40 
// //   },
// //   analyzingTitle: { 
// //     fontSize: 24, 
// //     fontWeight: 'bold', 
// //     color: '#1E293B', 
// //     marginTop: 24,
// //     marginBottom: 12
// //   },
// //   analyzingSubtitle: { 
// //     fontSize: 16, 
// //     color: '#64748B', 
// //     textAlign: 'center',
// //     marginBottom: 40,
// //     lineHeight: 22
// //   },
// //   analyzingSpinner: { marginVertical: 24 },
// //   analyzingPreview: { 
// //     width: 200, 
// //     height: 200, 
// //     borderRadius: 16,
// //     marginTop: 24
// //   },
// //   resultsScroll: { flex: 1, padding: 20 },
// //   resultsTitle: { 
// //     fontSize: 24, 
// //     fontWeight: 'bold', 
// //     color: '#1E293B', 
// //     marginBottom: 8 
// //   },
// //   resultsSubtitle: { 
// //     fontSize: 16, 
// //     color: '#64748B', 
// //     marginBottom: 24 
// //   },
// //   foodGrid: { gap: 16 },
// //   foodCard: {
// //     backgroundColor: 'white',
// //     borderRadius: 16,
// //     padding: 16,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.08,
// //     shadowRadius: 8,
// //     elevation: 2,
// //   },
// //   foodHeader: { 
// //     flexDirection: 'row', 
// //     justifyContent: 'space-between', 
// //     alignItems: 'center', 
// //     marginBottom: 12 
// //   },
// //   foodName: { 
// //     fontSize: 16, 
// //     fontWeight: '600', 
// //     color: '#1E293B', 
// //     flex: 1,
// //     marginRight: 12
// //   },
// //   foodCalories: { 
// //     fontSize: 16, 
// //     fontWeight: '600', 
// //     color: '#4CAF50' 
// //   },
// //   nutritionRow: { 
// //     flexDirection: 'row', 
// //     gap: 20, 
// //     marginBottom: 12 
// //   },
// //   nutritionItem: { 
// //     flex: 1, 
// //     alignItems: 'center',
// //     paddingVertical: 8,
// //     paddingHorizontal: 12,
// //     backgroundColor: '#F8FAFC',
// //     borderRadius: 8
// //   },
// //   nutritionLabel: { 
// //     fontSize: 12, 
// //     color: '#64748B', 
// //     fontWeight: '500' 
// //   },
// //   nutritionValue: { 
// //     fontSize: 14, 
// //     fontWeight: '600', 
// //     color: '#1E293B' 
// //   },
// //   ingredientsPreview: { 
// //     paddingTop: 12, 
// //     borderTopWidth: 1, 
// //     borderTopColor: '#E2E8F0' 
// //   },
// //   ingredientsTitle: { 
// //     fontSize: 12, 
// //     fontWeight: '600', 
// //     color: '#64748B', 
// //     marginBottom: 4 
// //   },
// //   ingredientsText: { 
// //     fontSize: 12, 
// //     color: '#475569', 
// //     lineHeight: 16 
// //   },
// //   retryButton: {
// //     backgroundColor: '#4CAF50',
// //     paddingHorizontal: 16,
// //     paddingVertical: 12,
// //     borderRadius: 8,
// //     alignItems: 'center',
// //   },
// //   retryButtonText: {
// //     color: 'white',
// //     fontWeight: '600',
// //     fontSize: 14,
// //   },
// //   closeButton: {
// //     paddingHorizontal: 16,
// //     paddingVertical: 12,
// //     borderRadius: 8,
// //     backgroundColor: '#E5E7EB',
// //     marginTop: 12,
// //     alignItems: 'center',
// //   },
// //   closeButtonText: {
// //     color: '#374151',
// //     fontWeight: '600',
// //     fontSize: 14,
// //   },
// //   errorContainer: {
// //     backgroundColor: '#FEF2F2',
// //     borderWidth: 1,
// //     borderColor: '#FECACA',
// //     borderRadius: 12,
// //     padding: 16,
// //     marginTop: 20,
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     gap: 12,
// //   }
// // });

// // export default AnalyzeImage;


// // Modified: AnalyzeImage.tsx
// // Changes:
// // - Adjusted UI to handle single detailed meal instead of multiple
// // - Updated FoodCard to display additional details like preparation, allergens, alignment, insights (assuming FoodItem type is extended; if not, add them)
// // - Changed results title/subtitle for single analysis
// // - Removed foodGrid, now shows single detailed card
// // - If you haven't extended FoodItem type, add optional fields: preparation?: string; allergens?: string[]; alignment?: string; insights?: string;
// // - Simplified selection: auto-select or show details directly
// // - Added sections for detailed info in FoodCard

// import React, { useState, useCallback, useRef } from 'react';
// import {
//   ActivityIndicator,
//   Modal,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   Image,
//   Dimensions,
// } from 'react-native';
// import { CameraView, useCameraPermissions } from 'expo-camera';
// import * as ImageManipulator from 'expo-image-manipulator';
// import { readAsStringAsync } from 'expo-file-system/legacy'; // ✅ PERFECT FIX!
// import { Ionicons } from '@expo/vector-icons';
// import GeminiService from '@/services/GeminiService';
// import StorageService from '@/services/StorageService';
// import { useMealPlan } from './MealPlanContext';
// import { FoodItem, PersonalInfo } from './types';

// const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// interface AnalyzeImageProps {
//   visible: boolean;
//   onClose: () => void;
//   onSelectFood: (food: FoodItem) => void;
//   selectedMealType: string;
// }

// const AnalyzeImage: React.FC<AnalyzeImageProps> = ({
//   visible,
//   onClose,
//   onSelectFood,
//   selectedMealType,
// }) => {
//   const [step, setStep] = useState<'camera' | 'analyzing' | 'results'>('camera');
//   const [permission, requestPermission] = useCameraPermissions();
//   const [capturedImage, setCapturedImage] = useState<string | null>(null);
//   const [recommendations, setRecommendations] = useState<FoodItem[]>([]);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [flashMode, setFlashMode] = useState<'off' | 'on'>('off');
//   const [showGrid, setShowGrid] = useState(false);

//   const cameraRef = useRef<CameraView>(null);
//   const { meals } = useMealPlan();

//   const takePicture = async () => {
//     if (!cameraRef.current) return;

//     try {
//       setError(null);
//       const photo = await cameraRef.current.takePictureAsync({
//         quality: 0.8,
//         base64: false,
//         exif: false,
//       });

//       setCapturedImage(photo.uri);
//       setStep('analyzing');
//       await analyzeImage(photo.uri);
//     } catch (err: any) {
//       console.error('Camera capture error:', err);
//       setError('Failed to capture photo. Please try again.');
//     }
//   };

//   // ✅ LEGACY API - NO DEPRECATION WARNINGS + PERFECTLY WORKS!
//   const analyzeImage = async (uri: string) => {
//     try {
//       setIsAnalyzing(true);
//       setError(null);

//       const optimized = await ImageManipulator.manipulateAsync(
//         uri,
//         [{ resize: { width: 1024, height: 1024 } }],
//         { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
//       );

//       // ✅ CORRECT LEGACY API - NO ERRORS!
//       const base64 = await readAsStringAsync(optimized.uri, {
//         encoding: 'base64',
//       });

//       if (!base64) {
//         throw new Error('Failed to process image.');
//       }

//       if (base64.length > 15_000_000) {
//         throw new Error('Image too large. Please try again.');
//       }

//       const [info, apiKey] = await Promise.all([
//         StorageService.getPersonalInfo(),
//         StorageService.getGeminiApiKey(),
//       ]);

//       if (!info) throw new Error('Profile not found. Please complete setup.');
//       if (!apiKey) throw new Error('API key not found. Please set in Settings.');

//       GeminiService.setApiKey(apiKey);

//       const analyzedMeals = await GeminiService.analyzeFoodImage(
//         base64,
//         info,
//         selectedMealType,
//         meals
//       );

//       if (analyzedMeals.length === 0) {
//         throw new Error('Could not analyze image. Try clearer photo with good lighting.');
//       }

//       setRecommendations(analyzedMeals);
//       setStep('results');
//     } catch (err: any) {
//       console.error('Analysis error:', err);
//       setError(err.message || 'Failed to analyze image. Please try again.');
//       setStep('camera');
//     } finally {
//       setIsAnalyzing(false);
//     }
//   };

//   const toggleFlash = () => {
//     setFlashMode(prev => prev === 'off' ? 'on' : 'off');
//   };

//   const toggleGrid = () => {
//     setShowGrid(prev => !prev);
//   };

//   const handleSelect = (food: FoodItem) => {
//     onSelectFood(food);
//     onClose();
//   };

//   const FoodCard = ({ food }: { food: FoodItem & { preparation?: string; allergens?: string[]; alignment?: string; insights?: string } }) => (
//     <TouchableOpacity style={styles.foodCard} onPress={() => handleSelect(food)}>
//       <View style={styles.foodHeader}>
//         <Text style={styles.foodName} numberOfLines={1}>{food.name}</Text>
//         <Text style={styles.foodCalories}>{food.calories} kcal</Text>
//       </View>
//       <View style={styles.nutritionRow}>
//         <View style={styles.nutritionItem}>
//           <Text style={styles.nutritionLabel}>P</Text>
//           <Text style={styles.nutritionValue}>{food.protein}g</Text>
//         </View>
//         <View style={styles.nutritionItem}>
//           <Text style={styles.nutritionLabel}>C</Text>
//           <Text style={styles.nutritionValue}>{food.carbs}g</Text>
//         </View>
//         <View style={styles.nutritionItem}>
//           <Text style={styles.nutritionLabel}>F</Text>
//           <Text style={styles.nutritionValue}>{food.fat}g</Text>
//         </View>
//       </View>
//       {food.ingredients?.length ? (
//         <View style={styles.ingredientsPreview}>
//           <Text style={styles.ingredientsTitle}>Ingredients:</Text>
//           <Text style={styles.ingredientsText} numberOfLines={3}>
//             {food.ingredients.map(i => `${i.name} (${i.weight})`).join(', ')}
//           </Text>
//         </View>
//       ) : null}
//       {food.preparation ? (
//         <View style={styles.detailSection}>
//           <Text style={styles.detailTitle}>Preparation:</Text>
//           <Text style={styles.detailText}>{food.preparation}</Text>
//         </View>
//       ) : null}
//       {food.allergens?.length ? (
//         <View style={styles.detailSection}>
//           <Text style={styles.detailTitle}>Potential Allergens:</Text>
//           <Text style={styles.detailText}>{food.allergens.join(', ')}</Text>
//         </View>
//       ) : null}
//       {food.alignment ? (
//         <View style={styles.detailSection}>
//           <Text style={styles.detailTitle}>Alignment with Goals:</Text>
//           <Text style={styles.detailText}>{food.alignment}</Text>
//         </View>
//       ) : null}
//       {food.insights ? (
//         <View style={styles.detailSection}>
//           <Text style={styles.detailTitle}>Health Insights:</Text>
//           <Text style={styles.detailText}>{food.insights}</Text>
//         </View>
//       ) : null}
//     </TouchableOpacity>
//   );

//   if (step === 'camera') {
//     if (!permission) {
//       return (
//         <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
//           <SafeAreaView style={styles.container}>
//             <View style={styles.centerContent}>
//               <ActivityIndicator size="large" color="#4CAF50" />
//               <Text style={styles.loadingText}>Loading camera...</Text>
//             </View>
//           </SafeAreaView>
//         </Modal>
//       );
//     }

//     if (!permission.granted) {
//       return (
//         <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
//           <SafeAreaView style={styles.container}>
//             <View style={styles.centerContent}>
//               <Ionicons name="camera-outline" size={80} color="#FF6B6B" />
//               <Text style={styles.errorTitle}>Camera Permission Required</Text>
//               <Text style={styles.errorText}>
//                 Please enable camera permission to analyze food photos.
//               </Text>
//               <TouchableOpacity style={styles.retryButton} onPress={requestPermission}>
//                 <Text style={styles.retryButtonText}>Grant Permission</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.closeButton} onPress={onClose}>
//                 <Text style={styles.closeButtonText}>Close</Text>
//               </TouchableOpacity>
//             </View>
//           </SafeAreaView>
//         </Modal>
//       );
//     }

//     return (
//       <Modal visible={visible} animationType="slide" presentationStyle="fullScreen">
//         <SafeAreaView style={styles.cameraContainer}>
//           <View style={styles.cameraHeader}>
//             <TouchableOpacity onPress={onClose} style={styles.headerButton}>
//               <Ionicons name="close" size={24} color="white" />
//             </TouchableOpacity>
//             <Text style={styles.cameraTitle}>Food Analyzer</Text>
//             <View style={styles.headerButtons}>
//               <TouchableOpacity style={styles.iconButton} onPress={toggleGrid}>
//                 <Ionicons 
//                   name={showGrid ? "grid" : "grid-outline"} 
//                   size={20} 
//                   color="white" 
//                 />
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.iconButton} onPress={toggleFlash}>
//                 <Ionicons 
//                   name={flashMode === 'on' ? "flash" : "flash-off"} 
//                   size={20} 
//                   color="white" 
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>

//           <View style={styles.cameraView}>
//             <CameraView
//               ref={cameraRef}
//               style={styles.camera}
//               facing="back"
//               flash={flashMode}
//             >
//               {showGrid && (
//                 <View style={styles.focusGrid}>
//                   <View style={styles.gridLineVertical} />
//                   <View style={styles.gridLineVertical} />
//                   <View style={styles.gridLineHorizontal} />
//                   <View style={styles.gridLineHorizontal} />
//                 </View>
//               )}
//             </CameraView>

//             <View style={styles.cameraControls}>
//               <Text style={styles.cameraHint}>📸 Tap to capture your meal</Text>
              
//               <View style={styles.captureArea}>
//                 <TouchableOpacity 
//                   style={styles.captureButton} 
//                   onPress={takePicture}
//                   activeOpacity={0.7}
//                 >
//                   <View style={styles.captureInner} />
//                 </TouchableOpacity>
//               </View>

//               <View style={styles.cameraTips}>
//                 <Text style={styles.tipText}>✨ Good lighting • Close-up • Fill frame</Text>
//               </View>
//             </View>
//           </View>
//         </SafeAreaView>
//       </Modal>
//     );
//   }

//   if (step === 'analyzing') {
//     return (
//       <Modal visible={true} animationType="fade">
//         <SafeAreaView style={styles.container}>
//           <View style={styles.header}>
//             <TouchableOpacity 
//               onPress={() => { 
//                 setStep('camera'); 
//                 setCapturedImage(null); 
//               }} 
//               style={styles.headerButton}
//             >
//               <Ionicons name="chevron-back" size={24} color="#333" />
//             </TouchableOpacity>
//             <Text style={styles.title}>AI Analyzing</Text>
//             <View style={styles.placeholder} />
//           </View>

//           <View style={styles.analyzingScreen}>
//             <Ionicons name="nutrition-outline" size={80} color="#4CAF50" />
//             <Text style={styles.analyzingTitle}>Analyzing Your Meal</Text>
//             <Text style={styles.analyzingSubtitle}>
//               AI is identifying ingredients and calculating nutrition...
//             </Text>
//             <ActivityIndicator size="large" color="#4CAF50" style={styles.analyzingSpinner} />
//             {capturedImage ? (
//               <Image source={{ uri: capturedImage }} style={styles.analyzingPreview} />
//             ) : null}
//           </View>
//         </SafeAreaView>
//       </Modal>
//     );
//   }

//   return (
//     <Modal visible={true} animationType="slide" presentationStyle="pageSheet">
//       <SafeAreaView style={styles.container}>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={onClose} style={styles.headerButton}>
//             <Ionicons name="close" size={24} color="#333" />
//           </TouchableOpacity>
//           <Text style={styles.title}>AI Food Analysis</Text>
//           <TouchableOpacity 
//             onPress={() => { 
//               setStep('camera'); 
//               setRecommendations([]); 
//             }}
//           >
//             <Ionicons name="camera" size={24} color="#4CAF50" />
//           </TouchableOpacity>
//         </View>

//         <ScrollView style={styles.resultsScroll} showsVerticalScrollIndicator={false}>
//           <Text style={styles.resultsTitle}>Detailed Meal Analysis</Text>
//           <Text style={styles.resultsSubtitle}>
//             Based on your photo for {selectedMealType}
//           </Text>
          
//           {recommendations.map((food) => (
//             <FoodCard key={food.id} food={food as any} />
//           ))}

//           {error ? (
//             <View style={styles.errorContainer}>
//               <Ionicons name="alert-circle-outline" size={20} color="#FF6B6B" />
//               <Text style={styles.errorText}>{error}</Text>
//               <TouchableOpacity 
//                 style={styles.retryButton} 
//                 onPress={() => { 
//                   setStep('camera'); 
//                   setError(null); 
//                 }}
//               >
//                 <Text style={styles.retryButtonText}>📸 Take New Photo</Text>
//               </TouchableOpacity>
//             </View>
//           ) : null}
//         </ScrollView>
//       </SafeAreaView>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#F8FAFC' },
//   cameraContainer: { flex: 1, backgroundColor: '#000' },
  
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//     backgroundColor: 'white',
//     borderBottomWidth: 1,
//     borderBottomColor: '#E2E8F0',
//   },
//   headerButton: { padding: 8 },
//   title: { fontSize: 18, fontWeight: 'bold', color: '#1E293B' },
//   placeholder: { width: 24 },

//   cameraView: { flex: 1 },
//   camera: { flex: 1 },
//   cameraHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//   },
//   cameraTitle: { fontSize: 18, fontWeight: 'bold', color: 'white' },
//   headerButtons: { flexDirection: 'row', gap: 12 },
//   iconButton: { 
//     padding: 8, 
//     borderRadius: 12, 
//     backgroundColor: 'rgba(255,255,255,0.2)' 
//   },
//   focusGrid: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: 'space-between',
//     paddingHorizontal: 40,
//     paddingVertical: 40,
//   },
//   gridLineVertical: {
//     width: 1,
//     height: '100%',
//     backgroundColor: 'rgba(255,255,255,0.4)',
//   },
//   gridLineHorizontal: {
//     height: 1,
//     width: '100%',
//     backgroundColor: 'rgba(255,255,255,0.4)',
//   },
//   cameraControls: {
//     padding: 24,
//     alignItems: 'center',
//     gap: 24,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//   },
//   cameraHint: {
//     fontSize: 16,
//     color: 'white',
//     textAlign: 'center',
//     fontWeight: '600',
//   },
//   captureArea: { alignItems: 'center' },
//   captureButton: {
//     width: 84,
//     height: 84,
//     borderRadius: 42,
//     backgroundColor: '#4CAF50',
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#4CAF50',
//     shadowOffset: { width: 0, height: 8 },
//     shadowOpacity: 0.4,
//     shadowRadius: 16,
//     elevation: 12,
//   },
//   captureInner: {
//     width: 64,
//     height: 64,
//     borderRadius: 32,
//     backgroundColor: 'white',
//   },
//   cameraTips: { alignItems: 'center' },
//   tipText: {
//     fontSize: 14,
//     color: 'rgba(255,255,255,0.8)',
//     textAlign: 'center',
//     lineHeight: 20,
//   },

//   centerContent: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 40,
//   },
//   loadingText: { fontSize: 16, color: '#64748B', marginTop: 16 },
//   errorTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#1E293B',
//     marginTop: 24,
//     marginBottom: 12,
//   },
//   errorText: {
//     fontSize: 16,
//     color: '#64748B',
//     textAlign: 'center',
//     lineHeight: 22,
//     marginBottom: 32,
//   },
//   analyzingScreen: { 
//     flex: 1, 
//     justifyContent: 'center', 
//     alignItems: 'center', 
//     padding: 40 
//   },
//   analyzingTitle: { 
//     fontSize: 24, 
//     fontWeight: 'bold', 
//     color: '#1E293B', 
//     marginTop: 24,
//     marginBottom: 12
//   },
//   analyzingSubtitle: { 
//     fontSize: 16, 
//     color: '#64748B', 
//     textAlign: 'center',
//     marginBottom: 40,
//     lineHeight: 22
//   },
//   analyzingSpinner: { marginVertical: 24 },
//   analyzingPreview: { 
//     width: 200, 
//     height: 200, 
//     borderRadius: 16,
//     marginTop: 24
//   },
//   resultsScroll: { flex: 1, padding: 20 },
//   resultsTitle: { 
//     fontSize: 24, 
//     fontWeight: 'bold', 
//     color: '#1E293B', 
//     marginBottom: 8 
//   },
//   resultsSubtitle: { 
//     fontSize: 16, 
//     color: '#64748B', 
//     marginBottom: 24 
//   },
//   foodCard: {
//     backgroundColor: 'white',
//     borderRadius: 16,
//     padding: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.08,
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   foodHeader: { 
//     flexDirection: 'row', 
//     justifyContent: 'space-between', 
//     alignItems: 'center', 
//     marginBottom: 12 
//   },
//   foodName: { 
//     fontSize: 18, 
//     fontWeight: '700', 
//     color: '#1E293B', 
//     flex: 1,
//     marginRight: 12
//   },
//   foodCalories: { 
//     fontSize: 16, 
//     fontWeight: '600', 
//     color: '#4CAF50' 
//   },
//   nutritionRow: { 
//     flexDirection: 'row', 
//     gap: 20, 
//     marginBottom: 16 
//   },
//   nutritionItem: { 
//     flex: 1, 
//     alignItems: 'center',
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     backgroundColor: '#F8FAFC',
//     borderRadius: 8
//   },
//   nutritionLabel: { 
//     fontSize: 12, 
//     color: '#64748B', 
//     fontWeight: '500' 
//   },
//   nutritionValue: { 
//     fontSize: 14, 
//     fontWeight: '600', 
//     color: '#1E293B' 
//   },
//   ingredientsPreview: { 
//     paddingTop: 12, 
//     borderTopWidth: 1, 
//     borderTopColor: '#E2E8F0',
//     marginBottom: 16
//   },
//   ingredientsTitle: { 
//     fontSize: 14, 
//     fontWeight: '600', 
//     color: '#64748B', 
//     marginBottom: 8 
//   },
//   ingredientsText: { 
//     fontSize: 14, 
//     color: '#475569', 
//     lineHeight: 20 
//   },
//   detailSection: {
//     marginBottom: 16,
//   },
//   detailTitle: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#64748B',
//     marginBottom: 8,
//   },
//   detailText: {
//     fontSize: 14,
//     color: '#475569',
//     lineHeight: 20,
//   },
//   retryButton: {
//     backgroundColor: '#4CAF50',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   retryButtonText: {
//     color: 'white',
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   closeButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderRadius: 8,
//     backgroundColor: '#E5E7EB',
//     marginTop: 12,
//     alignItems: 'center',
//   },
//   closeButtonText: {
//     color: '#374151',
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   errorContainer: {
//     backgroundColor: '#FEF2F2',
//     borderWidth: 1,
//     borderColor: '#FECACA',
//     borderRadius: 12,
//     padding: 16,
//     marginTop: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//   }
// });

// export default AnalyzeImage;

import React, { useState, useCallback, useRef } from 'react';
import {
  ActivityIndicator,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  Alert,
  TextInput,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import { readAsStringAsync } from 'expo-file-system/legacy';
import { Ionicons } from '@expo/vector-icons';
import GeminiService from '@/services/GeminiService';
import StorageService from '@/services/StorageService';
import { useMealPlan } from './MealPlanContext';
import { FoodItem, PersonalInfo } from './types';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface AnalyzeImageProps {
  visible: boolean;
  onClose: () => void;
  onSelectFood: (food: FoodItem) => void;
  selectedMealType: string;
}

const AnalyzeImage: React.FC<AnalyzeImageProps> = ({
  visible,
  onClose,
  onSelectFood,
  selectedMealType,
}) => {
  const [step, setStep] = useState<'camera' | 'analyzing' | 'results' | 'edit'>('camera');
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<FoodItem[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [flashMode, setFlashMode] = useState<'off' | 'on'>('off');
  const [showGrid, setShowGrid] = useState(false);

  const cameraRef = useRef<CameraView>(null);
  const { meals, updateMeal } = useMealPlan();

  // ✅ NEW: Available meal options (filter out done meals)
  const availableMeals = meals.filter(meal => !meal.hasFood || !meal.consumed);

  // ✅ NEW: Editing state
  const [editingFood, setEditingFood] = useState<Partial<FoodItem> | null>(null);
  const [editingField, setEditingField] = useState<'calories' | 'protein' | 'carbs' | 'fat' | null>(null);
  const [tempValue, setTempValue] = useState('');

  const takePicture = async () => {
    if (!cameraRef.current) return;

    try {
      setError(null);
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
        exif: false,
      });

      setCapturedImage(photo.uri);
      setStep('analyzing');
      await analyzeImage(photo.uri);
    } catch (err: any) {
      console.error('Camera capture error:', err);
      setError('Failed to capture photo. Please try again.');
    }
  };

  const analyzeImage = async (uri: string) => {
    try {
      setIsAnalyzing(true);
      setError(null);

      const optimized = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 1024, height: 1024 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );

      const base64 = await readAsStringAsync(optimized.uri, {
        encoding: 'base64',
      });

      if (!base64) {
        throw new Error('Failed to process image.');
      }

      if (base64.length > 15_000_000) {
        throw new Error('Image too large. Please try again.');
      }

      const [info, apiKey] = await Promise.all([
        StorageService.getPersonalInfo(),
        StorageService.getGeminiApiKey(),
      ]);

      if (!info) throw new Error('Profile not found. Please complete setup.');
      if (!apiKey) throw new Error('API key not found. Please set in Settings.');

      GeminiService.setApiKey(apiKey);

      const analyzedMeals = await GeminiService.analyzeFoodImage(
        base64,
        info,
        selectedMealType,
        meals
      );

      if (analyzedMeals.length === 0) {
        throw new Error('Could not analyze image. Try clearer photo with good lighting.');
      }

      setRecommendations(analyzedMeals);
      setStep('results');
    } catch (err: any) {
      console.error('Analysis error:', err);
      setError(err.message || 'Failed to analyze image. Please try again.');
      setStep('camera');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // ✅ NEW: Delete unwanted field
  const deleteField = (field: keyof FoodItem) => {
    if (editingFood && field in editingFood) {
      setEditingFood(prev => {
        const newFood = { ...prev };
        delete newFood[field];
        return newFood;
      });
    }
  };

  // ✅ NEW: Save edited food
  const saveEditedFood = () => {
    if (!editingFood || !editingFood.name || !editingFood.calories) {
      Alert.alert('Invalid Food', 'Name and calories are required.');
      return;
    }

    const finalFood: FoodItem = {
      id: `edited-${Date.now()}`,
      name: editingFood.name,
      calories: editingFood.calories,
      protein: editingFood.protein || 0,
      carbs: editingFood.carbs || 0,
      fat: editingFood.fat || 0,
      category: selectedMealType,
      ...editingFood, // Merge any other fields
    };

    onSelectFood(finalFood);
    onClose();
  };

  // ✅ NEW: Add to specific meal
  const addToMeal = (mealId: string) => {
    if (!editingFood || !editingFood.name || !editingFood.calories) {
      Alert.alert('Invalid Food', 'Please edit and complete the food details first.');
      return;
    }

    const finalFood: FoodItem = {
      id: `edited-${Date.now()}`,
      name: editingFood.name,
      calories: editingFood.calories,
      protein: editingFood.protein || 0,
      carbs: editingFood.carbs || 0,
      fat: editingFood.fat || 0,
      category: selectedMealType,
      ...editingFood,
    };

    updateMeal(mealId, finalFood);
    onClose();
  };

  const toggleFlash = () => {
    setFlashMode(prev => prev === 'off' ? 'on' : 'off');
  };

  const toggleGrid = () => {
    setShowGrid(prev => !prev);
  };

  const startEditing = (food: FoodItem) => {
    setEditingFood({
      id: food.id,
      name: food.name,
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
      category: food.category,
    });
    setStep('edit');
  };

  const cancelEditing = () => {
    setEditingFood(null);
    setEditingField(null);
    setTempValue('');
    setStep('results');
  };

  const startFieldEdit = (field: 'calories' | 'protein' | 'carbs' | 'fat', value: number) => {
    setEditingField(field);
    setTempValue(value.toString());
  };

  const saveFieldEdit = () => {
    if (!editingField || !tempValue || isNaN(Number(tempValue))) {
      Alert.alert('Invalid Value', 'Please enter a valid number.');
      return;
    }

    setEditingFood(prev => ({
      ...prev!,
      [editingField]: Number(tempValue),
    } as Partial<FoodItem>));

    setEditingField(null);
    setTempValue('');
  };

  const KeyValueField = ({ label, value, editable, onDelete }: { label: string; value: number | string; editable?: boolean; onDelete?: () => void }) => (
    <View style={styles.keyValueRow}>
      <Text style={styles.keyText}>{label}:</Text>
      {editingField === label.toLowerCase() ? (
        <View style={styles.editInputContainer}>
          <TextInput
            style={styles.editInput}
            value={tempValue}
            onChangeText={setTempValue}
            keyboardType="numeric"
            placeholder={value.toString()}
          />
          <TouchableOpacity onPress={saveFieldEdit} style={styles.saveEditBtn}>
            <Ionicons name="checkmark" size={16} color="white" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.valueContainer}>
          <Text style={styles.valueText}>{value}</Text>
          {editable && (
            <TouchableOpacity onPress={() => startFieldEdit(label.toLowerCase() as any, value as number)}>
              <Ionicons name="create-outline" size={16} color="#4CAF50" />
            </TouchableOpacity>
          )}
          {onDelete && (
            <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
              <Ionicons name="trash-outline" size={16} color="#FF6B6B" />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );

  const EditScreen = () => (
    <Modal visible={true} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={cancelEditing} style={styles.headerButton}>
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>Edit Food Details</Text>
          <TouchableOpacity onPress={saveEditedFood} style={styles.headerButton}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.editScroll}>
          <Text style={styles.editTitle}>Macros & Nutrition</Text>
          {editingFood && (
            <>
              <KeyValueField label="Calories" value={editingFood.calories || 0} editable />
              <KeyValueField label="Protein" value={editingFood.protein || 0} editable />
              <KeyValueField label="Carbs" value={editingFood.carbs || 0} editable />
              <KeyValueField label="Fat" value={editingFood.fat || 0} editable />
            </>
          )}

          {availableMeals.length > 0 && (
            <View style={styles.mealSelectionSection}>
              <Text style={styles.editTitle}>Add to Meal</Text>
              {availableMeals.map(meal => (
                <TouchableOpacity
                  key={meal.id}
                  style={styles.mealOption}
                  onPress={() => addToMeal(meal.id)}
                >
                  <Text style={styles.mealOptionText}>{meal.title} ({meal.time})</Text>
                  <Ionicons name="add-circle" size={20} color="#4CAF50" />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  if (step === 'edit') {
    return <EditScreen />;
  }

  const FoodCard = ({ food }: { food: FoodItem & { preparation?: string; allergens?: string[]; alignment?: string; insights?: string } }) => (
    <TouchableOpacity style={styles.foodCard} onPress={() => startEditing(food)}>
      <View style={styles.foodHeader}>
        <Text style={styles.foodName} numberOfLines={1}>{food.name}</Text>
        <Ionicons name="create-outline" size={20} color="#4CAF50" />
      </View>
      <View style={styles.nutritionRow}>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionLabel}>P</Text>
          <Text style={styles.nutritionValue}>{food.protein}g</Text>
        </View>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionLabel}>C</Text>
          <Text style={styles.nutritionValue}>{food.carbs}g</Text>
        </View>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionLabel}>F</Text>
          <Text style={styles.nutritionValue}>{food.fat}g</Text>
        </View>
      </View>
      <KeyValueField label="Total Calories" value={`${food.calories} kcal`} />
      {food.ingredients?.length ? (
        <View style={styles.ingredientsPreview}>
          <Text style={styles.ingredientsTitle}>Ingredients:</Text>
          <Text style={styles.ingredientsText} numberOfLines={3}>
            {food.ingredients.map(i => `${i.name} (${i.weight})`).join(', ')}
          </Text>
        </View>
      ) : null}
      {food.preparation ? (
        <View style={styles.detailSection}>
          <KeyValueField label="Preparation" value={food.preparation} onDelete={() => deleteField('preparation' as any)} />
        </View>
      ) : null}
      {food.allergens?.length ? (
        <View style={styles.detailSection}>
          <KeyValueField label="Allergens" value={food.allergens.join(', ')} onDelete={() => deleteField('allergens' as any)} />
        </View>
      ) : null}
      {food.alignment ? (
        <View style={styles.detailSection}>
          <KeyValueField label="Goal Alignment" value={food.alignment} onDelete={() => deleteField('alignment' as any)} />
        </View>
      ) : null}
      {food.insights ? (
        <View style={styles.detailSection}>
          <KeyValueField label="Insights" value={food.insights} onDelete={() => deleteField('insights' as any)} />
        </View>
      ) : null}
    </TouchableOpacity>
  );

  if (step === 'camera') {
    if (!permission) {
      return (
        <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
          <SafeAreaView style={styles.container}>
            <View style={styles.centerContent}>
              <ActivityIndicator size="large" color="#4CAF50" />
              <Text style={styles.loadingText}>Loading camera...</Text>
            </View>
          </SafeAreaView>
        </Modal>
      );
    }

    if (!permission.granted) {
      return (
        <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
          <SafeAreaView style={styles.container}>
            <View style={styles.centerContent}>
              <Ionicons name="camera-outline" size={80} color="#FF6B6B" />
              <Text style={styles.errorTitle}>Camera Permission Required</Text>
              <Text style={styles.errorText}>
                Please enable camera permission to analyze food photos.
              </Text>
              <TouchableOpacity style={styles.retryButton} onPress={requestPermission}>
                <Text style={styles.retryButtonText}>Grant Permission</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Modal>
      );
    }

    return (
      <Modal visible={visible} animationType="slide" presentationStyle="fullScreen">
        <SafeAreaView style={styles.cameraContainer}>
          <View style={styles.cameraHeader}>
            <TouchableOpacity onPress={onClose} style={styles.headerButton}>
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.cameraTitle}>Food Analyzer</Text>
            <View style={styles.headerButtons}>
              <TouchableOpacity style={styles.iconButton} onPress={toggleGrid}>
                <Ionicons 
                  name={showGrid ? "grid" : "grid-outline"} 
                  size={20} 
                  color="white" 
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={toggleFlash}>
                <Ionicons 
                  name={flashMode === 'on' ? "flash" : "flash-off"} 
                  size={20} 
                  color="white" 
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.cameraView}>
            <CameraView
              ref={cameraRef}
              style={styles.camera}
              facing="back"
              flash={flashMode}
            >
              {showGrid && (
                <View style={styles.focusGrid}>
                  <View style={styles.gridLineVertical} />
                  <View style={styles.gridLineVertical} />
                  <View style={styles.gridLineHorizontal} />
                  <View style={styles.gridLineHorizontal} />
                </View>
              )}
            </CameraView>

            <View style={styles.cameraControls}>
              <Text style={styles.cameraHint}>📸 Tap to capture your meal</Text>
              
              <View style={styles.captureArea}>
                <TouchableOpacity 
                  style={styles.captureButton} 
                  onPress={takePicture}
                  activeOpacity={0.7}
                >
                  <View style={styles.captureInner} />
                </TouchableOpacity>
              </View>

              <View style={styles.cameraTips}>
                <Text style={styles.tipText}>✨ Good lighting • Close-up • Fill frame</Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    );
  }

  if (step === 'analyzing') {
    return (
      <Modal visible={true} animationType="fade">
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={() => { 
                setStep('camera'); 
                setCapturedImage(null); 
              }} 
              style={styles.headerButton}
            >
              <Ionicons name="chevron-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.title}>AI Analyzing</Text>
            <View style={styles.placeholder} />
          </View>

          <View style={styles.analyzingScreen}>
            <Ionicons name="nutrition-outline" size={80} color="#4CAF50" />
            <Text style={styles.analyzingTitle}>Analyzing Your Meal</Text>
            <Text style={styles.analyzingSubtitle}>
              AI is identifying ingredients and calculating nutrition...
            </Text>
            <ActivityIndicator size="large" color="#4CAF50" style={styles.analyzingSpinner} />
            {capturedImage ? (
              <Image source={{ uri: capturedImage }} style={styles.analyzingPreview} />
            ) : null}
          </View>
        </SafeAreaView>
      </Modal>
    );
  }

  return (
    <Modal visible={true} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.headerButton}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>AI Food Analysis</Text>
          <TouchableOpacity 
            onPress={() => { 
              setStep('camera'); 
              setRecommendations([]); 
            }}
          >
            <Ionicons name="camera" size={24} color="#4CAF50" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.resultsScroll} showsVerticalScrollIndicator={false}>
          <Text style={styles.resultsTitle}>Detailed Meal Analysis</Text>
          <Text style={styles.resultsSubtitle}>
            Based on your photo for {selectedMealType}
          </Text>
          
          {recommendations.map((food) => (
            <FoodCard key={food.id} food={food as any} />
          ))}

          {error ? (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle-outline" size={20} color="#FF6B6B" />
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity 
                style={styles.retryButton} 
                onPress={() => { 
                  setStep('camera'); 
                  setError(null); 
                }}
              >
                <Text style={styles.retryButtonText}>📸 Take New Photo</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  cameraContainer: { flex: 1, backgroundColor: '#000' },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerButton: { padding: 8 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#1E293B' },
  placeholder: { width: 24 },
  saveText: { fontSize: 16, fontWeight: 'bold', color: '#4CAF50' },

  cameraView: { flex: 1 },
  camera: { flex: 1 },
  cameraHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  cameraTitle: { fontSize: 18, fontWeight: 'bold', color: 'white' },
  headerButtons: { flexDirection: 'row', gap: 12 },
  iconButton: { 
    padding: 8, 
    borderRadius: 12, 
    backgroundColor: 'rgba(255,255,255,0.2)' 
  },
  focusGrid: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    paddingVertical: 40,
  },
  gridLineVertical: {
    width: 1,
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  gridLineHorizontal: {
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  cameraControls: {
    padding: 24,
    alignItems: 'center',
    gap: 24,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  cameraHint: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  captureArea: { alignItems: 'center' },
  captureButton: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  captureInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'white',
  },
  cameraTips: { alignItems: 'center' },
  tipText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 20,
  },

  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: { fontSize: 16, color: '#64748B', marginTop: 16 },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginTop: 24,
    marginBottom: 12,
  },
  errorText: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  analyzingScreen: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 40 
  },
  analyzingTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#1E293B', 
    marginTop: 24,
    marginBottom: 12
  },
  analyzingSubtitle: { 
    fontSize: 16, 
    color: '#64748B', 
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22
  },
  analyzingSpinner: { marginVertical: 24 },
  analyzingPreview: { 
    width: 200, 
    height: 200, 
    borderRadius: 16,
    marginTop: 24
  },
  resultsScroll: { flex: 1, padding: 20 },
  editScroll: { flex: 1, padding: 20 },
  resultsTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#1E293B', 
    marginBottom: 8 
  },
  editTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#1E293B', 
    marginBottom: 16,
    marginTop: 8
  },
  resultsSubtitle: { 
    fontSize: 16, 
    color: '#64748B', 
    marginBottom: 24 
  },
  foodCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  foodHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 12 
  },
  foodName: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#1E293B', 
    flex: 1,
    marginRight: 12
  },
  nutritionRow: { 
    flexDirection: 'row', 
    gap: 20, 
    marginBottom: 16 
  },
  nutritionItem: { 
    flex: 1, 
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 8
  },
  nutritionLabel: { 
    fontSize: 12, 
    color: '#64748B', 
    fontWeight: '500' 
  },
  nutritionValue: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#1E293B' 
  },
  keyValueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  keyText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  valueText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1E293B',
  },
  editInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  editInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 8,
    fontSize: 14,
  },
  saveEditBtn: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 6,
  },
  deleteBtn: {
    padding: 4,
  },
  ingredientsPreview: { 
    paddingTop: 12, 
    borderTopWidth: 1, 
    borderTopColor: '#E2E8F0',
    marginBottom: 16
  },
  ingredientsTitle: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#64748B', 
    marginBottom: 8 
  },
  ingredientsText: { 
    fontSize: 14, 
    color: '#475569', 
    lineHeight: 20 
  },
  detailSection: {
    marginBottom: 16,
  },
  mealSelectionSection: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  mealOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    marginBottom: 8,
  },
  mealOptionText: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '500',
  },
  retryButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  retryButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  closeButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
    marginTop: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#374151',
    fontWeight: '600',
    fontSize: 14,
  },
  errorContainer: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  }
});

export default AnalyzeImage;