// // // // // // // // // import { GoogleGenerativeAI } from "@google/generative-ai";

// // // // // // // // // interface PersonalInfo {
// // // // // // // // //   name: string;
// // // // // // // // //   age: string;
// // // // // // // // //   gender: string;
// // // // // // // // //   weight: string;
// // // // // // // // //   height: string;
// // // // // // // // //   activityLevel: string;
// // // // // // // // //   goal: string;
// // // // // // // // //   dietaryRestrictions: string[];
// // // // // // // // //   allergies: string[];
// // // // // // // // //   targetCalories: string; // Calculated automatically based on user data
// // // // // // // // // }

// // // // // // // // // interface FoodItem {
// // // // // // // // //   id: string;
// // // // // // // // //   name: string;
// // // // // // // // //   calories: number;
// // // // // // // // //   protein: number;
// // // // // // // // //   carbs: number;
// // // // // // // // //   fat: number;
// // // // // // // // //   category: string;
// // // // // // // // // }

// // // // // // // // // class GeminiService {
// // // // // // // // //   private genAI: GoogleGenerativeAI | null = null;
// // // // // // // // //   private model: any = null;
// // // // // // // // //   private apiKey: string | null = null;

// // // // // // // // //   constructor() {
// // // // // // // // //     // Don't initialize with a placeholder key
// // // // // // // // //     // The API key will be set when needed
// // // // // // // // //   }

// // // // // // // // //   setApiKey(apiKey: string) {
// // // // // // // // //     if (!apiKey || apiKey.trim() === "") {
// // // // // // // // //       throw new Error("API key is required");
// // // // // // // // //     }

// // // // // // // // //     this.apiKey = apiKey.trim();
// // // // // // // // //     this.genAI = new GoogleGenerativeAI(this.apiKey);
// // // // // // // // //     // Use gemini-pro model which is more stable and available
// // // // // // // // //     this.model = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
// // // // // // // // //   }

// // // // // // // // //   async generateMealRecommendations(
// // // // // // // // //     personalInfo: PersonalInfo,
// // // // // // // // //     mealType: string,
// // // // // // // // //     currentMeals: any[] = []
// // // // // // // // //   ): Promise<FoodItem[]> {
// // // // // // // // //     try {
// // // // // // // // //       // Check if API key is set
// // // // // // // // //       if (!this.apiKey || !this.model) {
// // // // // // // // //         throw new Error(
// // // // // // // // //           "API key not configured. Please set your Gemini API key in Settings."
// // // // // // // // //         );
// // // // // // // // //       }

// // // // // // // // //       const prompt = this.buildPrompt(personalInfo, mealType, currentMeals);

// // // // // // // // //       const result = await this.model.generateContent(prompt);
// // // // // // // // //       const response = await result.response;
// // // // // // // // //       const text = response.text();

// // // // // // // // //       return this.parseAIResponse(text);
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error("Error generating meal recommendations:", error);

// // // // // // // // //       // Handle specific error types
// // // // // // // // //       if (error instanceof Error) {
// // // // // // // // //         if (error.message.includes("API key")) {
// // // // // // // // //           throw error;
// // // // // // // // //         }

// // // // // // // // //         // Handle model overload or service unavailable errors
// // // // // // // // //         if (
// // // // // // // // //           error.message.includes("overloaded") ||
// // // // // // // // //           error.message.includes("503") ||
// // // // // // // // //           error.message.includes("service unavailable") ||
// // // // // // // // //           error.message.includes("quota exceeded")
// // // // // // // // //         ) {
// // // // // // // // //           throw new Error(
// // // // // // // // //             "AI service is currently busy. Please try again in a few minutes, or use fallback recommendations."
// // // // // // // // //           );
// // // // // // // // //         }
// // // // // // // // //       }

// // // // // // // // //       // For other errors, return fallback recommendations
// // // // // // // // //       return this.getFallbackRecommendations(mealType);
// // // // // // // // //     }
// // // // // // // // //   }

// // // // // // // // //   private buildPrompt(
// // // // // // // // //     personalInfo: PersonalInfo,
// // // // // // // // //     mealType: string,
// // // // // // // // //     currentMeals: any[]
// // // // // // // // //   ): string {
// // // // // // // // //     const currentNutrition = this.calculateCurrentNutrition(currentMeals);
// // // // // // // // //     const remainingCalories =
// // // // // // // // //       parseInt(personalInfo.targetCalories) - currentNutrition.calories;

// // // // // // // // //     // Map meal types to more descriptive names
// // // // // // // // //     const mealTypeDescriptions = {
// // // // // // // // //       breakfast: "breakfast (morning meal)",
// // // // // // // // //       lunch: "lunch (midday meal)",
// // // // // // // // //       dinner: "dinner (evening meal)",
// // // // // // // // //       snacks: "snack (light meal between main meals)",
// // // // // // // // //     };

// // // // // // // // //     const mealDescription =
// // // // // // // // //       mealTypeDescriptions[mealType as keyof typeof mealTypeDescriptions] ||
// // // // // // // // //       mealType;

// // // // // // // // //     return `You are a professional nutritionist and chef. Generate exactly 5 personalized meal recommendations for ${mealDescription} based on the following user profile.

// // // // // // // // // IMPORTANT: Only generate recommendations for ${mealDescription}. Do NOT include recommendations for other meal types like breakfast, lunch, dinner, or snacks unless specifically requested.

// // // // // // // // // USER PROFILE:
// // // // // // // // // - Name: ${personalInfo.name}
// // // // // // // // // - Age: ${personalInfo.age} years old
// // // // // // // // // - Gender: ${personalInfo.gender}
// // // // // // // // // - Weight: ${personalInfo.weight} kg
// // // // // // // // // - Height: ${personalInfo.height} cm
// // // // // // // // // - Activity Level: ${personalInfo.activityLevel}
// // // // // // // // // - Goal: ${personalInfo.goal}
// // // // // // // // // - Target Calories: ${personalInfo.targetCalories} calories/day
// // // // // // // // // - Dietary Restrictions: ${personalInfo.dietaryRestrictions.join(", ") || "None"}
// // // // // // // // // - Allergies: ${personalInfo.allergies.join(", ") || "None"}

// // // // // // // // // CURRENT NUTRITION TODAY:
// // // // // // // // // - Calories consumed: ${currentNutrition.calories}
// // // // // // // // // - Protein consumed: ${currentNutrition.protein}g
// // // // // // // // // - Carbs consumed: ${currentNutrition.carbs}g
// // // // // // // // // - Fat consumed: ${currentNutrition.fat}g
// // // // // // // // // - Remaining calories for today: ${remainingCalories}

// // // // // // // // // MEAL TYPE: ${mealDescription}

// // // // // // // // // REQUIREMENTS:
// // // // // // // // // 1. Generate exactly 5 meal options for ${mealDescription} ONLY
// // // // // // // // // 2. Each meal must be appropriate for ${mealDescription} timing and context
// // // // // // // // // 3. Consider the user's dietary restrictions and allergies
// // // // // // // // // 4. Ensure meals align with their fitness goal
// // // // // // // // // 5. Consider remaining daily calories and nutrition needs
// // // // // // // // // 6. Make meals realistic and easy to prepare
// // // // // // // // // 7. Include nutritional information for each meal
// // // // // // // // // 8. Focus only on ${mealDescription} - do not mix with other meal types

// // // // // // // // // RESPONSE FORMAT:
// // // // // // // // // Return a JSON array with exactly 5 objects, each containing:
// // // // // // // // // {
// // // // // // // // //   "id": "unique_id",
// // // // // // // // //   "name": "Meal Name",
// // // // // // // // //   "calories": number,
// // // // // // // // //   "protein": number,
// // // // // // // // //   "carbs": number,
// // // // // // // // //   "fat": number,
// // // // // // // // //   "category": "${mealType}"
// // // // // // // // // }

// // // // // // // // // Example for breakfast:
// // // // // // // // // [
// // // // // // // // //   {
// // // // // // // // //     "id": "breakfast_1",
// // // // // // // // //     "name": "Greek Yogurt with Berries and Nuts",
// // // // // // // // //     "calories": 320,
// // // // // // // // //     "protein": 18,
// // // // // // // // //     "carbs": 25,
// // // // // // // // //     "fat": 12,
// // // // // // // // //     "category": "breakfast"
// // // // // // // // //   }
// // // // // // // // // ]

// // // // // // // // // Example for lunch:
// // // // // // // // // [
// // // // // // // // //   {
// // // // // // // // //     "id": "lunch_1",
// // // // // // // // //     "name": "Grilled Chicken Salad",
// // // // // // // // //     "calories": 350,
// // // // // // // // //     "protein": 25,
// // // // // // // // //     "carbs": 15,
// // // // // // // // //     "fat": 18,
// // // // // // // // //     "category": "lunch"
// // // // // // // // //   }
// // // // // // // // // ]

// // // // // // // // // Only return the JSON array, no additional text.`;
// // // // // // // // //   }

// // // // // // // // //   private calculateCurrentNutrition(meals: any[]): {
// // // // // // // // //     calories: number;
// // // // // // // // //     protein: number;
// // // // // // // // //     carbs: number;
// // // // // // // // //     fat: number;
// // // // // // // // //   } {
// // // // // // // // //     return meals.reduce(
// // // // // // // // //       (total, meal) => {
// // // // // // // // //         if (meal.food) {
// // // // // // // // //           total.calories += meal.food.calories;
// // // // // // // // //           total.protein += meal.food.protein;
// // // // // // // // //           total.carbs += meal.food.carbs;
// // // // // // // // //           total.fat += meal.food.fat;
// // // // // // // // //         }
// // // // // // // // //         return total;
// // // // // // // // //       },
// // // // // // // // //       { calories: 0, protein: 0, carbs: 0, fat: 0 }
// // // // // // // // //     );
// // // // // // // // //   }

// // // // // // // // //   private parseAIResponse(response: string): FoodItem[] {
// // // // // // // // //     try {
// // // // // // // // //       // Extract JSON from the response
// // // // // // // // //       const jsonMatch = response.match(/\[[\s\S]*\]/);
// // // // // // // // //       if (jsonMatch) {
// // // // // // // // //         const parsed = JSON.parse(jsonMatch[0]);
// // // // // // // // //         return parsed.map((item: any, index: number) => ({
// // // // // // // // //           id: item.id || `ai_meal_${Date.now()}_${index}`,
// // // // // // // // //           name: item.name,
// // // // // // // // //           calories: parseInt(item.calories) || 0,
// // // // // // // // //           protein: parseInt(item.protein) || 0,
// // // // // // // // //           carbs: parseInt(item.carbs) || 0,
// // // // // // // // //           fat: parseInt(item.fat) || 0,
// // // // // // // // //           category: item.category || "general",
// // // // // // // // //         }));
// // // // // // // // //       }
// // // // // // // // //       throw new Error("No valid JSON found in response");
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error("Error parsing AI response:", error);
// // // // // // // // //       return this.getFallbackRecommendations("general");
// // // // // // // // //     }
// // // // // // // // //   }

// // // // // // // // //   private getFallbackRecommendations(mealType: string): FoodItem[] {
// // // // // // // // //     const fallbackMeals = {
// // // // // // // // //       breakfast: [
// // // // // // // // //         {
// // // // // // // // //           name: "Oatmeal with Berries and Almonds",
// // // // // // // // //           calories: 280,
// // // // // // // // //           protein: 8,
// // // // // // // // //           carbs: 45,
// // // // // // // // //           fat: 6,
// // // // // // // // //         },
// // // // // // // // //         {
// // // // // // // // //           name: "Greek Yogurt with Honey and Granola",
// // // // // // // // //           calories: 200,
// // // // // // // // //           protein: 15,
// // // // // // // // //           carbs: 20,
// // // // // // // // //           fat: 8,
// // // // // // // // //         },
// // // // // // // // //         {
// // // // // // // // //           name: "Whole Grain Toast with Avocado and Eggs",
// // // // // // // // //           calories: 320,
// // // // // // // // //           protein: 10,
// // // // // // // // //           carbs: 35,
// // // // // // // // //           fat: 18,
// // // // // // // // //         },
// // // // // // // // //         {
// // // // // // // // //           name: "Smoothie Bowl with Banana and Berries",
// // // // // // // // //           calories: 250,
// // // // // // // // //           protein: 12,
// // // // // // // // //           carbs: 30,
// // // // // // // // //           fat: 8,
// // // // // // // // //         },
// // // // // // // // //         {
// // // // // // // // //           name: "Scrambled Eggs with Spinach and Toast",
// // // // // // // // //           calories: 220,
// // // // // // // // //           protein: 18,
// // // // // // // // //           carbs: 5,
// // // // // // // // //           fat: 12,
// // // // // // // // //         },
// // // // // // // // //       ],
// // // // // // // // //       lunch: [
// // // // // // // // //         {
// // // // // // // // //           name: "Grilled Chicken Salad with Mixed Greens",
// // // // // // // // //           calories: 350,
// // // // // // // // //           protein: 25,
// // // // // // // // //           carbs: 15,
// // // // // // // // //           fat: 18,
// // // // // // // // //         },
// // // // // // // // //         {
// // // // // // // // //           name: "Quinoa Bowl with Roasted Vegetables",
// // // // // // // // //           calories: 380,
// // // // // // // // //           protein: 12,
// // // // // // // // //           carbs: 45,
// // // // // // // // //           fat: 14,
// // // // // // // // //         },
// // // // // // // // //         {
// // // // // // // // //           name: "Turkey Sandwich on Whole Grain Bread",
// // // // // // // // //           calories: 320,
// // // // // // // // //           protein: 20,
// // // // // // // // //           carbs: 35,
// // // // // // // // //           fat: 12,
// // // // // // // // //         },
// // // // // // // // //         {
// // // // // // // // //           name: "Vegetable Soup with Grilled Cheese",
// // // // // // // // //           calories: 200,
// // // // // // // // //           protein: 8,
// // // // // // // // //           carbs: 25,
// // // // // // // // //           fat: 8,
// // // // // // // // //         },
// // // // // // // // //         {
// // // // // // // // //           name: "Tuna Salad with Crackers",
// // // // // // // // //           calories: 280,
// // // // // // // // //           protein: 22,
// // // // // // // // //           carbs: 10,
// // // // // // // // //           fat: 16,
// // // // // // // // //         },
// // // // // // // // //       ],
// // // // // // // // //       dinner: [
// // // // // // // // //         {
// // // // // // // // //           name: "Salmon with Roasted Vegetables",
// // // // // // // // //           calories: 420,
// // // // // // // // //           protein: 28,
// // // // // // // // //           carbs: 20,
// // // // // // // // //           fat: 22,
// // // // // // // // //         },
// // // // // // // // //         {
// // // // // // // // //           name: "Lean Beef Stir Fry with Brown Rice",
// // // // // // // // //           calories: 380,
// // // // // // // // //           protein: 25,
// // // // // // // // //           carbs: 25,
// // // // // // // // //           fat: 18,
// // // // // // // // //         },
// // // // // // // // //         {
// // // // // // // // //           name: "Vegetarian Pasta with Marinara Sauce",
// // // // // // // // //           calories: 350,
// // // // // // // // //           protein: 12,
// // // // // // // // //           carbs: 45,
// // // // // // // // //           fat: 12,
// // // // // // // // //         },
// // // // // // // // //         {
// // // // // // // // //           name: "Chicken Breast with Quinoa and Broccoli",
// // // // // // // // //           calories: 400,
// // // // // // // // //           protein: 30,
// // // // // // // // //           carbs: 35,
// // // // // // // // //           fat: 14,
// // // // // // // // //         },
// // // // // // // // //         {
// // // // // // // // //           name: "Tofu Curry with Basmati Rice",
// // // // // // // // //           calories: 320,
// // // // // // // // //           protein: 15,
// // // // // // // // //           carbs: 30,
// // // // // // // // //           fat: 16,
// // // // // // // // //         },
// // // // // // // // //       ],
// // // // // // // // //       snacks: [
// // // // // // // // //         {
// // // // // // // // //           name: "Apple Slices with Almond Butter",
// // // // // // // // //           calories: 180,
// // // // // // // // //           protein: 4,
// // // // // // // // //           carbs: 20,
// // // // // // // // //           fat: 10,
// // // // // // // // //         },
// // // // // // // // //         {
// // // // // // // // //           name: "Hummus with Carrot and Celery Sticks",
// // // // // // // // //           calories: 150,
// // // // // // // // //           protein: 6,
// // // // // // // // //           carbs: 18,
// // // // // // // // //           fat: 8,
// // // // // // // // //         },
// // // // // // // // //         {
// // // // // // // // //           name: "Greek Yogurt with Mixed Berries",
// // // // // // // // //           calories: 120,
// // // // // // // // //           protein: 12,
// // // // // // // // //           carbs: 8,
// // // // // // // // //           fat: 4,
// // // // // // // // //         },
// // // // // // // // //         {
// // // // // // // // //           name: "Mixed Nuts and Dried Cranberries",
// // // // // // // // //           calories: 200,
// // // // // // // // //           protein: 6,
// // // // // // // // //           carbs: 8,
// // // // // // // // //           fat: 18,
// // // // // // // // //         },
// // // // // // // // //         {
// // // // // // // // //           name: "Banana with Peanut Butter",
// // // // // // // // //           calories: 220,
// // // // // // // // //           protein: 6,
// // // // // // // // //           carbs: 25,
// // // // // // // // //           fat: 12,
// // // // // // // // //         },
// // // // // // // // //       ],
// // // // // // // // //     };

// // // // // // // // //     const meals =
// // // // // // // // //       fallbackMeals[mealType as keyof typeof fallbackMeals] ||
// // // // // // // // //       fallbackMeals.breakfast;

// // // // // // // // //     return meals.map((meal, index) => ({
// // // // // // // // //       id: `fallback_${mealType}_${index}`,
// // // // // // // // //       name: meal.name,
// // // // // // // // //       calories: meal.calories,
// // // // // // // // //       protein: meal.protein,
// // // // // // // // //       carbs: meal.carbs,
// // // // // // // // //       fat: meal.fat,
// // // // // // // // //       category: mealType,
// // // // // // // // //     }));
// // // // // // // // //   }

// // // // // // // // //   // Check if API key is configured
// // // // // // // // //   isApiKeyConfigured(): boolean {
// // // // // // // // //     return !!this.apiKey && !!this.model;
// // // // // // // // //   }

// // // // // // // // //   // Get the current API key (for debugging)
// // // // // // // // //   getApiKey(): string | null {
// // // // // // // // //     return this.apiKey;
// // // // // // // // //   }
// // // // // // // // // }

// // // // // // // // // export default new GeminiService();



// // // // // // // // import { GoogleGenerativeAI } from "@google/generative-ai";

// // // // // // // // interface PersonalInfo {
// // // // // // // //   name: string;
// // // // // // // //   age: string;
// // // // // // // //   gender: string;
// // // // // // // //   weight: string;
// // // // // // // //   height: string;
// // // // // // // //   activityLevel: string;
// // // // // // // //   goal: string;
// // // // // // // //   dietaryRestrictions: string[];
// // // // // // // //   allergies: string[];
// // // // // // // //   targetCalories: string;
// // // // // // // // }

// // // // // // // // interface FoodItem {
// // // // // // // //   id: string;
// // // // // // // //   name: string;
// // // // // // // //   calories: number;
// // // // // // // //   protein: number;
// // // // // // // //   carbs: number;
// // // // // // // //   fat: number;
// // // // // // // //   category: string;
// // // // // // // //   ingredients: { name: string; weight: string }[]; // Added ingredients field
// // // // // // // // }

// // // // // // // // class GeminiService {
// // // // // // // //   private genAI: GoogleGenerativeAI | null = null;
// // // // // // // //   private model: any = null;
// // // // // // // //   private apiKey: string | null = null;

// // // // // // // //   constructor() {}

// // // // // // // //   setApiKey(apiKey: string) {
// // // // // // // //     if (!apiKey || apiKey.trim() === "") {
// // // // // // // //       throw new Error("API key is required");
// // // // // // // //     }

// // // // // // // //     this.apiKey = apiKey.trim();
// // // // // // // //     this.genAI = new GoogleGenerativeAI(this.apiKey);
// // // // // // // //     this.model = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
// // // // // // // //   }

// // // // // // // //   async generateMealRecommendations(
// // // // // // // //     personalInfo: PersonalInfo,
// // // // // // // //     mealType: string,
// // // // // // // //     currentMeals: any[] = []
// // // // // // // //   ): Promise<FoodItem[]> {
// // // // // // // //     try {
// // // // // // // //       if (!this.apiKey || !this.model) {
// // // // // // // //         throw new Error(
// // // // // // // //           "API key not configured. Please set your Gemini API key in Settings."
// // // // // // // //         );
// // // // // // // //       }

// // // // // // // //       const prompt = this.buildPrompt(personalInfo, mealType, currentMeals);

// // // // // // // //       const result = await this.model.generateContent(prompt);
// // // // // // // //       const response = await result.response;
// // // // // // // //       const text = response.text();

// // // // // // // //       return this.parseAIResponse(text, mealType);
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error("Error generating meal recommendations:", error);

// // // // // // // //       if (error instanceof Error) {
// // // // // // // //         if (error.message.includes("API key")) {
// // // // // // // //           throw error;
// // // // // // // //         }

// // // // // // // //         if (
// // // // // // // //           error.message.includes("overloaded") ||
// // // // // // // //           error.message.includes("503") ||
// // // // // // // //           error.message.includes("service unavailable") ||
// // // // // // // //           error.message.includes("quota exceeded")
// // // // // // // //         ) {
// // // // // // // //           throw new Error(
// // // // // // // //             "AI service is currently busy. Please try again in a few minutes, or use fallback recommendations."
// // // // // // // //           );
// // // // // // // //         }
// // // // // // // //       }

// // // // // // // //       return this.getFallbackRecommendations(mealType);
// // // // // // // //     }
// // // // // // // //   }

// // // // // // // //   private buildPrompt(
// // // // // // // //     personalInfo: PersonalInfo,
// // // // // // // //     mealType: string,
// // // // // // // //     currentMeals: any[]
// // // // // // // //   ): string {
// // // // // // // //     const currentNutrition = this.calculateCurrentNutrition(currentMeals);
// // // // // // // //     const remainingCalories =
// // // // // // // //       parseInt(personalInfo.targetCalories) - currentNutrition.calories;

// // // // // // // //     const mealTypeDescriptions = {
// // // // // // // //       breakfast: "breakfast (morning meal)",
// // // // // // // //       lunch: "lunch (midday meal)",
// // // // // // // //       dinner: "dinner (evening meal)",
// // // // // // // //       snacks: "snack (light meal between main meals)",
// // // // // // // //     };

// // // // // // // //     const mealDescription =
// // // // // // // //       mealTypeDescriptions[mealType as keyof typeof mealTypeDescriptions] ||
// // // // // // // //       mealType;

// // // // // // // //     return `You are a professional nutritionist and chef. Generate exactly 5 personalized meal recommendations for ${mealDescription} based on the following user profile.

// // // // // // // // IMPORTANT: Only generate recommendations for ${mealDescription}. Do NOT include recommendations for other meal types like breakfast, lunch, dinner, or snacks unless specifically requested.

// // // // // // // // USER PROFILE:
// // // // // // // // - Name: ${personalInfo.name}
// // // // // // // // - Age: ${personalInfo.age} years old
// // // // // // // // - Gender: ${personalInfo.gender}
// // // // // // // // - Weight: ${personalInfo.weight} kg
// // // // // // // // - Height: ${personalInfo.height} cm
// // // // // // // // - Activity Level: ${personalInfo.activityLevel}
// // // // // // // // - Goal: ${personalInfo.goal}
// // // // // // // // - Target Calories: ${personalInfo.targetCalories} calories/day
// // // // // // // // - Dietary Restrictions: ${personalInfo.dietaryRestrictions.join(", ") || "None"}
// // // // // // // // - Allergies: ${personalInfo.allergies.join(", ") || "None"}

// // // // // // // // CURRENT NUTRITION TODAY:
// // // // // // // // - Calories consumed: ${currentNutrition.calories}
// // // // // // // // - Protein consumed: ${currentNutrition.protein}g
// // // // // // // // - Carbs consumed: ${currentNutrition.carbs}g
// // // // // // // // - Fat consumed: ${currentNutrition.fat}g
// // // // // // // // - Remaining calories for today: ${remainingCalories}

// // // // // // // // MEAL TYPE: ${mealDescription}

// // // // // // // // REQUIREMENTS:
// // // // // // // // 1. Generate exactly 5 meal options for ${mealDescription} ONLY
// // // // // // // // 2. Each meal must be appropriate for ${mealDescription} timing and context
// // // // // // // // 3. Consider the user's dietary restrictions and allergies
// // // // // // // // 4. Ensure meals align with their fitness goal
// // // // // // // // 5. Consider remaining daily calories and nutrition needs
// // // // // // // // 6. Make meals realistic and easy to prepare
// // // // // // // // 7. Include nutritional information and main ingredients with their weights for each meal
// // // // // // // // 8. Focus only on ${mealDescription} - do not mix with other meal types

// // // // // // // // RESPONSE FORMAT:
// // // // // // // // Return a JSON array with exactly 5 objects, each containing:
// // // // // // // // {
// // // // // // // //   "id": "unique_id",
// // // // // // // //   "name": "Meal Name",
// // // // // // // //   "calories": number,
// // // // // // // //   "protein": number,
// // // // // // // //   "carbs": number,
// // // // // // // //   "fat": number,
// // // // // // // //   "category": "${mealType}",
// // // // // // // //   "ingredients": [
// // // // // // // //     { "name": "Ingredient Name", "weight": "Weight (e.g., 100g, 50ml)" },
// // // // // // // //     ...
// // // // // // // //   ]
// // // // // // // // }

