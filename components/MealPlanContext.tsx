// // import StorageService from '@/services/StorageService';
// // import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

// // interface FoodItem {
// //   id: string;
// //   name: string;
// //   calories: number;
// //   protein: number;
// //   carbs: number;
// //   fat: number;
// //   category: string;
// // }

// // interface Meal {
// //   id: string;
// //   title: string;
// //   time: string;
// //   food?: FoodItem;
// //   hasFood: boolean;
// // }

// // interface NutritionalData {
// //   calories: number;
// //   protein: number;
// //   carbs: number;
// //   fat: number;
// // }

// // interface PersonalInfo {
// //   name: string;
// //   age: string;
// //   gender: string;
// //   weight: string;
// //   height: string;
// //   activityLevel: string;
// //   goal: string;
// //   dietaryRestrictions: string[];
// //   allergies: string[];
// //   targetCalories: string; // Calculated automatically based on user data
// // }

// // interface MealPlanContextType {
// //   meals: Meal[];
// //   nutritionalData: NutritionalData;
// //   personalInfo: PersonalInfo | null;
// //   isLoading: boolean;
// //   updateMeal: (mealId: string, food: FoodItem) => void;
// //   removeMeal: (mealId: string) => void;
// //   getTotalNutrition: () => NutritionalData;
// //   addCustomMeal: (mealId: string, foodName: string, calories: number, protein: number, carbs: number, fat: number) => void;
// //   clearAllMeals: () => void;
// //   savePersonalInfo: (info: PersonalInfo) => Promise<void>;
// //   loadPersonalInfo: () => Promise<PersonalInfo | null>;
// //   clearPersonalInfo: () => Promise<void>;
// //   hasCompletedSetup: () => Promise<boolean>;
// //   saveMealsToStorage: () => Promise<void>;
// //   loadMealsFromStorage: () => Promise<void>;
// // }

// // const MealPlanContext = createContext<MealPlanContextType | undefined>(undefined);

// // interface MealPlanProviderProps {
// //   children: ReactNode;
// // }

// // export const MealPlanProvider: React.FC<MealPlanProviderProps> = ({ children }) => {
// //   const [meals, setMeals] = useState<Meal[]>([
// //     {
// //       id: 'breakfast',
// //       title: 'Breakfast',
// //       time: '7 AM',
// //       hasFood: false,
// //     },
// //     {
// //       id: 'lunch',
// //       title: 'Lunch',
// //       time: '12 PM',
// //       hasFood: false,
// //     },
// //     {
// //       id: 'snacks',
// //       title: 'Snacks',
// //       time: '3 PM',
// //       hasFood: false,
// //     },
// //     {
// //       id: 'dinner',
// //       title: 'Dinner',
// //       time: '7 PM',
// //       hasFood: false,
// //     },
// //   ]);

// //   const [nutritionalData, setNutritionalData] = useState<NutritionalData>({
// //     calories: 2000,
// //     protein: 50,
// //     carbs: 250,
// //     fat: 65,
// //   });

// //   // Calculate target nutrition based on personal info
// //   const calculateTargetNutrition = (personalInfo: PersonalInfo): NutritionalData => {
// //     const targetCalories = parseInt(personalInfo.targetCalories);
    
// //     // Calculate macronutrient ratios based on goal
// //     let proteinRatio = 0.25; // 25% default
// //     let carbsRatio = 0.55;   // 55% default
// //     let fatRatio = 0.20;     // 20% default
    
// //     switch (personalInfo.goal) {
// //       case 'lose_weight':
// //         proteinRatio = 0.30; // Higher protein for satiety
// //         carbsRatio = 0.45;
// //         fatRatio = 0.25;
// //         break;
// //       case 'gain_weight':
// //       case 'build_muscle':
// //         proteinRatio = 0.30; // Higher protein for muscle building
// //         carbsRatio = 0.50;
// //         fatRatio = 0.20;
// //         break;
// //       case 'maintain_weight':
// //         proteinRatio = 0.25;
// //         carbsRatio = 0.55;
// //         fatRatio = 0.20;
// //         break;
// //       case 'improve_health':
// //         proteinRatio = 0.25;
// //         carbsRatio = 0.50;
// //         fatRatio = 0.25;
// //         break;
// //     }
    
