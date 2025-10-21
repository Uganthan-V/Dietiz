// import { GoogleGenerativeAI } from "@google/generative-ai";

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
//   targetCalories: string; // Calculated automatically based on user data
// }

// interface FoodItem {
//   id: string;
//   name: string;
//   calories: number;
//   protein: number;
//   carbs: number;
//   fat: number;
//   category: string;
// }

// class GeminiService {
//   private genAI: GoogleGenerativeAI | null = null;
//   private model: any = null;
//   private apiKey: string | null = null;

//   constructor() {
//     // Don't initialize with a placeholder key
//     // The API key will be set when needed
//   }

//   setApiKey(apiKey: string) {
//     if (!apiKey || apiKey.trim() === "") {
//       throw new Error("API key is required");
//     }

//     this.apiKey = apiKey.trim();
//     this.genAI = new GoogleGenerativeAI(this.apiKey);
//     // Use gemini-pro model which is more stable and available
//     this.model = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
//   }

//   async generateMealRecommendations(
//     personalInfo: PersonalInfo,
//     mealType: string,
//     currentMeals: any[] = []
//   ): Promise<FoodItem[]> {
//     try {
//       // Check if API key is set
//       if (!this.apiKey || !this.model) {
//         throw new Error(
//           "API key not configured. Please set your Gemini API key in Settings."
//         );
//       }

//       const prompt = this.buildPrompt(personalInfo, mealType, currentMeals);

//       const result = await this.model.generateContent(prompt);
//       const response = await result.response;
//       const text = response.text();

//       return this.parseAIResponse(text);
//     } catch (error) {
//       console.error("Error generating meal recommendations:", error);

//       // Handle specific error types
//       if (error instanceof Error) {
//         if (error.message.includes("API key")) {
//           throw error;
//         }

//         // Handle model overload or service unavailable errors
//         if (
//           error.message.includes("overloaded") ||
//           error.message.includes("503") ||
//           error.message.includes("service unavailable") ||
//           error.message.includes("quota exceeded")
//         ) {
//           throw new Error(
//             "AI service is currently busy. Please try again in a few minutes, or use fallback recommendations."
//           );
//         }
//       }

//       // For other errors, return fallback recommendations
//       return this.getFallbackRecommendations(mealType);
//     }
//   }

//   private buildPrompt(
//     personalInfo: PersonalInfo,
//     mealType: string,
//     currentMeals: any[]
//   ): string {
//     const currentNutrition = this.calculateCurrentNutrition(currentMeals);
//     const remainingCalories =
//       parseInt(personalInfo.targetCalories) - currentNutrition.calories;

//     // Map meal types to more descriptive names
//     const mealTypeDescriptions = {
//       breakfast: "breakfast (morning meal)",
//       lunch: "lunch (midday meal)",
//       dinner: "dinner (evening meal)",
//       snacks: "snack (light meal between main meals)",
//     };

//     const mealDescription =
//       mealTypeDescriptions[mealType as keyof typeof mealTypeDescriptions] ||
//       mealType;

//     return `You are a professional nutritionist and chef. Generate exactly 5 personalized meal recommendations for ${mealDescription} based on the following user profile.

// IMPORTANT: Only generate recommendations for ${mealDescription}. Do NOT include recommendations for other meal types like breakfast, lunch, dinner, or snacks unless specifically requested.

// USER PROFILE:
// - Name: ${personalInfo.name}
// - Age: ${personalInfo.age} years old
// - Gender: ${personalInfo.gender}
// - Weight: ${personalInfo.weight} kg
// - Height: ${personalInfo.height} cm
// - Activity Level: ${personalInfo.activityLevel}
// - Goal: ${personalInfo.goal}
// - Target Calories: ${personalInfo.targetCalories} calories/day
// - Dietary Restrictions: ${personalInfo.dietaryRestrictions.join(", ") || "None"}
// - Allergies: ${personalInfo.allergies.join(", ") || "None"}

// CURRENT NUTRITION TODAY:
// - Calories consumed: ${currentNutrition.calories}
// - Protein consumed: ${currentNutrition.protein}g
// - Carbs consumed: ${currentNutrition.carbs}g
// - Fat consumed: ${currentNutrition.fat}g
// - Remaining calories for today: ${remainingCalories}

// MEAL TYPE: ${mealDescription}