// // // // // // // // Example for breakfast:
// // // // // // // // [
// // // // // // // //   {
// // // // // // // //     "id": "breakfast_1",
// // // // // // // //     "name": "Greek Yogurt with Berries and Nuts",
// // // // // // // //     "calories": 320,
// // // // // // // //     "protein": 18,
// // // // // // // //     "carbs": 25,
// // // // // // // //     "fat": 12,
// // // // // // // //     "category": "breakfast",
// // // // // // // //     "ingredients": [
// // // // // // // //       { "name": "Greek Yogurt", "weight": "150g" },
// // // // // // // //       { "name": "Mixed Berries", "weight": "100g" },
// // // // // // // //       { "name": "Almonds", "weight": "15g" }
// // // // // // // //     ]
// // // // // // // //   }
// // // // // // // // ]

// // // // // // // // Example for dinner:
// // // // // // // // [
// // // // // // // //   {
// // // // // // // //     "id": "dinner_1",
// // // // // // // //     "name": "Chicken Butter Masala",
// // // // // // // //     "calories": 400,
// // // // // // // //     "protein": 30,
// // // // // // // //     "carbs": 35,
// // // // // // // //     "fat": 14,
// // // // // // // //     "category": "dinner",
// // // // // // // //     "ingredients": [
// // // // // // // //       { "name": "Chicken", "weight": "300g" },
// // // // // // // //       { "name": "Butter", "weight": "15g" },
// // // // // // // //       { "name": "Tomato Puree", "weight": "100g" },
// // // // // // // //       { "name": "Cream", "weight": "50ml" }
// // // // // // // //     ]
// // // // // // // //   }
// // // // // // // // ]

// // // // // // // // Only return the JSON array, no additional text.`;
// // // // // // // //   }

// // // // // // // //   private calculateCurrentNutrition(meals: any[]): {
// // // // // // // //     calories: number;
// // // // // // // //     protein: number;
// // // // // // // //     carbs: number;
// // // // // // // //     fat: number;
// // // // // // // //   } {
// // // // // // // //     return meals.reduce(
// // // // // // // //       (total, meal) => {
// // // // // // // //         if (meal.food) {
// // // // // // // //           total.calories += meal.food.calories;
// // // // // // // //           total.protein += meal.food.protein;
// // // // // // // //           total.carbs += meal.food.carbs;
// // // // // // // //           total.fat += meal.food.fat;
// // // // // // // //         }
// // // // // // // //         return total;
// // // // // // // //       },
// // // // // // // //       { calories: 0, protein: 0, carbs: 0, fat: 0 }
// // // // // // // //     );
// // // // // // // //   }

// // // // // // // //   private parseAIResponse(response: string, mealType: string): FoodItem[] {
// // // // // // // //     try {
// // // // // // // //       const jsonMatch = response.match(/\[[\s\S]*\]/);
// // // // // // // //       if (jsonMatch) {
// // // // // // // //         const parsed = JSON.parse(jsonMatch[0]);
// // // // // // // //         return parsed.map((item: any, index: number) => ({
// // // // // // // //           id: item.id || `ai_meal_${Date.now()}_${index}`,
// // // // // // // //           name: item.name,
// // // // // // // //           calories: parseInt(item.calories) || 0,
// // // // // // // //           protein: parseInt(item.protein) || 0,
// // // // // // // //           carbs: parseInt(item.carbs) || 0,
// // // // // // // //           fat: parseInt(item.fat) || 0,
// // // // // // // //           category: item.category || mealType,
// // // // // // // //           ingredients: item.ingredients || [], // Parse ingredients
// // // // // // // //         }));
// // // // // // // //       }
// // // // // // // //       throw new Error("No valid JSON found in response");
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error("Error parsing AI response:", error);
// // // // // // // //       return this.getFallbackRecommendations(mealType);
// // // // // // // //     }
// // // // // // // //   }

// // // // // // // //   private getFallbackRecommendations(mealType: string): FoodItem[] {
// // // // // // // //     const fallbackMeals = {
// // // // // // // //       breakfast: [
// // // // // // // //         {
// // // // // // // //           name: "Oatmeal with Berries and Almonds",
// // // // // // // //           calories: 280,
// // // // // // // //           protein: 8,
// // // // // // // //           carbs: 45,
// // // // // // // //           fat: 6,
// // // // // // // //           ingredients: [
// // // // // // // //             { name: "Oats", weight: "50g" },
// // // // // // // //             { name: "Mixed Berries", weight: "100g" },
// // // // // // // //             { name: "Almonds", weight: "15g" },
// // // // // // // //             { name: "Milk", weight: "200ml" },
// // // // // // // //           ],
// // // // // // // //         },
// // // // // // // //         {
// // // // // // // //           name: "Greek Yogurt with Honey and Granola",
// // // // // // // //           calories: 200,
// // // // // // // //           protein: 15,
// // // // // // // //           carbs: 20,
// // // // // // // //           fat: 8,
// // // // // // // //           ingredients: [
// // // // // // // //             { name: "Greek Yogurt", weight: "150g" },
// // // // // // // //             { name: "Honey", weight: "10g" },
// // // // // // // //             { name: "Granola", weight: "30g" },
// // // // // // // //           ],
// // // // // // // //         },
// // // // // // // //         {
// // // // // // // //           name: "Whole Grain Toast with Avocado and Eggs",
// // // // // // // //           calories: 320,
// // // // // // // //           protein: 10,
// // // // // // // //           carbs: 35,
// // // // // // // //           fat: 18,
// // // // // // // //           ingredients: [
// // // // // // // //             { name: "Whole Grain Bread", weight: "2 slices (60g)" },
// // // // // // // //             { name: "Avocado", weight: "70g" },
// // // // // // // //             { name: "Eggs", weight: "2 large (100g)" },
// // // // // // // //           ],
// // // // // // // //         },
// // // // // // // //         {
// // // // // // // //           name: "Smoothie Bowl with Banana and Berries",
// // // // // // // //           calories: 250,
// // // // // // // //           protein: 12,
// // // // // // // //           carbs: 30,
// // // // // // // //           fat: 8,
// // // // // // // //           ingredients: [
// // // // // // // //             { name: "Banana", weight: "120g" },
// // // // // // // //             { name: "Mixed Berries", weight: "100g" },
// // // // // // // //             { name: "Greek Yogurt", weight: "100g" },
// // // // // // // //             { name: "Chia Seeds", weight: "10g" },
// // // // // // // //           ],
// // // // // // // //         },
// // // // // // // //         {
// // // // // // // //           name: "Scrambled Eggs with Spinach and Toast",
// // // // // // // //           calories: 220,
// // // // // // // //           protein: 18,
// // // // // // // //           carbs: 5,
// // // // // // // //           fat: 12,
// // // // // // // //           ingredients: [
// // // // // // // //             { name: "Eggs", weight: "3 large (150g)" },
// // // // // // // //             { name: "Spinach", weight: "50g" },
// // // // // // // //             { name: "Whole Grain Bread", weight: "1 slice (30g)" },
// // // // // // // //           ],
// // // // // // // //         },
// // // // // // // //       ],
// // // // // // // //       lunch: [
// // // // // // // //         {
// // // // // // // //           name: "Grilled Chicken Salad with Mixed Greens",
// // // // // // // //           calories: 350,
// // // // // // // //           protein: 25,
// // // // // // // //           carbs: 15,
// // // // // // // //           fat: 18,
// // // // // // // //           ingredients: [
// // // // // // // //             { name: "Chicken Breast", weight: "150g" },
// // // // // // // //             { name: "Mixed Greens", weight: "100g" },
// // // // // // // //             { name: "Olive Oil", weight: "15ml" },
// // // // // // // //             { name: "Cherry Tomatoes", weight: "50g" },
// // // // // // // //           ],
// // // // // // // //         },
// // // // // // // //         {
// // // // // // // //           name: "Quinoa Bowl with Roasted Vegetables",
// // // // // // // //           calories: 380,
// // // // // // // //           protein: 12,
// // // // // // // //           carbs: 45,
// // // // // // // //           fat: 14,
// // // // // // // //           ingredients: [
// // // // // // // //             { name: "Quinoa", weight: "60g" },
// // // // // // // //             { name: "Mixed Vegetables", weight: "150g" },
// // // // // // // //             { name: "Olive Oil", weight: "10ml" },
// // // // // // // //           ],
// // // // // // // //         },
// // // // // // // //         {
// // // // // // // //           name: "Turkey Sandwich on Whole Grain Bread",
// // // // // // // //           calories: 320,
// // // // // // // //           protein: 20,
// // // // // // // //           carbs: 35,
// // // // // // // //           fat: 12,
// // // // // // // //           ingredients: [
// // // // // // // //             { name: "Turkey Breast", weight: "100g" },
// // // // // // // //             { name: "Whole Grain Bread", weight: "2 slices (60g)" },
// // // // // // // //             { name: "Lettuce", weight: "20g" },
// // // // // // // //             { name: "Mayonnaise", weight: "10g" },
// // // // // // // //           ],
// // // // // // // //         },
// // // // // // // //         {
// // // // // // // //           name: "Vegetable Soup with Grilled Cheese",
// // // // // // // //           calories: 200,
// // // // // // // //           protein: 8,
// // // // // // // //           carbs: 25,
// // // // // // // //           fat: 8,
// // // // // // // //           ingredients: [
// // // // // // // //             { name: "Mixed Vegetables", weight: "200g" },
// // // // // // // //             { name: "Cheddar Cheese", weight: "30g" },
// // // // // // // //             { name: "Whole Grain Bread", weight: "1 slice (30g)" },
// // // // // // // //           ],
// // // // // // // //         },
// // // // // // // //         {
// // // // // // // //           name: "Tuna Salad with Crackers",
// // // // // // // //           calories: 280,
// // // // // // // //           protein: 22,
// // // // // // // //           carbs: 10,
// // // // // // // //           fat: 16,
// // // // // // // //           ingredients: [
// // // // // // // //             { name: "Canned Tuna", weight: "100g" },
// // // // // // // //             { name: "Crackers", weight: "30g" },
// // // // // // // //             { name: "Mayonnaise", weight: "15g" },
// // // // // // // //             { name: "Celery", weight: "50g" },
// // // // // // // //           ],
// // // // // // // //         },
// // // // // // // //       ],
// // // // // // // //       dinner: [
// // // // // // // //         {
// // // // // // // //           name: "Salmon with Roasted Vegetables",
// // // // // // // //           calories: 420,
// // // // // // // //           protein: 28,
// // // // // // // //           carbs: 20,
// // // // // // // //           fat: 22,
// // // // // // // //           ingredients: [
// // // // // // // //             { name: "Salmon Fillet", weight: "150g" },
// // // // // // // //             { name: "Mixed Vegetables", weight: "150g" },
// // // // // // // //             { name: "Olive Oil", weight: "15ml" },
// // // // // // // //           ],
// // // // // // // //         },
// // // // // // // //         {
// // // // // // // //           name: "Lean Beef Stir Fry with Brown Rice",
// // // // // // // //           calories: 380,
// // // // // // // //           protein: 25,
// // // // // // // //           carbs: 25,
// // // // // // // //           fat: 18,
// // // // // // // //           ingredients: [
// // // // // // // //             { name: "Lean Beef", weight: "120g" },
// // // // // // // //             { name: "Brown Rice", weight: "60g" },
// // // // // // // //             { name: "Mixed Vegetables", weight: "100g" },
// // // // // // // //             { name: "Soy Sauce", weight: "15ml" },
// // // // // // // //           ],
// // // // // // // //         },
// // // // // // // //         {
// // // // // // // //           name: "Vegetarian Pasta with Marinara Sauce",
// // // // // // // //           calories: 350,
// // // // // // // //           protein: 12,
// // // // // // // //           carbs: 45,
// // // // // // // //           fat: 12,
// // // // // // // //           ingredients: [
// // // // // // // //             { name: "Pasta", weight: "80g" },
// // // // // // // //             { name: "Marinara Sauce", weight: "100g" },
// // // // // // // //             { name: "Olive Oil", weight: "10ml" },
// // // // // // // //           ],
// // // // // // // //         },
// // // // // // // //         {
// // // // // // // //           name: "Chicken Butter Masala",
// // // // // // // //           calories: 400,
// // // // // // // //           protein: 30,
// // // // // // // //           carbs: 35,
// // // // // // // //           fat: 14,
// // // // // // // //           ingredients: [
// // // // // // // //             { name: "Chicken", weight: "300g" },
// // // // // // // //             { name: "Butter", weight: "15g" },
// // // // // // // //             { name: "Tomato Puree", weight: "100g" },
// // // // // // // //             { name: "Cream", weight: "50ml" },
// // // // // // // //           ],
// // // // // // // //         },
// // // // // // // //         {
// // // // // // // //           name: "Tofu Curry with Basmati Rice",
// // // // // // // //           calories: 320,
// // // // // // // //           protein: 15,
// // // // // // // //           carbs: 30,
// // // // // // // //           fat: 16,
// // // // // // // //           ingredients: [
// // // // // // // //             { name: "Tofu", weight: "100g" },
// // // // // // // //             { name: "Basmati Rice", weight: "60g" },
// // // // // // // //             { name: "Coconut Milk", weight: "100ml" },
// // // // // // // //             { name: "Curry Paste", weight: "20g" },
// // // // // // // //           ],
// // // // // // // //         },
// // // // // // // //       ],
// // // // // // // //       snacks: [
// // // // // // // //         {
// // // // // // // //           name: "Apple Slices with Almond Butter",
// // // // // // // //           calories: 180,
// // // // // // // //           protein: 4,
// // // // // // // //           carbs: 20,
// // // // // // // //           fat: 10,
// // // // // // // //           ingredients: [
// // // // // // // //             { name: "Apple", weight: "150g" },
// // // // // // // //             { name: "Almond Butter", weight: "15g" },
// // // // // // // //           ],
// // // // // // // //         },
// // // // // // // //         {
// // // // // // // //           name: "Hummus with Carrot and Celery Sticks",
// // // // // // // //           calories: 150,
// // // // // // // //           protein: 6,
// // // // // // // //           carbs: 18,
// // // // // // // //           fat: 8,
// // // // // // // //           ingredients: [
// // // // // // // //             { name: "Hummus", weight: "50g" },
// // // // // // // //             { name: "Carrots", weight: "50g" },
// // // // // // // //             { name: "Celery", weight: "50g" },
// // // // // // // //           ],
// // // // // // // //         },
// // // // // // // //         {
// // // // // // // //           name: "Greek Yogurt with Mixed Berries",
// // // // // // // //           calories: 120,
// // // // // // // //           protein: 12,
// // // // // // // //           carbs: 8,
// // // // // // // //           fat: 4,
// // // // // // // //           ingredients: [
// // // // // // // //             { name: "Greek Yogurt", weight: "100g" },
// // // // // // // //             { name: "Mixed Berries", weight: "50g" },
// // // // // // // //           ],
// // // // // // // //         },
// // // // // // // //         {
// // // // // // // //           name: "Mixed Nuts and Dried Cranberries",
// // // // // // // //           calories: 200,
// // // // // // // //           protein: 6,
// // // // // // // //           carbs: 8,
// // // // // // // //           fat: 18,
// // // // // // // //           ingredients: [
// // // // // // // //             { name: "Mixed Nuts", weight: "30g" },
// // // // // // // //             { name: "Dried Cranberries", weight: "20g" },
// // // // // // // //           ],
// // // // // // // //         },
// // // // // // // //         {
// // // // // // // //           name: "Banana with Peanut Butter",
// // // // // // // //           calories: 220,
// // // // // // // //           protein: 6,
// // // // // // // //           carbs: 25,
// // // // // // // //           fat: 12,
// // // // // // // //           ingredients: [
// // // // // // // //             { name: "Banana", weight: "120g" },
// // // // // // // //             { name: "Peanut Butter", weight: "15g" },
// // // // // // // //           ],
// // // // // // // //         },
// // // // // // // //       ],
// // // // // // // //     };

// // // // // // // //     const meals =
// // // // // // // //       fallbackMeals[mealType as keyof typeof fallbackMeals] ||
// // // // // // // //       fallbackMeals.breakfast;

// // // // // // // //     return meals.map((meal, index) => ({
// // // // // // // //       id: `fallback_${mealType}_${index}`,
// // // // // // // //       name: meal.name,
// // // // // // // //       calories: meal.calories,
// // // // // // // //       protein: meal.protein,
// // // // // // // //       carbs: meal.carbs,
// // // // // // // //       fat: meal.fat,
// // // // // // // //       category: mealType,
// // // // // // // //       ingredients: meal.ingredients || [],
// // // // // // // //     }));
// // // // // // // //   }

// // // // // // // //   isApiKeyConfigured(): boolean {
// // // // // // // //     return !!this.apiKey && !!this.model;
// // // // // // // //   }

// // // // // // // //   getApiKey(): string | null {
// // // // // // // //     return this.apiKey;
// // // // // // // //   }
// // // // // // // // }

// // // // // // // // export default new GeminiService();


// // // // // // // import { GoogleGenerativeAI } from "@google/generative-ai";

// // // // // // // interface PersonalInfo {
// // // // // // //   name: string;
// // // // // // //   age: string;
// // // // // // //   gender: string;
// // // // // // //   weight: string;
// // // // // // //   height: string;
// // // // // // //   activityLevel: string;
// // // // // // //   goal: string;
// // // // // // //   dietaryRestrictions: string[];
// // // // // // //   allergies: string[];
// // // // // // //   targetCalories: string;
// // // // // // // }

// // // // // // // interface FoodItem {
// // // // // // //   id: string;
// // // // // // //   name: string;
// // // // // // //   calories: number;
// // // // // // //   protein: number;
// // // // // // //   carbs: number;
// // // // // // //   fat: number;
// // // // // // //   category: string;
// // // // // // //   ingredients: { name: string; weight: string }[];
// // // // // // // }

// // // // // // // class GeminiService {
// // // // // // //   private genAI: GoogleGenerativeAI | null = null;
// // // // // // //   private model: any = null;
// // // // // // //   private apiKey: string | null = null;

// // // // // // //   constructor() {}

// // // // // // //   setApiKey(apiKey: string) {
// // // // // // //     if (!apiKey || apiKey.trim() === "") {
// // // // // // //       throw new Error("API key is required");
// // // // // // //     }

// // // // // // //     this.apiKey = apiKey.trim();
// // // // // // //     this.genAI = new GoogleGenerativeAI(this.apiKey);
// // // // // // //     this.model = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
// // // // // // //   }

// // // // // // //   async generateMealRecommendations(
// // // // // // //     personalInfo: PersonalInfo,
// // // // // // //     mealType: string,
// // // // // // //     currentMeals: any[] = []
// // // // // // //   ): Promise<FoodItem[]> {
// // // // // // //     try {
// // // // // // //       if (!this.apiKey || !this.model) {
// // // // // // //         throw new Error(
// // // // // // //           "API key not configured. Please set your Gemini API key in Settings."
// // // // // // //         );
// // // // // // //       }

// // // // // // //       const prompt = this.buildPrompt(personalInfo, mealType, currentMeals);

// // // // // // //       const result = await this.model.generateContent(prompt);
// // // // // // //       const response = await result.response;
// // // // // // //       const text = response.text();

// // // // // // //       return this.parseAIResponse(text, mealType);
// // // // // // //     } catch (error) {
// // // // // // //       console.error("Error generating meal recommendations:", error);

// // // // // // //       if (error instanceof Error) {
// // // // // // //         if (error.message.includes("API key")) {
// // // // // // //           throw error;
// // // // // // //         }

// // // // // // //         if (
// // // // // // //           error.message.includes("overloaded") ||
// // // // // // //           error.message.includes("503") ||
// // // // // // //           error.message.includes("service unavailable") ||
// // // // // // //           error.message.includes("quota exceeded")
// // // // // // //         ) {
// // // // // // //           throw new Error(
// // // // // // //             "AI service is currently busy. Please try again in a few minutes, or use fallback recommendations."
// // // // // // //           );
// // // // // // //         }
// // // // // // //       }

// // // // // // //       return this.getFallbackRecommendations(mealType);
// // // // // // //     }
// // // // // // //   }

// // // // // // //   private buildPrompt(
// // // // // // //     personalInfo: PersonalInfo,
// // // // // // //     mealType: string,
// // // // // // //     currentMeals: any[]
// // // // // // //   ): string {
// // // // // // //     const currentNutrition = this.calculateCurrentNutrition(currentMeals);
// // // // // // //     const remainingCalories =
// // // // // // //       parseInt(personalInfo.targetCalories) - currentNutrition.calories;

// // // // // // //     const mealTypeDescriptions = {
// // // // // // //       breakfast: "breakfast (morning meal)",
// // // // // // //       lunch: "lunch (midday meal)",
// // // // // // //       dinner: "dinner (evening meal)",
// // // // // // //       snacks: "snack (light meal between main meals)",
// // // // // // //     };

// // // // // // //     const mealDescription =
// // // // // // //       mealTypeDescriptions[mealType as keyof typeof mealTypeDescriptions] ||
// // // // // // //       mealType;

// // // // // // //     return `You are a professional nutritionist and chef. Generate exactly 5 personalized meal recommendations for ${mealDescription} based on the following user profile.

// // // // // // // IMPORTANT: Only generate recommendations for ${mealDescription}. Do NOT include recommendations for other meal types like breakfast, lunch, dinner, or snacks unless specifically requested.

// // // // // // // USER PROFILE:
// // // // // // // - Name: ${personalInfo.name}
// // // // // // // - Age: ${personalInfo.age} years old
// // // // // // // - Gender: ${personalInfo.gender}
// // // // // // // - Weight: ${personalInfo.weight} kg
// // // // // // // - Height: ${personalInfo.height} cm
// // // // // // // - Activity Level: ${personalInfo.activityLevel}
// // // // // // // - Goal: ${personalInfo.goal}
// // // // // // // - Target Calories: ${personalInfo.targetCalories} calories/day
// // // // // // // - Dietary Restrictions: ${personalInfo.dietaryRestrictions.join(", ") || "None"}
// // // // // // // - Allergies: ${personalInfo.allergies.join(", ") || "None"}

// // // // // // // CURRENT NUTRITION TODAY:
// // // // // // // - Calories consumed: ${currentNutrition.calories}
// // // // // // // - Protein consumed: ${currentNutrition.protein}g
// // // // // // // - Carbs consumed: ${currentNutrition.carbs}g
// // // // // // // - Fat consumed: ${currentNutrition.fat}g
// // // // // // // - Remaining calories for today: ${remainingCalories}

// // // // // // // MEAL TYPE: ${mealDescription}

// // // // // // // REQUIREMENTS:
// // // // // // // 1. Generate exactly 5 meal options for ${mealDescription} ONLY
// // // // // // // 2. Each meal must be appropriate for ${mealDescription} timing and context
// // // // // // // 3. Consider the user's dietary restrictions and allergies
// // // // // // // 4. Ensure meals align with their fitness goal
// // // // // // // 5. Consider remaining daily calories and nutrition needs
// // // // // // // 6. Make meals realistic and easy to prepare
// // // // // // // 7. Include nutritional information and main ingredients with their weights for each meal
// // // // // // // 8. Focus only on ${mealDescription} - do not mix with other meal types

// // // // // // // RESPONSE FORMAT:
// // // // // // // Return a JSON array with exactly 5 objects, each containing:
// // // // // // // {
// // // // // // //   "id": "unique_id",
// // // // // // //   "name": "Meal Name",
// // // // // // //   "calories": number,
// // // // // // //   "protein": number,
// // // // // // //   "carbs": number,
// // // // // // //   "fat": number,
// // // // // // //   "category": "${mealType}",
// // // // // // //   "ingredients": [
// // // // // // //     { "name": "Ingredient Name", "weight": "Weight (e.g., 100g, 50ml)" },
// // // // // // //     ...
// // // // // // //   ]
// // // // // // // }

// // // // // // // Example for breakfast:
// // // // // // // [
// // // // // // //   {
// // // // // // //     "id": "breakfast_1",
// // // // // // //     "name": "Greek Yogurt with Berries and Nuts",
// // // // // // //     "calories": 320,
// // // // // // //     "protein": 18,
// // // // // // //     "carbs": 25,
// // // // // // //     "fat": 12,
// // // // // // //     "category": "breakfast",
// // // // // // //     "ingredients": [
// // // // // // //       { "name": "Greek Yogurt", "weight": "150g" },
// // // // // // //       { "name": "Mixed Berries", "weight": "100g" },
// // // // // // //       { "name": "Almonds", "weight": "15g" }
// // // // // // //     ]
// // // // // // //   }
// // // // // // // ]

// // // // // // // Example for dinner:
// // // // // // // [
// // // // // // //   {
// // // // // // //     "id": "dinner_1",
// // // // // // //     "name": "Chicken Butter Masala",
// // // // // // //     "calories": 400,
// // // // // // //     "protein": 30,
// // // // // // //     "carbs": 35,
// // // // // // //     "fat": 14,
// // // // // // //     "category": "dinner",
// // // // // // //     "ingredients": [
// // // // // // //       { "name": "Chicken", "weight": "300g" },
// // // // // // //       { "name": "Butter", "weight": "15g" },
// // // // // // //       { "name": "Tomato Puree", "weight": "100g" },
// // // // // // //       { "name": "Cream", "weight": "50ml" }
// // // // // // //     ]
// // // // // // //   }
// // // // // // // ]

// // // // // // // Only return the JSON array, no additional text.`;
// // // // // // //   }

// // // // // // //   private calculateCurrentNutrition(meals: any[]): {
// // // // // // //     calories: number;
// // // // // // //     protein: number;
// // // // // // //     carbs: number;
// // // // // // //     fat: number;
// // // // // // //   } {
// // // // // // //     return meals.reduce(
// // // // // // //       (total, meal) => {
// // // // // // //         if (meal.food) {
// // // // // // //           total.calories += meal.food.calories;
// // // // // // //           total.protein += meal.food.protein;
// // // // // // //           total.carbs += meal.food.carbs;
// // // // // // //           total.fat += meal.food.fat;
// // // // // // //         }
// // // // // // //         return total;
// // // // // // //       },
// // // // // // //       { calories: 0, protein: 0, carbs: 0, fat: 0 }
// // // // // // //     );
// // // // // // //   }