// //     // Calculate grams (1g protein = 4 cal, 1g carbs = 4 cal, 1g fat = 9 cal)
// //     const proteinGrams = Math.round((targetCalories * proteinRatio) / 4);
// //     const carbsGrams = Math.round((targetCalories * carbsRatio) / 4);
// //     const fatGrams = Math.round((targetCalories * fatRatio) / 9);
    
// //     return {
// //       calories: targetCalories,
// //       protein: proteinGrams,
// //       carbs: carbsGrams,
// //       fat: fatGrams,
// //     };
// //   };

// //   const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
// //   const [isLoading, setIsLoading] = useState(true);

// //   // Load data on app start
// //   useEffect(() => {
// //     loadInitialData();
// //   }, []);

// //   const loadInitialData = async () => {
// //     try {
// //       setIsLoading(true);
      
// //       // Load personal info
// //       const savedPersonalInfo = await StorageService.getPersonalInfo();
// //       if (savedPersonalInfo) {
// //         setPersonalInfo(savedPersonalInfo);
// //         setNutritionalData(calculateTargetNutrition(savedPersonalInfo)); // Update nutritional data on load
// //       }

// //       // Load meals
// //       const savedMeals = await StorageService.getMeals();
// //       if (savedMeals) {
// //         setMeals(savedMeals);
// //       }
// //     } catch (error) {
// //       console.error('Error loading initial data:', error);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const updateMeal = (mealId: string, food: FoodItem) => {
// //     setMeals(prevMeals =>
// //       prevMeals.map(meal =>
// //         meal.id === mealId
// //           ? { ...meal, food, hasFood: true }
// //           : meal
// //       )
// //     );
// //   };

// //   const removeMeal = (mealId: string) => {
// //     setMeals(prevMeals =>
// //       prevMeals.map(meal =>
// //         meal.id === mealId
// //           ? { ...meal, food: undefined, hasFood: false }
// //           : meal
// //       )
// //     );
// //   };

// //   const addCustomMeal = (mealId: string, foodName: string, calories: number, protein: number, carbs: number, fat: number) => {
// //     const customFood: FoodItem = {
// //       id: `custom-${Date.now()}`,
// //       name: foodName,
// //       calories,
// //       protein,
// //       carbs,
// //       fat,
// //       category: 'custom',
// //     };
// //     updateMeal(mealId, customFood);
// //   };

// //   const clearAllMeals = () => {
// //     setMeals(prevMeals =>
// //       prevMeals.map(meal => ({
// //         ...meal,
// //         food: undefined,
// //         hasFood: false,
// //       }))
// //     );
// //   };

// //   const getTotalNutrition = (): NutritionalData => {
// //     return meals.reduce(
// //       (total, meal) => {
// //         if (meal.food) {
// //           total.calories += meal.food.calories;
// //           total.protein += meal.food.protein;
// //           total.carbs += meal.food.carbs;
// //           total.fat += meal.food.fat;
// //         }
// //         return total;
// //       },
// //       { calories: 0, protein: 0, carbs: 0, fat: 0 }
// //     );
// //   };

// //   const savePersonalInfo = async (info: PersonalInfo) => {
// //     try {
// //       await StorageService.savePersonalInfo(info);
// //       setPersonalInfo(info);
// //       setNutritionalData(calculateTargetNutrition(info)); // Update nutritional data on save
// //     } catch (error) {
// //       console.error('Error saving personal info:', error);
// //       throw error;
// //     }
// //   };

// //   const loadPersonalInfo = async (): Promise<PersonalInfo | null> => {
// //     try {
// //       const info = await StorageService.getPersonalInfo();
// //       if (info) {
// //         setPersonalInfo(info);
// //         setNutritionalData(calculateTargetNutrition(info)); // Update nutritional data on load
// //       }
// //       return info;
// //     } catch (error) {
// //       console.error('Error loading personal info:', error);
// //       return null;
// //     }
// //   };

// //   const clearPersonalInfo = async () => {
// //     try {
// //       await StorageService.clearPersonalInfo();
// //       setPersonalInfo(null);
// //     } catch (error) {
// //       console.error('Error clearing personal info:', error);
// //     }
// //   };