// REQUIREMENTS:
// 1. Generate exactly 5 meal options for ${mealDescription} ONLY
// 2. Each meal must be appropriate for ${mealDescription} timing and context
// 3. Consider the user's dietary restrictions and allergies
// 4. Ensure meals align with their fitness goal
// 5. Consider remaining daily calories and nutrition needs
// 6. Make meals realistic and easy to prepare
// 7. Include nutritional information for each meal
// 8. Focus only on ${mealDescription} - do not mix with other meal types

// RESPONSE FORMAT:
// Return a JSON array with exactly 5 objects, each containing:
// {
//   "id": "unique_id",
//   "name": "Meal Name",
//   "calories": number,
//   "protein": number,
//   "carbs": number,
//   "fat": number,
//   "category": "${mealType}"
// }

// Example for breakfast:
// [
//   {
//     "id": "breakfast_1",
//     "name": "Greek Yogurt with Berries and Nuts",
//     "calories": 320,
//     "protein": 18,
//     "carbs": 25,
//     "fat": 12,
//     "category": "breakfast"
//   }
// ]

// Example for lunch:
// [
//   {
//     "id": "lunch_1",
//     "name": "Grilled Chicken Salad",
//     "calories": 350,
//     "protein": 25,
//     "carbs": 15,
//     "fat": 18,
//     "category": "lunch"
//   }
// ]

// Only return the JSON array, no additional text.`;
//   }

//   private calculateCurrentNutrition(meals: any[]): {
//     calories: number;
//     protein: number;
//     carbs: number;
//     fat: number;
//   } {
//     return meals.reduce(
//       (total, meal) => {
//         if (meal.food) {
//           total.calories += meal.food.calories;
//           total.protein += meal.food.protein;
//           total.carbs += meal.food.carbs;
//           total.fat += meal.food.fat;
//         }
//         return total;
//       },
//       { calories: 0, protein: 0, carbs: 0, fat: 0 }
//     );
//   }

//   private parseAIResponse(response: string): FoodItem[] {
//     try {
//       // Extract JSON from the response
//       const jsonMatch = response.match(/\[[\s\S]*\]/);
//       if (jsonMatch) {
//         const parsed = JSON.parse(jsonMatch[0]);
//         return parsed.map((item: any, index: number) => ({
//           id: item.id || `ai_meal_${Date.now()}_${index}`,
//           name: item.name,
//           calories: parseInt(item.calories) || 0,
//           protein: parseInt(item.protein) || 0,
//           carbs: parseInt(item.carbs) || 0,
//           fat: parseInt(item.fat) || 0,
//           category: item.category || "general",
//         }));
//       }
//       throw new Error("No valid JSON found in response");
//     } catch (error) {
//       console.error("Error parsing AI response:", error);
//       return this.getFallbackRecommendations("general");
//     }
//   }

