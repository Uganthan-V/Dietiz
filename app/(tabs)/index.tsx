// import { useMealPlan } from "@/components/MealPlanContext";
// import { Ionicons } from "@expo/vector-icons";
// import React, { useState } from "react";
// import { SafeAreaView } from 'react-native-safe-area-context';
// import {
//   Dimensions,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// const { width } = Dimensions.get("window");

// // Home Screen Component
// const HomeScreen = ({ onNavigate }: { onNavigate?: (tab: string) => void }) => {
//   const [selectedView, setSelectedView] = useState("Daily");
//   const { meals, nutritionalData, getTotalNutrition, personalInfo } =
//     useMealPlan();
//   const totalNutrition = getTotalNutrition();

//   const MetricCard = ({
//     icon,
//     color,
//     title,
//     value,
//     target,
//   }: {
//     icon: string;
//     color: string;
//     title: string;
//     value: number;
//     target: number;
//   }) => {
//     const percentage = target > 0 ? Math.min((value / target) * 100, 100) : 0;
//     const isOverTarget = value > target;

//     return (
//       <View style={styles.metricCard}>
//         <View style={[styles.metricIcon, { backgroundColor: color }]}>
//           <Ionicons name={icon as any} size={20} color="white" />
//         </View>
//         <Text style={styles.metricTitle}>{title}:</Text>
//         <Text style={styles.metricValue}>
//           {value}/{target}
//           {title === "Calorie" ? " kcal" : "g"}
//         </Text>
//         <View style={styles.progressBar}>
//           <View
//             style={[
//               styles.progressFill,
//               {
//                 width: `${percentage}%`,
//                 backgroundColor: isOverTarget ? "#FF5722" : "#4CAF50",
//               },
//             ]}
//           />
//         </View>
//         <Text
//           style={[
//             styles.percentageText,
//             { color: isOverTarget ? "#FF5722" : "#4CAF50" },
//           ]}
//         >
//           {percentage.toFixed(0)}%
//         </Text>
//       </View>
//     );
//   };

//   const MealCard = ({ meal }: { meal: any }) => (
//     <View style={styles.mealCard}>
//       <View style={styles.mealHeader}>
//         <View>
//           <Text style={styles.mealTitle}>{meal.title}</Text>
//           <Text style={styles.mealTime}>({meal.time})</Text>
//         </View>
//         {meal.hasFood ? (
//           <Ionicons name="checkmark" size={20} color="#4CAF50" />
//         ) : (
//           <Ionicons name="add" size={20} color="#999" />
//         )}
//       </View>
//       {meal.food && <Text style={styles.mealFood}>{meal.food.name}</Text>}
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* Header */}
//         <View style={styles.header}>
//           <View style={styles.dateContainer}>
//             <Ionicons name="time-outline" size={16} color="#666" />
//             <Text style={styles.dateText}>July 14, 2025</Text>
//             <Ionicons name="chevron-down" size={16} color="#666" />
//           </View>
//           <TouchableOpacity>
//             <Ionicons name="person-outline" size={24} color="#333" />
//           </TouchableOpacity>
//         </View>

//         {/* Greeting */}
//         <View style={styles.greetingContainer}>
//           <Text style={styles.greetingText}>Greetings there,</Text>
//           <Text style={styles.questionText}>Are You Eating Healthy?</Text>
//         </View>

//         {/* Metrics */}
//         <View style={styles.metricsContainer}>
//           {personalInfo ? (
//             <>
//               <MetricCard
//                 icon="flame"
//                 color="#FFC107"
//                 title="Calorie"
//                 value={totalNutrition.calories}
//                 target={nutritionalData.calories}
//               />
//               <MetricCard
//                 icon="water"
//                 color="#2196F3"
//                 title="Protein"
//                 value={totalNutrition.protein}
//                 target={nutritionalData.protein}
//               />
//               <MetricCard
//                 icon="leaf"
//                 color="#4CAF50"
//                 title="Carbs"
//                 value={totalNutrition.carbs}
//                 target={nutritionalData.carbs}
//               />
//             </>
//           ) : (
//             <View style={styles.setupPrompt}>
//               <Ionicons name="person-add" size={48} color="#999" />
//               <Text style={styles.setupPromptTitle}>Complete Your Profile</Text>
//               <Text style={styles.setupPromptText}>
//                 Set up your personal information to get personalized nutrition
//                 targets and AI recommendations.
//               </Text>
//               <TouchableOpacity
//                 style={styles.setupButton}
//                 onPress={() => onNavigate?.("meals")}
//               >
//                 <Text style={styles.setupButtonText}>Go to Meals & Setup</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         </View>