// //   const hasCompletedSetup = async (): Promise<boolean> => {
// //     return await StorageService.hasCompletedSetup();
// //   };

// //   const saveMealsToStorage = async () => {
// //     try {
// //       await StorageService.saveMeals(meals);
// //     } catch (error) {
// //       console.error('Error saving meals to storage:', error);
// //     }
// //   };

// //   const loadMealsFromStorage = async () => {
// //     try {
// //       const savedMeals = await StorageService.getMeals();
// //       if (savedMeals) {
// //         setMeals(savedMeals);
// //       }
// //     } catch (error) {
// //       console.error('Error loading meals from storage:', error);
// //     }
// //   };

// //   // Auto-save meals when they change
// //   useEffect(() => {
// //     if (!isLoading) {
// //       saveMealsToStorage();
// //     }
// //   }, [meals, isLoading]);

// //   const value: MealPlanContextType = {
// //     meals,
// //     nutritionalData,
// //     personalInfo,
// //     isLoading,
// //     updateMeal,
// //     removeMeal,
// //     getTotalNutrition,
// //     addCustomMeal,
// //     clearAllMeals,
// //     savePersonalInfo,
// //     loadPersonalInfo,
// //     clearPersonalInfo,
// //     hasCompletedSetup,
// //     saveMealsToStorage,
// //     loadMealsFromStorage,
// //   };

// //   return (
// //     <MealPlanContext.Provider value={value}>
// //       {children}
// //     </MealPlanContext.Provider>
// //   );
// // };

// // export const useMealPlan = (): MealPlanContextType => {
// //   const context = useContext(MealPlanContext);
// //   if (context === undefined) {
// //     throw new Error('useMealPlan must be used within a MealPlanProvider');
// //   }
// //   return context;
// // }; 


// import StorageService from '@/services/StorageService';
// import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

// interface FoodItem {
//   id: string;
//   name: string;
//   calories: number;
//   protein: number;
//   carbs: number;
//   fat: number;
//   category: string;
// }

// interface Meal {
//   id: string;
//   title: string;
//   time: string;
//   food?: FoodItem;
//   hasFood: boolean;
//   consumed: boolean; // Added consumed property
// }

// interface NutritionalData {
//   calories: number;
//   protein: number;
//   carbs: number;
//   fat: number;
// }

// interface PersonalInfo {
//   name: string;
//   age: string;
//   gender: string;
//   weight: string;
//   height: string;
//   activityLevel: string;
//   goal: string;
//   dietaryRestrictions: string[];
//   allergies: string[];
//   targetCalories: string;
// }

// interface MealPlanContextType {
//   meals: Meal[];
//   nutritionalData: NutritionalData;
//   personalInfo: PersonalInfo | null;
//   isLoading: boolean;
//   updateMeal: (mealId: string, food: FoodItem) => void;
//   removeMeal: (mealId: string) => void;
//   getTotalNutrition: () => NutritionalData;
//   addCustomMeal: (mealId: string, foodName: string, calories: number, protein: number, carbs: number, fat: number) => void;
//   clearAllMeals: () => void;
//   savePersonalInfo: (info: PersonalInfo) => Promise<void>;
//   loadPersonalInfo: () => Promise<PersonalInfo | null>;
//   clearPersonalInfo: () => Promise<void>;
//   hasCompletedSetup: () => Promise<boolean>;
//   saveMealsToStorage: () => Promise<void>;
//   loadMealsFromStorage: () => Promise<void>;
//   toggleMealConsumed: (mealId: string) => void; // Added toggleMealConsumed
// }

// const MealPlanContext = createContext<MealPlanContextType | undefined>(undefined);

// interface MealPlanProviderProps {
//   children: ReactNode;
// }

// export const MealPlanProvider: React.FC<MealPlanProviderProps> = ({ children }) => {
//   const [meals, setMeals] = useState<Meal[]>([
//     {
//       id: 'breakfast',
//       title: 'Breakfast',
//       time: '7 AM',
//       hasFood: false,
//       consumed: false, // Initialize consumed
//     },
//     {
//       id: 'lunch',
//       title: 'Lunch',
//       time: '12 PM',
//       hasFood: false,
//       consumed: false, // Initialize consumed
//     },
//     {
//       id: 'snacks',
//       title: 'Snacks',
//       time: '3 PM',
//       hasFood: false,
//       consumed: false, // Initialize consumed
//     },
//     {
//       id: 'dinner',
//       title: 'Dinner',
//       time: '7 PM',
//       hasFood: false,
//       consumed: false, // Initialize consumed
//     },
//   ]);