// // // // // // //   private parseAIResponse(response: string, mealType: string): FoodItem[] {
// // // // // // //     try {
// // // // // // //       const jsonMatch = response.match(/\[[\s\S]*\]/);
// // // // // // //       if (jsonMatch) {
// // // // // // //         const parsed = JSON.parse(jsonMatch[0]);
// // // // // // //         return parsed.map((item: any, index: number) => ({
// // // // // // //           id: item.id || `ai_meal_${Date.now()}_${index}`,
// // // // // // //           name: item.name,
// // // // // // //           calories: parseInt(item.calories) || 0,
// // // // // // //           protein: parseInt(item.protein) || 0,
// // // // // // //           carbs: parseInt(item.carbs) || 0,
// // // // // // //           fat: parseInt(item.fat) || 0,
// // // // // // //           category: item.category || mealType,
// // // // // // //           ingredients: item.ingredients || [],
// // // // // // //         }));
// // // // // // //       }
// // // // // // //       throw new Error("No valid JSON found in response");
// // // // // // //     } catch (error) {
// // // // // // //       console.error("Error parsing AI response:", error);
// // // // // // //       return this.getFallbackRecommendations(mealType);
// // // // // // //     }
// // // // // // //   }

// // // // // // //   private getFallbackRecommendations(mealType: string): FoodItem[] {
// // // // // // //     const fallbackMeals = {
// // // // // // //       breakfast: [
// // // // // // //         {
// // // // // // //           name: "Oatmeal with Berries and Almonds",
// // // // // // //           calories: 280,
// // // // // // //           protein: 8,
// // // // // // //           carbs: 45,
// // // // // // //           fat: 6,
// // // // // // //           ingredients: [
// // // // // // //             { name: "Oats", weight: "50g" },
// // // // // // //             { name: "Mixed Berries", weight: "100g" },
// // // // // // //             { name: "Almonds", weight: "15g" },
// // // // // // //             { name: "Milk", weight: "200ml" },
// // // // // // //           ],
// // // // // // //         },
// // // // // // //         {
// // // // // // //           name: "Greek Yogurt with Honey and Granola",
// // // // // // //           calories: 200,
// // // // // // //           protein: 15,
// // // // // // //           carbs: 20,
// // // // // // //           fat: 8,
// // // // // // //           ingredients: [
// // // // // // //             { name: "Greek Yogurt", weight: "150g" },
// // // // // // //             { name: "Honey", weight: "10g" },
// // // // // // //             { name: "Granola", weight: "30g" },
// // // // // // //           ],
// // // // // // //         },
// // // // // // //         {
// // // // // // //           name: "Whole Grain Toast with Avocado and Eggs",
// // // // // // //           calories: 320,
// // // // // // //           protein: 10,
// // // // // // //           carbs: 35,
// // // // // // //           fat: 18,
// // // // // // //           ingredients: [
// // // // // // //             { name: "Whole Grain Bread", weight: "2 slices (60g)" },
// // // // // // //             { name: "Avocado", weight: "70g" },
// // // // // // //             { name: "Eggs", weight: "2 large (100g)" },
// // // // // // //           ],
// // // // // // //         },
// // // // // // //         {
// // // // // // //           name: "Smoothie Bowl with Banana and Berries",
// // // // // // //           calories: 250,
// // // // // // //           protein: 12,
// // // // // // //           carbs: 30,
// // // // // // //           fat: 8,
// // // // // // //           ingredients: [
// // // // // // //             { name: "Banana", weight: "120g" },
// // // // // // //             { name: "Mixed Berries", weight: "100g" },
// // // // // // //             { name: "Greek Yogurt", weight: "100g" },
// // // // // // //             { name: "Chia Seeds", weight: "10g" },
// // // // // // //           ],
// // // // // // //         },
// // // // // // //         {
// // // // // // //           name: "Scrambled Eggs with Spinach and Toast",
// // // // // // //           calories: 220,
// // // // // // //           protein: 18,
// // // // // // //           carbs: 5,
// // // // // // //           fat: 12,
// // // // // // //           ingredients: [
// // // // // // //             { name: "Eggs", weight: "3 large (150g)" },
// // // // // // //             { name: "Spinach", weight: "50g" },
// // // // // // //             { name: "Whole Grain Bread", weight: "1 slice (30g)" },
// // // // // // //           ],
// // // // // // //         },
// // // // // // //       ],
// // // // // // //       lunch: [
// // // // // // //         {
// // // // // // //           name: "Grilled Chicken Salad with Mixed Greens",
// // // // // // //           calories: 350,
// // // // // // //           protein: 25,
// // // // // // //           carbs: 15,
// // // // // // //           fat: 18,
// // // // // // //           ingredients: [
// // // // // // //             { name: "Chicken Breast", weight: "150g" },
// // // // // // //             { name: "Mixed Greens", weight: "100g" },
// // // // // // //             { name: "Olive Oil", weight: "15ml" },
// // // // // // //             { name: "Cherry Tomatoes", weight: "50g" },
// // // // // // //           ],
// // // // // // //         },
// // // // // // //         {
// // // // // // //           name: "Quinoa Bowl with Roasted Vegetables",
// // // // // // //           calories: 380,
// // // // // // //           protein: 12,
// // // // // // //           carbs: 45,
// // // // // // //           fat: 14,
// // // // // // //           ingredients: [
// // // // // // //             { name: "Quinoa", weight: "60g" },
// // // // // // //             { name: "Mixed Vegetables", weight: "150g" },
// // // // // // //             { name: "Olive Oil", weight: "10ml" },
// // // // // // //           ],
// // // // // // //         },
// // // // // // //         {
// // // // // // //           name: "Turkey Sandwich on Whole Grain Bread",
// // // // // // //           calories: 320,
// // // // // // //           protein: 20,
// // // // // // //           carbs: 35,
// // // // // // //           fat: 12,
// // // // // // //           ingredients: [
// // // // // // //             { name: "Turkey Breast", weight: "100g" },
// // // // // // //             { name: "Whole Grain Bread", weight: "2 slices (60g)" },
// // // // // // //             { name: "Lettuce", weight: "20g" },
// // // // // // //             { name: "Mayonnaise", weight: "10g" },
// // // // // // //           ],
// // // // // // //         },
// // // // // // //         {
// // // // // // //           name: "Vegetable Soup with Grilled Cheese",
// // // // // // //           calories: 200,
// // // // // // //           protein: 8,
// // // // // // //           carbs: 25,
// // // // // // //           fat: 8,
// // // // // // //           ingredients: [
// // // // // // //             { name: "Mixed Vegetables", weight: "200g" },
// // // // // // //             { name: "Cheddar Cheese", weight: "30g" },
// // // // // // //             { name: "Whole Grain Bread", weight: "1 slice (30g)" },
// // // // // // //           ],
// // // // // // //         },
// // // // // // //         {
// // // // // // //           name: "Tuna Salad with Crackers",
// // // // // // //           calories: 280,
// // // // // // //           protein: 22,
// // // // // // //           carbs: 10,
// // // // // // //           fat: 16,
// // // // // // //           ingredients: [
// // // // // // //             { name: "Canned Tuna", weight: "100g" },
// // // // // // //             { name: "Crackers", weight: "30g" },
// // // // // // //             { name: "Mayonnaise", weight: "15g" },
// // // // // // //             { name: "Celery", weight: "50g" },
// // // // // // //           ],
// // // // // // //         },
// // // // // // //       ],
// // // // // // //       dinner: [
// // // // // // //         {
// // // // // // //           name: "Salmon with Roasted Vegetables",
// // // // // // //           calories: 420,
// // // // // // //           protein: 28,
// // // // // // //           carbs: 20,
// // // // // // //           fat: 22,
// // // // // // //           ingredients: [
// // // // // // //             { name: "Salmon Fillet", weight: "150g" },
// // // // // // //             { name: "Mixed Vegetables", weight: "150g" },
// // // // // // //             { name: "Olive Oil", weight: "15ml" },
// // // // // // //           ],
// // // // // // //         },
// // // // // // //         {
// // // // // // //           name: "Lean Beef Stir Fry with Brown Rice",
// // // // // // //           calories: 380,
// // // // // // //           protein: 25,
// // // // // // //           carbs: 25,
// // // // // // //           fat: 18,
// // // // // // //           ingredients: [
// // // // // // //             { name: "Lean Beef", weight: "120g" },
// // // // // // //             { name: "Brown Rice", weight: "60g" },
// // // // // // //             { name: "Mixed Vegetables", weight: "100g" },
// // // // // // //             { name: "Soy Sauce", weight: "15ml" },
// // // // // // //           ],
// // // // // // //         },
// // // // // // //         {
// // // // // // //           name: "Vegetarian Pasta with Marinara Sauce",
// // // // // // //           calories: 350,
// // // // // // //           protein: 12,
// // // // // // //           carbs: 45,
// // // // // // //           fat: 12,
// // // // // // //           ingredients: [
// // // // // // //             { name: "Pasta", weight: "80g" },
// // // // // // //             { name: "Marinara Sauce", weight: "100g" },
// // // // // // //             { name: "Olive Oil", weight: "10ml" },
// // // // // // //           ],
// // // // // // //         },
// // // // // // //         {
// // // // // // //           name: "Chicken Butter Masala",
// // // // // // //           calories: 400,
// // // // // // //           protein: 30,
// // // // // // //           carbs: 35,
// // // // // // //           fat: 14,
// // // // // // //           ingredients: [
// // // // // // //             { name: "Chicken", weight: "300g" },
// // // // // // //             { name: "Butter", weight: "15g" },
// // // // // // //             { name: "Tomato Puree", weight: "100g" },
// // // // // // //             { name: "Cream", weight: "50ml" },
// // // // // // //           ],
// // // // // // //         },
// // // // // // //         {
// // // // // // //           name: "Tofu Curry with Basmati Rice",
// // // // // // //           calories: 320,
// // // // // // //           protein: 15,
// // // // // // //           carbs: 30,
// // // // // // //           fat: 16,
// // // // // // //           ingredients: [
// // // // // // //             { name: "Tofu", weight: "100g" },
// // // // // // //             { name: "Basmati Rice", weight: "60g" },
// // // // // // //             { name: "Coconut Milk", weight: "100ml" },
// // // // // // //             { name: "Curry Paste", weight: "20g" },
// // // // // // //           ],
// // // // // // //         },
// // // // // // //       ],
// // // // // // //       snacks: [
// // // // // // //         {
// // // // // // //           name: "Apple Slices with Almond Butter",
// // // // // // //           calories: 180,
// // // // // // //           protein: 4,
// // // // // // //           carbs: 20,
// // // // // // //           fat: 10,
// // // // // // //           ingredients: [
// // // // // // //             { name: "Apple", weight: "150g" },
// // // // // // //             { name: "Almond Butter", weight: "15g" },
// // // // // // //           ],
// // // // // // //         },
// // // // // // //         {
// // // // // // //           name: "Hummus with Carrot and Celery Sticks",
// // // // // // //           calories: 150,
// // // // // // //           protein: 6,
// // // // // // //           carbs: 18,
// // // // // // //           fat: 8,
// // // // // // //           ingredients: [
// // // // // // //             { name: "Hummus", weight: "50g" },
// // // // // // //             { name: "Carrots", weight: "50g" },
// // // // // // //             { name: "Celery", weight: "50g" },
// // // // // // //           ],
// // // // // // //         },
// // // // // // //         {
// // // // // // //           name: "Greek Yogurt with Mixed Berries",
// // // // // // //           calories: 120,
// // // // // // //           protein: 12,
// // // // // // //           carbs: 8,
// // // // // // //           fat: 4,
// // // // // // //           ingredients: [
// // // // // // //             { name: "Greek Yogurt", weight: "100g" },
// // // // // // //             { name: "Mixed Berries", weight: "50g" },
// // // // // // //           ],
// // // // // // //         },
// // // // // // //         {
// // // // // // //           name: "Mixed Nuts and Dried Cranberries",
// // // // // // //           calories: 200,
// // // // // // //           protein: 6,
// // // // // // //           carbs: 8,
// // // // // // //           fat: 18,
// // // // // // //           ingredients: [
// // // // // // //             { name: "Mixed Nuts", weight: "30g" },
// // // // // // //             { name: "Dried Cranberries", weight: "20g" },
// // // // // // //           ],
// // // // // // //         },
// // // // // // //         {
// // // // // // //           name: "Banana with Peanut Butter",
// // // // // // //           calories: 220,
// // // // // // //           protein: 6,
// // // // // // //           carbs: 25,
// // // // // // //           fat: 12,
// // // // // // //           ingredients: [
// // // // // // //             { name: "Banana", weight: "120g" },
// // // // // // //             { name: "Peanut Butter", weight: "15g" },
// // // // // // //           ],
// // // // // // //         },
// // // // // // //       ],
// // // // // // //     };

// // // // // // //     const meals =
// // // // // // //       fallbackMeals[mealType as keyof typeof fallbackMeals] ||
// // // // // // //       fallbackMeals.breakfast;

// // // // // // //     return meals.map((meal, index) => ({
// // // // // // //       id: `fallback_${mealType}_${index}`,
// // // // // // //       name: meal.name,
// // // // // // //       calories: meal.calories,
// // // // // // //       protein: meal.protein,
// // // // // // //       carbs: meal.carbs,
// // // // // // //       fat: meal.fat,
// // // // // // //       category: mealType,
// // // // // // //       ingredients: meal.ingredients || [],
// // // // // // //     }));
// // // // // // //   }

// // // // // // //   isApiKeyConfigured(): boolean {
// // // // // // //     return !!this.apiKey && !!this.model;
// // // // // // //   }

// // // // // // //   getApiKey(): string | null {
// // // // // // //     return this.apiKey;
// // // // // // //   }
// // // // // // // }

// // // // // // // export default new GeminiService();




// // // // // // import { GoogleGenerativeAI } from "@google/generative-ai";

// // // // // // interface PersonalInfo {
// // // // // //   name: string;
// // // // // //   age: string;
// // // // // //   gender: string;
// // // // // //   weight: string;
// // // // // //   height: string;
// // // // // //   activityLevel: string;
// // // // // //   goal: string;
// // // // // //   dietaryRestrictions: string[];
// // // // // //   allergies: string[];
// // // // // //   targetCalories: string;
// // // // // // }

// // // // // // interface FoodItem {
// // // // // //   id: string;
// // // // // //   name: string;
// // // // // //   calories: number;
// // // // // //   protein: number;
// // // // // //   carbs: number;
// // // // // //   fat: number;
// // // // // //   category: string;
// // // // // //   ingredients: { name: string; weight: string }[];
// // // // // // }

// // // // // // class GeminiService {
// // // // // //   private genAI: GoogleGenerativeAI | null = null;
// // // // // //   private model: any = null;
// // // // // //   private apiKey: string | null = null;

// // // // // //   constructor() {}

// // // // // //   setApiKey(apiKey: string) {
// // // // // //     if (!apiKey || apiKey.trim() === "") {
// // // // // //       throw new Error("API key is required");
// // // // // //     }

// // // // // //     this.apiKey = apiKey.trim();
// // // // // //     this.genAI = new GoogleGenerativeAI(this.apiKey);
// // // // // //     this.model = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
// // // // // //   }

// // // // // //   async generateMealRecommendations(
// // // // // //     personalInfo: PersonalInfo,
// // // // // //     mealType: string,
// // // // // //     currentMeals: any[] = []
// // // // // //   ): Promise<FoodItem[]> {
// // // // // //     try {
// // // // // //       if (!this.apiKey || !this.model) {
// // // // // //         throw new Error(
// // // // // //           "API key not configured. Please set your Gemini API key in Settings."
// // // // // //         );
// // // // // //       }

// // // // // //       const prompt = this.buildPrompt(personalInfo, mealType, currentMeals);

// // // // // //       const result = await this.model.generateContent(prompt);
// // // // // //       const response = await result.response;
// // // // // //       const text = response.text();

// // // // // //       return this.parseAIResponse(text, mealType);
// // // // // //     } catch (error) {
// // // // // //       console.error("Error generating meal recommendations:", error);

// // // // // //       if (error instanceof Error) {
// // // // // //         if (error.message.includes("API key")) {
// // // // // //           throw error;
// // // // // //         }

// // // // // //         if (
// // // // // //           error.message.includes("overloaded") ||
// // // // // //           error.message.includes("503") ||
// // // // // //           error.message.includes("service unavailable") ||
// // // // // //           error.message.includes("quota exceeded")
// // // // // //         ) {
// // // // // //           throw new Error(
// // // // // //             "AI service is currently busy. Please try again in a few minutes, or use fallback recommendations."
// // // // // //           );
// // // // // //         }
// // // // // //       }

// // // // // //       return this.getFallbackRecommendations(mealType);
// // // // // //     }
// // // // // //   }

// // // // // //   private buildPrompt(
// // // // // //     personalInfo: PersonalInfo,
// // // // // //     mealType: string,
// // // // // //     currentMeals: any[]
// // // // // //   ): string {
// // // // // //     const currentNutrition = this.calculateCurrentNutrition(currentMeals);
// // // // // //     const remainingCalories =
// // // // // //       parseInt(personalInfo.targetCalories) - currentNutrition.calories;

// // // // // //     const mealTypeDescriptions = {
// // // // // //       breakfast: "breakfast (morning meal)",
// // // // // //       lunch: "lunch (midday meal)",
// // // // // //       dinner: "dinner (evening meal)",
// // // // // //       snacks: "snack (light meal between main meals)",
// // // // // //     };

// // // // // //     const mealDescription =
// // // // // //       mealTypeDescriptions[mealType as keyof typeof mealTypeDescriptions] ||
// // // // // //       mealType;

// // // // // //     return `You are a professional nutritionist and chef. Generate exactly 5 personalized meal recommendations for ${mealDescription} based on the following user profile.

// // // // // // IMPORTANT: Only generate recommendations for ${mealDescription}. Do NOT include recommendations for other meal types like breakfast, lunch, dinner, or snacks unless specifically requested.

// // // // // // USER PROFILE:
// // // // // // - Name: ${personalInfo.name}
// // // // // // - Age: ${personalInfo.age} years old
// // // // // // - Gender: ${personalInfo.gender}
// // // // // // - Weight: ${personalInfo.weight} kg
// // // // // // - Height: ${personalInfo.height} cm
// // // // // // - Activity Level: ${personalInfo.activityLevel}
// // // // // // - Goal: ${personalInfo.goal}
// // // // // // - Target Calories: ${personalInfo.targetCalories} calories/day
// // // // // // - Dietary Restrictions: ${personalInfo.dietaryRestrictions.join(", ") || "None"}
// // // // // // - Allergies: ${personalInfo.allergies.join(", ") || "None"}

// // // // // // CURRENT NUTRITION TODAY:
// // // // // // - Calories consumed: ${currentNutrition.calories}
// // // // // // - Protein consumed: ${currentNutrition.protein}g
// // // // // // - Carbs consumed: ${currentNutrition.carbs}g
// // // // // // - Fat consumed: ${currentNutrition.fat}g
// // // // // // - Remaining calories for today: ${remainingCalories}

// // // // // // MEAL TYPE: ${mealDescription}

// // // // // // REQUIREMENTS:
// // // // // // 1. Generate exactly 5 meal options for ${mealDescription} ONLY
// // // // // // 2. Each meal must be appropriate for ${mealDescription} timing and context
// // // // // // 3. Consider the user's dietary restrictions and allergies
// // // // // // 4. Ensure meals align with their fitness goal
// // // // // // 5. Consider remaining daily calories and nutrition needs
// // // // // // 6. Make meals realistic and easy to prepare
// // // // // // 7. Include nutritional information and main ingredients with their weights for each meal
// // // // // // 8. Focus only on ${mealDescription} - do not mix with other meal types

// // // // // // RESPONSE FORMAT:
// // // // // // Return a JSON array with exactly 5 objects, each containing:
// // // // // // {
// // // // // //   "id": "unique_id",
// // // // // //   "name": "Meal Name",
// // // // // //   "calories": number,
// // // // // //   "protein": number,
// // // // // //   "carbs": number,
// // // // // //   "fat": number,
// // // // // //   "category": "${mealType}",
// // // // // //   "ingredients": [
// // // // // //     { "name": "Ingredient Name", "weight": "Weight (e.g., 100g, 50ml)" },
// // // // // //     ...
// // // // // //   ]
// // // // // // }

// // // // // // Example for breakfast:
// // // // // // [
// // // // // //   {
// // // // // //     "id": "breakfast_1",
// // // // // //     "name": "Greek Yogurt with Berries and Nuts",
// // // // // //     "calories": 320,
// // // // // //     "protein": 18,
// // // // // //     "carbs": 25,
// // // // // //     "fat": 12,
// // // // // //     "category": "breakfast",
// // // // // //     "ingredients": [
// // // // // //       { "name": "Greek Yogurt", "weight": "150g" },
// // // // // //       { "name": "Mixed Berries", "weight": "100g" },
// // // // // //       { "name": "Almonds", "weight": "15g" }
// // // // // //     ]
// // // // // //   }
// // // // // // ]

// // // // // // Example for dinner:
// // // // // // [
// // // // // //   {
// // // // // //     "id": "dinner_1",
// // // // // //     "name": "Chicken Butter Masala",
// // // // // //     "calories": 400,
// // // // // //     "protein": 30,
// // // // // //     "carbs": 35,
// // // // // //     "fat": 14,
// // // // // //     "category": "dinner",
// // // // // //     "ingredients": [
// // // // // //       { "name": "Chicken", "weight": "300g" },
// // // // // //       { "name": "Butter", "weight": "15g" },
// // // // // //       { "name": "Tomato Puree", "weight": "100g" },
// // // // // //       { "name": "Cream", "weight": "50ml" }
// // // // // //     ]
// // // // // //   }
// // // // // // ]

// // // // // // Only return the JSON array, no additional text.`;
// // // // // //   }

// // // // // //   private calculateCurrentNutrition(meals: any[]): {
// // // // // //     calories: number;
// // // // // //     protein: number;
// // // // // //     carbs: number;
// // // // // //     fat: number;
// // // // // //   } {
// // // // // //     return meals.reduce(
// // // // // //       (total, meal) => {
// // // // // //         if (meal.food) {
// // // // // //           total.calories += meal.food.calories;
// // // // // //           total.protein += meal.food.protein;
// // // // // //           total.carbs += meal.food.carbs;
// // // // // //           total.fat += meal.food.fat;
// // // // // //         }
// // // // // //         return total;
// // // // // //       },
// // // // // //       { calories: 0, protein: 0, carbs: 0, fat: 0 }
// // // // // //     );
// // // // // //   }

// // // // // //   private parseAIResponse(response: string, mealType: string): FoodItem[] {
// // // // // //     try {
// // // // // //       const jsonMatch = response.match(/\[[\s\S]*\]/);
// // // // // //       if (jsonMatch) {
// // // // // //         const parsed = JSON.parse(jsonMatch[0]);
// // // // // //         return parsed.map((item: any, index: number) => ({
// // // // // //           id: item.id || `ai_meal_${Date.now()}_${index}`,
// // // // // //           name: item.name,
// // // // // //           calories: parseInt(item.calories) || 0,
// // // // // //           protein: parseInt(item.protein) || 0,
// // // // // //           carbs: parseInt(item.carbs) || 0,
// // // // // //           fat: parseInt(item.fat) || 0,
// // // // // //           category: item.category || mealType,
// // // // // //           ingredients: item.ingredients || [],
// // // // // //         }));
// // // // // //       }
// // // // // //       throw new Error("No valid JSON found in response");
// // // // // //     } catch (error) {
// // // // // //       console.error("Error parsing AI response:", error);
// // // // // //       return this.getFallbackRecommendations(mealType);
// // // // // //     }
// // // // // //   }