//         {/* View Toggle */}
//         <View style={styles.toggleContainer}>
//           <TouchableOpacity
//             style={[
//               styles.toggleButton,
//               selectedView === "Daily" && styles.toggleButtonActive,
//             ]}
//             onPress={() => setSelectedView("Daily")}
//           >
//             <Ionicons
//               name="calendar"
//               size={16}
//               color={selectedView === "Daily" ? "#333" : "#999"}
//             />
//             <Text
//               style={[
//                 styles.toggleText,
//                 selectedView === "Daily" && styles.toggleTextActive,
//               ]}
//             >
//               Daily
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[
//               styles.toggleButton,
//               selectedView === "Weekly" && styles.toggleButtonActive,
//             ]}
//             onPress={() => setSelectedView("Weekly")}
//           >
//             <Ionicons
//               name="calendar-outline"
//               size={16}
//               color={selectedView === "Weekly" ? "#333" : "#999"}
//             />
//             <Text
//               style={[
//                 styles.toggleText,
//                 selectedView === "Weekly" && styles.toggleTextActive,
//               ]}
//             >
//               Weekly
//             </Text>
//           </TouchableOpacity>
//         </View>

//         {/* Meals */}
//         <View style={styles.mealsContainer}>
//           <View style={styles.mealRow}>
//             {meals.slice(0, 2).map((meal) => (
//               <MealCard key={meal.id} meal={meal} />
//             ))}
//           </View>
//           <View style={styles.mealRow}>
//             {meals.slice(2, 4).map((meal) => (
//               <MealCard key={meal.id} meal={meal} />
//             ))}
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f1e3ec",
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 24,
//     paddingTop: 16,
//     paddingBottom: 24,
//   },
//   dateContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//   },
//   dateText: {
//     fontSize: 16,
//     color: "#666",
//   },
//   greetingContainer: {
//     paddingHorizontal: 24,
//     marginBottom: 36,
//   },
//   greetingText: {
//     fontSize: 26,
//     color: "#999",
//     fontWeight: "300",
//   },
//   questionText: {
//     fontSize: 32,
//     color: "#333",
//     fontWeight: "bold",
//     marginTop: 8,
//   },
//   metricsContainer: {
//     flexDirection: "row",
//     paddingHorizontal: 24,
//     gap: 16,
//     marginBottom: 36,
//   },
//   metricCard: {
//     flex: 1,
//     backgroundColor: "white",
//     borderRadius: 20,
//     padding: 20,
//     alignItems: "center",
//     minHeight: 120,
//   },
//   metricIcon: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   metricTitle: {
//     fontSize: 14,
//     color: "#666",
//     marginBottom: 6,
//   },
//   metricValue: {
//     fontSize: 14,
//     color: "#333",
//     fontWeight: "600",
//   },
//   progressBar: {
//     width: "100%",
//     height: 8,
//     backgroundColor: "#e0e0e0",
//     borderRadius: 4,
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   progressFill: {
//     height: "100%",
//     borderRadius: 4,
//   },
//   percentageText: {
//     fontSize: 14,
//     fontWeight: "600",
//   },
//   toggleContainer: {
//     flexDirection: "row",
//     paddingHorizontal: 24,
//     marginBottom: 24,
//     backgroundColor: "white",
//     marginHorizontal: 24,
//     borderRadius: 16,
//     padding: 6,
//   },
//   toggleButton: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 16,
//     borderRadius: 12,
//     gap: 8,
//   },
//   toggleButtonActive: {
//     backgroundColor: "#f1e3ec",
//   },
//   toggleText: {
//     fontSize: 16,
//     color: "#999",
//   },
//   toggleTextActive: {
//     color: "#333",
//     fontWeight: "600",
//   },
//   mealsContainer: {
//     paddingHorizontal: 24,
//     gap: 16,
//   },
//   mealRow: {
//     flexDirection: "row",
//     gap: 16,
//   },
//   mealCard: {
//     flex: 1,
//     backgroundColor: "white",
//     borderRadius: 20,
//     padding: 20,
//     minHeight: 120,
//   },
//   mealHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     marginBottom: 12,
//   },
//   mealTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   mealTime: {
//     fontSize: 14,
//     color: "#666",
//     marginTop: 4,
//   },
//   mealFood: {
//     fontSize: 16,
//     color: "#666",
//     marginTop: 12,
//   },
//   setupPrompt: {
//     alignItems: "center",
//     padding: 20,
//     backgroundColor: "#f1e3ec",
//     borderRadius: 20,
//     marginTop: 20,
//   },
//   setupPromptTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#333",
//     marginTop: 15,
//     marginBottom: 10,
//   },
//   setupPromptText: {
//     fontSize: 16,
//     color: "#666",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   setupButton: {
//     backgroundColor: "transparent",
//     borderWidth: 2,
//     borderColor: "#666",
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 12,
//   },
//   setupButtonText: {
//     color: "#666",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });



import { useMealPlan } from "@/components/MealPlanContext";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

// Home Screen Component
const HomeScreen = ({ onNavigate }: { onNavigate?: (tab: string) => void }) => {
  const [selectedView, setSelectedView] = useState("Daily");
  const [expandedMealId, setExpandedMealId] = useState<string | null>(null); // New state for expanded meal
  const { meals, nutritionalData, getTotalNutrition, personalInfo } =
    useMealPlan();
  const totalNutrition = getTotalNutrition();

  const MetricCard = ({
    icon,
    color,
    title,
    value,
    target,
  }: {
    icon: string;
    color: string;
    title: string;
    value: number;
    target: number;
  }) => {
    const percentage = target > 0 ? Math.min((value / target) * 100, 100) : 0;
    const isOverTarget = value > target;

    return (
      <View style={styles.metricCard}>
        <View style={[styles.metricIcon, { backgroundColor: color }]}>
          <Ionicons name={icon as any} size={20} color="white" />
        </View>
        <Text style={styles.metricTitle}>{title}:</Text>
        <Text style={styles.metricValue}>
          {value}/{target}
          {title === "Calorie" ? " kcal" : "g"}
        </Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${percentage}%`,
                backgroundColor: isOverTarget ? "#FF5722" : "#4CAF50",
              },
            ]}
          />
        </View>
        <Text
          style={[
            styles.percentageText,
            { color: isOverTarget ? "#FF5722" : "#4CAF50" },
          ]}
        >
          {percentage.toFixed(0)}%
        </Text>
      </View>
    );
  };

  const MealCard = ({ meal }: { meal: any }) => (
    <TouchableOpacity
      style={styles.mealCard}
      onPress={() => setExpandedMealId(expandedMealId === meal.id ? null : meal.id)}
    >
      <View style={styles.mealHeader}>
        <View>
          <Text style={styles.mealTitle}>{meal.title}</Text>
          <Text style={styles.mealTime}>({meal.time})</Text>
        </View>
        {meal.hasFood ? (
          <Ionicons name="checkmark" size={20} color="#4CAF50" />
        ) : (
          <Ionicons name="add" size={20} color="#999" />
        )}
      </View>
      {meal.food && (
        <Text style={styles.mealFood}>{meal.food.name}</Text>
      )}
      {meal.food && expandedMealId === meal.id && meal.food.ingredients && (
        <View style={styles.ingredientsInfo}>
          <Text style={styles.ingredientsTitle}>Main Ingredients:</Text>
          {meal.food.ingredients.map((ingredient: any, index: number) => (
            <Text key={index} style={styles.ingredientText}>
              • {ingredient.name}: {ingredient.weight}
            </Text>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.dateContainer}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={styles.dateText}>July 14, 2025</Text>
            <Ionicons name="chevron-down" size={16} color="#666" />
          </View>
          <TouchableOpacity>
            <Ionicons name="person-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Greeting */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Greetings there,</Text>
          <Text style={styles.questionText}>Are You Eating Healthy?</Text>
        </View>

        {/* Metrics */}
        <View style={styles.metricsContainer}>
          {personalInfo ? (
            <>
              <MetricCard
                icon="flame"
                color="#FFC107"
                title="Calorie"
                value={totalNutrition.calories}
                target={nutritionalData.calories}
              />
              <MetricCard
                icon="water"
                color="#2196F3"
                title="Protein"
                value={totalNutrition.protein}
                target={nutritionalData.protein}
              />
              <MetricCard
                icon="leaf"
                color="#4CAF50"
                title="Carbs"
                value={totalNutrition.carbs}
                target={nutritionalData.carbs}
              />
            </>
          ) : (
            <View style={styles.setupPrompt}>
              <Ionicons name="person-add" size={48} color="#999" />
              <Text style={styles.setupPromptTitle}>Complete Your Profile</Text>
              <Text style={styles.setupPromptText}>
                Set up your personal information to get personalized nutrition
                targets and AI recommendations.
              </Text>
              <TouchableOpacity
                style={styles.setupButton}
                onPress={() => onNavigate?.("meals")}
              >
                <Text style={styles.setupButtonText}>Go to Meals & Setup</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* View Toggle */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              selectedView === "Daily" && styles.toggleButtonActive,
            ]}
            onPress={() => setSelectedView("Daily")}
          >
            <Ionicons
              name="calendar"
              size={16}
              color={selectedView === "Daily" ? "#333" : "#999"}
            />
            <Text
              style={[
                styles.toggleText,
                selectedView === "Daily" && styles.toggleTextActive,
              ]}
            >
              Daily
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              selectedView === "Weekly" && styles.toggleButtonActive,
            ]}
            onPress={() => setSelectedView("Weekly")}
          >
            <Ionicons
              name="calendar-outline"
              size={16}
              color={selectedView === "Weekly" ? "#333" : "#999"}
            />
            <Text
              style={[
                styles.toggleText,
                selectedView === "Weekly" && styles.toggleTextActive,
              ]}
            >
              Weekly
            </Text>
          </TouchableOpacity>
        </View>

        {/* Meals */}
        <View style={styles.mealsContainer}>
          <View style={styles.mealRow}>
            {meals.slice(0, 2).map((meal) => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </View>
          <View style={styles.mealRow}>
            {meals.slice(2, 4).map((meal) => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1e3ec",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  dateText: {
    fontSize: 16,
    color: "#666",
  },
  greetingContainer: {
    paddingHorizontal: 24,
    marginBottom: 36,
  },
  greetingText: {
    fontSize: 26,
    color: "#999",
    fontWeight: "300",
  },
  questionText: {
    fontSize: 32,
    color: "#333",
    fontWeight: "bold",
    marginTop: 8,
  },
  metricsContainer: {
    flexDirection: "row",
    paddingHorizontal: 24,
    gap: 16,
    marginBottom: 36,
  },
  metricCard: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    minHeight: 120,
  },
  metricIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  metricTitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },
  metricValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  progressBar: {
    width: "100%",
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 10,
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  percentageText: {
    fontSize: 14,
    fontWeight: "600",
  },
  toggleContainer: {
    flexDirection: "row",
    paddingHorizontal: 24,
    marginBottom: 24,
    backgroundColor: "white",
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 6,
  },
  toggleButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  toggleButtonActive: {
    backgroundColor: "#f1e3ec",
  },
  toggleText: {
    fontSize: 16,
    color: "#999",
  },
  toggleTextActive: {
    color: "#333",
    fontWeight: "600",
  },
  mealsContainer: {
    paddingHorizontal: 24,
    gap: 16,
  },
  mealRow: {
    flexDirection: "row",
    gap: 16,
  },
  mealCard: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    minHeight: 120,
  },
  mealHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  mealTime: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  mealFood: {
    fontSize: 16,
    color: "#666",
    marginTop: 12,
  },
  ingredientsInfo: {
    marginTop: 12,
  },
  ingredientsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  ingredientText: {
    fontSize: 12,
    color: "#666",
  },
  setupPrompt: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f1e3ec",
    borderRadius: 20,
    marginTop: 20,
  },
  setupPromptTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 15,
    marginBottom: 10,
  },
  setupPromptText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  setupButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#666",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  setupButtonText: {
    color: "#666",
    fontSize: 18,
    fontWeight: "bold",
  },
});