//   const [nutritionalData, setNutritionalData] = useState<NutritionalData>({
//     calories: 2000,
//     protein: 50,
//     carbs: 250,
//     fat: 65,
//   });

//   const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // Calculate target nutrition based on personal info
//   const calculateTargetNutrition = (personalInfo: PersonalInfo): NutritionalData => {
//     const targetCalories = parseInt(personalInfo.targetCalories);
    
//     let proteinRatio = 0.25;
//     let carbsRatio = 0.55;
//     let fatRatio = 0.20;
    
//     switch (personalInfo.goal) {
//       case 'lose_weight':
//         proteinRatio = 0.30;
//         carbsRatio = 0.45;
//         fatRatio = 0.25;
//         break;
//       case 'gain_weight':
//       case 'build_muscle':
//         proteinRatio = 0.30;
//         carbsRatio = 0.50;
//         fatRatio = 0.20;
//         break;
//       case 'maintain_weight':
//         proteinRatio = 0.25;
//         carbsRatio = 0.55;
//         fatRatio = 0.20;
//         break;
//       case 'improve_health':
//         proteinRatio = 0.25;
//         carbsRatio = 0.50;
//         fatRatio = 0.25;
//         break;
//     }
    
//     const proteinGrams = Math.round((targetCalories * proteinRatio) / 4);
//     const carbsGrams = Math.round((targetCalories * carbsRatio) / 4);
//     const fatGrams = Math.round((targetCalories * fatRatio) / 9);
    
//     return {
//       calories: targetCalories,
//       protein: proteinGrams,
//       carbs: carbsGrams,
//       fat: fatGrams,
//     };
//   };

//   // Load data on app start
//   useEffect(() => {
//     loadInitialData();
//   }, []);

//   const loadInitialData = async () => {
//     try {
//       setIsLoading(true);
      
//       const savedPersonalInfo = await StorageService.getPersonalInfo();
//       if (savedPersonalInfo) {
//         setPersonalInfo(savedPersonalInfo);
//         setNutritionalData(calculateTargetNutrition(savedPersonalInfo));
//       }

//       const savedMeals = await StorageService.getMeals();
//       if (savedMeals) {
//         setMeals(savedMeals);
//       }
//     } catch (error) {
//       console.error('Error loading initial data:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const updateMeal = (mealId: string, food: FoodItem) => {
//     setMeals(prevMeals =>
//       prevMeals.map(meal =>
//         meal.id === mealId
//           ? { ...meal, food, hasFood: true }
//           : meal
//       )
//     );
//   };

//   const removeMeal = (mealId: string) => {
//     setMeals(prevMeals =>
//       prevMeals.map(meal =>
//         meal.id === mealId
//           ? { ...meal, food: undefined, hasFood: false, consumed: false } // Reset consumed when removing food
//           : meal
//       )
//     );
//   };

//   const addCustomMeal = (mealId: string, foodName: string, calories: number, protein: number, carbs: number, fat: number) => {
//     const customFood: FoodItem = {
//       id: `custom-${Date.now()}`,
//       name: foodName,
//       calories,
//       protein,
//       carbs,
//       fat,
//       category: 'custom',
//     };
//     updateMeal(mealId, customFood);
//   };

//   const clearAllMeals = () => {
//     setMeals(prevMeals =>
//       prevMeals.map(meal => ({
//         ...meal,
//         food: undefined,
//         hasFood: false,
//         consumed: false, // Reset consumed when clearing meals
//       }))
//     );
//   };

//   const getTotalNutrition = (): NutritionalData => {
//     return meals.reduce(
//       (total, meal) => {
//         if (meal.food && meal.consumed) { // Only include consumed meals
//           total.calories += meal.food.calories;
//           total.protein += meal.food.protein;
//           total.carbs += meal.food.carbs;
//           total.fat += meal.food.fat;
//         }
//         return total;
//       },
//       { calories: 0, protein: 0, carbs: 0, fat: 0 }
//     );
//   };