//   private getFallbackRecommendations(mealType: string): FoodItem[] {
//     const fallbackMeals = {
//       breakfast: [
//         {
//           name: "Oatmeal with Berries and Almonds",
//           calories: 280,
//           protein: 8,
//           carbs: 45,
//           fat: 6,
//         },
//         {
//           name: "Greek Yogurt with Honey and Granola",
//           calories: 200,
//           protein: 15,
//           carbs: 20,
//           fat: 8,
//         },
//         {
//           name: "Whole Grain Toast with Avocado and Eggs",
//           calories: 320,
//           protein: 10,
//           carbs: 35,
//           fat: 18,
//         },
//         {
//           name: "Smoothie Bowl with Banana and Berries",
//           calories: 250,
//           protein: 12,
//           carbs: 30,
//           fat: 8,
//         },
//         {
//           name: "Scrambled Eggs with Spinach and Toast",
//           calories: 220,
//           protein: 18,
//           carbs: 5,
//           fat: 12,
//         },
//       ],
//       lunch: [
//         {
//           name: "Grilled Chicken Salad with Mixed Greens",
//           calories: 350,
//           protein: 25,
//           carbs: 15,
//           fat: 18,
//         },
//         {
//           name: "Quinoa Bowl with Roasted Vegetables",
//           calories: 380,
//           protein: 12,
//           carbs: 45,
//           fat: 14,
//         },
//         {
//           name: "Turkey Sandwich on Whole Grain Bread",
//           calories: 320,
//           protein: 20,
//           carbs: 35,
//           fat: 12,
//         },
//         {
//           name: "Vegetable Soup with Grilled Cheese",
//           calories: 200,
//           protein: 8,
//           carbs: 25,
//           fat: 8,
//         },
//         {
//           name: "Tuna Salad with Crackers",
//           calories: 280,
//           protein: 22,
//           carbs: 10,
//           fat: 16,
//         },
//       ],
//       dinner: [
//         {
//           name: "Salmon with Roasted Vegetables",
//           calories: 420,
//           protein: 28,
//           carbs: 20,
//           fat: 22,
//         },
//         {
//           name: "Lean Beef Stir Fry with Brown Rice",
//           calories: 380,
//           protein: 25,
//           carbs: 25,
//           fat: 18,
//         },
//         {
//           name: "Vegetarian Pasta with Marinara Sauce",
//           calories: 350,
//           protein: 12,
//           carbs: 45,
//           fat: 12,
//         },
//         {
//           name: "Chicken Breast with Quinoa and Broccoli",
//           calories: 400,
//           protein: 30,
//           carbs: 35,
//           fat: 14,
//         },
//         {
//           name: "Tofu Curry with Basmati Rice",
//           calories: 320,
//           protein: 15,
//           carbs: 30,
//           fat: 16,
//         },
//       ],
//       snacks: [
//         {
//           name: "Apple Slices with Almond Butter",
//           calories: 180,
//           protein: 4,
//           carbs: 20,
//           fat: 10,
//         },
//         {
//           name: "Hummus with Carrot and Celery Sticks",
//           calories: 150,
//           protein: 6,
//           carbs: 18,
//           fat: 8,
//         },
//         {
//           name: "Greek Yogurt with Mixed Berries",
//           calories: 120,
//           protein: 12,
//           carbs: 8,
//           fat: 4,
//         },
//         {
//           name: "Mixed Nuts and Dried Cranberries",
//           calories: 200,
//           protein: 6,
//           carbs: 8,
//           fat: 18,
//         },
//         {
//           name: "Banana with Peanut Butter",
//           calories: 220,
//           protein: 6,
//           carbs: 25,
//           fat: 12,
//         },
//       ],
//     };

//     const meals =
//       fallbackMeals[mealType as keyof typeof fallbackMeals] ||
//       fallbackMeals.breakfast;

//     return meals.map((meal, index) => ({
//       id: `fallback_${mealType}_${index}`,
//       name: meal.name,
//       calories: meal.calories,
//       protein: meal.protein,
//       carbs: meal.carbs,
//       fat: meal.fat,
//       category: mealType,
//     }));
//   }

//   // Check if API key is configured
//   isApiKeyConfigured(): boolean {
//     return !!this.apiKey && !!this.model;
//   }

//   // Get the current API key (for debugging)
//   getApiKey(): string | null {
//     return this.apiKey;
//   }
// }

// export default new GeminiService();



import { GoogleGenerativeAI } from "@google/generative-ai";

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

interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  category: string;
  ingredients: { name: string; weight: string }[]; // Added ingredients field
}