// // // // // //   private getFallbackRecommendations(mealType: string): FoodItem[] {
// // // // // //     const fallbackMeals = {
// // // // // //       breakfast: [
// // // // // //         {
// // // // // //           name: "Oatmeal with Berries and Almonds",
// // // // // //           calories: 280,
// // // // // //           protein: 8,
// // // // // //           carbs: 45,
// // // // // //           fat: 6,
// // // // // //           ingredients: [
// // // // // //             { name: "Oats", weight: "50g" },
// // // // // //             { name: "Mixed Berries", weight: "100g" },
// // // // // //             { name: "Almonds", weight: "15g" },
// // // // // //             { name: "Milk", weight: "200ml" },
// // // // // //           ],
// // // // // //         },
// // // // // //         {
// // // // // //           name: "Greek Yogurt with Honey and Granola",
// // // // // //           calories: 200,
// // // // // //           protein: 15,
// // // // // //           carbs: 20,
// // // // // //           fat: 8,
// // // // // //           ingredients: [
// // // // // //             { name: "Greek Yogurt", weight: "150g" },
// // // // // //             { name: "Honey", weight: "10g" },
// // // // // //             { name: "Granola", weight: "30g" },
// // // // // //           ],
// // // // // //         },
// // // // // //         {
// // // // // //           name: "Whole Grain Toast with Avocado and Eggs",
// // // // // //           calories: 320,
// // // // // //           protein: 10,
// // // // // //           carbs: 35,
// // // // // //           fat: 18,
// // // // // //           ingredients: [
// // // // // //             { name: "Whole Grain Bread", weight: "2 slices (60g)" },
// // // // // //             { name: "Avocado", weight: "70g" },
// // // // // //             { name: "Eggs", weight: "2 large (100g)" },
// // // // // //           ],
// // // // // //         },
// // // // // //         {
// // // // // //           name: "Smoothie Bowl with Banana and Berries",
// // // // // //           calories: 250,
// // // // // //           protein: 12,
// // // // // //           carbs: 30,
// // // // // //           fat: 8,
// // // // // //           ingredients: [
// // // // // //             { name: "Banana", weight: "120g" },
// // // // // //             { name: "Mixed Berries", weight: "100g" },
// // // // // //             { name: "Greek Yogurt", weight: "100g" },
// // // // // //             { name: "Chia Seeds", weight: "10g" },
// // // // // //           ],
// // // // // //         },
// // // // // //         {
// // // // // //           name: "Scrambled Eggs with Spinach and Toast",
// // // // // //           calories: 220,
// // // // // //           protein: 18,
// // // // // //           carbs: 5,
// // // // // //           fat: 12,
// // // // // //           ingredients: [
// // // // // //             { name: "Eggs", weight: "3 large (150g)" },
// // // // // //             { name: "Spinach", weight: "50g" },
// // // // // //             { name: "Whole Grain Bread", weight: "1 slice (30g)" },
// // // // // //           ],
// // // // // //         },
// // // // // //       ],
// // // // // //       lunch: [
// // // // // //         {
// // // // // //           name: "Grilled Chicken Salad with Mixed Greens",
// // // // // //           calories: 350,
// // // // // //           protein: 25,
// // // // // //           carbs: 15,
// // // // // //           fat: 18,
// // // // // //           ingredients: [
// // // // // //             { name: "Chicken Breast", weight: "150g" },
// // // // // //             { name: "Mixed Greens", weight: "100g" },
// // // // // //             { name: "Olive Oil", weight: "15ml" },
// // // // // //             { name: "Cherry Tomatoes", weight: "50g" },
// // // // // //           ],
// // // // // //         },
// // // // // //         {
// // // // // //           name: "Quinoa Bowl with Roasted Vegetables",
// // // // // //           calories: 380,
// // // // // //           protein: 12,
// // // // // //           carbs: 45,
// // // // // //           fat: 14,
// // // // // //           ingredients: [
// // // // // //             { name: "Quinoa", weight: "60g" },
// // // // // //             { name: "Mixed Vegetables", weight: "150g" },
// // // // // //             { name: "Olive Oil", weight: "10ml" },
// // // // // //           ],
// // // // // //         },
// // // // // //         {
// // // // // //           name: "Turkey Sandwich on Whole Grain Bread",
// // // // // //           calories: 320,
// // // // // //           protein: 20,
// // // // // //           carbs: 35,
// // // // // //           fat: 12,
// // // // // //           ingredients: [
// // // // // //             { name: "Turkey Breast", weight: "100g" },
// // // // // //             { name: "Whole Grain Bread", weight: "2 slices (60g)" },
// // // // // //             { name: "Lettuce", weight: "20g" },
// // // // // //             { name: "Mayonnaise", weight: "10g" },
// // // // // //           ],
// // // // // //         },
// // // // // //         {
// // // // // //           name: "Vegetable Soup with Grilled Cheese",
// // // // // //           calories: 200,
// // // // // //           protein: 8,
// // // // // //           carbs: 25,
// // // // // //           fat: 8,
// // // // // //           ingredients: [
// // // // // //             { name: "Mixed Vegetables", weight: "200g" },
// // // // // //             { name: "Cheddar Cheese", weight: "30g" },
// // // // // //             { name: "Whole Grain Bread", weight: "1 slice (30g)" },
// // // // // //           ],
// // // // // //         },
// // // // // //         {
// // // // // //           name: "Tuna Salad with Crackers",
// // // // // //           calories: 280,
// // // // // //           protein: 22,
// // // // // //           carbs: 10,
// // // // // //           fat: 16,
// // // // // //           ingredients: [
// // // // // //             { name: "Canned Tuna", weight: "100g" },
// // // // // //             { name: "Crackers", weight: "30g" },
// // // // // //             { name: "Mayonnaise", weight: "15g" },
// // // // // //             { name: "Celery", weight: "50g" },
// // // // // //           ],
// // // // // //         },
// // // // // //       ],
// // // // // //       dinner: [
// // // // // //         {
// // // // // //           name: "Salmon with Roasted Vegetables",
// // // // // //           calories: 420,
// // // // // //           protein: 28,
// // // // // //           carbs: 20,
// // // // // //           fat: 22,
// // // // // //           ingredients: [
// // // // // //             { name: "Salmon Fillet", weight: "150g" },
// // // // // //             { name: "Mixed Vegetables", weight: "150g" },
// // // // // //             { name: "Olive Oil", weight: "15ml" },
// // // // // //           ],
// // // // // //         },
// // // // // //         {
// // // // // //           name: "Lean Beef Stir Fry with Brown Rice",
// // // // // //           calories: 380,
// // // // // //           protein: 25,
// // // // // //           carbs: 25,
// // // // // //           fat: 18,
// // // // // //           ingredients: [
// // // // // //             { name: "Lean Beef", weight: "120g" },
// // // // // //             { name: "Brown Rice", weight: "60g" },
// // // // // //             { name: "Mixed Vegetables", weight: "100g" },
// // // // // //             { name: "Soy Sauce", weight: "15ml" },
// // // // // //           ],
// // // // // //         },
// // // // // //         {
// // // // // //           name: "Vegetarian Pasta with Marinara Sauce",
// // // // // //           calories: 350,
// // // // // //           protein: 12,
// // // // // //           carbs: 45,
// // // // // //           fat: 12,
// // // // // //           ingredients: [
// // // // // //             { name: "Pasta", weight: "80g" },
// // // // // //             { name: "Marinara Sauce", weight: "100g" },
// // // // // //             { name: "Olive Oil", weight: "10ml" },
// // // // // //           ],
// // // // // //         },
// // // // // //         {
// // // // // //           name: "Chicken Butter Masala",
// // // // // //           calories: 400,
// // // // // //           protein: 30,
// // // // // //           carbs: 35,
// // // // // //           fat: 14,
// // // // // //           ingredients: [
// // // // // //             { name: "Chicken", weight: "300g" },
// // // // // //             { name: "Butter", weight: "15g" },
// // // // // //             { name: "Tomato Puree", weight: "100g" },
// // // // // //             { name: "Cream", weight: "50ml" },
// // // // // //           ],
// // // // // //         },
// // // // // //         {
// // // // // //           name: "Tofu Curry with Basmati Rice",
// // // // // //           calories: 320,
// // // // // //           protein: 15,
// // // // // //           carbs: 30,
// // // // // //           fat: 16,
// // // // // //           ingredients: [
// // // // // //             { name: "Tofu", weight: "100g" },
// // // // // //             { name: "Basmati Rice", weight: "60g" },
// // // // // //             { name: "Coconut Milk", weight: "100ml" },
// // // // // //             { name: "Curry Paste", weight: "20g" },
// // // // // //           ],
// // // // // //         },
// // // // // //       ],
// // // // // //       snacks: [
// // // // // //         {
// // // // // //           name: "Apple Slices with Almond Butter",
// // // // // //           calories: 180,
// // // // // //           protein: 4,
// // // // // //           carbs: 20,
// // // // // //           fat: 10,
// // // // // //           ingredients: [
// // // // // //             { name: "Apple", weight: "150g" },
// // // // // //             { name: "Almond Butter", weight: "15g" },
// // // // // //           ],
// // // // // //         },
// // // // // //         {
// // // // // //           name: "Hummus with Carrot and Celery Sticks",
// // // // // //           calories: 150,
// // // // // //           protein: 6,
// // // // // //           carbs: 18,
// // // // // //           fat: 8,
// // // // // //           ingredients: [
// // // // // //             { name: "Hummus", weight: "50g" },
// // // // // //             { name: "Carrots", weight: "50g" },
// // // // // //             { name: "Celery", weight: "50g" },
// // // // // //           ],
// // // // // //         },
// // // // // //         {
// // // // // //           name: "Greek Yogurt with Mixed Berries",
// // // // // //           calories: 120,
// // // // // //           protein: 12,
// // // // // //           carbs: 8,
// // // // // //           fat: 4,
// // // // // //           ingredients: [
// // // // // //             { name: "Greek Yogurt", weight: "100g" },
// // // // // //             { name: "Mixed Berries", weight: "50g" },
// // // // // //           ],
// // // // // //         },
// // // // // //         {
// // // // // //           name: "Mixed Nuts and Dried Cranberries",
// // // // // //           calories: 200,
// // // // // //           protein: 6,
// // // // // //           carbs: 8,
// // // // // //           fat: 18,
// // // // // //           ingredients: [
// // // // // //             { name: "Mixed Nuts", weight: "30g" },
// // // // // //             { name: "Dried Cranberries", weight: "20g" },
// // // // // //           ],
// // // // // //         },
// // // // // //         {
// // // // // //           name: "Banana with Peanut Butter",
// // // // // //           calories: 220,
// // // // // //           protein: 6,
// // // // // //           carbs: 25,
// // // // // //           fat: 12,
// // // // // //           ingredients: [
// // // // // //             { name: "Banana", weight: "120g" },
// // // // // //             { name: "Peanut Butter", weight: "15g" },
// // // // // //           ],
// // // // // //         },
// // // // // //       ],
// // // // // //     };

// // // // // //     const meals =
// // // // // //       fallbackMeals[mealType as keyof typeof fallbackMeals] ||
// // // // // //       fallbackMeals.breakfast;

// // // // // //     return meals.map((meal, index) => ({
// // // // // //       id: `fallback_${mealType}_${index}`,
// // // // // //       name: meal.name,
// // // // // //       calories: meal.calories,
// // // // // //       protein: meal.protein,
// // // // // //       carbs: meal.carbs,
// // // // // //       fat: meal.fat,
// // // // // //       category: mealType,
// // // // // //       ingredients: meal.ingredients || [],
// // // // // //     }));
// // // // // //   }

// // // // // //   isApiKeyConfigured(): boolean {
// // // // // //     return !!this.apiKey && !!this.model;
// // // // // //   }

// // // // // //   getApiKey(): string | null {
// // // // // //     return this.apiKey;
// // // // // //   }
// // // // // // }

// // // // // // export default new GeminiService();


// // // // // import { GoogleGenerativeAI } from "@google/generative-ai";

// // // // // interface PersonalInfo {
// // // // //   name: string;
// // // // //   age: string;
// // // // //   gender: string;
// // // // //   weight: string;
// // // // //   height: string;
// // // // //   activityLevel: string;
// // // // //   goal: string;
// // // // //   dietaryRestrictions: string[];
// // // // //   allergies: string[];
// // // // //   targetCalories: string;
// // // // // }

// // // // // interface FoodItem {
// // // // //   id: string;
// // // // //   name: string;
// // // // //   calories: number;
// // // // //   protein: number;
// // // // //   carbs: number;
// // // // //   fat: number;
// // // // //   category: string;
// // // // //   ingredients: { name: string; weight: string }[];
// // // // // }

// // // // // class GeminiService {
// // // // //   private genAI: GoogleGenerativeAI | null = null;
// // // // //   private model: any = null;
// // // // //   private apiKey: string | null = null;

// // // // //   constructor() {}

// // // // //   setApiKey(apiKey: string) {
// // // // //     if (!apiKey || apiKey.trim() === "") {
// // // // //       throw new Error("API key is required");
// // // // //     }

// // // // //     this.apiKey = apiKey.trim();
// // // // //     this.genAI = new GoogleGenerativeAI(this.apiKey);
// // // // //     this.model = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
// // // // //   }

// // // // //   async generateMealRecommendations(
// // // // //     personalInfo: PersonalInfo,
// // // // //     mealType: string,
// // // // //     currentMeals: any[] = []
// // // // //   ): Promise<FoodItem[]> {
// // // // //     try {
// // // // //       if (!this.apiKey || !this.model) {
// // // // //         throw new Error(
// // // // //           "API key not configured. Please set your Gemini API key in Settings."
// // // // //         );
// // // // //       }

// // // // //       const prompt = this.buildSmartPrompt(personalInfo, mealType, currentMeals);

// // // // //       const result = await this.model.generateContent(prompt);
// // // // //       const response = await result.response;
// // // // //       const text = response.text();

// // // // //       return this.parseAIResponse(text, mealType);
// // // // //     } catch (error) {
// // // // //       console.error("Error generating meal recommendations:", error);
// // // // //       return this.getFallbackRecommendations(mealType);
// // // // //     }
// // // // //   }

// // // // //   // ✅ NEW SMART PROMPT - CONSIDERS ALL MEALS & MACROS
// // // // //   private buildSmartPrompt(
// // // // //     personalInfo: PersonalInfo,
// // // // //     mealType: string,
// // // // //     currentMeals: any[]
// // // // //   ): string {
// // // // //     const currentNutrition = this.calculateCurrentNutrition(currentMeals);
// // // // //     const targetNutrition = this.calculateTargetNutrition(personalInfo);
// // // // //     const remainingNutrition = this.calculateRemainingNutrition(
// // // // //       targetNutrition,
// // // // //       currentNutrition
// // // // //     );

// // // // //     // ✅ DETAILED MEAL BREAKDOWN
// // // // //     const mealsByType = this.groupMealsByType(currentMeals);
// // // // //     const mealDetails = this.formatMealDetails(mealsByType);

// // // // //     const mealTypeDescriptions = {
// // // // //       breakfast: "Breakfast (7 AM - morning energy meal)",
// // // // //       lunch: "Lunch (12 PM - midday balanced meal)", 
// // // // //       dinner: "Dinner (7 PM - evening satisfying meal)",
// // // // //       snacks: "Snacks (3 PM - light nutrient boost)",
// // // // //     };

// // // // //     const mealDescription = mealTypeDescriptions[mealType as keyof typeof mealTypeDescriptions] || mealType;

// // // // //     return `You are an expert nutritionist and dietitian. Generate EXACTLY 5 personalized meal recommendations for ${mealDescription} that will help the user HIT their exact daily macro targets.

// // // // // 🔥 CRITICAL REQUIREMENTS:
// // // // // 1. Analyze ALL existing meals and their macros
// // // // // 2. Calculate remaining macros needed for this ${mealType}
// // // // // 3. Generate meals that PERFECTLY balance remaining daily targets
// // // // // 4. Consider meal timing and digestive balance
// // // // // 5. NEVER exceed remaining calories by more than 10%
// // // // // 6. Prioritize user's goal (weight loss/gain/maintenance)
// // // // // 7. Respect ALL dietary restrictions and allergies

// // // // // 📊 DAILY TARGETS:
// // // // // - Calories: ${targetNutrition.calories}
// // // // // - Protein: ${targetNutrition.protein}g 
// // // // // - Carbs: ${targetNutrition.carbs}g
// // // // // - Fat: ${targetNutrition.fat}g

// // // // // 📊 CURRENT STATUS (${new Date().toLocaleDateString()}):
// // // // // ${mealDetails}

// // // // // 📊 REMAINING FOR TODAY:
// // // // // - Calories: ${remainingNutrition.calories} (${Math.round((remainingNutrition.calories/targetNutrition.calories)*100)}% left)
// // // // // - Protein: ${remainingNutrition.protein}g (${Math.round((remainingNutrition.protein/targetNutrition.protein)*100)}% left)
// // // // // - Carbs: ${remainingNutrition.carbs}g (${Math.round((remainingNutrition.carbs/targetNutrition.carbs)*100)}% left)  
// // // // // - Fat: ${remainingNutrition.fat}g (${Math.round((remainingNutrition.fat/targetNutrition.fat)*100)}% left)

// // // // // 🎯 FOR THIS ${mealType.toUpperCase()}:
// // // // // - Recommended calories: ${this.getRecommendedCaloriesForMeal(mealType, remainingNutrition.calories)}
// // // // // - Recommended protein: ${this.getRecommendedProteinForMeal(mealType, remainingNutrition.protein)}
// // // // // - Make it balanced, realistic, and delicious

// // // // // USER PROFILE:
// // // // // - Name: ${personalInfo.name}
// // // // // - Age: ${personalInfo.age}, Gender: ${personalInfo.gender}
// // // // // - Weight: ${personalInfo.weight}kg, Height: ${personalInfo.height}cm
// // // // // - Activity: ${personalInfo.activityLevel}
// // // // // - Goal: ${personalInfo.goal.replace('_', ' ')}
// // // // // - Restrictions: ${personalInfo.dietaryRestrictions.join(', ') || 'None'}
// // // // // - Allergies: ${personalInfo.allergies.join(', ') || 'None'}

// // // // // ⚡ SMART RECOMMENDATION RULES:
// // // // // 1. Breakfast: High protein + complex carbs for energy
// // // // // 2. Lunch: Balanced macros, filling but not heavy  
// // // // // 3. Dinner: Moderate protein + veggies, lighter carbs
// // // // // 4. Snacks: High protein/low carb, nutrient-dense
// // // // // 5. If low on protein → prioritize protein sources
// // // // // 6. If low on carbs → add complex carbs
// // // // // 7. If low on calories → slightly increase portion sizes
// // // // // 8. Variety: Different cuisines/styles across 5 options

// // // // // 📋 EXACT JSON FORMAT (5 meals only):
// // // // // [
// // // // //   {
// // // // //     "id": "unique_id",
// // // // //     "name": "Complete Meal Name", 
// // // // //     "calories": exact_number,
// // // // //     "protein": exact_number,
// // // // //     "carbs": exact_number,
// // // // //     "fat": exact_number,
// // // // //     "category": "${mealType}",
// // // // //     "ingredients": [
// // // // //       {"name": "Ingredient", "weight": "100g/200ml/etc"}
// // // // //     ]
// // // // //   }
// // // // // ]

// // // // // ONLY RETURN THE JSON ARRAY. NO OTHER TEXT.`;

// // // // //   }

// // // // //   // ✅ SMART CALCULATION FUNCTIONS
// // // // //   private calculateTargetNutrition(personalInfo: PersonalInfo): {
// // // // //     calories: number;
// // // // //     protein: number;
// // // // //     carbs: number;
// // // // //     fat: number;
// // // // //   } {
// // // // //     const targetCalories = parseInt(personalInfo.targetCalories);
// // // // //     let proteinPct = 0.25, carbsPct = 0.50, fatPct = 0.25;

// // // // //     switch (personalInfo.goal) {
// // // // //       case 'lose_weight':
// // // // //         proteinPct = 0.30; carbsPct = 0.45; fatPct = 0.25; break;
// // // // //       case 'gain_weight':
// // // // //       case 'build_muscle':
// // // // //         proteinPct = 0.35; carbsPct = 0.45; fatPct = 0.20; break;
// // // // //       case 'maintain_weight':
// // // // //         proteinPct = 0.25; carbsPct = 0.50; fatPct = 0.25; break;
// // // // //     }

// // // // //     return {
// // // // //       calories: targetCalories,
// // // // //       protein: Math.round(targetCalories * proteinPct / 4),
// // // // //       carbs: Math.round(targetCalories * carbsPct / 4),
// // // // //       fat: Math.round(targetCalories * fatPct / 9),
// // // // //     };
// // // // //   }

// // // // //   private calculateCurrentNutrition(meals: any[]): {
// // // // //     calories: number;
// // // // //     protein: number;
// // // // //     carbs: number;
// // // // //     fat: number;
// // // // //   } {
// // // // //     return meals.reduce((total, meal) => {
// // // // //       if (meal.food && meal.consumed) {
// // // // //         total.calories += meal.food.calories;
// // // // //         total.protein += meal.food.protein;
// // // // //         total.carbs += meal.food.carbs;
// // // // //         total.fat += meal.food.fat;
// // // // //       }
// // // // //       return total;
// // // // //     }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
// // // // //   }

// // // // //   private calculateRemainingNutrition(
// // // // //     target: any, 
// // // // //     current: any
// // // // //   ): { calories: number; protein: number; carbs: number; fat: number } {
// // // // //     return {
// // // // //       calories: Math.max(0, target.calories - current.calories),
// // // // //       protein: Math.max(0, target.protein - current.protein),
// // // // //       carbs: Math.max(0, target.carbs - current.carbs),
// // // // //       fat: Math.max(0, target.fat - current.fat),
// // // // //     };
// // // // //   }

// // // // //   private groupMealsByType(meals: any[]): { [key: string]: any[] } {
// // // // //     const grouped: { [key: string]: any[] } = {};
// // // // //     meals.forEach(meal => {
// // // // //       if (meal.food && meal.consumed) {
// // // // //         const type = meal.id || 'unknown';
// // // // //         if (!grouped[type]) grouped[type] = [];
// // // // //         grouped[type].push(meal);
// // // // //       }
// // // // //     });
// // // // //     return grouped;
// // // // //   }

// // // // //   private formatMealDetails(mealsByType: { [key: string]: any[] }): string {
// // // // //     let details = '';
// // // // //     Object.entries(mealsByType).forEach(([type, meals]) => {
// // // // //       const total = meals.reduce((sum: any, meal: any) => {
// // // // //         sum.calories += meal.food.calories;
// // // // //         sum.protein += meal.food.protein;
// // // // //         sum.carbs += meal.food.carbs;
// // // // //         sum.fat += meal.food.fat;
// // // // //         return sum;
// // // // //       }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
      
// // // // //       details += `• ${type}: ${total.calories}kcal (P:${total.protein}g C:${total.carbs}g F:${total.fat}g)\n`;
// // // // //     });
// // // // //     return details || 'No meals consumed yet';
// // // // //   }

// // // // //   private getRecommendedCaloriesForMeal(mealType: string, remainingCalories: number): string {
// // // // //     const basePercentages = { breakfast: 0.25, lunch: 0.35, dinner: 0.30, snacks: 0.10 };
// // // // //     const percentage = basePercentages[mealType as keyof typeof basePercentages] || 0.25;
// // // // //     const recommended = Math.round(remainingCalories * percentage);
// // // // //     return `${recommended}-${Math.round(remainingCalories * (percentage + 0.1))}`;
// // // // //   }

// // // // //   private getRecommendedProteinForMeal(mealType: string, remainingProtein: number): string {
// // // // //     const basePercentages = { breakfast: 0.25, lunch: 0.30, dinner: 0.25, snacks: 0.20 };
// // // // //     const percentage = basePercentages[mealType as keyof typeof basePercentages] || 0.25;
// // // // //     return `${Math.round(remainingProtein * percentage)}g`;
// // // // //   }

// // // // //   private parseAIResponse(response: string, mealType: string): FoodItem[] {
// // // // //     try {
// // // // //       const jsonMatch = response.match(/\[[\s\S]*\]/);
// // // // //       if (jsonMatch) {
// // // // //         const parsed = JSON.parse(jsonMatch[0]);
// // // // //         return parsed.map((item: any, index: number) => ({
// // // // //           id: item.id || `ai_meal_${Date.now()}_${index}`,
// // // // //           name: item.name || 'Recommended Meal',
// // // // //           calories: Math.round(parseFloat(item.calories) || 0),
// // // // //           protein: Math.round(parseFloat(item.protein) || 0),
// // // // //           carbs: Math.round(parseFloat(item.carbs) || 0),
// // // // //           fat: Math.round(parseFloat(item.fat) || 0),
// // // // //           category: item.category || mealType,
// // // // //           ingredients: item.ingredients || [],
// // // // //         }));
// // // // //       }
// // // // //       return this.getFallbackRecommendations(mealType);
// // // // //     } catch (error) {
// // // // //       console.error("Error parsing AI response:", error);
// // // // //       return this.getFallbackRecommendations(mealType);
// // // // //     }
// // // // //   }

// // // // //   // ✅ Keep existing fallback recommendations (unchanged)
// // // // //   private getFallbackRecommendations(mealType: string): FoodItem[] {
// // // // //     const fallbackMeals = {
// // // // //       breakfast: [
// // // // //         {
// // // // //           id: `fallback_b_${Date.now()}`,
// // // // //           name: "High Protein Greek Yogurt Bowl",
// // // // //           calories: 350,
// // // // //           protein: 25,
// // // // //           carbs: 25,
// // // // //           fat: 12,
// // // // //           category: "breakfast",
// // // // //           ingredients: [
// // // // //             { name: "Greek Yogurt", weight: "200g" },
// // // // //             { name: "Blueberries", weight: "100g" },
// // // // //             { name: "Almonds", weight: "20g" },
// // // // //             { name: "Chia Seeds", weight: "10g" },
// // // // //           ],
// // // // //         },
// // // // //         // ... add 4 more breakfast options
// // // // //         {
// // // // //           id: `fallback_b_${Date.now() + 1}`,
// // // // //           name: "Egg & Veggie Scramble",
// // // // //           calories: 320,
// // // // //           protein: 22,
// // // // //           carbs: 15,
// // // // //           fat: 20,
// // // // //           category: "breakfast",
// // // // //           ingredients: [
// // // // //             { name: "Eggs", weight: "3 large" },
// // // // //             { name: "Spinach", weight: "100g" },
// // // // //             { name: "Cherry Tomatoes", weight: "50g" },
// // // // //             { name: "Avocado", weight: "50g" },
// // // // //           ],
// // // // //         },
// // // // //         // Add 3 more...
// // // // //       ],
// // // // //       // ... lunch, dinner, snacks fallbacks (keep existing or expand)
// // // // //       lunch: [], dinner: [], snacks: []
// // // // //     };

// // // // //     const meals = fallbackMeals[mealType as keyof typeof fallbackMeals] || [];
// // // // //     if (meals.length === 0) {
// // // // //       // Return generic fallback if needed
// // // // //       return [{
// // // // //         id: `fallback_${mealType}_${Date.now()}`,
// // // // //         name: `Balanced ${mealType.charAt(0).toUpperCase() + mealType.slice(1)} Meal`,
// // // // //         calories: 400,
// // // // //         protein: 25,
// // // // //         carbs: 40,
// // // // //         fat: 15,
// // // // //         category: mealType,
// // // // //         ingredients: [{ name: "Protein Source", weight: "150g" }, { name: "Vegetables", weight: "200g" }]
// // // // //       }];
// // // // //     }
    