//   const toggleMealConsumed = (mealId: string) => {
//     setMeals(prevMeals =>
//       prevMeals.map(meal =>
//         meal.id === mealId
//           ? { ...meal, consumed: !meal.consumed }
//           : meal
//       )
//     );
//   };

//   const savePersonalInfo = async (info: PersonalInfo) => {
//     try {
//       await StorageService.savePersonalInfo(info);
//       setPersonalInfo(info);
//       setNutritionalData(calculateTargetNutrition(info));
//     } catch (error) {
//       console.error('Error saving personal info:', error);
//       throw error;
//     }
//   };

//   const loadPersonalInfo = async (): Promise<PersonalInfo | null> => {
//     try {
//       const info = await StorageService.getPersonalInfo();
//       if (info) {
//         setPersonalInfo(info);
//         setNutritionalData(calculateTargetNutrition(info));
//       }
//       return info;
//     } catch (error) {
//       console.error('Error loading personal info:', error);
//       return null;
//     }
//   };

//   const clearPersonalInfo = async () => {
//     try {
//       await StorageService.clearPersonalInfo();
//       setPersonalInfo(null);
//     } catch (error) {
//       console.error('Error clearing personal info:', error);
//     }
//   };

//   const hasCompletedSetup = async (): Promise<boolean> => {
//     return await StorageService.hasCompletedSetup();
//   };

//   const saveMealsToStorage = async () => {
//     try {
//       await StorageService.saveMeals(meals);
//     } catch (error) {
//       console.error('Error saving meals to storage:', error);
//     }
//   };

//   const loadMealsFromStorage = async () => {
//     try {
//       const savedMeals = await StorageService.getMeals();
//       if (savedMeals) {
//         setMeals(savedMeals);
//       }
//     } catch (error) {
//       console.error('Error loading meals from storage:', error);
//     }
//   };

//   // Auto-save meals when they change
//   useEffect(() => {
//     if (!isLoading) {
//       saveMealsToStorage();
//     }
//   }, [meals, isLoading]);

//   const value: MealPlanContextType = {
//     meals,
//     nutritionalData,
//     personalInfo,
//     isLoading,
//     updateMeal,
//     removeMeal,
//     getTotalNutrition,
//     addCustomMeal,
//     clearAllMeals,
//     savePersonalInfo,
//     loadPersonalInfo,
//     clearPersonalInfo,
//     hasCompletedSetup,
//     saveMealsToStorage,
//     loadMealsFromStorage,
//     toggleMealConsumed, // Added to context value
//   };

//   return (
//     <MealPlanContext.Provider value={value}>
//       {children}
//     </MealPlanContext.Provider>
//   );
// };

// export const useMealPlan = (): MealPlanContextType => {
//   const context = useContext(MealPlanContext);
//   if (context === undefined) {
//     throw new Error('useMealPlan must be used within a MealPlanProvider');
//   }
//   return context;
// };


import StorageService from '@/services/StorageService';
import React, { createContext, ReactNode, useContext, useEffect, useState, useCallback } from 'react';

interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  category: string;
}

// ✅ PERFECT: Explicitly allow null
interface Meal {
  id: string;
  title: string;
  time: string;
  food: FoodItem | null;  // ✅ FIXED: null only (no undefined)
  hasFood: boolean;
  consumed: boolean;
}

interface NutritionalData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

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
  targetCalories: string;
}

interface MealPlanContextType {
  meals: Meal[];
  nutritionalData: NutritionalData;
  personalInfo: PersonalInfo | null;
  isLoading: boolean;
  updateMeal: (mealId: string, food: FoodItem | null, consumed?: boolean) => void;
  removeMeal: (mealId: string) => void;
  getTotalNutrition: () => NutritionalData;
  addCustomMeal: (mealId: string, foodName: string, calories: number, protein: number, carbs: number, fat: number) => void;
  clearAllMeals: () => void;
  savePersonalInfo: (info: PersonalInfo) => Promise<void>;
  loadPersonalInfo: () => Promise<PersonalInfo | null>;
  clearPersonalInfo: () => Promise<void>;
  hasCompletedSetup: () => Promise<boolean>;
  saveMealsToStorage: () => Promise<void>;
  loadMealsFromStorage: () => Promise<void>;
  toggleMealConsumed: (mealId: string) => void;
}