class GeminiService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;
  private apiKey: string | null = null;

  constructor() {}

  setApiKey(apiKey: string) {
    if (!apiKey || apiKey.trim() === "") {
      throw new Error("API key is required");
    }

    this.apiKey = apiKey.trim();
    this.genAI = new GoogleGenerativeAI(this.apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  }

  async generateMealRecommendations(
    personalInfo: PersonalInfo,
    mealType: string,
    currentMeals: any[] = []
  ): Promise<FoodItem[]> {
    try {
      if (!this.apiKey || !this.model) {
        throw new Error(
          "API key not configured. Please set your Gemini API key in Settings."
        );
      }

      const prompt = this.buildPrompt(personalInfo, mealType, currentMeals);

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return this.parseAIResponse(text, mealType);
    } catch (error) {
      console.error("Error generating meal recommendations:", error);

      if (error instanceof Error) {
        if (error.message.includes("API key")) {
          throw error;
        }

        if (
          error.message.includes("overloaded") ||
          error.message.includes("503") ||
          error.message.includes("service unavailable") ||
          error.message.includes("quota exceeded")
        ) {
          throw new Error(
            "AI service is currently busy. Please try again in a few minutes, or use fallback recommendations."
          );
        }
      }

      return this.getFallbackRecommendations(mealType);
    }
  }

  private buildPrompt(
    personalInfo: PersonalInfo,
    mealType: string,
    currentMeals: any[]
  ): string {
    const currentNutrition = this.calculateCurrentNutrition(currentMeals);
    const remainingCalories =
      parseInt(personalInfo.targetCalories) - currentNutrition.calories;

    const mealTypeDescriptions = {
      breakfast: "breakfast (morning meal)",
      lunch: "lunch (midday meal)",
      dinner: "dinner (evening meal)",
      snacks: "snack (light meal between main meals)",
    };

    const mealDescription =
      mealTypeDescriptions[mealType as keyof typeof mealTypeDescriptions] ||
      mealType;

    return `You are a professional nutritionist and chef. Generate exactly 5 personalized meal recommendations for ${mealDescription} based on the following user profile.

IMPORTANT: Only generate recommendations for ${mealDescription}. Do NOT include recommendations for other meal types like breakfast, lunch, dinner, or snacks unless specifically requested.

USER PROFILE:
- Name: ${personalInfo.name}
- Age: ${personalInfo.age} years old
- Gender: ${personalInfo.gender}
- Weight: ${personalInfo.weight} kg
- Height: ${personalInfo.height} cm
- Activity Level: ${personalInfo.activityLevel}
- Goal: ${personalInfo.goal}
- Target Calories: ${personalInfo.targetCalories} calories/day
- Dietary Restrictions: ${personalInfo.dietaryRestrictions.join(", ") || "None"}
- Allergies: ${personalInfo.allergies.join(", ") || "None"}

CURRENT NUTRITION TODAY:
- Calories consumed: ${currentNutrition.calories}
- Protein consumed: ${currentNutrition.protein}g
- Carbs consumed: ${currentNutrition.carbs}g
- Fat consumed: ${currentNutrition.fat}g
- Remaining calories for today: ${remainingCalories}

MEAL TYPE: ${mealDescription}

REQUIREMENTS:
1. Generate exactly 5 meal options for ${mealDescription} ONLY
2. Each meal must be appropriate for ${mealDescription} timing and context
3. Consider the user's dietary restrictions and allergies
4. Ensure meals align with their fitness goal
5. Consider remaining daily calories and nutrition needs
6. Make meals realistic and easy to prepare
7. Include nutritional information and main ingredients with their weights for each meal
8. Focus only on ${mealDescription} - do not mix with other meal types

RESPONSE FORMAT:
Return a JSON array with exactly 5 objects, each containing:
{
  "id": "unique_id",
  "name": "Meal Name",
  "calories": number,
  "protein": number,
  "carbs": number,
  "fat": number,
  "category": "${mealType}",
  "ingredients": [
    { "name": "Ingredient Name", "weight": "Weight (e.g., 100g, 50ml)" },
    ...
  ]
}

Example for breakfast:
[
  {
    "id": "breakfast_1",
    "name": "Greek Yogurt with Berries and Nuts",
    "calories": 320,
    "protein": 18,
    "carbs": 25,
    "fat": 12,
    "category": "breakfast",
    "ingredients": [
      { "name": "Greek Yogurt", "weight": "150g" },
      { "name": "Mixed Berries", "weight": "100g" },
      { "name": "Almonds", "weight": "15g" }
    ]
  }
]

Example for dinner:
[
  {
    "id": "dinner_1",
    "name": "Chicken Butter Masala",
    "calories": 400,
    "protein": 30,
    "carbs": 35,
    "fat": 14,
    "category": "dinner",
    "ingredients": [
      { "name": "Chicken", "weight": "300g" },
      { "name": "Butter", "weight": "15g" },
      { "name": "Tomato Puree", "weight": "100g" },
      { "name": "Cream", "weight": "50ml" }
    ]
  }
]

Only return the JSON array, no additional text.`;
  }

  private calculateCurrentNutrition(meals: any[]): {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  } {
    return meals.reduce(
      (total, meal) => {
        if (meal.food) {
          total.calories += meal.food.calories;
          total.protein += meal.food.protein;
          total.carbs += meal.food.carbs;
          total.fat += meal.food.fat;
        }
        return total;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }

  private parseAIResponse(response: string, mealType: string): FoodItem[] {
    try {
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return parsed.map((item: any, index: number) => ({
          id: item.id || `ai_meal_${Date.now()}_${index}`,
          name: item.name,
          calories: parseInt(item.calories) || 0,
          protein: parseInt(item.protein) || 0,
          carbs: parseInt(item.carbs) || 0,
          fat: parseInt(item.fat) || 0,
          category: item.category || mealType,
          ingredients: item.ingredients || [], // Parse ingredients
        }));
      }
      throw new Error("No valid JSON found in response");
    } catch (error) {
      console.error("Error parsing AI response:", error);
      return this.getFallbackRecommendations(mealType);
    }
  }

  private getFallbackRecommendations(mealType: string): FoodItem[] {
    const fallbackMeals = {
      breakfast: [
        {
          name: "Oatmeal with Berries and Almonds",
          calories: 280,
          protein: 8,
          carbs: 45,
          fat: 6,
          ingredients: [
            { name: "Oats", weight: "50g" },
            { name: "Mixed Berries", weight: "100g" },
            { name: "Almonds", weight: "15g" },
            { name: "Milk", weight: "200ml" },
          ],
        },
        {
          name: "Greek Yogurt with Honey and Granola",
          calories: 200,
          protein: 15,
          carbs: 20,
          fat: 8,
          ingredients: [
            { name: "Greek Yogurt", weight: "150g" },
            { name: "Honey", weight: "10g" },
            { name: "Granola", weight: "30g" },
          ],
        },
        {
          name: "Whole Grain Toast with Avocado and Eggs",
          calories: 320,
          protein: 10,
          carbs: 35,
          fat: 18,
          ingredients: [
            { name: "Whole Grain Bread", weight: "2 slices (60g)" },
            { name: "Avocado", weight: "70g" },
            { name: "Eggs", weight: "2 large (100g)" },
          ],
        },
        {
          name: "Smoothie Bowl with Banana and Berries",
          calories: 250,
          protein: 12,
          carbs: 30,
          fat: 8,
          ingredients: [
            { name: "Banana", weight: "120g" },
            { name: "Mixed Berries", weight: "100g" },
            { name: "Greek Yogurt", weight: "100g" },
            { name: "Chia Seeds", weight: "10g" },
          ],
        },
        {
          name: "Scrambled Eggs with Spinach and Toast",
          calories: 220,
          protein: 18,
          carbs: 5,
          fat: 12,
          ingredients: [
            { name: "Eggs", weight: "3 large (150g)" },
            { name: "Spinach", weight: "50g" },
            { name: "Whole Grain Bread", weight: "1 slice (30g)" },
          ],
        },
      ],
      lunch: [
        {
          name: "Grilled Chicken Salad with Mixed Greens",
          calories: 350,
          protein: 25,
          carbs: 15,
          fat: 18,
          ingredients: [
            { name: "Chicken Breast", weight: "150g" },
            { name: "Mixed Greens", weight: "100g" },
            { name: "Olive Oil", weight: "15ml" },
            { name: "Cherry Tomatoes", weight: "50g" },
          ],
        },
        {
          name: "Quinoa Bowl with Roasted Vegetables",
          calories: 380,
          protein: 12,
          carbs: 45,
          fat: 14,
          ingredients: [
            { name: "Quinoa", weight: "60g" },
            { name: "Mixed Vegetables", weight: "150g" },
            { name: "Olive Oil", weight: "10ml" },
          ],
        },
        {
          name: "Turkey Sandwich on Whole Grain Bread",
          calories: 320,
          protein: 20,
          carbs: 35,
          fat: 12,
          ingredients: [
            { name: "Turkey Breast", weight: "100g" },
            { name: "Whole Grain Bread", weight: "2 slices (60g)" },
            { name: "Lettuce", weight: "20g" },
            { name: "Mayonnaise", weight: "10g" },
          ],
        },
        {
          name: "Vegetable Soup with Grilled Cheese",
          calories: 200,
          protein: 8,
          carbs: 25,
          fat: 8,
          ingredients: [
            { name: "Mixed Vegetables", weight: "200g" },
            { name: "Cheddar Cheese", weight: "30g" },
            { name: "Whole Grain Bread", weight: "1 slice (30g)" },
          ],
        },
        {
          name: "Tuna Salad with Crackers",
          calories: 280,
          protein: 22,
          carbs: 10,
          fat: 16,
          ingredients: [
            { name: "Canned Tuna", weight: "100g" },
            { name: "Crackers", weight: "30g" },
            { name: "Mayonnaise", weight: "15g" },
            { name: "Celery", weight: "50g" },
          ],
        },
      ],
      dinner: [
        {
          name: "Salmon with Roasted Vegetables",
          calories: 420,
          protein: 28,
          carbs: 20,
          fat: 22,
          ingredients: [
            { name: "Salmon Fillet", weight: "150g" },
            { name: "Mixed Vegetables", weight: "150g" },
            { name: "Olive Oil", weight: "15ml" },
          ],
        },
        {
          name: "Lean Beef Stir Fry with Brown Rice",
          calories: 380,
          protein: 25,
          carbs: 25,
          fat: 18,
          ingredients: [
            { name: "Lean Beef", weight: "120g" },
            { name: "Brown Rice", weight: "60g" },
            { name: "Mixed Vegetables", weight: "100g" },
            { name: "Soy Sauce", weight: "15ml" },
          ],
        },
        {
          name: "Vegetarian Pasta with Marinara Sauce",
          calories: 350,
          protein: 12,
          carbs: 45,
          fat: 12,
          ingredients: [
            { name: "Pasta", weight: "80g" },
            { name: "Marinara Sauce", weight: "100g" },
            { name: "Olive Oil", weight: "10ml" },
          ],
        },
        {
          name: "Chicken Butter Masala",
          calories: 400,
          protein: 30,
          carbs: 35,
          fat: 14,
          ingredients: [
            { name: "Chicken", weight: "300g" },
            { name: "Butter", weight: "15g" },
            { name: "Tomato Puree", weight: "100g" },
            { name: "Cream", weight: "50ml" },
          ],
        },
        {
          name: "Tofu Curry with Basmati Rice",
          calories: 320,
          protein: 15,
          carbs: 30,
          fat: 16,
          ingredients: [
            { name: "Tofu", weight: "100g" },
            { name: "Basmati Rice", weight: "60g" },
            { name: "Coconut Milk", weight: "100ml" },
            { name: "Curry Paste", weight: "20g" },
          ],
        },
      ],
      snacks: [
        {
          name: "Apple Slices with Almond Butter",
          calories: 180,
          protein: 4,
          carbs: 20,
          fat: 10,
          ingredients: [
            { name: "Apple", weight: "150g" },
            { name: "Almond Butter", weight: "15g" },
          ],
        },
        {
          name: "Hummus with Carrot and Celery Sticks",
          calories: 150,
          protein: 6,
          carbs: 18,
          fat: 8,
          ingredients: [
            { name: "Hummus", weight: "50g" },
            { name: "Carrots", weight: "50g" },
            { name: "Celery", weight: "50g" },
          ],
        },
        {
          name: "Greek Yogurt with Mixed Berries",
          calories: 120,
          protein: 12,
          carbs: 8,
          fat: 4,
          ingredients: [
            { name: "Greek Yogurt", weight: "100g" },
            { name: "Mixed Berries", weight: "50g" },
          ],
        },
        {
          name: "Mixed Nuts and Dried Cranberries",
          calories: 200,
          protein: 6,
          carbs: 8,
          fat: 18,
          ingredients: [
            { name: "Mixed Nuts", weight: "30g" },
            { name: "Dried Cranberries", weight: "20g" },
          ],
        },
        {
          name: "Banana with Peanut Butter",
          calories: 220,
          protein: 6,
          carbs: 25,
          fat: 12,
          ingredients: [
            { name: "Banana", weight: "120g" },
            { name: "Peanut Butter", weight: "15g" },
          ],
        },
      ],
    };

    const meals =
      fallbackMeals[mealType as keyof typeof fallbackMeals] ||
      fallbackMeals.breakfast;

    return meals.map((meal, index) => ({
      id: `fallback_${mealType}_${index}`,
      name: meal.name,
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.carbs,
      fat: meal.fat,
      category: mealType,
      ingredients: meal.ingredients || [],
    }));
  }

  isApiKeyConfigured(): boolean {
    return !!this.apiKey && !!this.model;
  }

  getApiKey(): string | null {
    return this.apiKey;
  }
}

export default new GeminiService();