// // // // //     return meals;
// // // // //   }

// // // // //   isApiKeyConfigured(): boolean {
// // // // //     return !!this.apiKey && !!this.model;
// // // // //   }

// // // // //   getApiKey(): string | null {
// // // // //     return this.apiKey;
// // // // //   }
// // // // // }

// // // // // export default new GeminiService();

// // // // import { GoogleGenerativeAI } from "@google/generative-ai";

// // // // interface PersonalInfo {
// // // //   name: string;
// // // //   age: string;
// // // //   gender: string;
// // // //   weight: string;
// // // //   height: string;
// // // //   activityLevel: string;
// // // //   goal: string;
// // // //   dietaryRestrictions: string[];
// // // //   allergies: string[];
// // // //   targetCalories: string;
// // // // }

// // // // interface FoodItem {
// // // //   id: string;
// // // //   name: string;
// // // //   calories: number;
// // // //   protein: number;
// // // //   carbs: number;
// // // //   fat: number;
// // // //   category: string;
// // // //   ingredients: { name: string; weight: string }[];
// // // // }

// // // // class GeminiService {
// // // //   private genAI: GoogleGenerativeAI | null = null;
// // // //   private model: any = null;
// // // //   private apiKey: string | null = null;

// // // //   constructor() {}

// // // //   setApiKey(apiKey: string) {
// // // //     if (!apiKey || apiKey.trim() === "") {
// // // //       throw new Error("API key is required");
// // // //     }
// // // //     this.apiKey = apiKey.trim();
// // // //     this.genAI = new GoogleGenerativeAI(this.apiKey);
// // // //     this.model = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
// // // //   }

// // // //   async generateMealRecommendations(
// // // //     personalInfo: PersonalInfo,
// // // //     mealType: string,
// // // //     currentMeals: any[] = []
// // // //   ): Promise<FoodItem[]> {
// // // //     try {
// // // //       if (!this.apiKey || !this.model) {
// // // //         throw new Error("API key not configured.");
// // // //       }
// // // //       const prompt = this.buildDynamicPercentagePrompt(personalInfo, mealType, currentMeals);
// // // //       const result = await this.model.generateContent(prompt);
// // // //       const response = await result.response;
// // // //       const text = response.text();
// // // //       return this.parseAIResponse(text, mealType);
// // // //     } catch (error) {
// // // //       console.error("Error generating meal recommendations:", error);
// // // //       return this.getDynamicFallbackRecommendations(mealType, personalInfo);
// // // //     }
// // // //   }

// // // //   // ✅ DYNAMIC PERCENTAGE-BASED PROMPT
// // // //   private buildDynamicPercentagePrompt(
// // // //     personalInfo: PersonalInfo,
// // // //     mealType: string,
// // // //     currentMeals: any[]
// // // //   ): string {
// // // //     const targetNutrition = this.calculateTargetNutrition(personalInfo);
// // // //     const currentNutrition = this.calculateCurrentNutrition(currentMeals);
// // // //     const remainingNutrition = this.calculateRemainingNutrition(targetNutrition, currentNutrition);
    
// // // //     // ✅ DYNAMIC MEAL PERCENTAGES (ADAPTS TO ANY TARGET)
// // // //     const mealPercentages = this.getDynamicMealPercentages(mealType);
// // // //     const thisMealTarget = this.calculateMealTarget(targetNutrition, mealPercentages);
    
// // // //     // ✅ ADJUST FOR REMAINING
// // // //     const adjustedTarget = this.adjustForRemaining(thisMealTarget, remainingNutrition);

// // // //     const mealsByType = this.groupMealsByType(currentMeals);
// // // //     const mealDetails = this.formatMealDetails(mealsByType);

// // // //     return `You are an expert dietitian. Generate EXACTLY 5 realistic meals for ${mealType} using DYNAMIC PERCENTAGE ALLOCATION.

// // // // 🎯 USER'S DAILY TARGETS:
// // // // - Calories: ${targetNutrition.calories}
// // // // - Protein: ${targetNutrition.protein}g  
// // // // - Carbs: ${targetNutrition.carbs}g
// // // // - Fat: ${targetNutrition.fat}g

// // // // 📊 CONSUMED TODAY:
// // // // ${mealDetails}

// // // // 📊 REMAINING:
// // // // - Calories: ${remainingNutrition.calories} (${Math.round((remainingNutrition.calories/targetNutrition.calories)*100)}%)
// // // // - Protein: ${remainingNutrition.protein}g (${Math.round((remainingNutrition.protein/targetNutrition.protein)*100)}%)
// // // // - Carbs: ${remainingNutrition.carbs}g (${Math.round((remainingNutrition.carbs/targetNutrition.carbs)*100)}%)
// // // // - Fat: ${remainingNutrition.fat}g (${Math.round((remainingNutrition.fat/targetNutrition.fat)*100)}%)

// // // // 🎯 ${mealType.toUpperCase()} TARGET (${mealPercentages.calories}% of daily):
// // // // - Calories: ${adjustedTarget.calories} ±10%
// // // // - Protein: ${adjustedTarget.protein} ±10% 
// // // // - Carbs: ${adjustedTarget.carbs} ±10%
// // // // - Fat: ${adjustedTarget.fat} ±10%

// // // // ⚡ DYNAMIC MEAL PERCENTAGE RULES:
// // // // | Meal     | Cal % | Prot % | Carb % | Fat % |
// // // // |----------|-------|--------|--------|-------|
// // // // | Breakfast| ${mealPercentages.calories}% | ${mealPercentages.protein}% | ${mealPercentages.carbs}% | ${mealPercentages.fat}% |
// // // // | Lunch    | ${this.getDynamicMealPercentages('lunch').calories}% | ${this.getDynamicMealPercentages('lunch').protein}% | ${this.getDynamicMealPercentages('lunch').carbs}% | ${this.getDynamicMealPercentages('lunch').fat}% |
// // // // | Dinner   | ${this.getDynamicMealPercentages('dinner').calories}% | ${this.getDynamicMealPercentages('dinner').protein}% | ${this.getDynamicMealPercentages('dinner').carbs}% | ${this.getDynamicMealPercentages('dinner').fat}% |
// // // // | Snacks   | ${this.getDynamicMealPercentages('snacks').calories}% | ${this.getDynamicMealPercentages('snacks').protein}% | ${this.getDynamicMealPercentages('snacks').carbs}% | ${this.getDynamicMealPercentages('snacks').fat}% |

// // // // ✅ REALISTIC PORTION CONSTRAINTS:
// // // // - Breakfast/Lunch/Dinner: ${Math.round(targetNutrition.calories*0.20)}-${Math.round(targetNutrition.calories*0.35)} kcal
// // // // - Snacks: ${Math.round(targetNutrition.calories*0.08)}-${Math.round(targetNutrition.calories*0.15)} kcal
// // // // - Protein/meal: ${Math.round(targetNutrition.protein*0.20)}-${Math.round(targetNutrition.protein*0.35)}g

// // // // 👤 ${personalInfo.name}: ${personalInfo.goal.replace('_', ' ')} goal

// // // // 📋 JSON FORMAT (5 meals):
// // // // [
// // // //   {
// // // //     "id": "unique_id",
// // // //     "name": "Complete Meal Name",
// // // //     "calories": ${Math.round(adjustedTarget.calories)},
// // // //     "protein": ${Math.round(adjustedTarget.protein)},
// // // //     "carbs": ${Math.round(adjustedTarget.carbs)},
// // // //     "fat": ${Math.round(adjustedTarget.fat)},
// // // //     "category": "${mealType}",
// // // //     "ingredients": [{"name": "Ingredient", "weight": "150g"}]
// // // //   }
// // // // ]

// // // // ONLY JSON ARRAY. NO OTHER TEXT.`;
// // // //   }

// // // //   // ✅ DYNAMIC PERCENTAGE SYSTEM - ADAPTS TO ANY CALORIE TARGET
// // // //   private getDynamicMealPercentages(mealType: string) {
// // // //     const percentages = {
// // // //       breakfast: { calories: 0.25, protein: 0.25, carbs: 0.30, fat: 0.20 },
// // // //       lunch: { calories: 0.30, protein: 0.25, carbs: 0.30, fat: 0.25 },
// // // //       dinner: { calories: 0.30, protein: 0.30, carbs: 0.25, fat: 0.25 },
// // // //       snacks: { calories: 0.15, protein: 0.20, carbs: 0.15, fat: 0.30 }
// // // //     };
// // // //     return percentages[mealType as keyof typeof percentages];
// // // //   }

// // // //   private calculateMealTarget(targetNutrition: any, percentages: any) {
// // // //     return {
// // // //       calories: targetNutrition.calories * percentages.calories,
// // // //       protein: targetNutrition.protein * percentages.protein,
// // // //       carbs: targetNutrition.carbs * percentages.carbs,
// // // //       fat: targetNutrition.fat * percentages.fat
// // // //     };
// // // //   }
  

// // // //   private adjustForRemaining(mealTarget: any, remaining: any) {
// // // //     return {
// // // //       calories: Math.min(mealTarget.calories, remaining.calories),
// // // //       protein: Math.min(mealTarget.protein, remaining.protein),
// // // //       carbs: Math.min(mealTarget.carbs, remaining.carbs),
// // // //       fat: Math.min(mealTarget.fat, remaining.fat)
// // // //     };
// // // //   }

// // // //   private calculateTargetNutrition(personalInfo: PersonalInfo): any {
// // // //     const calories = parseInt(personalInfo.targetCalories);
// // // //     let proteinPct = 0.25, carbsPct = 0.50, fatPct = 0.25;

// // // //     switch (personalInfo.goal) {
// // // //       case 'lose_weight':
// // // //         proteinPct = 0.30; carbsPct = 0.45; fatPct = 0.25; break;
// // // //       case 'gain_weight':
// // // //       case 'build_muscle':
// // // //         proteinPct = 0.35; carbsPct = 0.45; fatPct = 0.20; break;
// // // //       case 'maintain_weight':
// // // //         proteinPct = 0.25; carbsPct = 0.50; fatPct = 0.25; break;
// // // //     }

// // // //     return {
// // // //       calories,
// // // //       protein: Math.round(calories * proteinPct / 4),
// // // //       carbs: Math.round(calories * carbsPct / 4),
// // // //       fat: Math.round(calories * fatPct / 9)
// // // //     };
// // // //   }

// // // //   private calculateCurrentNutrition(meals: any[]): any {
// // // //     return meals.reduce((total: any, meal: any) => {
// // // //       if (meal.food && meal.consumed) {
// // // //         total.calories += meal.food.calories;
// // // //         total.protein += meal.food.protein;
// // // //         total.carbs += meal.food.carbs;
// // // //         total.fat += meal.food.fat;
// // // //       }
// // // //       return total;
// // // //     }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
// // // //   }

// // // //   private calculateRemainingNutrition(target: any, current: any): any {
// // // //     return {
// // // //       calories: Math.max(0, target.calories - current.calories),
// // // //       protein: Math.max(0, target.protein - current.protein),
// // // //       carbs: Math.max(0, target.carbs - current.carbs),
// // // //       fat: Math.max(0, target.fat - current.fat)
// // // //     };
// // // //   }

// // // //   // ✅ ALSO FIX these 2 functions with proper types:

// // // // private groupMealsByType(meals: any[]): { [key: string]: any[] } {  // ✅ FIXED RETURN TYPE
// // // //   const grouped: { [key: string]: any[] } = {};
// // // //   meals.forEach(meal => {
// // // //     if (meal.food && meal.consumed) {
// // // //       const type = meal.id || 'unknown';
// // // //       if (!grouped[type]) grouped[type] = [];
// // // //       grouped[type].push(meal);
// // // //     }
// // // //   });
// // // //   return grouped;
// // // // }

// // // // private formatMealDetails(mealsByType: { [key: string]: any[] }): string {  // ✅ FIXED PARAM TYPE
// // // //   let details = '';
// // // //   Object.entries(mealsByType).forEach(([type, meals]: [string, any[]]) => {  // ✅ FIXED TUPLE TYPE
// // // //     const total = meals.reduce((sum: any, meal: any) => {
// // // //       sum.calories += meal.food.calories;
// // // //       sum.protein += meal.food.protein;
// // // //       sum.carbs += meal.food.carbs;
// // // //       sum.fat += meal.food.fat;
// // // //       return sum;
// // // //     }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
    
// // // //     details += `• ${type}: ${total.calories}kcal (P:${total.protein}g/C:${total.carbs}g/F:${total.fat}g)\n`;
// // // //   });
// // // //   return details || 'No meals consumed yet';
// // // // }
// // // //   private parseAIResponse(response: string, mealType: string): FoodItem[] {
// // // //     try {
// // // //       const jsonMatch = response.match(/\[[\s\S]*\]/);
// // // //       if (jsonMatch) {
// // // //         const parsed = JSON.parse(jsonMatch[0]);
// // // //         return parsed.map((item: any, index: number) => ({
// // // //           id: item.id || `ai_${mealType}_${Date.now()}_${index}`,
// // // //           name: item.name || 'Balanced Meal',
// // // //           calories: Math.round(parseFloat(item.calories) || 0),
// // // //           protein: Math.round(parseFloat(item.protein) || 0),
// // // //           carbs: Math.round(parseFloat(item.carbs) || 0),
// // // //           fat: Math.round(parseFloat(item.fat) || 0),
// // // //           category: item.category || mealType,
// // // //           ingredients: item.ingredients || []
// // // //         }));
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error parsing AI response:", error);
// // // //     }
// // // //     return this.getDynamicFallbackRecommendations(mealType, { targetCalories: "2000" });
// // // //   }

// // // //   // ✅ DYNAMIC FALLBACKS - Uses User's Target
// // // //   private getDynamicFallbackRecommendations(mealType: string, personalInfo: any): FoodItem[] {
// // // //     const targetCalories = parseInt(personalInfo.targetCalories || "2000");
// // // //     const mealCalories = Math.round(targetCalories * this.getDynamicMealPercentages(mealType).calories);
// // // //     const mealProtein = Math.round((targetCalories * 0.30 / 4) * this.getDynamicMealPercentages(mealType).protein);
// // // //     const mealCarbs = Math.round((targetCalories * 0.45 / 4) * this.getDynamicMealPercentages(mealType).carbs);
// // // //     const mealFat = Math.round((targetCalories * 0.25 / 9) * this.getDynamicMealPercentages(mealType).fat);

// // // //     return [
// // // //       {
// // // //         id: `dynamic_fb1_${mealType}`,
// // // //         name: "Grilled Chicken Quinoa Bowl",
// // // //         calories: mealCalories,
// // // //         protein: mealProtein,
// // // //         carbs: mealCarbs,
// // // //         fat: mealFat,
// // // //         category: mealType,
// // // //         ingredients: [
// // // //           { name: "Chicken Breast", weight: "150g" },
// // // //           { name: "Quinoa (cooked)", weight: "120g" },
// // // //           { name: "Mixed Vegetables", weight: "200g" },
// // // //           { name: "Olive Oil", weight: "10ml" }
// // // //         ]
// // // //       },
// // // //       {
// // // //         id: `dynamic_fb2_${mealType}`,
// // // //         name: "Salmon Sweet Potato Plate",
// // // //         calories: mealCalories,
// // // //         protein: mealProtein,
// // // //         carbs: mealCarbs,
// // // //         fat: mealFat,
// // // //         category: mealType,
// // // //         ingredients: [
// // // //           { name: "Salmon Fillet", weight: "130g" },
// // // //           { name: "Sweet Potato", weight: "180g" },
// // // //           { name: "Broccoli", weight: "150g" },
// // // //           { name: "Avocado", weight: "60g" }
// // // //         ]
// // // //       },
// // // //       {
// // // //         id: `dynamic_fb3_${mealType}`,
// // // //         name: "Tofu Veggie Stir Fry",
// // // //         calories: mealCalories,
// // // //         protein: mealProtein,
// // // //         carbs: mealCarbs,
// // // //         fat: mealFat,
// // // //         category: mealType,
// // // //         ingredients: [
// // // //           { name: "Tofu", weight: "180g" },
// // // //           { name: "Brown Rice (cooked)", weight: "130g" },
// // // //           { name: "Mixed Vegetables", weight: "250g" },
// // // //           { name: "Sesame Oil", weight: "12ml" }
// // // //         ]
// // // //       },
// // // //       {
// // // //         id: `dynamic_fb4_${mealType}`,
// // // //         name: "Turkey Pasta Primavera",
// // // //         calories: mealCalories,
// // // //         protein: mealProtein,
// // // //         carbs: mealCarbs,
// // // //         fat: mealFat,
// // // //         category: mealType,
// // // //         ingredients: [
// // // //           { name: "Ground Turkey", weight: "150g" },
// // // //           { name: "Whole Wheat Pasta", weight: "100g dry" },
// // // //           { name: "Marinara Sauce", weight: "120g" },
// // // //           { name: "Zucchini", weight: "150g" }
// // // //         ]
// // // //       },
// // // //       {
// // // //         id: `dynamic_fb5_${mealType}`,
// // // //         name: "Egg Fried Rice Bowl",
// // // //         calories: mealCalories,
// // // //         protein: mealProtein,
// // // //         carbs: mealCarbs,
// // // //         fat: mealFat,
// // // //         category: mealType,
// // // //         ingredients: [
// // // //           { name: "Eggs", weight: "3 large" },
// // // //           { name: "Shrimp", weight: "120g" },
// // // //           { name: "Brown Rice (cooked)", weight: "140g" },
// // // //           { name: "Mixed Vegetables", weight: "150g" }
// // // //         ]
// // // //       }
// // // //     ];
// // // //   }

// // // //   isApiKeyConfigured(): boolean {
// // // //     return !!this.apiKey && !!this.model;
// // // //   }

// // // //   getApiKey(): string | null {
// // // //     return this.apiKey;
// // // //   }
// // // // }



// // // // export default new GeminiService();


// // // import { GoogleGenerativeAI } from "@google/generative-ai";

// // // interface PersonalInfo {
// // //   name: string;
// // //   age: string;
// // //   gender: string;
// // //   weight: string;
// // //   height: string;
// // //   activityLevel: string;
// // //   goal: string;
// // //   dietaryRestrictions: string[];
// // //   allergies: string[];
// // //   targetCalories: string;
// // // }

// // // interface FoodItem {
// // //   id: string;
// // //   name: string;
// // //   calories: number;
// // //   protein: number;
// // //   carbs: number;
// // //   fat: number;
// // //   category: string;
// // //   ingredients: { name: string; weight: string }[];
// // // }

// // // // ✅ FIXED: Proper TypeScript types for Gemini conversation
// // // type GeminiRole = 'user' | 'model';
// // // interface GeminiPart {
// // //   text?: string;
// // //   functionCall?: any;
// // //   functionResponse?: {
// // //     name: string;
// // //     response: { result: string };
// // //   };
// // // }
// // // type GeminiContent = { role: GeminiRole; parts: GeminiPart[] };

// // // class GeminiService {
// // //   private genAI: GoogleGenerativeAI | null = null;
// // //   private model: any = null;
// // //   private apiKey: string | null = null;

// // //   constructor() {}

// // //   setApiKey(apiKey: string) {
// // //     if (!apiKey || apiKey.trim() === "") {
// // //       throw new Error("API key is required");
// // //     }
// // //     this.apiKey = apiKey.trim();
// // //     this.genAI = new GoogleGenerativeAI(this.apiKey);
// // //     this.model = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
// // //   }

// // //   async generateMealRecommendations(
// // //     personalInfo: PersonalInfo,
// // //     mealType: string,
// // //     currentMeals: any[] = []
// // //   ): Promise<FoodItem[]> {
// // //     try {
// // //       if (!this.apiKey || !this.model) {
// // //         throw new Error("API key not configured.");
// // //       }
// // //       const prompt = this.buildDynamicPercentagePrompt(personalInfo, mealType, currentMeals);
// // //       const result = await this.model.generateContent(prompt);
// // //       const response = await result.response;
// // //       const text = response.text();
// // //       return this.parseAIResponse(text, mealType);
// // //     } catch (error) {
// // //       console.error("Error generating meal recommendations:", error);
// // //       return this.getDynamicFallbackRecommendations(mealType, personalInfo);
// // //     }
// // //   }

// // //   // ✅ FIXED: Proper TypeScript types
// // //   async generateAgenticResponse(
// // //     conversation: GeminiContent[],
// // //     functions: Record<string, (...args: any[]) => string>
// // //   ): Promise<{
// // //     response: string;
// // //     functionCalls: Array<{ name: string; args: any }>;
// // //   }> {
// // //     try {
// // //       if (!this.apiKey || !this.model) {
// // //         throw new Error("API key not configured");
// // //       }

// // //       const functionDeclarations = Object.entries(functions).map(([name]) => ({
// // //         name,
// // //         description: `Diet analysis helper: ${name}`,
// // //         parameters: {
// // //           type: "object",
// // //           properties: {},
// // //           required: [],
// // //         },
// // //       }));

// // //       const modelWithTools = this.model.bindParameters({
// // //         tools: [{ functionDeclarations }],
// // //       });

// // //       const result = await modelWithTools.generateContent(conversation);
// // //       const response = await result.response;
      
// // //       const functionCalls: Array<{ name: string; args: any }> = [];
// // //       let finalResponse = '';

// // //       for (const part of response.candidates?.[0]?.content?.parts || []) {
// // //         if (part.functionCall) {
// // //           functionCalls.push({
// // //             name: part.functionCall.name,
// // //             args: part.functionCall.args || {},
// // //           });
// // //         }
// // //         if (part.text) {
// // //           finalResponse += part.text;
// // //         }
// // //       }

// // //       return {
// // //         response: finalResponse || "Task completed successfully!",
// // //         functionCalls,
// // //       };
// // //     } catch (error) {
// // //       console.error("Agentic response error:", error);
// // //       return {
// // //         response: "Sorry, I encountered an error while processing your request.",
// // //         functionCalls: [],
// // //       };
// // //     }
// // //   }

// // //   // ✅ FIXED: Proper TypeScript types
// // //   async generateContent(prompt: string): Promise<string> {
// // //     try {
// // //       if (!this.apiKey || !this.model) {
// // //         throw new Error("API key not configured");
// // //       }
      
// // //       const result = await this.model.generateContent(prompt);
// // //       const response = await result.response;
// // //       return response.text();
// // //     } catch (error) {
// // //       console.error("Generate content error:", error);
// // //       throw error;
// // //     }
// // //   }

// // //   // ✅ FIXED: TypeScript errors resolved
// // //   async generateAgenticChatResponse(
// // //     userMessage: string,
// // //     functions: Record<string, (...args: any[]) => string>,
// // //     context?: string
// // //   ): Promise<string> {
// // //     try {
// // //       const conversation: GeminiContent[] = [{
// // //         role: 'user' as GeminiRole,
// // //         parts: [{ text: `${context || ''}\n\nUser: ${userMessage}` }]
// // //       }];

// // //       let finalResponse = '';
// // //       let maxIterations = 3;

// // //       while (maxIterations > 0) {
// // //         const result = await this.generateAgenticResponse(conversation, functions);
        
// // //         if (result.functionCalls.length === 0) {
// // //           finalResponse = result.response;
// // //           break;
// // //         }

// // //         conversation.push({
// // //           role: 'model' as GeminiRole,
// // //           parts: [{ text: result.response }]
// // //         });

// // //         // ✅ FIXED: Proper functionResponse format
// // //         const functionResults = result.functionCalls.map(fc => ({
// // //           functionResponse: {
// // //             name: fc.name,
// // //             response: { 
// // //               result: (() => {
// // //                 try {
// // //                   const func = functions[fc.name as string];
// // //                   if (func) {
// // //                     return func(fc.args || {});
// // //                   }
// // //                   return `Unknown function: ${fc.name}`;
// // //                 } catch (error) {
// // //                   return `Error: ${error}`;
// // //                 }
// // //               })()
// // //             }
// // //           }
// // //         }));

// // //         conversation.push({
// // //           role: 'user' as GeminiRole,
// // //           parts: functionResults // ✅ Now correct type: GeminiPart[]
// // //         });

// // //         maxIterations--;
// // //       }

// // //       return finalResponse || "I've analyzed your request and taken appropriate actions!";
// // //     } catch (error) {
// // //       console.error("Agentic chat error:", error);
// // //       return "Sorry, I encountered an error while processing your request.";
// // //     }
// // //   }

// // //   // ✅ ALL EXISTING METHODS (UNCHANGED & FIXED)
// // //   private buildDynamicPercentagePrompt(
// // //     personalInfo: PersonalInfo,
// // //     mealType: string,
// // //     currentMeals: any[]
// // //   ): string {
// // //     const targetNutrition = this.calculateTargetNutrition(personalInfo);
// // //     const currentNutrition = this.calculateCurrentNutrition(currentMeals);
// // //     const remainingNutrition = this.calculateRemainingNutrition(targetNutrition, currentNutrition);
    
// // //     const mealPercentages = this.getDynamicMealPercentages(mealType);
// // //     const thisMealTarget = this.calculateMealTarget(targetNutrition, mealPercentages);
// // //     const adjustedTarget = this.adjustForRemaining(thisMealTarget, remainingNutrition);

// // //     const mealsByType = this.groupMealsByType(currentMeals);
// // //     const mealDetails = this.formatMealDetails(mealsByType);

// // //     return `You are an expert dietitian. Generate EXACTLY 5 realistic meals for ${mealType} using DYNAMIC PERCENTAGE ALLOCATION.

// // // 🎯 USER'S DAILY TARGETS:
// // // - Calories: ${targetNutrition.calories}
// // // - Protein: ${targetNutrition.protein}g  
// // // - Carbs: ${targetNutrition.carbs}g
// // // - Fat: ${targetNutrition.fat}g

// // // 📊 CONSUMED TODAY:
// // // ${mealDetails}