const MealPlanContext = createContext<MealPlanContextType | undefined>(undefined);

interface MealPlanProviderProps {
  children: ReactNode;
}

export const MealPlanProvider: React.FC<MealPlanProviderProps> = ({ children }) => {
  const [meals, setMeals] = useState<Meal[]>([
    {
      id: 'breakfast',
      title: 'Breakfast',
      time: '7 AM',
      food: null,  // ✅ Explicit null
      hasFood: false,
      consumed: false,
    },
    {
      id: 'lunch',
      title: 'Lunch',
      time: '12 PM',
      food: null,  // ✅ Explicit null
      hasFood: false,
      consumed: false,
    },
    {
      id: 'snacks',
      title: 'Snacks',
      time: '3 PM',
      food: null,  // ✅ Explicit null
      hasFood: false,
      consumed: false,
    },
    {
      id: 'dinner',
      title: 'Dinner',
      time: '7 PM',
      food: null,  // ✅ Explicit null
      hasFood: false,
      consumed: false,
    },
  ]);

  const [nutritionalData, setNutritionalData] = useState<NutritionalData>({
    calories: 2000,
    protein: 50,
    carbs: 250,
    fat: 65,
  });

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const calculateTargetNutrition = (personalInfo: PersonalInfo): NutritionalData => {
    const targetCalories = parseInt(personalInfo.targetCalories);
    
    let proteinRatio = 0.25;
    let carbsRatio = 0.55;
    let fatRatio = 0.20;
    
    switch (personalInfo.goal) {
      case 'lose_weight':
        proteinRatio = 0.30;
        carbsRatio = 0.45;
        fatRatio = 0.25;
        break;
      case 'gain_weight':
      case 'build_muscle':
        proteinRatio = 0.30;
        carbsRatio = 0.50;
        fatRatio = 0.20;
        break;
      case 'maintain_weight':
        proteinRatio = 0.25;
        carbsRatio = 0.55;
        fatRatio = 0.20;
        break;
      case 'improve_health':
        proteinRatio = 0.25;
        carbsRatio = 0.50;
        fatRatio = 0.25;
        break;
    }
    
    const proteinGrams = Math.round((targetCalories * proteinRatio) / 4);
    const carbsGrams = Math.round((targetCalories * carbsRatio) / 4);
    const fatGrams = Math.round((targetCalories * fatRatio) / 9);
    
    return {
      calories: targetCalories,
      protein: proteinGrams,
      carbs: carbsGrams,
      fat: fatGrams,
    };
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
  try {
    setIsLoading(true);
    
    const savedPersonalInfo = await StorageService.getPersonalInfo();
    if (savedPersonalInfo) {
      setPersonalInfo(savedPersonalInfo);
      setNutritionalData(calculateTargetNutrition(savedPersonalInfo));
    }

    const savedMeals = await StorageService.getMeals();
    if (savedMeals) {
      const fixedMeals: Meal[] = savedMeals.map((meal: any) => ({
        id: meal.id,
        title: meal.title,
        time: meal.time,
        food: meal.food || null,
        hasFood: !!meal.food,
        consumed: !!meal.food && (meal.consumed === true || meal.consumed === 'true'), // ✅ PERFECT FIX
      }));
      setMeals(fixedMeals);
    }
  } catch (error) {
    console.error('Error loading initial data:', error);
  } finally {
    setIsLoading(false);
  }
};
  const updateMeal = useCallback((
    mealId: string, 
    food: FoodItem | null, 
    consumed?: boolean
  ) => {
    setMeals(prevMeals =>
      prevMeals.map(meal =>
        meal.id === mealId
          ? { 
              ...meal, 
              food, 
              hasFood: !!food, 
              consumed: consumed ?? meal.consumed 
            }
          : meal
      )
    );
  }, []);

  const removeMeal = useCallback((mealId: string) => {
    setMeals(prevMeals =>
      prevMeals.map(meal =>
        meal.id === mealId
          ? { ...meal, food: null, hasFood: false, consumed: false }
          : meal
      )
    );
  }, []);

  const addCustomMeal = useCallback((
    mealId: string, 
    foodName: string, 
    calories: number, 
    protein: number, 
    carbs: number, 
    fat: number
  ) => {
    const customFood: FoodItem = {
      id: `custom-${Date.now()}`,
      name: foodName,
      calories,
      protein,
      carbs,
      fat,
      category: 'custom',
    };
    updateMeal(mealId, customFood, false);
  }, [updateMeal]);

  const clearAllMeals = useCallback(() => {
    setMeals(prevMeals =>
      prevMeals.map(meal => ({
        ...meal,
        food: null,
        hasFood: false,
        consumed: false,
      }))
    );
  }, []);

  const getTotalNutrition = useCallback((): NutritionalData => {
    return meals.reduce(
      (total, meal) => {
        if (meal.food && meal.consumed) {
          total.calories += meal.food.calories;
          total.protein += meal.food.protein;
          total.carbs += meal.food.carbs;
          total.fat += meal.food.fat;
        }
        return total;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }, [meals]);

  const toggleMealConsumed = useCallback((mealId: string) => {
    setMeals(prevMeals =>
      prevMeals.map(meal =>
        meal.id === mealId && meal.hasFood
          ? { ...meal, consumed: !meal.consumed }
          : meal
      )
    );
  }, []);

  const savePersonalInfo = async (info: PersonalInfo) => {
    try {
      await StorageService.savePersonalInfo(info);
      setPersonalInfo(info);
      setNutritionalData(calculateTargetNutrition(info));
    } catch (error) {
      console.error('Error saving personal info:', error);
      throw error;
    }
  };

  const loadPersonalInfo = async (): Promise<PersonalInfo | null> => {
    try {
      const info = await StorageService.getPersonalInfo();
      if (info) {
        setPersonalInfo(info);
        setNutritionalData(calculateTargetNutrition(info));
      }
      return info;
    } catch (error) {
      console.error('Error loading personal info:', error);
      return null;
    }
  };

  const clearPersonalInfo = async () => {
    try {
      await StorageService.clearPersonalInfo();
      setPersonalInfo(null);
    } catch (error) {
      console.error('Error clearing personal info:', error);
    }
  };

  const hasCompletedSetup = async (): Promise<boolean> => {
    return await StorageService.hasCompletedSetup();
  };

  const saveMealsToStorage = async () => {
    try {
      const mealData = meals.map(meal => ({
        ...meal,
        consumed: Boolean(meal.consumed),
        hasFood: Boolean(meal.hasFood),
        food: meal.food,
      }));
      await StorageService.saveMeals(mealData);
    } catch (error) {
      console.error('Error saving meals to storage:', error);
    }
  };

 const loadMealsFromStorage = async () => {
  try {
    const savedMeals = await StorageService.getMeals();
    if (savedMeals) {
      const fixedMeals: Meal[] = savedMeals.map((meal: any) => ({
        id: meal.id,
        title: meal.title,
        time: meal.time,
        food: meal.food || null,
        hasFood: !!meal.food,
        consumed: !!meal.food && (meal.consumed === true || meal.consumed === 'true'), // ✅ SAME FIX
      }));
      setMeals(fixedMeals);
    }
  } catch (error) {
    console.error('Error loading meals from storage:', error);
  }
};

  useEffect(() => {
    if (!isLoading) {
      saveMealsToStorage();
    }
  }, [meals, isLoading]);

  const value: MealPlanContextType = {
    meals,
    nutritionalData,
    personalInfo,
    isLoading,
    updateMeal,
    removeMeal,
    getTotalNutrition,
    addCustomMeal,
    clearAllMeals,
    savePersonalInfo,
    loadPersonalInfo,
    clearPersonalInfo,
    hasCompletedSetup,
    saveMealsToStorage,
    loadMealsFromStorage,
    toggleMealConsumed,
  };

  return (
    <MealPlanContext.Provider value={value}>
      {children}
    </MealPlanContext.Provider>
  );
};

export const useMealPlan = (): MealPlanContextType => {
  const context = useContext(MealPlanContext);
  if (context === undefined) {
    throw new Error('useMealPlan must be used within a MealPlanProvider');
  }
  return context;
};