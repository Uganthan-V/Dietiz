# Dynamic Diet

## Project Overview

Dynamic Diet is a mobile application built with React Native and Expo, designed to help users plan, track, and optimize their daily meals for a healthy lifestyle. The app allows users to manage meals (Breakfast, Lunch, Snacks, Dinner), track nutritional intake (calories, protein, carbs, fat), and receive personalized AI-powered food recommendations based on their profile (age, gender, height, weight, activity level, goals, dietary restrictions, and allergies). It features a clean, user-friendly interface with daily meal resets, custom meal entry, and a nutrition summary with progress tracking toward calorie goals.

## Features

- **Meal Planning and Tracking**:
  - Displays a list of meals (Breakfast, Lunch, Snacks, Dinner) with their time and nutritional details.
  - Users can toggle a meal's consumption status using checkboxes, marking whether a meal has been eaten (`hasFood: true/false`) without deleting the assigned food item.
  - Supports adding custom meals with name, calories, protein, carbs, and fat.

- **AI-Powered Food Recommendations**:
  - Integrates with a Gemini API (requires an API key) to provide personalized food suggestions based on user profile and meal type.
  - Displays previous meals for quick selection.

- **Nutrition Summary**:
  - Shows total daily intake of calories, protein, carbs, and fat.
  - Includes a progress bar comparing consumed calories to the user's target calories.

- **Daily Meal Reset**:
  - Automatically resets meals at midnight each day, clearing consumption status to start fresh.
  - Persists meal data using `StorageService` for continuity across app sessions.

- **User Profile Integration**:
  - Requires setup of personal information (name, age, gender, height, weight, activity level, goals, dietary restrictions, allergies) for tailored recommendations.
  - Alerts users to complete setup or provide an API key if missing.

- **Navigation**:
  - Uses `expo-router` for tab-based navigation, including Home (`index.tsx`) and Settings tabs.
  - Supports navigation to Settings for API key configuration.

- **Custom Meal Modal**:
  - Allows users to input custom meal details with a simple form interface.
  - Validates required fields (name, calories) before saving.

## Technical Details

- **Framework**: React Native with Expo
- **Navigation**: `expo-router` for tab-based navigation
- **Key Dependencies**:
  - `@expo/vector-icons`: For icons (e.g., Ionicons for trash, calendar, bulb)
  - `expo-checkbox`: For meal consumption checkboxes
  - `react-native-safe-area-context`: For safe area handling on mobile devices
  - `react-native`: Core components (e.g., `View`, `Text`, `TouchableOpacity`, `Modal`)
- **Context API**: Uses `MealPlanContext` for managing meal state, including:
  - `meals`: Array of `Meal` objects (id, title, time, hasFood, food)
  - `updateMeal`, `removeMeal`, `addCustomMeal`, `clearAllMeals`, `getTotalNutrition`, `personalInfo`, `loadMealsFromStorage`
- **Storage**: `StorageService` for persisting meals and user settings (e.g., `last_reset_timestamp`, API key, setup status)
- **TypeScript**: Ensures type safety with interfaces defined in `components/types.ts`:
  - `PersonalInfo`: User profile data
  - `FoodItem`: Meal details (name, calories, protein, carbs, fat, category, optional ingredients)
  - `Meal`: Meal metadata (id, title, time, hasFood, optional food)
- **Styling**: Uses `StyleSheet` for consistent, responsive UI with a clean design (e.g., white meal cards, green accents, pinkish background `#f1e3ec`)

## Project Structure

- **app/(tabs)/index.tsx**: Main home screen displaying meal list, nutrition summary, and quick actions (AI recommendations, custom meal entry, "Are you eating healthy" text).
- **app/(tabs)/_layout.tsx**: Defines tab navigation using `expo-router`.
- **components/AIFoodRecommendation.tsx**: Modal for AI-powered food suggestions.
- **components/MealPlanContext.tsx**: Context for managing meal state and logic.
- **components/types.ts**: TypeScript interfaces for type safety.
- **services/StorageService.ts**: Handles persistent storage of meals and settings.

## How It Works

1. **Initialization**:
   - On app start, `index.tsx` checks for a daily reset (`last_reset_timestamp`) and clears meals if a new day has begun.
   - Loads user profile and API key status using `StorageService`.

2. **Meal Management**:
   - Displays meals in a scrollable list with checkboxes to toggle `hasFood` status.
   - Checking a box for an unassigned meal opens `AIFoodRecommendation` to select a food item.
   - Unchecking a box sets `hasFood: false` without clearing the assigned `food` object.
   - Custom meals can be added via a modal with nutritional input fields.

3. **Nutrition Tracking**:
   - Aggregates nutritional data from consumed meals (`hasFood: true`) using `getTotalNutrition`.
   - Shows a progress bar for calories relative to the user’s target.

4. **AI Recommendations**:
   - Requires a completed user profile and Gemini API key.
   - Fetches and displays food suggestions tailored to the selected meal type and user preferences.

5. **Persistence**:
   - Meal data and user settings are saved via `StorageService`, ensuring continuity across sessions.

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install