// // // 📊 REMAINING:
// // // - Calories: ${remainingNutrition.calories} (${Math.round((remainingNutrition.calories/targetNutrition.calories)*100)}%)
// // // - Protein: ${remainingNutrition.protein}g (${Math.round((remainingNutrition.protein/targetNutrition.protein)*100)}%)
// // // - Carbs: ${remainingNutrition.carbs}g (${Math.round((remainingNutrition.carbs/targetNutrition.carbs)*100)}%)
// // // - Fat: ${remainingNutrition.fat}g (${Math.round((remainingNutrition.fat/targetNutrition.fat)*100)}%)

// // // 🎯 ${mealType.toUpperCase()} TARGET (${mealPercentages.calories}% of daily):
// // // - Calories: ${adjustedTarget.calories} ±10%
// // // - Protein: ${adjustedTarget.protein} ±10% 
// // // - Carbs: ${adjustedTarget.carbs} ±10%
// // // - Fat: ${adjustedTarget.fat} ±10%

// // // ⚡ DYNAMIC MEAL PERCENTAGE RULES:
// // // | Meal     | Cal % | Prot % | Carb % | Fat % |
// // // |----------|-------|--------|--------|-------|
// // // | Breakfast| ${this.getDynamicMealPercentages('breakfast').calories}% | ${this.getDynamicMealPercentages('breakfast').protein}% | ${this.getDynamicMealPercentages('breakfast').carbs}% | ${this.getDynamicMealPercentages('breakfast').fat}% |
// // // | Lunch    | ${this.getDynamicMealPercentages('lunch').calories}% | ${this.getDynamicMealPercentages('lunch').protein}% | ${this.getDynamicMealPercentages('lunch').carbs}% | ${this.getDynamicMealPercentages('lunch').fat}% |
// // // | Dinner   | ${this.getDynamicMealPercentages('dinner').calories}% | ${this.getDynamicMealPercentages('dinner').protein}% | ${this.getDynamicMealPercentages('dinner').carbs}% | ${this.getDynamicMealPercentages('dinner').fat}% |
// // // | Snacks   | ${this.getDynamicMealPercentages('snacks').calories}% | ${this.getDynamicMealPercentages('snacks').protein}% | ${this.getDynamicMealPercentages('snacks').carbs}% | ${this.getDynamicMealPercentages('snacks').fat}% |

// // // ✅ REALISTIC PORTION CONSTRAINTS:
// // // - Breakfast/Lunch/Dinner: ${Math.round(targetNutrition.calories*0.20)}-${Math.round(targetNutrition.calories*0.35)} kcal
// // // - Snacks: ${Math.round(targetNutrition.calories*0.08)}-${Math.round(targetNutrition.calories*0.15)} kcal
// // // - Protein/meal: ${Math.round(targetNutrition.protein*0.20)}-${Math.round(targetNutrition.protein*0.35)}g

// // // 👤 ${personalInfo.name}: ${personalInfo.goal.replace('_', ' ')} goal

// // // 📋 JSON FORMAT (5 meals):
// // // [
// // //   {
// // //     "id": "unique_id",
// // //     "name": "Complete Meal Name",
// // //     "calories": ${Math.round(adjustedTarget.calories)},
// // //     "protein": ${Math.round(adjustedTarget.protein)},
// // //     "carbs": ${Math.round(adjustedTarget.carbs)},
// // //     "fat": ${Math.round(adjustedTarget.fat)},
// // //     "category": "${mealType}",
// // //     "ingredients": [{"name": "Ingredient", "weight": "150g"}]
// // //   }
// // // ]

// // // ONLY JSON ARRAY. NO OTHER TEXT.`;
// // //   }

// // //   private getDynamicMealPercentages(mealType: string) {
// // //     const percentages = {
// // //       breakfast: { calories: 0.25, protein: 0.25, carbs: 0.30, fat: 0.20 },
// // //       lunch: { calories: 0.30, protein: 0.25, carbs: 0.30, fat: 0.25 },
// // //       dinner: { calories: 0.30, protein: 0.30, carbs: 0.25, fat: 0.25 },
// // //       snacks: { calories: 0.15, protein: 0.20, carbs: 0.15, fat: 0.30 }
// // //     };
// // //     return percentages[mealType as keyof typeof percentages] || percentages.breakfast;
// // //   }

// // //   private calculateMealTarget(targetNutrition: any, percentages: any) {
// // //     return {
// // //       calories: targetNutrition.calories * percentages.calories,
// // //       protein: targetNutrition.protein * percentages.protein,
// // //       carbs: targetNutrition.carbs * percentages.carbs,
// // //       fat: targetNutrition.fat * percentages.fat
// // //     };
// // //   }

// // //   private adjustForRemaining(mealTarget: any, remaining: any) {
// // //     return {
// // //       calories: Math.min(mealTarget.calories, remaining.calories),
// // //       protein: Math.min(mealTarget.protein, remaining.protein),
// // //       carbs: Math.min(mealTarget.carbs, remaining.carbs),
// // //       fat: Math.min(mealTarget.fat, remaining.fat)
// // //     };
// // //   }

// // //   private calculateTargetNutrition(personalInfo: PersonalInfo): any {
// // //     const calories = parseInt(personalInfo.targetCalories);
// // //     let proteinPct = 0.25, carbsPct = 0.50, fatPct = 0.25;

// // //     switch (personalInfo.goal) {
// // //       case 'lose_weight':
// // //         proteinPct = 0.30; carbsPct = 0.45; fatPct = 0.25; break;
// // //       case 'gain_weight':
// // //       case 'build_muscle':
// // //         proteinPct = 0.35; carbsPct = 0.45; fatPct = 0.20; break;
// // //       case 'maintain_weight':
// // //         proteinPct = 0.25; carbsPct = 0.50; fatPct = 0.25; break;
// // //     }

// // //     return {
// // //       calories,
// // //       protein: Math.round(calories * proteinPct / 4),
// // //       carbs: Math.round(calories * carbsPct / 4),
// // //       fat: Math.round(calories * fatPct / 9)
// // //     };
// // //   }

// // //   private calculateCurrentNutrition(meals: any[]): any {
// // //     return meals.reduce((total: any, meal: any) => {
// // //       if (meal.food && meal.consumed) {
// // //         total.calories += meal.food.calories;
// // //         total.protein += meal.food.protein;
// // //         total.carbs += meal.food.carbs;
// // //         total.fat += meal.food.fat;
// // //       }
// // //       return total;
// // //     }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
// // //   }

// // //   private calculateRemainingNutrition(target: any, current: any): any {
// // //     return {
// // //       calories: Math.max(0, target.calories - current.calories),
// // //       protein: Math.max(0, target.protein - current.protein),
// // //       carbs: Math.max(0, target.carbs - current.carbs),
// // //       fat: Math.max(0, target.fat - current.fat)
// // //     };
// // //   }

// // //   private groupMealsByType(meals: any[]): { [key: string]: any[] } {
// // //     const grouped: { [key: string]: any[] } = {};
// // //     meals.forEach(meal => {
// // //       if (meal.food && meal.consumed) {
// // //         const type = meal.id || 'unknown';
// // //         if (!grouped[type]) grouped[type] = [];
// // //         grouped[type].push(meal);
// // //       }
// // //     });
// // //     return grouped;
// // //   }

// // //   private formatMealDetails(mealsByType: { [key: string]: any[] }): string {
// // //     let details = '';
// // //     Object.entries(mealsByType).forEach(([type, meals]: [string, any[]]) => {
// // //       const total = meals.reduce((sum: any, meal: any) => {
// // //         sum.calories += meal.food.calories;
// // //         sum.protein += meal.food.protein;
// // //         sum.carbs += meal.food.carbs;
// // //         sum.fat += meal.food.fat;
// // //         return sum;
// // //       }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
      
// // //       details += `• ${type}: ${total.calories}kcal (P:${total.protein}g/C:${total.carbs}g/F:${total.fat}g)\n`;
// // //     });
// // //     return details || 'No meals consumed yet';
// // //   }

// // //   private parseAIResponse(response: string, mealType: string): FoodItem[] {
// // //     try {
// // //       const jsonMatch = response.match(/\[[\s\S]*\]/);
// // //       if (jsonMatch) {
// // //         const parsed = JSON.parse(jsonMatch[0]);
// // //         return parsed.map((item: any, index: number) => ({
// // //           id: item.id || `ai_${mealType}_${Date.now()}_${index}`,
// // //           name: item.name || 'Balanced Meal',
// // //           calories: Math.round(parseFloat(item.calories) || 0),
// // //           protein: Math.round(parseFloat(item.protein) || 0),
// // //           carbs: Math.round(parseFloat(item.carbs) || 0),
// // //           fat: Math.round(parseFloat(item.fat) || 0),
// // //           category: item.category || mealType,
// // //           ingredients: item.ingredients || []
// // //         }));
// // //       }
// // //     } catch (error) {
// // //       console.error("Error parsing AI response:", error);
// // //     }
// // //     return this.getDynamicFallbackRecommendations(mealType, { targetCalories: "2000" });
// // //   }

// // //   private getDynamicFallbackRecommendations(mealType: string, personalInfo: any): FoodItem[] {
// // //     const targetCalories = parseInt(personalInfo.targetCalories || "2000");
// // //     const mealCalories = Math.round(targetCalories * this.getDynamicMealPercentages(mealType).calories);
// // //     const mealProtein = Math.round((targetCalories * 0.30 / 4) * this.getDynamicMealPercentages(mealType).protein);
// // //     const mealCarbs = Math.round((targetCalories * 0.45 / 4) * this.getDynamicMealPercentages(mealType).carbs);
// // //     const mealFat = Math.round((targetCalories * 0.25 / 9) * this.getDynamicMealPercentages(mealType).fat);

// // //     return [
// // //       {
// // //         id: `dynamic_fb1_${mealType}`,
// // //         name: "Grilled Chicken Quinoa Bowl",
// // //         calories: mealCalories,
// // //         protein: mealProtein,
// // //         carbs: mealCarbs,
// // //         fat: mealFat,
// // //         category: mealType,
// // //         ingredients: [
// // //           { name: "Chicken Breast", weight: "150g" },
// // //           { name: "Quinoa (cooked)", weight: "120g" },
// // //           { name: "Mixed Vegetables", weight: "200g" },
// // //           { name: "Olive Oil", weight: "10ml" }
// // //         ]
// // //       },
// // //       {
// // //         id: `dynamic_fb2_${mealType}`,
// // //         name: "Salmon Sweet Potato Plate",
// // //         calories: mealCalories,
// // //         protein: mealProtein,
// // //         carbs: mealCarbs,
// // //         fat: mealFat,
// // //         category: mealType,
// // //         ingredients: [
// // //           { name: "Salmon Fillet", weight: "130g" },
// // //           { name: "Sweet Potato", weight: "180g" },
// // //           { name: "Broccoli", weight: "150g" },
// // //           { name: "Avocado", weight: "60g" }
// // //         ]
// // //       },
// // //       {
// // //         id: `dynamic_fb3_${mealType}`,
// // //         name: "Tofu Veggie Stir Fry",
// // //         calories: mealCalories,
// // //         protein: mealProtein,
// // //         carbs: mealCarbs,
// // //         fat: mealFat,
// // //         category: mealType,
// // //         ingredients: [
// // //           { name: "Tofu", weight: "180g" },
// // //           { name: "Brown Rice (cooked)", weight: "130g" },
// // //           { name: "Mixed Vegetables", weight: "250g" },
// // //           { name: "Sesame Oil", weight: "12ml" }
// // //         ]
// // //       },
// // //       {
// // //         id: `dynamic_fb4_${mealType}`,
// // //         name: "Turkey Pasta Primavera",
// // //         calories: mealCalories,
// // //         protein: mealProtein,
// // //         carbs: mealCarbs,
// // //         fat: mealFat,
// // //         category: mealType,
// // //         ingredients: [
// // //           { name: "Ground Turkey", weight: "150g" },
// // //           { name: "Whole Wheat Pasta", weight: "100g dry" },
// // //           { name: "Marinara Sauce", weight: "120g" },
// // //           { name: "Zucchini", weight: "150g" }
// // //         ]
// // //       },
// // //       {
// // //         id: `dynamic_fb5_${mealType}`,
// // //         name: "Egg Fried Rice Bowl",
// // //         calories: mealCalories,
// // //         protein: mealProtein,
// // //         carbs: mealCarbs,
// // //         fat: mealFat,
// // //         category: mealType,
// // //         ingredients: [
// // //           { name: "Eggs", weight: "3 large" },
// // //           { name: "Shrimp", weight: "120g" },
// // //           { name: "Brown Rice (cooked)", weight: "140g" },
// // //           { name: "Mixed Vegetables", weight: "150g" }
// // //         ]
// // //       }
// // //     ];
// // //   }

// // //   isApiKeyConfigured(): boolean {
// // //     return !!this.apiKey && !!this.model;
// // //   }

// // //   getApiKey(): string | null {
// // //     return this.apiKey;
// // //   }
// // // }

// // // export default new GeminiService();



// // // services/GeminiService.ts
// // import { GoogleGenerativeAI, Content, Part } from '@google/generative-ai';
// // import { PersonalInfo, FoodItem, Meal } from '@/components/types';

// // class GeminiService {
// //   private genAI: GoogleGenerativeAI | null = null;
// //   private model: any = null;
// //   private apiKey: string | null = null;
// //   private readonly DEFAULT_MODEL = 'gemini-2.5-flash'; // Updated to a supported model

// //   constructor() {}

// //   setApiKey(apiKey: string) {
// //     if (!apiKey || apiKey.trim() === '') {
// //       throw new Error('API key is required');
// //     }
// //     this.apiKey = apiKey.trim();
// //     this.genAI = new GoogleGenerativeAI(this.apiKey);
// //     this.model = this.genAI.getGenerativeModel({ model: this.DEFAULT_MODEL });
// //   }

// //   async generateMealRecommendations(
// //     personalInfo: PersonalInfo,
// //     mealType: string,
// //     currentMeals: any[] = []
// //   ): Promise<FoodItem[]> {
// //     try {
// //       if (!this.apiKey || !this.model) {
// //         throw new Error('API key not configured.');
// //       }
// //       const prompt = this.buildDynamicPercentagePrompt(personalInfo, mealType, currentMeals);
// //       const result = await this.model.generateContent(prompt);
// //       const response = await result.response;
// //       const text = response.text();
// //       return this.parseAIResponse(text, mealType);
// //     } catch (error: any) {
// //       console.error('Error generating meal recommendations:', error);
// //       if (error.message.includes('404') || error.message.includes('model')) {
// //         console.error(`Model ${this.DEFAULT_MODEL} not found. Please check Google Generative AI documentation for supported models.`);
// //       }
// //       return this.getDynamicFallbackRecommendations(mealType, personalInfo);
// //     }
// //   }

// //   async generateAgenticResponse(
// //     conversation: Content[],
// //     functions: Record<string, (args: any) => Promise<string>>
// //   ): Promise<{
// //     response: string;
// //     functionCalls: Array<{ name: string; args: any }>;
// //   }> {
// //     try {
// //       if (!this.apiKey || !this.genAI) {
// //         throw new Error('API key not configured');
// //       }

// //       const functionDeclarations: any[] = [
// //         {
// //           name: 'getPersonalInfo',
// //           description: 'Get user\'s personal information.',
// //           parameters: {
// //             type: 'OBJECT',
// //             properties: {},
// //             required: [],
// //           },
// //         },
// //         {
// //           name: 'getNutritionalData',
// //           description: 'Get daily nutritional targets.',
// //           parameters: {
// //             type: 'OBJECT',
// //             properties: {},
// //             required: [],
// //           },
// //         },
// //         {
// //           name: 'getTotalNutrition',
// //           description: 'Get current consumed nutrition.',
// //           parameters: {
// //             type: 'OBJECT',
// //             properties: {},
// //             required: [],
// //           },
// //         },
// //         {
// //           name: 'getCurrentMeals',
// //           description: 'Get the current meal plan.',
// //           parameters: {
// //             type: 'OBJECT',
// //             properties: {},
// //             required: [],
// //           },
// //         },
// //         {
// //           name: 'addOrUpdateMeal',
// //           description: 'Add or update a meal.',
// //           parameters: {
// //             type: 'OBJECT',
// //             properties: {
// //               mealType: { type: 'STRING', description: 'The meal type: breakfast, lunch, dinner, snacks' },
// //               food: {
// //                 type: 'OBJECT',
// //                 properties: {
// //                   id: { type: 'STRING' },
// //                   name: { type: 'STRING' },
// //                   calories: { type: 'NUMBER' },
// //                   protein: { type: 'NUMBER' },
// //                   carbs: { type: 'NUMBER' },
// //                   fat: { type: 'NUMBER' },
// //                   category: { type: 'STRING' },
// //                   ingredients: {
// //                     type: 'ARRAY',
// //                     items: {
// //                       type: 'OBJECT',
// //                       properties: {
// //                         name: { type: 'STRING' },
// //                         weight: { type: 'STRING' },
// //                       },
// //                       required: ['name', 'weight'],
// //                     },
// //                   },
// //                 },
// //                 required: ['id', 'name', 'calories', 'protein', 'carbs', 'fat', 'category', 'ingredients'],
// //               },
// //             },
// //             required: ['mealType', 'food'],
// //           },
// //         },
// //         {
// //           name: 'removeMeal',
// //           description: 'Remove a meal.',
// //           parameters: {
// //             type: 'OBJECT',
// //             properties: {
// //               mealType: { type: 'STRING', description: 'The meal type: breakfast, lunch, dinner, snacks' },
// //             },
// //             required: ['mealType'],
// //           },
// //         },
// //       ];

// //       const modelWithTools = this.genAI.getGenerativeModel({
// //         model: this.DEFAULT_MODEL,
// //         tools: [{ functionDeclarations }],
// //       });

// //       const result = await modelWithTools.generateContent({ contents: conversation });
// //       const response = await result.response;
      
// //       const functionCalls: Array<{ name: string; args: any }> = [];
// //       let finalResponse = '';

// //       for (const part of response.candidates?.[0]?.content?.parts || []) {
// //         if (part.functionCall) {
// //           functionCalls.push({
// //             name: part.functionCall.name,
// //             args: part.functionCall.args || {},
// //           });
// //         }
// //         if (part.text) {
// //           finalResponse += part.text;
// //         }
// //       }

// //       return {
// //         response: finalResponse || 'Task completed successfully!',
// //         functionCalls,
// //       };
// //     } catch (error: any) {
// //       console.error('Agentic response error:', error);
// //       if (error.message.includes('404') || error.message.includes('model')) {
// //         return {
// //           response: `Error: The model ${this.DEFAULT_MODEL} is not available. Please check settings or try again later.`,
// //           functionCalls: [],
// //         };
// //       }
// //       return {
// //         response: 'Sorry, an error occurred while processing your request.',
// //         functionCalls: [],
// //       };
// //     }
// //   }

// //   async generateContent(prompt: string): Promise<string> {
// //     try {
// //       if (!this.apiKey || !this.model) {
// //         throw new Error('API key not configured');
// //       }
      
// //       const result = await this.model.generateContent(prompt);
// //       const response = await result.response;
// //       return response.text();
// //     } catch (error: any) {
// //       console.error('Generate content error:', error);
// //       if (error.message.includes('404') || error.message.includes('model')) {
// //         throw new Error(`Model ${this.DEFAULT_MODEL} not found. Please check Google Generative AI documentation.`);
// //       }
// //       throw error;
// //     }
// //   }

// //   async generateAgenticChatResponse(
// //     userMessage: string,
// //     functions: Record<string, (args: any) => Promise<string>>,
// //     context?: string
// //   ): Promise<string> {
// //     try {
// //       const conversation: Content[] = [{
// //         role: 'user',
// //         parts: [{ text: `${context || ''}\n\nUser: ${userMessage}` }],
// //       }];

// //       let finalResponse = '';
// //       let maxIterations = 3;

// //       while (maxIterations > 0) {
// //         const result = await this.generateAgenticResponse(conversation, functions);
        
// //         if (result.functionCalls.length === 0) {
// //           finalResponse = result.response;
// //           break;
// //         }

// //         conversation.push({
// //           role: 'model',
// //           parts: [{ text: result.response }],
// //         });

// //         const functionResults = await Promise.all(result.functionCalls.map(async (fc) => {
// //           const func = functions[fc.name];
// //           if (!func) {
// //             return {
// //               functionResponse: {
// //                 name: fc.name,
// //                 response: { result: `Unknown function: ${fc.name}` },
// //               },
// //             };
// //           }
// //           let res;
// //           try {
// //             res = await func(fc.args || {});
// //           } catch (error) {
// //             res = `Error: ${error}`;
// //           }
// //           return {
// //             functionResponse: {
// //               name: fc.name,
// //               response: { result: res },
// //             },
// //           };
// //         }));

// //         conversation.push({
// //           role: 'user',
// //           parts: functionResults,
// //         });

// //         maxIterations--;
// //       }

// //       return finalResponse || 'I\'ve analyzed your request and taken appropriate actions!';
// //     } catch (error: any) {
// //       console.error('Agentic chat error:', error);
// //       return `Sorry, an error occurred while processing your request: ${error.message}`;
// //     }
// //   }

// //   private buildDynamicPercentagePrompt(
// //     personalInfo: PersonalInfo,
// //     mealType: string,
// //     currentMeals: any[]
// //   ): string {
// //     const targetNutrition = this.calculateTargetNutrition(personalInfo);
// //     const currentNutrition = this.calculateTotalNutrition(currentMeals);
// //     const remainingNutrition = this.calculateRemainingNutrition(targetNutrition, currentNutrition);
    
// //     const mealPercentages = this.getDynamicMealPercentages(mealType);
// //     const thisMealTarget = this.calculateMealTarget(targetNutrition, mealPercentages);
// //     const adjustedTarget = this.adjustForRemaining(thisMealTarget, remainingNutrition);

// //     const mealsByType = this.groupMealsByType(currentMeals);
// //     const mealDetails = this.formatMealDetails(mealsByType);

// //     return `You are an expert dietitian. Generate EXACTLY 5 realistic meals for ${mealType} using DYNAMIC PERCENTAGE ALLOCATION.

// // 🎯 USER'S DAILY TARGETS:
// // - Calories: ${targetNutrition.calories}
// // - Protein: ${targetNutrition.protein}g  
// // - Carbs: ${targetNutrition.carbs}g
// // - Fat: ${targetNutrition.fat}g

// // 📊 CONSUMED TODAY:
// // ${mealDetails}

// // 📊 REMAINING:
// // - Calories: ${remainingNutrition.calories} (${Math.round((remainingNutrition.calories/targetNutrition.calories)*100)}%)
// // - Protein: ${remainingNutrition.protein}g (${Math.round((remainingNutrition.protein/targetNutrition.protein)*100)}%)
// // - Carbs: ${remainingNutrition.carbs}g (${Math.round((remainingNutrition.carbs/targetNutrition.carbs)*100)}%)
// // - Fat: ${remainingNutrition.fat}g (${Math.round((remainingNutrition.fat/targetNutrition.fat)*100)}%)

// // 🎯 ${mealType.toUpperCase()} TARGET (${mealPercentages.calories}% of daily):
// // - Calories: ${adjustedTarget.calories} ±10%
// // - Protein: ${adjustedTarget.protein} ±10% 
// // - Carbs: ${adjustedTarget.carbs} ±10%
// // - Fat: ${adjustedTarget.fat} ±10%

// // ⚡ DYNAMIC MEAL PERCENTAGE RULES:
// // | Meal     | Cal % | Prot % | Carb % | Fat % |
// // |----------|-------|--------|--------|-------|
// // | Breakfast| ${this.getDynamicMealPercentages('breakfast').calories}% | ${this.getDynamicMealPercentages('breakfast').protein}% | ${this.getDynamicMealPercentages('breakfast').carbs}% | ${this.getDynamicMealPercentages('breakfast').fat}% |
// // | Lunch    | ${this.getDynamicMealPercentages('lunch').calories}% | ${this.getDynamicMealPercentages('lunch').protein}% | ${this.getDynamicMealPercentages('lunch').carbs}% | ${this.getDynamicMealPercentages('lunch').fat}% |
// // | Dinner   | ${this.getDynamicMealPercentages('dinner').calories}% | ${this.getDynamicMealPercentages('dinner').protein}% | ${this.getDynamicMealPercentages('dinner').carbs}% | ${this.getDynamicMealPercentages('dinner').fat}% |
// // | Snacks   | ${this.getDynamicMealPercentages('snacks').calories}% | ${this.getDynamicMealPercentages('snacks').protein}% | ${this.getDynamicMealPercentages('snacks').carbs}% | ${this.getDynamicMealPercentages('snacks').fat}% |

// // ✅ REALISTIC PORTION CONSTRAINTS:
// // - Breakfast/Lunch/Dinner: ${Math.round(targetNutrition.calories*0.20)}-${Math.round(targetNutrition.calories*0.35)} kcal
// // - Snacks: ${Math.round(targetNutrition.calories*0.08)}-${Math.round(targetNutrition.calories*0.15)} kcal
// // - Protein/meal: ${Math.round(targetNutrition.protein*0.20)}-${Math.round(targetNutrition.protein*0.35)}g

// // 👤 ${personalInfo.name}: ${personalInfo.goal.replace('_', ' ')} goal

// // 📋 JSON FORMAT (5 meals):
// // [
// //   {
// //     "id": "unique_id",
// //     "name": "Complete Meal Name",
// //     "calories": ${Math.round(adjustedTarget.calories)},
// //     "protein": ${Math.round(adjustedTarget.protein)},
// //     "carbs": ${Math.round(adjustedTarget.carbs)},
// //     "fat": ${Math.round(adjustedTarget.fat)},
// //     "category": "${mealType}",
// //     "ingredients": [{"name": "Ingredient", "weight": "150g"}]
// //   }
// // ]

