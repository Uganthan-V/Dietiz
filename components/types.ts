// // "components\types.ts"
// // export interface PersonalInfo {
// //   name: string;
// //   age: string;
// //   gender: string;
// //   weight: string;
// //   height: string;
// //   activityLevel: string;
// //   goal: string;
// //   dietaryRestrictions: string[];
// //   allergies: string[];
// //   targetCalories: string;
// // }

// // export interface FoodItem {
// //   id: string;
// //   name: string;
// //   calories: number;
// //   protein: number;
// //   carbs: number;
// //   fat: number;
// //   category: string;
// //   ingredients: { name: string; weight: string }[];
// // }

// // "components\types.ts"
// export interface PersonalInfo {
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

// export interface FoodItem {
//   id: string;
//   name: string;
//   calories: number;
//   protein: number;
//   carbs: number;
//   fat: number;
//   category: string;
//   ingredients: { name: string; weight: string }[];
// }



export interface PersonalInfo {
  name: string;
  age: string;
  gender: string;
  weight: string;
  height: string;
  activityLevel: string;
  goal: string;
  targetCalories: string;
  dietaryRestrictions: string[];
  allergies: string[];
}

export interface Ingredient {
  name: string;
  weight: string;
}

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  category: string;
  ingredients?: Ingredient[];
}

export interface Meal {
  id: string;
  title: string;
  time: string;
  hasFood: boolean;
  food?: FoodItem | null;
  consumed: boolean;
}