// // ONLY JSON ARRAY. NO OTHER TEXT.`;
// //   }

// //   private getDynamicMealPercentages(mealType: string) {
// //     const percentages = {
// //       breakfast: { calories: 0.25, protein: 0.25, carbs: 0.30, fat: 0.20 },
// //       lunch: { calories: 0.30, protein: 0.25, carbs: 0.30, fat: 0.25 },
// //       dinner: { calories: 0.30, protein: 0.30, carbs: 0.25, fat: 0.25 },
// //       snacks: { calories: 0.15, protein: 0.20, carbs: 0.15, fat: 0.30 }
// //     };
// //     return percentages[mealType as keyof typeof percentages] || percentages.breakfast;
// //   }

// //   private calculateMealTarget(targetNutrition: any, percentages: any) {
// //     return {
// //       calories: targetNutrition.calories * percentages.calories,
// //       protein: targetNutrition.protein * percentages.protein,
// //       carbs: targetNutrition.carbs * percentages.carbs,
// //       fat: targetNutrition.fat * percentages.fat
// //     };
// //   }

// //   private adjustForRemaining(mealTarget: any, remaining: any) {
// //     return {
// //       calories: Math.min(mealTarget.calories, remaining.calories),
// //       protein: Math.min(mealTarget.protein, remaining.protein),
// //       carbs: Math.min(mealTarget.carbs, remaining.carbs),
// //       fat: Math.min(mealTarget.fat, remaining.fat)
// //     };
// //   }

// //   public calculateTargetNutrition(personalInfo: PersonalInfo): any {
// //     const calories = parseInt(personalInfo.targetCalories);
// //     let proteinPct = 0.25, carbsPct = 0.50, fatPct = 0.25;

// //     switch (personalInfo.goal) {
// //       case 'lose_weight':
// //         proteinPct = 0.30; carbsPct = 0.45; fatPct = 0.25; break;
// //       case 'gain_weight':
// //       case 'build_muscle':
// //         proteinPct = 0.35; carbsPct = 0.45; fatPct = 0.20; break;
// //       case 'maintain_weight':
// //         proteinPct = 0.25; carbsPct = 0.50; fatPct = 0.25; break;
// //     }

// //     return {
// //       calories,
// //       protein: Math.round(calories * proteinPct / 4),
// //       carbs: Math.round(calories * carbsPct / 4),
// //       fat: Math.round(calories * fatPct / 9)
// //     };
// //   }

// //   public calculateTotalNutrition(meals: Meal[]): any {
// //     return meals.reduce((total: any, meal: any) => {
// //       if (meal.food && meal.consumed) {
// //         total.calories += meal.food.calories;
// //         total.protein += meal.food.protein;
// //         total.carbs += meal.food.carbs;
// //         total.fat += meal.food.fat;
// //       }
// //       return total;
// //     }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
// //   }

// //   private calculateRemainingNutrition(target: any, current: any): any {
// //     return {
// //       calories: Math.max(0, target.calories - current.calories),
// //       protein: Math.max(0, target.protein - current.protein),
// //       carbs: Math.max(0, target.carbs - current.carbs),
// //       fat: Math.max(0, target.fat - current.fat)
// //     };
// //   }

// //   private groupMealsByType(meals: any[]): { [key: string]: any[] } {
// //     const grouped: { [key: string]: any[] } = {};
// //     meals.forEach(meal => {
// //       if (meal.food && meal.consumed) {
// //         const type = meal.id || 'unknown';
// //         if (!grouped[type]) grouped[type] = [];
// //         grouped[type].push(meal);
// //       }
// //     });
// //     return grouped;
// //   }

// //   private formatMealDetails(mealsByType: { [key: string]: any[] }): string {
// //     let details = '';
// //     Object.entries(mealsByType).forEach(([type, meals]: [string, any[]]) => {
// //       const total = meals.reduce((sum: any, meal: any) => {
// //         sum.calories += meal.food.calories;
// //         sum.protein += meal.food.protein;
// //         sum.carbs += meal.food.carbs;
// //         sum.fat += meal.food.fat;
// //         return sum;
// //       }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
      
// //       details += `• ${type}: ${total.calories}kcal (P:${total.protein}g/C:${total.carbs}g/F:${total.fat}g)\n`;
// //     });
// //     return details || 'No meals consumed yet';
// //   }

// //   private parseAIResponse(response: string, mealType: string): FoodItem[] {
// //     try {
// //       const jsonMatch = response.match(/\[[\s\S]*\]/);
// //       if (jsonMatch) {
// //         const parsed = JSON.parse(jsonMatch[0]);
// //         return parsed.map((item: any, index: number) => ({
// //           id: item.id || `ai_${mealType}_${Date.now()}_${index}`,
// //           name: item.name || 'Balanced Meal',
// //           calories: Math.round(parseFloat(item.calories) || 0),
// //           protein: Math.round(parseFloat(item.protein) || 0),
// //           carbs: Math.round(parseFloat(item.carbs) || 0),
// //           fat: Math.round(parseFloat(item.fat) || 0),
// //           category: item.category || mealType,
// //           ingredients: item.ingredients || []
// //         }));
// //       }
// //     } catch (error) {
// //       console.error('Error parsing AI response:', error);
// //     }
// //     return this.getDynamicFallbackRecommendations(mealType, { targetCalories: '2000' });
// //   }

// //   private getDynamicFallbackRecommendations(mealType: string, personalInfo: any): FoodItem[] {
// //     const targetCalories = parseInt(personalInfo.targetCalories || '2000');
// //     const mealCalories = Math.round(targetCalories * this.getDynamicMealPercentages(mealType).calories);
// //     const mealProtein = Math.round((targetCalories * 0.30 / 4) * this.getDynamicMealPercentages(mealType).protein);
// //     const mealCarbs = Math.round((targetCalories * 0.45 / 4) * this.getDynamicMealPercentages(mealType).carbs);
// //     const mealFat = Math.round((targetCalories * 0.25 / 9) * this.getDynamicMealPercentages(mealType).fat);

// //     return [
// //       {
// //         id: `dynamic_fb1_${mealType}`,
// //         name: 'Grilled Chicken Quinoa Bowl',
// //         calories: mealCalories,
// //         protein: mealProtein,
// //         carbs: mealCarbs,
// //         fat: mealFat,
// //         category: mealType,
// //         ingredients: [
// //           { name: 'Chicken Breast', weight: '150g' },
// //           { name: 'Quinoa (cooked)', weight: '120g' },
// //           { name: 'Mixed Vegetables', weight: '200g' },
// //           { name: 'Olive Oil', weight: '10ml' }
// //         ]
// //       },
// //       {
// //         id: `dynamic_fb2_${mealType}`,
// //         name: 'Salmon Sweet Potato Plate',
// //         calories: mealCalories,
// //         protein: mealProtein,
// //         carbs: mealCarbs,
// //         fat: mealFat,
// //         category: mealType,
// //         ingredients: [
// //           { name: 'Salmon Fillet', weight: '130g' },
// //           { name: 'Sweet Potato', weight: '180g' },
// //           { name: 'Broccoli', weight: '150g' },
// //           { name: 'Avocado', weight: '60g' }
// //         ]
// //       },
// //       {
// //         id: `dynamic_fb3_${mealType}`,
// //         name: 'Tofu Veggie Stir Fry',
// //         calories: mealCalories,
// //         protein: mealProtein,
// //         carbs: mealCarbs,
// //         fat: mealFat,
// //         category: mealType,
// //         ingredients: [
// //           { name: 'Tofu', weight: '180g' },
// //           { name: 'Brown Rice (cooked)', weight: '130g' },
// //           { name: 'Mixed Vegetables', weight: '250g' },
// //           { name: 'Sesame Oil', weight: '12ml' }
// //         ]
// //       },
// //       {
// //         id: `dynamic_fb4_${mealType}`,
// //         name: 'Turkey Pasta Primavera',
// //         calories: mealCalories,
// //         protein: mealProtein,
// //         carbs: mealCarbs,
// //         fat: mealFat,
// //         category: mealType,
// //         ingredients: [
// //           { name: 'Ground Turkey', weight: '150g' },
// //           { name: 'Whole Wheat Pasta', weight: '100g dry' },
// //           { name: 'Marinara Sauce', weight: '120g' },
// //           { name: 'Zucchini', weight: '150g' }
// //         ]
// //       },
// //       {
// //         id: `dynamic_fb5_${mealType}`,
// //         name: 'Egg Fried Rice Bowl',
// //         calories: mealCalories,
// //         protein: mealProtein,
// //         carbs: mealCarbs,
// //         fat: mealFat,
// //         category: mealType,
// //         ingredients: [
// //           { name: 'Eggs', weight: '3 large' },
// //           { name: 'Shrimp', weight: '120g' },
// //           { name: 'Brown Rice (cooked)', weight: '140g' },
// //           { name: 'Mixed Vegetables', weight: '150g' }
// //         ]
// //       }
// //     ];
// //   }

// //   isApiKeyConfigured(): boolean {
// //     return !!this.apiKey && !!this.model;
// //   }

// //   getApiKey(): string | null {
// //     return this.apiKey;
// //   }
// // }

// // export default new GeminiService();


// // services/GeminiService.ts
// import { GoogleGenerativeAI, Content, Part } from '@google/generative-ai';
// import { PersonalInfo, FoodItem, Meal } from '@/components/types';

// class GeminiService {
//   private genAI: GoogleGenerativeAI | null = null;
//   private model: any = null;
//   private apiKey: string | null = null;
//   private readonly DEFAULT_MODEL = 'gemini-2.5-flash'; // Updated to a supported model

//   constructor() {}

//   setApiKey(apiKey: string) {
//     if (!apiKey || apiKey.trim() === '') {
//       throw new Error('API key is required');
//     }
//     this.apiKey = apiKey.trim();
//     this.genAI = new GoogleGenerativeAI(this.apiKey);
//     this.model = this.genAI.getGenerativeModel({ model: this.DEFAULT_MODEL });
//   }

//   async generateMealRecommendations(
//     personalInfo: PersonalInfo,
//     mealType: string,
//     currentMeals: any[] = []
//   ): Promise<FoodItem[]> {
//     try {
//       if (!this.apiKey || !this.model) {
//         throw new Error('API key not configured.');
//       }
//       const prompt = this.buildDynamicPercentagePrompt(personalInfo, mealType, currentMeals);
//       const result = await this.model.generateContent(prompt);
//       const response = await result.response;
//       const text = response.text();
//       return this.parseAIResponse(text, mealType);
//     } catch (error: any) {
//       console.error('Error generating meal recommendations:', error);
//       if (error.message.includes('404') || error.message.includes('model')) {
//         console.error(`Model ${this.DEFAULT_MODEL} not found. Please check Google Generative AI documentation for supported models.`);
//       }
//       return this.getDynamicFallbackRecommendations(mealType, personalInfo);
//     }
//   }

//   async analyzeFoodImage(
//     base64: string,
//     personalInfo: PersonalInfo,
//     mealType: string,
//     currentMeals: Meal[]
//   ): Promise<FoodItem[]> {
//     try {
//       if (!this.apiKey || !this.model) {
//         throw new Error('API key not configured.');
//       }

//       const prompt = this.buildImageAnalysisPrompt(personalInfo, mealType, currentMeals);

//       const content = {
//         contents: [
//           {
//             role: 'user',
//             parts: [
//               { text: prompt },
//               {
//                 inlineData: {
//                   mimeType: 'image/jpeg',
//                   data: base64,
//                 },
//               },
//             ],
//           },
//         ],
//       };

//       const result = await this.model.generateContent(content);
//       const response = await result.response;
//       const text = response.text();
//       return this.parseAIResponse(text, mealType);
//     } catch (error: any) {
//       console.error('Error analyzing food image:', error);
//       if (error.message.includes('404') || error.message.includes('model')) {
//         console.error(`Model ${this.DEFAULT_MODEL} not found. Please check Google Generative AI documentation for supported models.`);
//       }
//       return this.getDynamicFallbackRecommendations(mealType, personalInfo);
//     }
//   }

//   async generateAgenticResponse(
//     conversation: Content[],
//     functions: Record<string, (args: any) => Promise<string>>
//   ): Promise<{
//     response: string;
//     functionCalls: Array<{ name: string; args: any }>;
//   }> {
//     try {
//       if (!this.apiKey || !this.genAI) {
//         throw new Error('API key not configured');
//       }

//       const functionDeclarations: any[] = [
//         {
//           name: 'getPersonalInfo',
//           description: 'Get user\'s personal information.',
//           parameters: {
//             type: 'OBJECT',
//             properties: {},
//             required: [],
//           },
//         },
//         {
//           name: 'getNutritionalData',
//           description: 'Get daily nutritional targets.',
//           parameters: {
//             type: 'OBJECT',
//             properties: {},
//             required: [],
//           },
//         },
//         {
//           name: 'getTotalNutrition',
//           description: 'Get current consumed nutrition.',
//           parameters: {
//             type: 'OBJECT',
//             properties: {},
//             required: [],
//           },
//         },
//         {
//           name: 'getCurrentMeals',
//           description: 'Get the current meal plan.',
//           parameters: {
//             type: 'OBJECT',
//             properties: {},
//             required: [],
//           },
//         },
//         {
//           name: 'addOrUpdateMeal',
//           description: 'Add or update a meal.',
//           parameters: {
//             type: 'OBJECT',
//             properties: {
//               mealType: { type: 'STRING', description: 'The meal type: breakfast, lunch, dinner, snacks' },
//               food: {
//                 type: 'OBJECT',
//                 properties: {
//                   id: { type: 'STRING' },
//                   name: { type: 'STRING' },
//                   calories: { type: 'NUMBER' },
//                   protein: { type: 'NUMBER' },
//                   carbs: { type: 'NUMBER' },
//                   fat: { type: 'NUMBER' },
//                   category: { type: 'STRING' },
//                   ingredients: {
//                     type: 'ARRAY',
//                     items: {
//                       type: 'OBJECT',
//                       properties: {
//                         name: { type: 'STRING' },
//                         weight: { type: 'STRING' },
//                       },
//                       required: ['name', 'weight'],
//                     },
//                   },
//                 },
//                 required: ['id', 'name', 'calories', 'protein', 'carbs', 'fat', 'category', 'ingredients'],
//               },
//             },
//             required: ['mealType', 'food'],
//           },
//         },
//         {
//           name: 'removeMeal',
//           description: 'Remove a meal.',
//           parameters: {
//             type: 'OBJECT',
//             properties: {
//               mealType: { type: 'STRING', description: 'The meal type: breakfast, lunch, dinner, snacks' },
//             },
//             required: ['mealType'],
//           },
//         },
//       ];

//       const modelWithTools = this.genAI.getGenerativeModel({
//         model: this.DEFAULT_MODEL,
//         tools: [{ functionDeclarations }],
//       });

//       const result = await modelWithTools.generateContent({ contents: conversation });
//       const response = await result.response;
      
//       const functionCalls: Array<{ name: string; args: any }> = [];
//       let finalResponse = '';

//       for (const part of response.candidates?.[0]?.content?.parts || []) {
//         if (part.functionCall) {
//           functionCalls.push({
//             name: part.functionCall.name,
//             args: part.functionCall.args || {},
//           });
//         }
//         if (part.text) {
//           finalResponse += part.text;
//         }
//       }

//       return {
//         response: finalResponse || 'Task completed successfully!',
//         functionCalls,
//       };
//     } catch (error: any) {
//       console.error('Agentic response error:', error);
//       if (error.message.includes('404') || error.message.includes('model')) {
//         return {
//           response: `Error: The model ${this.DEFAULT_MODEL} is not available. Please check settings or try again later.`,
//           functionCalls: [],
//         };
//       }
//       return {
//         response: 'Sorry, an error occurred while processing your request.',
//         functionCalls: [],
//       };
//     }
//   }

//   async generateContent(prompt: string): Promise<string> {
//     try {
//       if (!this.apiKey || !this.model) {
//         throw new Error('API key not configured');
//       }
      
//       const result = await this.model.generateContent(prompt);
//       const response = await result.response;
//       return response.text();
//     } catch (error: any) {
//       console.error('Generate content error:', error);
//       if (error.message.includes('404') || error.message.includes('model')) {
//         throw new Error(`Model ${this.DEFAULT_MODEL} not found. Please check Google Generative AI documentation.`);
//       }
//       throw error;
//     }
//   }

//   async generateAgenticChatResponse(
//     userMessage: string,
//     functions: Record<string, (args: any) => Promise<string>>,
//     context?: string
//   ): Promise<string> {
//     try {
//       const conversation: Content[] = [{
//         role: 'user',
//         parts: [{ text: `${context || ''}\n\nUser: ${userMessage}` }],
//       }];

//       let finalResponse = '';
//       let maxIterations = 3;

//       while (maxIterations > 0) {
//         const result = await this.generateAgenticResponse(conversation, functions);
        
//         if (result.functionCalls.length === 0) {
//           finalResponse = result.response;
//           break;
//         }

//         conversation.push({
//           role: 'model',
//           parts: [{ text: result.response }],
//         });

//         const functionResults = await Promise.all(result.functionCalls.map(async (fc) => {
//           const func = functions[fc.name];
//           if (!func) {
//             return {
//               functionResponse: {
//                 name: fc.name,
//                 response: { result: `Unknown function: ${fc.name}` },
//               },
//             };
//           }
//           let res;
//           try {
//             res = await func(fc.args || {});
//           } catch (error) {
//             res = `Error: ${error}`;
//           }
//           return {
//             functionResponse: {
//               name: fc.name,
//               response: { result: res },
//             },
//           };
//         }));

//         conversation.push({
//           role: 'user',
//           parts: functionResults,
//         });

//         maxIterations--;
//       }

//       return finalResponse || 'I\'ve analyzed your request and taken appropriate actions!';
//     } catch (error: any) {
//       console.error('Agentic chat error:', error);
//       return `Sorry, an error occurred while processing your request: ${error.message}`;
//     }
//   }

//   private buildDynamicPercentagePrompt(
//     personalInfo: PersonalInfo,
//     mealType: string,
//     currentMeals: any[]
//   ): string {
//     const targetNutrition = this.calculateTargetNutrition(personalInfo);
//     const currentNutrition = this.calculateTotalNutrition(currentMeals);
//     const remainingNutrition = this.calculateRemainingNutrition(targetNutrition, currentNutrition);
    
//     const mealPercentages = this.getDynamicMealPercentages(mealType);
//     const thisMealTarget = this.calculateMealTarget(targetNutrition, mealPercentages);
//     const adjustedTarget = this.adjustForRemaining(thisMealTarget, remainingNutrition);

//     const mealsByType = this.groupMealsByType(currentMeals);
//     const mealDetails = this.formatMealDetails(mealsByType);

//     return `You are an expert dietitian. Generate EXACTLY 5 realistic meals for ${mealType} using DYNAMIC PERCENTAGE ALLOCATION.

// 🎯 USER'S DAILY TARGETS:
// - Calories: ${targetNutrition.calories}
// - Protein: ${targetNutrition.protein}g  
// - Carbs: ${targetNutrition.carbs}g
// - Fat: ${targetNutrition.fat}g

// 📊 CONSUMED TODAY:
// ${mealDetails}

// 📊 REMAINING:
// - Calories: ${remainingNutrition.calories} (${Math.round((remainingNutrition.calories/targetNutrition.calories)*100)}%)
// - Protein: ${remainingNutrition.protein}g (${Math.round((remainingNutrition.protein/targetNutrition.protein)*100)}%)
// - Carbs: ${remainingNutrition.carbs}g (${Math.round((remainingNutrition.carbs/targetNutrition.carbs)*100)}%)
// - Fat: ${remainingNutrition.fat}g (${Math.round((remainingNutrition.fat/targetNutrition.fat)*100)}%)

// 🎯 ${mealType.toUpperCase()} TARGET (${mealPercentages.calories}% of daily):
// - Calories: ${adjustedTarget.calories} ±10%
// - Protein: ${adjustedTarget.protein} ±10% 
// - Carbs: ${adjustedTarget.carbs} ±10%
// - Fat: ${adjustedTarget.fat} ±10%

// ⚡ DYNAMIC MEAL PERCENTAGE RULES:
// | Meal     | Cal % | Prot % | Carb % | Fat % |
// |----------|-------|--------|--------|-------|
// | Breakfast| ${this.getDynamicMealPercentages('breakfast').calories}% | ${this.getDynamicMealPercentages('breakfast').protein}% | ${this.getDynamicMealPercentages('breakfast').carbs}% | ${this.getDynamicMealPercentages('breakfast').fat}% |
// | Lunch    | ${this.getDynamicMealPercentages('lunch').calories}% | ${this.getDynamicMealPercentages('lunch').protein}% | ${this.getDynamicMealPercentages('lunch').carbs}% | ${this.getDynamicMealPercentages('lunch').fat}% |
// | Dinner   | ${this.getDynamicMealPercentages('dinner').calories}% | ${this.getDynamicMealPercentages('dinner').protein}% | ${this.getDynamicMealPercentages('dinner').carbs}% | ${this.getDynamicMealPercentages('dinner').fat}% |
// | Snacks   | ${this.getDynamicMealPercentages('snacks').calories}% | ${this.getDynamicMealPercentages('snacks').protein}% | ${this.getDynamicMealPercentages('snacks').carbs}% | ${this.getDynamicMealPercentages('snacks').fat}% |

// ✅ REALISTIC PORTION CONSTRAINTS:
// - Breakfast/Lunch/Dinner: ${Math.round(targetNutrition.calories*0.20)}-${Math.round(targetNutrition.calories*0.35)} kcal
// - Snacks: ${Math.round(targetNutrition.calories*0.08)}-${Math.round(targetNutrition.calories*0.15)} kcal
// - Protein/meal: ${Math.round(targetNutrition.protein*0.20)}-${Math.round(targetNutrition.protein*0.35)}g

// 👤 ${personalInfo.name}: ${personalInfo.goal.replace('_', ' ')} goal

// 📋 JSON FORMAT (5 meals):
// [
//   {
//     "id": "unique_id",
//     "name": "Complete Meal Name",
//     "calories": ${Math.round(adjustedTarget.calories)},
//     "protein": ${Math.round(adjustedTarget.protein)},
//     "carbs": ${Math.round(adjustedTarget.carbs)},
//     "fat": ${Math.round(adjustedTarget.fat)},
//     "category": "${mealType}",
//     "ingredients": [{"name": "Ingredient", "weight": "150g"}]
//   }
// ]

// ONLY JSON ARRAY. NO OTHER TEXT.`;
//   }

//   private buildImageAnalysisPrompt(
//     personalInfo: PersonalInfo,
//     mealType: string,
//     currentMeals: Meal[]
//   ): string {
//     const basePrompt = this.buildDynamicPercentagePrompt(personalInfo, mealType, currentMeals);
//     return `Analyze the food in the provided image. Identify the main ingredients and estimate the nutritional content (calories, protein, carbs, fat). Based on this analysis, generate EXACTLY 5 personalized ${mealType} meal variations that incorporate similar ingredients and align with the user's nutritional needs and dietary preferences.

// ${basePrompt}`;
//   }

//   private getDynamicMealPercentages(mealType: string) {
//     const percentages = {
//       breakfast: { calories: 0.25, protein: 0.25, carbs: 0.30, fat: 0.20 },
//       lunch: { calories: 0.30, protein: 0.25, carbs: 0.30, fat: 0.25 },
//       dinner: { calories: 0.30, protein: 0.30, carbs: 0.25, fat: 0.25 },
//       snacks: { calories: 0.15, protein: 0.20, carbs: 0.15, fat: 0.30 }
//     };
//     return percentages[mealType as keyof typeof percentages] || percentages.breakfast;
//   }

//   private calculateMealTarget(targetNutrition: any, percentages: any) {
//     return {
//       calories: targetNutrition.calories * percentages.calories,
//       protein: targetNutrition.protein * percentages.protein,
//       carbs: targetNutrition.carbs * percentages.carbs,
//       fat: targetNutrition.fat * percentages.fat
//     };
//   }

//   private adjustForRemaining(mealTarget: any, remaining: any) {
//     return {
//       calories: Math.min(mealTarget.calories, remaining.calories),
//       protein: Math.min(mealTarget.protein, remaining.protein),
//       carbs: Math.min(mealTarget.carbs, remaining.carbs),
//       fat: Math.min(mealTarget.fat, remaining.fat)
//     };
//   }

//   public calculateTargetNutrition(personalInfo: PersonalInfo): any {
//     const calories = parseInt(personalInfo.targetCalories);
//     let proteinPct = 0.25, carbsPct = 0.50, fatPct = 0.25;

//     switch (personalInfo.goal) {
//       case 'lose_weight':
//         proteinPct = 0.30; carbsPct = 0.45; fatPct = 0.25; break;
//       case 'gain_weight':
//       case 'build_muscle':
//         proteinPct = 0.35; carbsPct = 0.45; fatPct = 0.20; break;
//       case 'maintain_weight':
//         proteinPct = 0.25; carbsPct = 0.50; fatPct = 0.25; break;
//     }

//     return {
//       calories,
//       protein: Math.round(calories * proteinPct / 4),
//       carbs: Math.round(calories * carbsPct / 4),
//       fat: Math.round(calories * fatPct / 9)
//     };
//   }

//   public calculateTotalNutrition(meals: Meal[]): any {
//     return meals.reduce((total: any, meal: any) => {
//       if (meal.food && meal.consumed) {
//         total.calories += meal.food.calories;
//         total.protein += meal.food.protein;
//         total.carbs += meal.food.carbs;
//         total.fat += meal.food.fat;
//       }
//       return total;
//     }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
//   }

//   private calculateRemainingNutrition(target: any, current: any): any {
//     return {
//       calories: Math.max(0, target.calories - current.calories),
//       protein: Math.max(0, target.protein - current.protein),
//       carbs: Math.max(0, target.carbs - current.carbs),
//       fat: Math.max(0, target.fat - current.fat)
//     };
//   }

//   private groupMealsByType(meals: any[]): { [key: string]: any[] } {
//     const grouped: { [key: string]: any[] } = {};
//     meals.forEach(meal => {
//       if (meal.food && meal.consumed) {
//         const type = meal.id || 'unknown';
//         if (!grouped[type]) grouped[type] = [];
//         grouped[type].push(meal);
//       }
//     });
//     return grouped;
//   }

//   private formatMealDetails(mealsByType: { [key: string]: any[] }): string {
//     let details = '';
//     Object.entries(mealsByType).forEach(([type, meals]: [string, any[]]) => {
//       const total = meals.reduce((sum: any, meal: any) => {
//         sum.calories += meal.food.calories;
//         sum.protein += meal.food.protein;
//         sum.carbs += meal.food.carbs;
//         sum.fat += meal.food.fat;
//         return sum;
//       }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
      
//       details += `• ${type}: ${total.calories}kcal (P:${total.protein}g/C:${total.carbs}g/F:${total.fat}g)\n`;
//     });
//     return details || 'No meals consumed yet';
//   }

//   private parseAIResponse(response: string, mealType: string): FoodItem[] {
//     try {
//       const jsonMatch = response.match(/\[[\s\S]*\]/);
//       if (jsonMatch) {
//         const parsed = JSON.parse(jsonMatch[0]);
//         return parsed.map((item: any, index: number) => ({
//           id: item.id || `ai_${mealType}_${Date.now()}_${index}`,
//           name: item.name || 'Balanced Meal',
//           calories: Math.round(parseFloat(item.calories) || 0),
//           protein: Math.round(parseFloat(item.protein) || 0),
//           carbs: Math.round(parseFloat(item.carbs) || 0),
//           fat: Math.round(parseFloat(item.fat) || 0),
//           category: item.category || mealType,
//           ingredients: item.ingredients || []
//         }));
//       }
//     } catch (error) {
//       console.error('Error parsing AI response:', error);
//     }
//     return this.getDynamicFallbackRecommendations(mealType, { targetCalories: '2000' });
//   }

//   private getDynamicFallbackRecommendations(mealType: string, personalInfo: any): FoodItem[] {
//     const targetCalories = parseInt(personalInfo.targetCalories || '2000');
//     const mealCalories = Math.round(targetCalories * this.getDynamicMealPercentages(mealType).calories);
//     const mealProtein = Math.round((targetCalories * 0.30 / 4) * this.getDynamicMealPercentages(mealType).protein);
//     const mealCarbs = Math.round((targetCalories * 0.45 / 4) * this.getDynamicMealPercentages(mealType).carbs);
//     const mealFat = Math.round((targetCalories * 0.25 / 9) * this.getDynamicMealPercentages(mealType).fat);

//     return [
//       {
//         id: `dynamic_fb1_${mealType}`,
//         name: 'Grilled Chicken Quinoa Bowl',
//         calories: mealCalories,
//         protein: mealProtein,
//         carbs: mealCarbs,
//         fat: mealFat,
//         category: mealType,
//         ingredients: [
//           { name: 'Chicken Breast', weight: '150g' },
//           { name: 'Quinoa (cooked)', weight: '120g' },
//           { name: 'Mixed Vegetables', weight: '200g' },
//           { name: 'Olive Oil', weight: '10ml' }
//         ]
//       },
//       {
//         id: `dynamic_fb2_${mealType}`,
//         name: 'Salmon Sweet Potato Plate',
//         calories: mealCalories,
//         protein: mealProtein,
//         carbs: mealCarbs,
//         fat: mealFat,
//         category: mealType,
//         ingredients: [
//           { name: 'Salmon Fillet', weight: '130g' },
//           { name: 'Sweet Potato', weight: '180g' },
//           { name: 'Broccoli', weight: '150g' },
//           { name: 'Avocado', weight: '60g' }
//         ]
//       },
//       {
//         id: `dynamic_fb3_${mealType}`,
//         name: 'Tofu Veggie Stir Fry',
//         calories: mealCalories,
//         protein: mealProtein,
//         carbs: mealCarbs,
//         fat: mealFat,
//         category: mealType,
//         ingredients: [
//           { name: 'Tofu', weight: '180g' },
//           { name: 'Brown Rice (cooked)', weight: '130g' },
//           { name: 'Mixed Vegetables', weight: '250g' },
//           { name: 'Sesame Oil', weight: '12ml' }
//         ]
//       },
//       {
//         id: `dynamic_fb4_${mealType}`,
//         name: 'Turkey Pasta Primavera',
//         calories: mealCalories,
//         protein: mealProtein,
//         carbs: mealCarbs,
//         fat: mealFat,
//         category: mealType,
//         ingredients: [
//           { name: 'Ground Turkey', weight: '150g' },
//           { name: 'Whole Wheat Pasta', weight: '100g dry' },
//           { name: 'Marinara Sauce', weight: '120g' },
//           { name: 'Zucchini', weight: '150g' }
//         ]
//       },
//       {
//         id: `dynamic_fb5_${mealType}`,
//         name: 'Egg Fried Rice Bowl',
//         calories: mealCalories,
//         protein: mealProtein,
//         carbs: mealCarbs,
//         fat: mealFat,
//         category: mealType,
//         ingredients: [
//           { name: 'Eggs', weight: '3 large' },
//           { name: 'Shrimp', weight: '120g' },
//           { name: 'Brown Rice (cooked)', weight: '140g' },
//           { name: 'Mixed Vegetables', weight: '150g' }
//         ]
//       }
//     ];
//   }

//   isApiKeyConfigured(): boolean {
//     return !!this.apiKey && !!this.model;
//   }

//   getApiKey(): string | null {
//     return this.apiKey;
//   }
// }

// export default new GeminiService();


// Modified: services/GeminiService.ts
// Changes:
// - Updated buildImageAnalysisPrompt to focus on analyzing a single meal from the image
// - Prompt now requests detailed analysis of the exact meal in the image, including estimated portions, nutritional breakdown, and suggestions for improvements
// - Output changed to a single JSON object instead of an array of 5 meals
// - Adjusted parseAIResponse to handle a single object instead of array
// - Updated analyzeFoodImage to return array with single item for compatibility with existing types
// - Removed "generate EXACTLY 5" and variations; now it's detailed info for the observed meal
// - Added more details to the prompt for "detailed meal info" like preparation notes, potential allergens, and health insights
// - Fallback now returns a single fallback meal
// - Kept dynamic targets but focused on matching the observed meal to user's needs

import { GoogleGenerativeAI, Content, Part } from '@google/generative-ai';
import { PersonalInfo, FoodItem, Meal } from '@/components/types';

class GeminiService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;
  private apiKey: string | null = null;
  private readonly DEFAULT_MODEL = 'gemini-2.5-flash'; // Updated to a supported model

  constructor() {}

  setApiKey(apiKey: string) {
    if (!apiKey || apiKey.trim() === '') {
      throw new Error('API key is required');
    }
    this.apiKey = apiKey.trim();
    this.genAI = new GoogleGenerativeAI(this.apiKey);
    this.model = this.genAI.getGenerativeModel({ model: this.DEFAULT_MODEL });
  }

  async generateMealRecommendations(
    personalInfo: PersonalInfo,
    mealType: string,
    currentMeals: any[] = []
  ): Promise<FoodItem[]> {
    try {
      if (!this.apiKey || !this.model) {
        throw new Error('API key not configured.');
      }
      const prompt = this.buildDynamicPercentagePrompt(personalInfo, mealType, currentMeals);
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      return this.parseAIResponse(text, mealType);
    } catch (error: any) {
      console.error('Error generating meal recommendations:', error);
      if (error.message.includes('404') || error.message.includes('model')) {
        console.error(`Model ${this.DEFAULT_MODEL} not found. Please check Google Generative AI documentation for supported models.`);
      }
      return this.getDynamicFallbackRecommendations(mealType, personalInfo);
    }
  }

  async analyzeFoodImage(
    base64: string,
    personalInfo: PersonalInfo,
    mealType: string,
    currentMeals: Meal[]
  ): Promise<FoodItem[]> {
    try {
      if (!this.apiKey || !this.model) {
        throw new Error('API key not configured.');
      }

      const prompt = this.buildImageAnalysisPrompt(personalInfo, mealType, currentMeals);

      const content = {
        contents: [
          {
            role: 'user',
            parts: [
              { text: prompt },
              {
                inlineData: {
                  mimeType: 'image/jpeg',
                  data: base64,
                },
              },
            ],
          },
        ],
      };

      const result = await this.model.generateContent(content);
      const response = await result.response;
      const text = response.text();
      const parsed = this.parseAIResponse(text, mealType);
      return parsed.length > 0 ? parsed : this.getDynamicFallbackRecommendations(mealType, personalInfo);
    } catch (error: any) {
      console.error('Error analyzing food image:', error);
      if (error.message.includes('404') || error.message.includes('model')) {
        console.error(`Model ${this.DEFAULT_MODEL} not found. Please check Google Generative AI documentation for supported models.`);
      }
      return this.getDynamicFallbackRecommendations(mealType, personalInfo);
    }
  }

  async generateAgenticResponse(
    conversation: Content[],
    functions: Record<string, (args: any) => Promise<string>>
  ): Promise<{
    response: string;
    functionCalls: Array<{ name: string; args: any }>;
  }> {
    try {
      if (!this.apiKey || !this.genAI) {
        throw new Error('API key not configured');
      }

      const functionDeclarations: any[] = [
        {
          name: 'getPersonalInfo',
          description: 'Get user\'s personal information.',
          parameters: {
            type: 'OBJECT',
            properties: {},
            required: [],
          },
        },
        {
          name: 'getNutritionalData',
          description: 'Get daily nutritional targets.',
          parameters: {
            type: 'OBJECT',
            properties: {},
            required: [],
          },
        },
        {
          name: 'getTotalNutrition',
          description: 'Get current consumed nutrition.',
          parameters: {
            type: 'OBJECT',
            properties: {},
            required: [],
          },
        },
        {
          name: 'getCurrentMeals',
          description: 'Get the current meal plan.',
          parameters: {
            type: 'OBJECT',
            properties: {},
            required: [],
          },
        },
        {
          name: 'addOrUpdateMeal',
          description: 'Add or update a meal.',
          parameters: {
            type: 'OBJECT',
            properties: {
              mealType: { type: 'STRING', description: 'The meal type: breakfast, lunch, dinner, snacks' },
              food: {
                type: 'OBJECT',
                properties: {
                  id: { type: 'STRING' },
                  name: { type: 'STRING' },
                  calories: { type: 'NUMBER' },
                  protein: { type: 'NUMBER' },
                  carbs: { type: 'NUMBER' },
                  fat: { type: 'NUMBER' },
                  category: { type: 'STRING' },
                  ingredients: {
                    type: 'ARRAY',
                    items: {
                      type: 'OBJECT',
                      properties: {
                        name: { type: 'STRING' },
                        weight: { type: 'STRING' },
                      },
                      required: ['name', 'weight'],
                    },
                  },
                },
                required: ['id', 'name', 'calories', 'protein', 'carbs', 'fat', 'category', 'ingredients'],
              },
            },
            required: ['mealType', 'food'],
          },
        },
        {
          name: 'removeMeal',
          description: 'Remove a meal.',
          parameters: {
            type: 'OBJECT',
            properties: {
              mealType: { type: 'STRING', description: 'The meal type: breakfast, lunch, dinner, snacks' },
            },
            required: ['mealType'],
          },
        },
      ];

      const modelWithTools = this.genAI.getGenerativeModel({
        model: this.DEFAULT_MODEL,
        tools: [{ functionDeclarations }],
      });

      const result = await modelWithTools.generateContent({ contents: conversation });
      const response = await result.response;
      
      const functionCalls: Array<{ name: string; args: any }> = [];
      let finalResponse = '';

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.functionCall) {
          functionCalls.push({
            name: part.functionCall.name,
            args: part.functionCall.args || {},
          });
        }
        if (part.text) {
          finalResponse += part.text;
        }
      }

      return {
        response: finalResponse || 'Task completed successfully!',
        functionCalls,
      };
    } catch (error: any) {
      console.error('Agentic response error:', error);
      if (error.message.includes('404') || error.message.includes('model')) {
        return {
          response: `Error: The model ${this.DEFAULT_MODEL} is not available. Please check settings or try again later.`,
          functionCalls: [],
        };
      }
      return {
        response: 'Sorry, an error occurred while processing your request.',
        functionCalls: [],
      };
    }
  }

  async generateContent(prompt: string): Promise<string> {
    try {
      if (!this.apiKey || !this.model) {
        throw new Error('API key not configured');
      }
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error: any) {
      console.error('Generate content error:', error);
      if (error.message.includes('404') || error.message.includes('model')) {
        throw new Error(`Model ${this.DEFAULT_MODEL} not found. Please check Google Generative AI documentation.`);
      }
      throw error;
    }
  }

  async generateAgenticChatResponse(
    userMessage: string,
    functions: Record<string, (args: any) => Promise<string>>,
    context?: string
  ): Promise<string> {
    try {
      const conversation: Content[] = [{
        role: 'user',
        parts: [{ text: `${context || ''}\n\nUser: ${userMessage}` }],
      }];

      let finalResponse = '';
      let maxIterations = 3;

      while (maxIterations > 0) {
        const result = await this.generateAgenticResponse(conversation, functions);
        
        if (result.functionCalls.length === 0) {
          finalResponse = result.response;
          break;
        }

        conversation.push({
          role: 'model',
          parts: [{ text: result.response }],
        });

        const functionResults = await Promise.all(result.functionCalls.map(async (fc) => {
          const func = functions[fc.name];
          if (!func) {
            return {
              functionResponse: {
                name: fc.name,
                response: { result: `Unknown function: ${fc.name}` },
              },
            };
          }
          let res;
          try {
            res = await func(fc.args || {});
          } catch (error) {
            res = `Error: ${error}`;
          }
          return {
            functionResponse: {
              name: fc.name,
              response: { result: res },
            },
          };
        }));

        conversation.push({
          role: 'user',
          parts: functionResults,
        });

        maxIterations--;
      }

      return finalResponse || 'I\'ve analyzed your request and taken appropriate actions!';
    } catch (error: any) {
      console.error('Agentic chat error:', error);
      return `Sorry, an error occurred while processing your request: ${error.message}`;
    }
  }

  private buildDynamicPercentagePrompt(
    personalInfo: PersonalInfo,
    mealType: string,
    currentMeals: any[]
  ): string {
    const targetNutrition = this.calculateTargetNutrition(personalInfo);
    const currentNutrition = this.calculateTotalNutrition(currentMeals);
    const remainingNutrition = this.calculateRemainingNutrition(targetNutrition, currentNutrition);
    
    const mealPercentages = this.getDynamicMealPercentages(mealType);
    const thisMealTarget = this.calculateMealTarget(targetNutrition, mealPercentages);
    const adjustedTarget = this.adjustForRemaining(thisMealTarget, remainingNutrition);

    const mealsByType = this.groupMealsByType(currentMeals);
    const mealDetails = this.formatMealDetails(mealsByType);

    return `You are an expert dietitian. Use DYNAMIC PERCENTAGE ALLOCATION for guidance.

🎯 USER'S DAILY TARGETS:
- Calories: ${targetNutrition.calories}
- Protein: ${targetNutrition.protein}g  
- Carbs: ${targetNutrition.carbs}g
- Fat: ${targetNutrition.fat}g

📊 CONSUMED TODAY:
${mealDetails}

📊 REMAINING:
- Calories: ${remainingNutrition.calories} (${Math.round((remainingNutrition.calories/targetNutrition.calories)*100)}%)
- Protein: ${remainingNutrition.protein}g (${Math.round((remainingNutrition.protein/targetNutrition.protein)*100)}%)
- Carbs: ${remainingNutrition.carbs}g (${Math.round((remainingNutrition.carbs/targetNutrition.carbs)*100)}%)
- Fat: ${remainingNutrition.fat}g (${Math.round((remainingNutrition.fat/targetNutrition.fat)*100)}%)

🎯 ${mealType.toUpperCase()} TARGET (${mealPercentages.calories}% of daily):
- Calories: ${adjustedTarget.calories} ±10%
- Protein: ${adjustedTarget.protein} ±10% 
- Carbs: ${adjustedTarget.carbs} ±10%
- Fat: ${adjustedTarget.fat} ±10%

⚡ DYNAMIC MEAL PERCENTAGE RULES:
| Meal     | Cal % | Prot % | Carb % | Fat % |
|----------|-------|--------|--------|-------|
| Breakfast| ${this.getDynamicMealPercentages('breakfast').calories}% | ${this.getDynamicMealPercentages('breakfast').protein}% | ${this.getDynamicMealPercentages('breakfast').carbs}% | ${this.getDynamicMealPercentages('breakfast').fat}% |
| Lunch    | ${this.getDynamicMealPercentages('lunch').calories}% | ${this.getDynamicMealPercentages('lunch').protein}% | ${this.getDynamicMealPercentages('lunch').carbs}% | ${this.getDynamicMealPercentages('lunch').fat}% |
| Dinner   | ${this.getDynamicMealPercentages('dinner').calories}% | ${this.getDynamicMealPercentages('dinner').protein}% | ${this.getDynamicMealPercentages('dinner').carbs}% | ${this.getDynamicMealPercentages('dinner').fat}% |
| Snacks   | ${this.getDynamicMealPercentages('snacks').calories}% | ${this.getDynamicMealPercentages('snacks').protein}% | ${this.getDynamicMealPercentages('snacks').carbs}% | ${this.getDynamicMealPercentages('snacks').fat}% |

✅ REALISTIC PORTION CONSTRAINTS:
- Breakfast/Lunch/Dinner: ${Math.round(targetNutrition.calories*0.20)}-${Math.round(targetNutrition.calories*0.35)} kcal
- Snacks: ${Math.round(targetNutrition.calories*0.08)}-${Math.round(targetNutrition.calories*0.15)} kcal
- Protein/meal: ${Math.round(targetNutrition.protein*0.20)}-${Math.round(targetNutrition.protein*0.35)}g

👤 ${personalInfo.name}: ${personalInfo.goal.replace('_', ' ')} goal`;
  }

  private buildImageAnalysisPrompt(
    personalInfo: PersonalInfo,
    mealType: string,
    currentMeals: Meal[]
  ): string {
    const basePrompt = this.buildDynamicPercentagePrompt(personalInfo, mealType, currentMeals);
    const targetNutrition = this.calculateTargetNutrition(personalInfo);
    const mealPercentages = this.getDynamicMealPercentages(mealType);
    const thisMealTarget = this.calculateMealTarget(targetNutrition, mealPercentages);

    return `Analyze the food in the provided image. Identify the main dish, all visible ingredients with estimated portions/weights, and estimate the total nutritional content (calories, protein, carbs, fat) for the entire meal shown. Provide a detailed breakdown including:
- Probable preparation method (e.g., grilled, fried, baked)
- Potential allergens or dietary notes (e.g., gluten-free, vegan)
- How well it aligns with the user's ${mealType} targets and overall goal (e.g., suggestions for adjustments to better fit remaining nutrition)
- Health insights (e.g., balanced macros, vitamin sources)

Align the estimates with the user's nutritional needs and dietary preferences.

${basePrompt}

📋 JSON FORMAT (single detailed meal):
{
  "name": "Complete Meal Name",
  "calories": ${Math.round(thisMealTarget.calories)},
  "protein": ${Math.round(thisMealTarget.protein)},
  "carbs": ${Math.round(thisMealTarget.carbs)},
  "fat": ${Math.round(thisMealTarget.fat)},
  "ingredients": [{"name": "Ingredient", "weight": "150g"}],
  "preparation": "Description of how the meal might be prepared",
  "allergens": ["list", "of", "potential", "allergens"],
  "alignment": "How it fits user's targets (e.g., 'High in protein, adjust carbs down')",
  "insights": "Health insights and suggestions"
}

ONLY JSON OBJECT. NO OTHER TEXT.`;
  }

  private getDynamicMealPercentages(mealType: string) {
    const percentages = {
      breakfast: { calories: 0.25, protein: 0.25, carbs: 0.30, fat: 0.20 },
      lunch: { calories: 0.30, protein: 0.25, carbs: 0.30, fat: 0.25 },
      dinner: { calories: 0.30, protein: 0.30, carbs: 0.25, fat: 0.25 },
      snacks: { calories: 0.15, protein: 0.20, carbs: 0.15, fat: 0.30 }
    };
    return percentages[mealType as keyof typeof percentages] || percentages.breakfast;
  }

  private calculateMealTarget(targetNutrition: any, percentages: any) {
    return {
      calories: targetNutrition.calories * percentages.calories,
      protein: targetNutrition.protein * percentages.protein,
      carbs: targetNutrition.carbs * percentages.carbs,
      fat: targetNutrition.fat * percentages.fat
    };
  }

  private adjustForRemaining(mealTarget: any, remaining: any) {
    return {
      calories: Math.min(mealTarget.calories, remaining.calories),
      protein: Math.min(mealTarget.protein, remaining.protein),
      carbs: Math.min(mealTarget.carbs, remaining.carbs),
      fat: Math.min(mealTarget.fat, remaining.fat)
    };
  }

  public calculateTargetNutrition(personalInfo: PersonalInfo): any {
    const calories = parseInt(personalInfo.targetCalories);
    let proteinPct = 0.25, carbsPct = 0.50, fatPct = 0.25;

    switch (personalInfo.goal) {
      case 'lose_weight':
        proteinPct = 0.30; carbsPct = 0.45; fatPct = 0.25; break;
      case 'gain_weight':
      case 'build_muscle':
        proteinPct = 0.35; carbsPct = 0.45; fatPct = 0.20; break;
      case 'maintain_weight':
        proteinPct = 0.25; carbsPct = 0.50; fatPct = 0.25; break;
    }

    return {
      calories,
      protein: Math.round(calories * proteinPct / 4),
      carbs: Math.round(calories * carbsPct / 4),
      fat: Math.round(calories * fatPct / 9)
    };
  }

  public calculateTotalNutrition(meals: Meal[]): any {
    return meals.reduce((total: any, meal: any) => {
      if (meal.food && meal.consumed) {
        total.calories += meal.food.calories;
        total.protein += meal.food.protein;
        total.carbs += meal.food.carbs;
        total.fat += meal.food.fat;
      }
      return total;
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
  }

  private calculateRemainingNutrition(target: any, current: any): any {
    return {
      calories: Math.max(0, target.calories - current.calories),
      protein: Math.max(0, target.protein - current.protein),
      carbs: Math.max(0, target.carbs - current.carbs),
      fat: Math.max(0, target.fat - current.fat)
    };
  }

  private groupMealsByType(meals: any[]): { [key: string]: any[] } {
    const grouped: { [key: string]: any[] } = {};
    meals.forEach(meal => {
      if (meal.food && meal.consumed) {
        const type = meal.id || 'unknown';
        if (!grouped[type]) grouped[type] = [];
        grouped[type].push(meal);
      }
    });
    return grouped;
  }

  private formatMealDetails(mealsByType: { [key: string]: any[] }): string {
    let details = '';
    Object.entries(mealsByType).forEach(([type, meals]: [string, any[]]) => {
      const total = meals.reduce((sum: any, meal: any) => {
        sum.calories += meal.food.calories;
        sum.protein += meal.food.protein;
        sum.carbs += meal.food.carbs;
        sum.fat += meal.food.fat;
        return sum;
      }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
      
      details += `• ${type}: ${total.calories}kcal (P:${total.protein}g/C:${total.carbs}g/F:${total.fat}g)\n`;
    });
    return details || 'No meals consumed yet';
  }

  private parseAIResponse(response: string, mealType: string): FoodItem[] {
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return [{
          id: `ai_${mealType}_${Date.now()}`,
          name: parsed.name || 'Analyzed Meal',
          calories: Math.round(parseFloat(parsed.calories) || 0),
          protein: Math.round(parseFloat(parsed.protein) || 0),
          carbs: Math.round(parseFloat(parsed.carbs) || 0),
          fat: Math.round(parseFloat(parsed.fat) || 0),
          category: mealType,
          ingredients: parsed.ingredients || [],
          // You can add extra fields to FoodItem type if needed for preparation, allergens, etc.
          // For now, storing them in a custom way or extend the type
        }];
      }
    } catch (error) {
      console.error('Error parsing AI response:', error);
    }
    return [];
  }

  private getDynamicFallbackRecommendations(mealType: string, personalInfo: any): FoodItem[] {
    const targetCalories = parseInt(personalInfo.targetCalories || '2000');
    const mealCalories = Math.round(targetCalories * this.getDynamicMealPercentages(mealType).calories);
    const mealProtein = Math.round((targetCalories * 0.30 / 4) * this.getDynamicMealPercentages(mealType).protein);
    const mealCarbs = Math.round((targetCalories * 0.45 / 4) * this.getDynamicMealPercentages(mealType).carbs);
    const mealFat = Math.round((targetCalories * 0.25 / 9) * this.getDynamicMealPercentages(mealType).fat);

    return [
      {
        id: `dynamic_fb_${mealType}`,
        name: 'Balanced Fallback Meal',
        calories: mealCalories,
        protein: mealProtein,
        carbs: mealCarbs,
        fat: mealFat,
        category: mealType,
        ingredients: [
          { name: 'Chicken Breast', weight: '150g' },
          { name: 'Quinoa (cooked)', weight: '120g' },
          { name: 'Mixed Vegetables', weight: '200g' },
          { name: 'Olive Oil', weight: '10ml' }
        ]
      }
    ];
  }

  isApiKeyConfigured(): boolean {
    return !!this.apiKey && !!this.model;
  }

  getApiKey(): string | null {
    return this.apiKey;
  }
}

export default new GeminiService();