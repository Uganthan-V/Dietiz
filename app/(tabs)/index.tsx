// // // // // // // // import { useMealPlan } from "@/components/MealPlanContext";
// // // // // // // // import { Ionicons } from "@expo/vector-icons";
// // // // // // // // import React, { useState } from "react";
// // // // // // // // import { SafeAreaView } from 'react-native-safe-area-context';
// // // // // // // // import {
// // // // // // // //   Dimensions,
// // // // // // // //   ScrollView,
// // // // // // // //   StyleSheet,
// // // // // // // //   Text,
// // // // // // // //   TouchableOpacity,
// // // // // // // //   View,
// // // // // // // // } from "react-native";

// // // // // // // // const { width } = Dimensions.get("window");

// // // // // // // // // Home Screen Component
// // // // // // // // const HomeScreen = ({ onNavigate }: { onNavigate?: (tab: string) => void }) => {
// // // // // // // //   const [selectedView, setSelectedView] = useState("Daily");
// // // // // // // //   const { meals, nutritionalData, getTotalNutrition, personalInfo } =
// // // // // // // //     useMealPlan();
// // // // // // // //   const totalNutrition = getTotalNutrition();

// // // // // // // //   const MetricCard = ({
// // // // // // // //     icon,
// // // // // // // //     color,
// // // // // // // //     title,
// // // // // // // //     value,
// // // // // // // //     target,
// // // // // // // //   }: {
// // // // // // // //     icon: string;
// // // // // // // //     color: string;
// // // // // // // //     title: string;
// // // // // // // //     value: number;
// // // // // // // //     target: number;
// // // // // // // //   }) => {
// // // // // // // //     const percentage = target > 0 ? Math.min((value / target) * 100, 100) : 0;
// // // // // // // //     const isOverTarget = value > target;

// // // // // // // //     return (
// // // // // // // //       <View style={styles.metricCard}>
// // // // // // // //         <View style={[styles.metricIcon, { backgroundColor: color }]}>
// // // // // // // //           <Ionicons name={icon as any} size={20} color="white" />
// // // // // // // //         </View>
// // // // // // // //         <Text style={styles.metricTitle}>{title}:</Text>
// // // // // // // //         <Text style={styles.metricValue}>
// // // // // // // //           {value}/{target}
// // // // // // // //           {title === "Calorie" ? " kcal" : "g"}
// // // // // // // //         </Text>
// // // // // // // //         <View style={styles.progressBar}>
// // // // // // // //           <View
// // // // // // // //             style={[
// // // // // // // //               styles.progressFill,
// // // // // // // //               {
// // // // // // // //                 width: `${percentage}%`,
// // // // // // // //                 backgroundColor: isOverTarget ? "#FF5722" : "#4CAF50",
// // // // // // // //               },
// // // // // // // //             ]}
// // // // // // // //           />
// // // // // // // //         </View>
// // // // // // // //         <Text
// // // // // // // //           style={[
// // // // // // // //             styles.percentageText,
// // // // // // // //             { color: isOverTarget ? "#FF5722" : "#4CAF50" },
// // // // // // // //           ]}
// // // // // // // //         >
// // // // // // // //           {percentage.toFixed(0)}%
// // // // // // // //         </Text>
// // // // // // // //       </View>
// // // // // // // //     );
// // // // // // // //   };

// // // // // // // //   const MealCard = ({ meal }: { meal: any }) => (
// // // // // // // //     <View style={styles.mealCard}>
// // // // // // // //       <View style={styles.mealHeader}>
// // // // // // // //         <View>
// // // // // // // //           <Text style={styles.mealTitle}>{meal.title}</Text>
// // // // // // // //           <Text style={styles.mealTime}>({meal.time})</Text>
// // // // // // // //         </View>
// // // // // // // //         {meal.hasFood ? (
// // // // // // // //           <Ionicons name="checkmark" size={20} color="#4CAF50" />
// // // // // // // //         ) : (
// // // // // // // //           <Ionicons name="add" size={20} color="#999" />
// // // // // // // //         )}
// // // // // // // //       </View>
// // // // // // // //       {meal.food && <Text style={styles.mealFood}>{meal.food.name}</Text>}
// // // // // // // //     </View>
// // // // // // // //   );

// // // // // // // //   return (
// // // // // // // //     <SafeAreaView style={styles.container}>
// // // // // // // //       <ScrollView showsVerticalScrollIndicator={false}>
// // // // // // // //         {/* Header */}
// // // // // // // //         <View style={styles.header}>
// // // // // // // //           <View style={styles.dateContainer}>
// // // // // // // //             <Ionicons name="time-outline" size={16} color="#666" />
// // // // // // // //             <Text style={styles.dateText}>July 14, 2025</Text>
// // // // // // // //             <Ionicons name="chevron-down" size={16} color="#666" />
// // // // // // // //           </View>
// // // // // // // //           <TouchableOpacity>
// // // // // // // //             <Ionicons name="person-outline" size={24} color="#333" />
// // // // // // // //           </TouchableOpacity>
// // // // // // // //         </View>

// // // // // // // //         {/* Greeting */}
// // // // // // // //         <View style={styles.greetingContainer}>
// // // // // // // //           <Text style={styles.greetingText}>Greetings there,</Text>
// // // // // // // //           <Text style={styles.questionText}>Are You Eating Healthy?</Text>
// // // // // // // //         </View>

// // // // // // // //         {/* Metrics */}
// // // // // // // //         <View style={styles.metricsContainer}>
// // // // // // // //           {personalInfo ? (
// // // // // // // //             <>
// // // // // // // //               <MetricCard
// // // // // // // //                 icon="flame"
// // // // // // // //                 color="#FFC107"
// // // // // // // //                 title="Calorie"
// // // // // // // //                 value={totalNutrition.calories}
// // // // // // // //                 target={nutritionalData.calories}
// // // // // // // //               />
// // // // // // // //               <MetricCard
// // // // // // // //                 icon="water"
// // // // // // // //                 color="#2196F3"
// // // // // // // //                 title="Protein"
// // // // // // // //                 value={totalNutrition.protein}
// // // // // // // //                 target={nutritionalData.protein}
// // // // // // // //               />
// // // // // // // //               <MetricCard
// // // // // // // //                 icon="leaf"
// // // // // // // //                 color="#4CAF50"
// // // // // // // //                 title="Carbs"
// // // // // // // //                 value={totalNutrition.carbs}
// // // // // // // //                 target={nutritionalData.carbs}
// // // // // // // //               />
// // // // // // // //             </>
// // // // // // // //           ) : (
// // // // // // // //             <View style={styles.setupPrompt}>
// // // // // // // //               <Ionicons name="person-add" size={48} color="#999" />
// // // // // // // //               <Text style={styles.setupPromptTitle}>Complete Your Profile</Text>
// // // // // // // //               <Text style={styles.setupPromptText}>
// // // // // // // //                 Set up your personal information to get personalized nutrition
// // // // // // // //                 targets and AI recommendations.
// // // // // // // //               </Text>
// // // // // // // //               <TouchableOpacity
// // // // // // // //                 style={styles.setupButton}
// // // // // // // //                 onPress={() => onNavigate?.("meals")}
// // // // // // // //               >
// // // // // // // //                 <Text style={styles.setupButtonText}>Go to Meals & Setup</Text>
// // // // // // // //               </TouchableOpacity>
// // // // // // // //             </View>
// // // // // // // //           )}
// // // // // // // //         </View>

// // // // // // // //         {/* View Toggle */}
// // // // // // // //         <View style={styles.toggleContainer}>
// // // // // // // //           <TouchableOpacity
// // // // // // // //             style={[
// // // // // // // //               styles.toggleButton,
// // // // // // // //               selectedView === "Daily" && styles.toggleButtonActive,
// // // // // // // //             ]}
// // // // // // // //             onPress={() => setSelectedView("Daily")}
// // // // // // // //           >
// // // // // // // //             <Ionicons
// // // // // // // //               name="calendar"
// // // // // // // //               size={16}
// // // // // // // //               color={selectedView === "Daily" ? "#333" : "#999"}
// // // // // // // //             />
// // // // // // // //             <Text
// // // // // // // //               style={[
// // // // // // // //                 styles.toggleText,
// // // // // // // //                 selectedView === "Daily" && styles.toggleTextActive,
// // // // // // // //               ]}
// // // // // // // //             >
// // // // // // // //               Daily
// // // // // // // //             </Text>
// // // // // // // //           </TouchableOpacity>
// // // // // // // //           <TouchableOpacity
// // // // // // // //             style={[
// // // // // // // //               styles.toggleButton,
// // // // // // // //               selectedView === "Weekly" && styles.toggleButtonActive,
// // // // // // // //             ]}
// // // // // // // //             onPress={() => setSelectedView("Weekly")}
// // // // // // // //           >
// // // // // // // //             <Ionicons
// // // // // // // //               name="calendar-outline"
// // // // // // // //               size={16}
// // // // // // // //               color={selectedView === "Weekly" ? "#333" : "#999"}
// // // // // // // //             />
// // // // // // // //             <Text
// // // // // // // //               style={[
// // // // // // // //                 styles.toggleText,
// // // // // // // //                 selectedView === "Weekly" && styles.toggleTextActive,
// // // // // // // //               ]}
// // // // // // // //             >
// // // // // // // //               Weekly
// // // // // // // //             </Text>
// // // // // // // //           </TouchableOpacity>
// // // // // // // //         </View>

// // // // // // // //         {/* Meals */}
// // // // // // // //         <View style={styles.mealsContainer}>
// // // // // // // //           <View style={styles.mealRow}>
// // // // // // // //             {meals.slice(0, 2).map((meal) => (
// // // // // // // //               <MealCard key={meal.id} meal={meal} />
// // // // // // // //             ))}
// // // // // // // //           </View>
// // // // // // // //           <View style={styles.mealRow}>
// // // // // // // //             {meals.slice(2, 4).map((meal) => (
// // // // // // // //               <MealCard key={meal.id} meal={meal} />
// // // // // // // //             ))}
// // // // // // // //           </View>
// // // // // // // //         </View>
// // // // // // // //       </ScrollView>
// // // // // // // //     </SafeAreaView>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default HomeScreen;

// // // // // // // // const styles = StyleSheet.create({
// // // // // // // //   container: {
// // // // // // // //     flex: 1,
// // // // // // // //     backgroundColor: "#f1e3ec",
// // // // // // // //   },
// // // // // // // //   header: {
// // // // // // // //     flexDirection: "row",
// // // // // // // //     justifyContent: "space-between",
// // // // // // // //     alignItems: "center",
// // // // // // // //     paddingHorizontal: 24,
// // // // // // // //     paddingTop: 16,
// // // // // // // //     paddingBottom: 24,
// // // // // // // //   },
// // // // // // // //   dateContainer: {
// // // // // // // //     flexDirection: "row",
// // // // // // // //     alignItems: "center",
// // // // // // // //     gap: 10,
// // // // // // // //   },
// // // // // // // //   dateText: {
// // // // // // // //     fontSize: 16,
// // // // // // // //     color: "#666",
// // // // // // // //   },
// // // // // // // //   greetingContainer: {
// // // // // // // //     paddingHorizontal: 24,
// // // // // // // //     marginBottom: 36,
// // // // // // // //   },
// // // // // // // //   greetingText: {
// // // // // // // //     fontSize: 26,
// // // // // // // //     color: "#999",
// // // // // // // //     fontWeight: "300",
// // // // // // // //   },
// // // // // // // //   questionText: {
// // // // // // // //     fontSize: 32,
// // // // // // // //     color: "#333",
// // // // // // // //     fontWeight: "bold",
// // // // // // // //     marginTop: 8,
// // // // // // // //   },
// // // // // // // //   metricsContainer: {
// // // // // // // //     flexDirection: "row",
// // // // // // // //     paddingHorizontal: 24,
// // // // // // // //     gap: 16,
// // // // // // // //     marginBottom: 36,
// // // // // // // //   },
// // // // // // // //   metricCard: {
// // // // // // // //     flex: 1,
// // // // // // // //     backgroundColor: "white",
// // // // // // // //     borderRadius: 20,
// // // // // // // //     padding: 20,
// // // // // // // //     alignItems: "center",
// // // // // // // //     minHeight: 120,
// // // // // // // //   },
// // // // // // // //   metricIcon: {
// // // // // // // //     width: 48,
// // // // // // // //     height: 48,
// // // // // // // //     borderRadius: 24,
// // // // // // // //     justifyContent: "center",
// // // // // // // //     alignItems: "center",
// // // // // // // //     marginBottom: 12,
// // // // // // // //   },
// // // // // // // //   metricTitle: {
// // // // // // // //     fontSize: 14,
// // // // // // // //     color: "#666",
// // // // // // // //     marginBottom: 6,
// // // // // // // //   },
// // // // // // // //   metricValue: {
// // // // // // // //     fontSize: 14,
// // // // // // // //     color: "#333",
// // // // // // // //     fontWeight: "600",
// // // // // // // //   },
// // // // // // // //   progressBar: {
// // // // // // // //     width: "100%",
// // // // // // // //     height: 8,
// // // // // // // //     backgroundColor: "#e0e0e0",
// // // // // // // //     borderRadius: 4,
// // // // // // // //     marginTop: 10,
// // // // // // // //     marginBottom: 10,
// // // // // // // //   },
// // // // // // // //   progressFill: {
// // // // // // // //     height: "100%",
// // // // // // // //     borderRadius: 4,
// // // // // // // //   },
// // // // // // // //   percentageText: {
// // // // // // // //     fontSize: 14,
// // // // // // // //     fontWeight: "600",
// // // // // // // //   },
// // // // // // // //   toggleContainer: {
// // // // // // // //     flexDirection: "row",
// // // // // // // //     paddingHorizontal: 24,
// // // // // // // //     marginBottom: 24,
// // // // // // // //     backgroundColor: "white",
// // // // // // // //     marginHorizontal: 24,
// // // // // // // //     borderRadius: 16,
// // // // // // // //     padding: 6,
// // // // // // // //   },
// // // // // // // //   toggleButton: {
// // // // // // // //     flex: 1,
// // // // // // // //     flexDirection: "row",
// // // // // // // //     alignItems: "center",
// // // // // // // //     justifyContent: "center",
// // // // // // // //     paddingVertical: 16,
// // // // // // // //     borderRadius: 12,
// // // // // // // //     gap: 8,
// // // // // // // //   },
// // // // // // // //   toggleButtonActive: {
// // // // // // // //     backgroundColor: "#f1e3ec",
// // // // // // // //   },
// // // // // // // //   toggleText: {
// // // // // // // //     fontSize: 16,
// // // // // // // //     color: "#999",
// // // // // // // //   },
// // // // // // // //   toggleTextActive: {
// // // // // // // //     color: "#333",
// // // // // // // //     fontWeight: "600",
// // // // // // // //   },
// // // // // // // //   mealsContainer: {
// // // // // // // //     paddingHorizontal: 24,
// // // // // // // //     gap: 16,
// // // // // // // //   },
// // // // // // // //   mealRow: {
// // // // // // // //     flexDirection: "row",
// // // // // // // //     gap: 16,
// // // // // // // //   },
// // // // // // // //   mealCard: {
// // // // // // // //     flex: 1,
// // // // // // // //     backgroundColor: "white",
// // // // // // // //     borderRadius: 20,
// // // // // // // //     padding: 20,
// // // // // // // //     minHeight: 120,
// // // // // // // //   },
// // // // // // // //   mealHeader: {
// // // // // // // //     flexDirection: "row",
// // // // // // // //     justifyContent: "space-between",
// // // // // // // //     alignItems: "flex-start",
// // // // // // // //     marginBottom: 12,
// // // // // // // //   },
// // // // // // // //   mealTitle: {
// // // // // // // //     fontSize: 18,
// // // // // // // //     fontWeight: "bold",
// // // // // // // //     color: "#333",
// // // // // // // //   },
// // // // // // // //   mealTime: {
// // // // // // // //     fontSize: 14,
// // // // // // // //     color: "#666",
// // // // // // // //     marginTop: 4,
// // // // // // // //   },
// // // // // // // //   mealFood: {
// // // // // // // //     fontSize: 16,
// // // // // // // //     color: "#666",
// // // // // // // //     marginTop: 12,
// // // // // // // //   },
// // // // // // // //   setupPrompt: {
// // // // // // // //     alignItems: "center",
// // // // // // // //     padding: 20,
// // // // // // // //     backgroundColor: "#f1e3ec",
// // // // // // // //     borderRadius: 20,
// // // // // // // //     marginTop: 20,
// // // // // // // //   },
// // // // // // // //   setupPromptTitle: {
// // // // // // // //     fontSize: 20,
// // // // // // // //     fontWeight: "bold",
// // // // // // // //     color: "#333",
// // // // // // // //     marginTop: 15,
// // // // // // // //     marginBottom: 10,
// // // // // // // //   },
// // // // // // // //   setupPromptText: {
// // // // // // // //     fontSize: 16,
// // // // // // // //     color: "#666",
// // // // // // // //     textAlign: "center",
// // // // // // // //     marginBottom: 20,
// // // // // // // //   },
// // // // // // // //   setupButton: {
// // // // // // // //     backgroundColor: "transparent",
// // // // // // // //     borderWidth: 2,
// // // // // // // //     borderColor: "#666",
// // // // // // // //     paddingVertical: 15,
// // // // // // // //     paddingHorizontal: 30,
// // // // // // // //     borderRadius: 12,
// // // // // // // //   },
// // // // // // // //   setupButtonText: {
// // // // // // // //     color: "#666",
// // // // // // // //     fontSize: 18,
// // // // // // // //     fontWeight: "bold",
// // // // // // // //   },
// // // // // // // // });



// // // // // // // import { useMealPlan } from "@/components/MealPlanContext";
// // // // // // // import { Ionicons } from "@expo/vector-icons";
// // // // // // // import React, { useState } from "react";
// // // // // // // import { SafeAreaView } from 'react-native-safe-area-context';
// // // // // // // import {
// // // // // // //   Dimensions,
// // // // // // //   ScrollView,
// // // // // // //   StyleSheet,
// // // // // // //   Text,
// // // // // // //   TouchableOpacity,
// // // // // // //   View,
// // // // // // // } from "react-native";

// // // // // // // const { width } = Dimensions.get("window");

// // // // // // // // Home Screen Component
// // // // // // // const HomeScreen = ({ onNavigate }: { onNavigate?: (tab: string) => void }) => {
// // // // // // //   const [selectedView, setSelectedView] = useState("Daily");
// // // // // // //   const [expandedMealId, setExpandedMealId] = useState<string | null>(null); // New state for expanded meal
// // // // // // //   const { meals, nutritionalData, getTotalNutrition, personalInfo } =
// // // // // // //     useMealPlan();
// // // // // // //   const totalNutrition = getTotalNutrition();

// // // // // // //   const MetricCard = ({
// // // // // // //     icon,
// // // // // // //     color,
// // // // // // //     title,
// // // // // // //     value,
// // // // // // //     target,
// // // // // // //   }: {
// // // // // // //     icon: string;
// // // // // // //     color: string;
// // // // // // //     title: string;
// // // // // // //     value: number;
// // // // // // //     target: number;
// // // // // // //   }) => {
// // // // // // //     const percentage = target > 0 ? Math.min((value / target) * 100, 100) : 0;
// // // // // // //     const isOverTarget = value > target;

// // // // // // //     return (
// // // // // // //       <View style={styles.metricCard}>
// // // // // // //         <View style={[styles.metricIcon, { backgroundColor: color }]}>
// // // // // // //           <Ionicons name={icon as any} size={20} color="white" />
// // // // // // //         </View>
// // // // // // //         <Text style={styles.metricTitle}>{title}:</Text>
// // // // // // //         <Text style={styles.metricValue}>
// // // // // // //           {value}/{target}
// // // // // // //           {title === "Calorie" ? " kcal" : "g"}
// // // // // // //         </Text>
// // // // // // //         <View style={styles.progressBar}>
// // // // // // //           <View
// // // // // // //             style={[
// // // // // // //               styles.progressFill,
// // // // // // //               {
// // // // // // //                 width: `${percentage}%`,
// // // // // // //                 backgroundColor: isOverTarget ? "#FF5722" : "#4CAF50",
// // // // // // //               },
// // // // // // //             ]}
// // // // // // //           />
// // // // // // //         </View>
// // // // // // //         <Text
// // // // // // //           style={[
// // // // // // //             styles.percentageText,
// // // // // // //             { color: isOverTarget ? "#FF5722" : "#4CAF50" },
// // // // // // //           ]}
// // // // // // //         >
// // // // // // //           {percentage.toFixed(0)}%
// // // // // // //         </Text>
// // // // // // //       </View>
// // // // // // //     );
// // // // // // //   };

// // // // // // //   const MealCard = ({ meal }: { meal: any }) => (
// // // // // // //     <TouchableOpacity
// // // // // // //       style={styles.mealCard}
// // // // // // //       onPress={() => setExpandedMealId(expandedMealId === meal.id ? null : meal.id)}
// // // // // // //     >
// // // // // // //       <View style={styles.mealHeader}>
// // // // // // //         <View>
// // // // // // //           <Text style={styles.mealTitle}>{meal.title}</Text>
// // // // // // //           <Text style={styles.mealTime}>({meal.time})</Text>
// // // // // // //         </View>
// // // // // // //         {meal.hasFood ? (
// // // // // // //           <Ionicons name="checkmark" size={20} color="#4CAF50" />
// // // // // // //         ) : (
// // // // // // //           <Ionicons name="add" size={20} color="#999" />
// // // // // // //         )}
// // // // // // //       </View>
// // // // // // //       {meal.food && (
// // // // // // //         <Text style={styles.mealFood}>{meal.food.name}</Text>
// // // // // // //       )}
// // // // // // //       {meal.food && expandedMealId === meal.id && meal.food.ingredients && (
// // // // // // //         <View style={styles.ingredientsInfo}>
// // // // // // //           <Text style={styles.ingredientsTitle}>Main Ingredients:</Text>
// // // // // // //           {meal.food.ingredients.map((ingredient: any, index: number) => (
// // // // // // //             <Text key={index} style={styles.ingredientText}>
// // // // // // //               • {ingredient.name}: {ingredient.weight}
// // // // // // //             </Text>
// // // // // // //           ))}
// // // // // // //         </View>
// // // // // // //       )}
// // // // // // //     </TouchableOpacity>
// // // // // // //   );

// // // // // // //   return (
// // // // // // //     <SafeAreaView style={styles.container}>
// // // // // // //       <ScrollView showsVerticalScrollIndicator={false}>
// // // // // // //         {/* Header */}
// // // // // // //         <View style={styles.header}>
// // // // // // //           <View style={styles.dateContainer}>
// // // // // // //             <Ionicons name="time-outline" size={16} color="#666" />
// // // // // // //             <Text style={styles.dateText}>July 14, 2025</Text>
// // // // // // //             <Ionicons name="chevron-down" size={16} color="#666" />
// // // // // // //           </View>
// // // // // // //           <TouchableOpacity>
// // // // // // //             <Ionicons name="person-outline" size={24} color="#333" />
// // // // // // //           </TouchableOpacity>
// // // // // // //         </View>

// // // // // // //         {/* Greeting */}
// // // // // // //         <View style={styles.greetingContainer}>
// // // // // // //           <Text style={styles.greetingText}>Greetings there,</Text>
// // // // // // //           <Text style={styles.questionText}>Are You Eating Healthy?</Text>
// // // // // // //         </View>

// // // // // // //         {/* Metrics */}
// // // // // // //         <View style={styles.metricsContainer}>
// // // // // // //           {personalInfo ? (
// // // // // // //             <>
// // // // // // //               <MetricCard
// // // // // // //                 icon="flame"
// // // // // // //                 color="#FFC107"
// // // // // // //                 title="Calorie"
// // // // // // //                 value={totalNutrition.calories}
// // // // // // //                 target={nutritionalData.calories}
// // // // // // //               />
// // // // // // //               <MetricCard
// // // // // // //                 icon="water"
// // // // // // //                 color="#2196F3"
// // // // // // //                 title="Protein"
// // // // // // //                 value={totalNutrition.protein}
// // // // // // //                 target={nutritionalData.protein}
// // // // // // //               />
// // // // // // //               <MetricCard
// // // // // // //                 icon="leaf"
// // // // // // //                 color="#4CAF50"
// // // // // // //                 title="Carbs"
// // // // // // //                 value={totalNutrition.carbs}
// // // // // // //                 target={nutritionalData.carbs}
// // // // // // //               />
// // // // // // //             </>
// // // // // // //           ) : (
// // // // // // //             <View style={styles.setupPrompt}>
// // // // // // //               <Ionicons name="person-add" size={48} color="#999" />
// // // // // // //               <Text style={styles.setupPromptTitle}>Complete Your Profile</Text>
// // // // // // //               <Text style={styles.setupPromptText}>
// // // // // // //                 Set up your personal information to get personalized nutrition
// // // // // // //                 targets and AI recommendations.
// // // // // // //               </Text>
// // // // // // //               <TouchableOpacity
// // // // // // //                 style={styles.setupButton}
// // // // // // //                 onPress={() => onNavigate?.("meals")}
// // // // // // //               >
// // // // // // //                 <Text style={styles.setupButtonText}>Go to Meals & Setup</Text>
// // // // // // //               </TouchableOpacity>
// // // // // // //             </View>
// // // // // // //           )}
// // // // // // //         </View>

// // // // // // //         {/* View Toggle */}
// // // // // // //         <View style={styles.toggleContainer}>
// // // // // // //           <TouchableOpacity
// // // // // // //             style={[
// // // // // // //               styles.toggleButton,
// // // // // // //               selectedView === "Daily" && styles.toggleButtonActive,
// // // // // // //             ]}
// // // // // // //             onPress={() => setSelectedView("Daily")}
// // // // // // //           >
// // // // // // //             <Ionicons
// // // // // // //               name="calendar"
// // // // // // //               size={16}
// // // // // // //               color={selectedView === "Daily" ? "#333" : "#999"}
// // // // // // //             />
// // // // // // //             <Text
// // // // // // //               style={[
// // // // // // //                 styles.toggleText,
// // // // // // //                 selectedView === "Daily" && styles.toggleTextActive,
// // // // // // //               ]}
// // // // // // //             >
// // // // // // //               Daily
// // // // // // //             </Text>
// // // // // // //           </TouchableOpacity>
// // // // // // //           <TouchableOpacity
// // // // // // //             style={[
// // // // // // //               styles.toggleButton,
// // // // // // //               selectedView === "Weekly" && styles.toggleButtonActive,
// // // // // // //             ]}
// // // // // // //             onPress={() => setSelectedView("Weekly")}
// // // // // // //           >
// // // // // // //             <Ionicons
// // // // // // //               name="calendar-outline"
// // // // // // //               size={16}
// // // // // // //               color={selectedView === "Weekly" ? "#333" : "#999"}
// // // // // // //             />
// // // // // // //             <Text
// // // // // // //               style={[
// // // // // // //                 styles.toggleText,
// // // // // // //                 selectedView === "Weekly" && styles.toggleTextActive,
// // // // // // //               ]}
// // // // // // //             >
// // // // // // //               Weekly
// // // // // // //             </Text>
// // // // // // //           </TouchableOpacity>
// // // // // // //         </View>

// // // // // // //         {/* Meals */}
// // // // // // //         <View style={styles.mealsContainer}>
// // // // // // //           <View style={styles.mealRow}>
// // // // // // //             {meals.slice(0, 2).map((meal) => (
// // // // // // //               <MealCard key={meal.id} meal={meal} />
// // // // // // //             ))}
// // // // // // //           </View>
// // // // // // //           <View style={styles.mealRow}>
// // // // // // //             {meals.slice(2, 4).map((meal) => (
// // // // // // //               <MealCard key={meal.id} meal={meal} />
// // // // // // //             ))}
// // // // // // //           </View>
// // // // // // //         </View>
// // // // // // //       </ScrollView>
// // // // // // //     </SafeAreaView>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default HomeScreen;

// // // // // // // const styles = StyleSheet.create({
// // // // // // //   container: {
// // // // // // //     flex: 1,
// // // // // // //     backgroundColor: "#f1e3ec",
// // // // // // //   },
// // // // // // //   header: {
// // // // // // //     flexDirection: "row",
// // // // // // //     justifyContent: "space-between",
// // // // // // //     alignItems: "center",
// // // // // // //     paddingHorizontal: 24,
// // // // // // //     paddingTop: 16,
// // // // // // //     paddingBottom: 24,
// // // // // // //   },
// // // // // // //   dateContainer: {
// // // // // // //     flexDirection: "row",
// // // // // // //     alignItems: "center",
// // // // // // //     gap: 10,
// // // // // // //   },
// // // // // // //   dateText: {
// // // // // // //     fontSize: 16,
// // // // // // //     color: "#666",
// // // // // // //   },
// // // // // // //   greetingContainer: {
// // // // // // //     paddingHorizontal: 24,
// // // // // // //     marginBottom: 36,
// // // // // // //   },
// // // // // // //   greetingText: {
// // // // // // //     fontSize: 26,
// // // // // // //     color: "#999",
// // // // // // //     fontWeight: "300",
// // // // // // //   },
// // // // // // //   questionText: {
// // // // // // //     fontSize: 32,
// // // // // // //     color: "#333",
// // // // // // //     fontWeight: "bold",
// // // // // // //     marginTop: 8,
// // // // // // //   },
// // // // // // //   metricsContainer: {
// // // // // // //     flexDirection: "row",
// // // // // // //     paddingHorizontal: 24,
// // // // // // //     gap: 16,
// // // // // // //     marginBottom: 36,
// // // // // // //   },
// // // // // // //   metricCard: {
// // // // // // //     flex: 1,
// // // // // // //     backgroundColor: "white",
// // // // // // //     borderRadius: 20,
// // // // // // //     padding: 20,
// // // // // // //     alignItems: "center",
// // // // // // //     minHeight: 120,
// // // // // // //   },
// // // // // // //   metricIcon: {
// // // // // // //     width: 48,
// // // // // // //     height: 48,
// // // // // // //     borderRadius: 24,
// // // // // // //     justifyContent: "center",
// // // // // // //     alignItems: "center",
// // // // // // //     marginBottom: 12,
// // // // // // //   },
// // // // // // //   metricTitle: {
// // // // // // //     fontSize: 14,
// // // // // // //     color: "#666",
// // // // // // //     marginBottom: 6,
// // // // // // //   },
// // // // // // //   metricValue: {
// // // // // // //     fontSize: 14,
// // // // // // //     color: "#333",
// // // // // // //     fontWeight: "600",
// // // // // // //   },
// // // // // // //   progressBar: {
// // // // // // //     width: "100%",
// // // // // // //     height: 8,
// // // // // // //     backgroundColor: "#e0e0e0",
// // // // // // //     borderRadius: 4,
// // // // // // //     marginTop: 10,
// // // // // // //     marginBottom: 10,
// // // // // // //   },
// // // // // // //   progressFill: {
// // // // // // //     height: "100%",
// // // // // // //     borderRadius: 4,
// // // // // // //   },
// // // // // // //   percentageText: {
// // // // // // //     fontSize: 14,
// // // // // // //     fontWeight: "600",
// // // // // // //   },
// // // // // // //   toggleContainer: {
// // // // // // //     flexDirection: "row",
// // // // // // //     paddingHorizontal: 24,
// // // // // // //     marginBottom: 24,
// // // // // // //     backgroundColor: "white",
// // // // // // //     marginHorizontal: 24,
// // // // // // //     borderRadius: 16,
// // // // // // //     padding: 6,
// // // // // // //   },
// // // // // // //   toggleButton: {
// // // // // // //     flex: 1,
// // // // // // //     flexDirection: "row",
// // // // // // //     alignItems: "center",
// // // // // // //     justifyContent: "center",
// // // // // // //     paddingVertical: 16,
// // // // // // //     borderRadius: 12,
// // // // // // //     gap: 8,
// // // // // // //   },
// // // // // // //   toggleButtonActive: {
// // // // // // //     backgroundColor: "#f1e3ec",
// // // // // // //   },
// // // // // // //   toggleText: {
// // // // // // //     fontSize: 16,
// // // // // // //     color: "#999",
// // // // // // //   },
// // // // // // //   toggleTextActive: {
// // // // // // //     color: "#333",
// // // // // // //     fontWeight: "600",
// // // // // // //   },
// // // // // // //   mealsContainer: {
// // // // // // //     paddingHorizontal: 24,
// // // // // // //     gap: 16,
// // // // // // //   },
// // // // // // //   mealRow: {
// // // // // // //     flexDirection: "row",
// // // // // // //     gap: 16,
// // // // // // //   },
// // // // // // //   mealCard: {
// // // // // // //     flex: 1,
// // // // // // //     backgroundColor: "white",
// // // // // // //     borderRadius: 20,
// // // // // // //     padding: 20,
// // // // // // //     minHeight: 120,
// // // // // // //   },
// // // // // // //   mealHeader: {
// // // // // // //     flexDirection: "row",
// // // // // // //     justifyContent: "space-between",
// // // // // // //     alignItems: "flex-start",
// // // // // // //     marginBottom: 12,
// // // // // // //   },
// // // // // // //   mealTitle: {
// // // // // // //     fontSize: 18,
// // // // // // //     fontWeight: "bold",
// // // // // // //     color: "#333",
// // // // // // //   },
// // // // // // //   mealTime: {
// // // // // // //     fontSize: 14,
// // // // // // //     color: "#666",
// // // // // // //     marginTop: 4,
// // // // // // //   },
// // // // // // //   mealFood: {
// // // // // // //     fontSize: 16,
// // // // // // //     color: "#666",
// // // // // // //     marginTop: 12,
// // // // // // //   },
// // // // // // //   ingredientsInfo: {
// // // // // // //     marginTop: 12,
// // // // // // //   },
// // // // // // //   ingredientsTitle: {
// // // // // // //     fontSize: 14,
// // // // // // //     fontWeight: "600",
// // // // // // //     color: "#333",
// // // // // // //     marginBottom: 4,
// // // // // // //   },
// // // // // // //   ingredientText: {
// // // // // // //     fontSize: 12,
// // // // // // //     color: "#666",
// // // // // // //   },
// // // // // // //   setupPrompt: {
// // // // // // //     alignItems: "center",
// // // // // // //     padding: 20,
// // // // // // //     backgroundColor: "#f1e3ec",
// // // // // // //     borderRadius: 20,
// // // // // // //     marginTop: 20,
// // // // // // //   },
// // // // // // //   setupPromptTitle: {
// // // // // // //     fontSize: 20,
// // // // // // //     fontWeight: "bold",
// // // // // // //     color: "#333",
// // // // // // //     marginTop: 15,
// // // // // // //     marginBottom: 10,
// // // // // // //   },
// // // // // // //   setupPromptText: {
// // // // // // //     fontSize: 16,
// // // // // // //     color: "#666",
// // // // // // //     textAlign: "center",
// // // // // // //     marginBottom: 20,
// // // // // // //   },
// // // // // // //   setupButton: {
// // // // // // //     backgroundColor: "transparent",
// // // // // // //     borderWidth: 2,
// // // // // // //     borderColor: "#666",
// // // // // // //     paddingVertical: 15,
// // // // // // //     paddingHorizontal: 30,
// // // // // // //     borderRadius: 12,
// // // // // // //   },
// // // // // // //   setupButtonText: {
// // // // // // //     color: "#666",
// // // // // // //     fontSize: 18,
// // // // // // //     fontWeight: "bold",
// // // // // // //   },
// // // // // // // });
// // // // // // import { useMealPlan } from "@/components/MealPlanContext";
// // // // // // import { Ionicons } from "@expo/vector-icons";
// // // // // // import React, { useState } from "react";
// // // // // // import { SafeAreaView } from 'react-native-safe-area-context';
// // // // // // import {
// // // // // //   Dimensions,
// // // // // //   ScrollView,
// // // // // //   StyleSheet,
// // // // // //   Text,
// // // // // //   TouchableOpacity,
// // // // // //   View,
// // // // // //   Image,
// // // // // // } from "react-native";
// // // // // // import ChatScreen from "../../components/chat"; // Adjust path based on your project structure

// // // // // // const { width } = Dimensions.get("window");

// // // // // // // Home Screen Component
// // // // // // const HomeScreen = ({ onNavigate }: { onNavigate?: (tab: string) => void }) => {
// // // // // //   const [selectedView, setSelectedView] = useState("Daily");
// // // // // //   const [expandedMealId, setExpandedMealId] = useState<string | null>(null);
// // // // // //   const [isChatModalVisible, setIsChatModalVisible] = useState(false); // State for modal visibility
// // // // // //   const { meals, nutritionalData, getTotalNutrition, personalInfo } = useMealPlan();
// // // // // //   const totalNutrition = getTotalNutrition();

// // // // // //   const MetricCard = ({
// // // // // //     icon,
// // // // // //     color,
// // // // // //     title,
// // // // // //     value,
// // // // // //     target,
// // // // // //   }: {
// // // // // //     icon: string;
// // // // // //     color: string;
// // // // // //     title: string;
// // // // // //     value: number;
// // // // // //     target: number;
// // // // // //   }) => {
// // // // // //     const percentage = target > 0 ? Math.min((value / target) * 100, 100) : 0;
// // // // // //     const isOverTarget = value > target;

// // // // // //     return (
// // // // // //       <View style={styles.metricCard}>
// // // // // //         <View style={[styles.metricIcon, { backgroundColor: color }]}>
// // // // // //           <Ionicons name={icon as any} size={20} color="white" />
// // // // // //         </View>
// // // // // //         <Text style={styles.metricTitle}>{title}:</Text>
// // // // // //         <Text style={styles.metricValue}>
// // // // // //           {value}/{target}
// // // // // //           {title === "Calorie" ? " kcal" : "g"}
// // // // // //         </Text>
// // // // // //         <View style={styles.progressBar}>
// // // // // //           <View
// // // // // //             style={[
// // // // // //               styles.progressFill,
// // // // // //               {
// // // // // //                 width: `${percentage}%`,
// // // // // //                 backgroundColor: isOverTarget ? "#FF5722" : "#4CAF50",
// // // // // //               },
// // // // // //             ]}
// // // // // //           />
// // // // // //         </View>
// // // // // //         <Text
// // // // // //           style={[
// // // // // //             styles.percentageText,
// // // // // //             { color: isOverTarget ? "#FF5722" : "#4CAF50" },
// // // // // //           ]}
// // // // // //         >
// // // // // //           {percentage.toFixed(0)}%
// // // // // //         </Text>
// // // // // //       </View>
// // // // // //     );
// // // // // //   };

// // // // // //   const MealCard = ({ meal }: { meal: any }) => (
// // // // // //     <TouchableOpacity
// // // // // //       style={styles.mealCard}
// // // // // //       onPress={() => setExpandedMealId(expandedMealId === meal.id ? null : meal.id)}
// // // // // //     >
// // // // // //       <View style={styles.mealHeader}>
// // // // // //         <View>
// // // // // //           <Text style={styles.mealTitle}>{meal.title}</Text>
// // // // // //           <Text style={styles.mealTime}>({meal.time})</Text>
// // // // // //         </View>
// // // // // //         {meal.hasFood ? (
// // // // // //           <Ionicons name="checkmark" size={20} color="#4CAF50" />
// // // // // //         ) : (
// // // // // //           <Ionicons name="add" size={20} color="#999" />
// // // // // //         )}
// // // // // //       </View>
// // // // // //       {meal.food && (
// // // // // //         <Text style={styles.mealFood}>{meal.food.name}</Text>
// // // // // //       )}
// // // // // //       {meal.food && expandedMealId === meal.id && meal.food.ingredients && (
// // // // // //         <View style={styles.ingredientsInfo}>
// // // // // //           <Text style={styles.ingredientsTitle}>Main Ingredients:</Text>
// // // // // //           {meal.food.ingredients.map((ingredient: any, index: number) => (
// // // // // //             <Text key={index} style={styles.ingredientText}>
// // // // // //               • {ingredient.name}: {ingredient.weight}
// // // // // //             </Text>
// // // // // //           ))}
// // // // // //         </View>
// // // // // //       )}
// // // // // //     </TouchableOpacity>
// // // // // //   );

// // // // // //   return (
// // // // // //     <SafeAreaView style={styles.container}>
// // // // // //       <ScrollView showsVerticalScrollIndicator={false}>
// // // // // //         {/* Header */}
// // // // // //         <View style={styles.header}>
// // // // // //           <View style={styles.dateContainer}>
// // // // // //             <Ionicons name="time-outline" size={16} color="#666" />
// // // // // //             <Text style={styles.dateText}>July 14, 2025</Text>
// // // // // //             <Ionicons name="chevron-down" size={16} color="#666" />
// // // // // //           </View>
// // // // // //           <TouchableOpacity>
// // // // // //             <Ionicons name="person-outline" size={24} color="#333" />
// // // // // //           </TouchableOpacity>
// // // // // //         </View>

// // // // // //         {/* Greeting */}
// // // // // //         <View style={styles.greetingContainer}>
// // // // // //           <Text style={styles.greetingText}>Greetings there,</Text>
// // // // // //           <Text style={styles.questionText}>Are You Eating Healthy?</Text>
// // // // // //         </View>

// // // // // //         {/* Metrics */}
// // // // // //         <View style={styles.metricsContainer}>
// // // // // //           {personalInfo ? (
// // // // // //             <>
// // // // // //               <MetricCard
// // // // // //                 icon="flame"
// // // // // //                 color="#FFC107"
// // // // // //                 title="Calorie"
// // // // // //                 value={totalNutrition.calories}
// // // // // //                 target={nutritionalData.calories}
// // // // // //               />
// // // // // //               <MetricCard
// // // // // //                 icon="water"
// // // // // //                 color="#2196F3"
// // // // // //                 title="Protein"
// // // // // //                 value={totalNutrition.protein}
// // // // // //                 target={nutritionalData.protein}
// // // // // //               />
// // // // // //               <MetricCard
// // // // // //                 icon="leaf"
// // // // // //                 color="#4CAF50"
// // // // // //                 title="Carbs"
// // // // // //                 value={totalNutrition.carbs}
// // // // // //                 target={nutritionalData.carbs}
// // // // // //               />
// // // // // //             </>
// // // // // //           ) : (
// // // // // //             <View style={styles.setupPrompt}>
// // // // // //               <Ionicons name="person-add" size={48} color="#999" />
// // // // // //               <Text style={styles.setupPromptTitle}>Complete Your Profile</Text>
// // // // // //               <Text style={styles.setupPromptText}>
// // // // // //                 Set up your personal information to get personalized nutrition
// // // // // //                 targets and AI recommendations.
// // // // // //               </Text>
// // // // // //               <TouchableOpacity
// // // // // //                 style={styles.setupButton}
// // // // // //                 onPress={() => onNavigate?.("meals")}
// // // // // //               >
// // // // // //                 <Text style={styles.setupButtonText}>Go to Meals & Setup</Text>
// // // // // //               </TouchableOpacity>
// // // // // //             </View>
// // // // // //           )}
// // // // // //         </View>

// // // // // //         {/* View Toggle */}
// // // // // //         <View style={styles.toggleContainer}>
// // // // // //           <TouchableOpacity
// // // // // //             style={[
// // // // // //               styles.toggleButton,
// // // // // //               selectedView === "Daily" && styles.toggleButtonActive,
// // // // // //             ]}
// // // // // //             onPress={() => setSelectedView("Daily")}
// // // // // //           >
// // // // // //             <Ionicons
// // // // // //               name="calendar"
// // // // // //               size={16}
// // // // // //               color={selectedView === "Daily" ? "#333" : "#999"}
// // // // // //             />
// // // // // //             <Text
// // // // // //               style={[
// // // // // //                 styles.toggleText,
// // // // // //                 selectedView === "Daily" && styles.toggleTextActive,
// // // // // //               ]}
// // // // // //             >
// // // // // //               Daily
// // // // // //             </Text>
// // // // // //           </TouchableOpacity>
// // // // // //           <TouchableOpacity
// // // // // //             style={[
// // // // // //               styles.toggleButton,
// // // // // //               selectedView === "Weekly" && styles.toggleButtonActive,
// // // // // //             ]}
// // // // // //             onPress={() => setSelectedView("Weekly")}
// // // // // //           >
// // // // // //             <Ionicons
// // // // // //               name="calendar-outline"
// // // // // //               size={16}
// // // // // //               color={selectedView === "Weekly" ? "#333" : "#999"}
// // // // // //             />
// // // // // //             <Text
// // // // // //               style={[
// // // // // //                 styles.toggleText,
// // // // // //                 selectedView === "Weekly" && styles.toggleTextActive,
// // // // // //               ]}
// // // // // //             >
// // // // // //               Weekly
// // // // // //             </Text>
// // // // // //           </TouchableOpacity>
// // // // // //         </View>

// // // // // //         {/* Meals */}
// // // // // //         <View style={styles.mealsContainer}>
// // // // // //           <View style={styles.mealRow}>
// // // // // //             {meals.slice(0, 2).map((meal) => (
// // // // // //               <MealCard key={meal.id} meal={meal} />
// // // // // //             ))}
// // // // // //           </View>
// // // // // //           <View style={styles.mealRow}>
// // // // // //             {meals.slice(2, 4).map((meal) => (
// // // // // //               <MealCard key={meal.id} meal={meal} />
// // // // // //             ))}
// // // // // //           </View>
// // // // // //         </View>
// // // // // //       </ScrollView>

// // // // // //       {/* Chat Icon Button */}
// // // // // //       <TouchableOpacity
// // // // // //         style={styles.chatButton}
// // // // // //         onPress={() => setIsChatModalVisible(true)}
// // // // // //         accessibilityLabel="Open Diet Assistant"
// // // // // //       >
// // // // // //         <Image
// // // // // //           source={require("../assets/images/chat.svg")} // Adjust path as needed
// // // // // //           style={styles.chatIcon}
// // // // // //         />
// // // // // //       </TouchableOpacity>

// // // // // //       {/* Chat Modal */}
// // // // // //       <ChatScreen
// // // // // //         visible={isChatModalVisible}
// // // // // //         onClose={() => setIsChatModalVisible(false)}
// // // // // //         nutritionalData={nutritionalData}
// // // // // //         totalNutrition={totalNutrition}
// // // // // //         personalInfo={personalInfo}
// // // // // //         onNavigate={onNavigate}
// // // // // //       />
// // // // // //     </SafeAreaView>
// // // // // //   );
// // // // // // };

// // // // // // export default HomeScreen;

// // // // // // const styles = StyleSheet.create({
// // // // // //   container: {
// // // // // //     flex: 1,
// // // // // //     backgroundColor: "#f1e3ec",
// // // // // //   },
// // // // // //   header: {
// // // // // //     flexDirection: "row",
// // // // // //     justifyContent: "space-between",
// // // // // //     alignItems: "center",
// // // // // //     paddingHorizontal: 24,
// // // // // //     paddingTop: 16,
// // // // // //     paddingBottom: 24,
// // // // // //   },
// // // // // //   dateContainer: {
// // // // // //     flexDirection: "row",
// // // // // //     alignItems: "center",
// // // // // //     gap: 10,
// // // // // //   },
// // // // // //   dateText: {
// // // // // //     fontSize: 16,
// // // // // //     color: "#666",
// // // // // //   },
// // // // // //   greetingContainer: {
// // // // // //     paddingHorizontal: 24,
// // // // // //     marginBottom: 36,
// // // // // //   },
// // // // // //   greetingText: {
// // // // // //     fontSize: 26,
// // // // // //     color: "#999",
// // // // // //     fontWeight: "300",
// // // // // //   },
// // // // // //   questionText: {
// // // // // //     fontSize: 32,
// // // // // //     color: "#333",
// // // // // //     fontWeight: "bold",
// // // // // //     marginTop: 8,
// // // // // //   },
// // // // // //   metricsContainer: {
// // // // // //     flexDirection: "row",
// // // // // //     paddingHorizontal: 24,
// // // // // //     gap: 16,
// // // // // //     marginBottom: 36,
// // // // // //   },
// // // // // //   metricCard: {
// // // // // //     flex: 1,
// // // // // //     backgroundColor: "white",
// // // // // //     borderRadius: 20,
// // // // // //     padding: 20,
// // // // // //     alignItems: "center",
// // // // // //     minHeight: 120,
// // // // // //   },
// // // // // //   metricIcon: {
// // // // // //     width: 48,
// // // // // //     height: 48,
// // // // // //     borderRadius: 24,
// // // // // //     justifyContent: "center",
// // // // // //     alignItems: "center",
// // // // // //     marginBottom: 12,
// // // // // //   },
// // // // // //   metricTitle: {
// // // // // //     fontSize: 14,
// // // // // //     color: "#666",
// // // // // //     marginBottom: 6,
// // // // // //   },
// // // // // //   metricValue: {
// // // // // //     fontSize: 14,
// // // // // //     color: "#333",
// // // // // //     fontWeight: "600",
// // // // // //   },
// // // // // //   progressBar: {
// // // // // //     width: "100%",
// // // // // //     height: 8,
// // // // // //     backgroundColor: "#e0e0e0",
// // // // // //     borderRadius: 4,
// // // // // //     marginTop: 10,
// // // // // //     marginBottom: 10,
// // // // // //   },
// // // // // //   progressFill: {
// // // // // //     height: "100%",
// // // // // //     borderRadius: 4,
// // // // // //   },
// // // // // //   percentageText: {
// // // // // //     fontSize: 14,
// // // // // //     fontWeight: "600",
// // // // // //   },
// // // // // //   toggleContainer: {
// // // // // //     flexDirection: "row",
// // // // // //     paddingHorizontal: 24,
// // // // // //     marginBottom: 24,
// // // // // //     backgroundColor: "white",
// // // // // //     marginHorizontal: 24,
// // // // // //     borderRadius: 16,
// // // // // //     padding: 6,
// // // // // //   },
// // // // // //   toggleButton: {
// // // // // //     flex: 1,
// // // // // //     flexDirection: "row",
// // // // // //     alignItems: "center",
// // // // // //     justifyContent: "center",
// // // // // //     paddingVertical: 16,
// // // // // //     borderRadius: 12,
// // // // // //     gap: 8,
// // // // // //   },
// // // // // //   toggleButtonActive: {
// // // // // //     backgroundColor: "#f1e3ec",
// // // // // //   },
// // // // // //   toggleText: {
// // // // // //     fontSize: 16,
// // // // // //     color: "#999",
// // // // // //   },
// // // // // //   toggleTextActive: {
// // // // // //     color: "#333",
// // // // // //     fontWeight: "600",
// // // // // //   },
// // // // // //   mealsContainer: {
// // // // // //     paddingHorizontal: 24,
// // // // // //     gap: 16,
// // // // // //     paddingBottom: 80, // Prevent overlap with chat button
// // // // // //   },
// // // // // //   mealRow: {
// // // // // //     flexDirection: "row",
// // // // // //     gap: 16,
// // // // // //   },
// // // // // //   mealCard: {
// // // // // //     flex: 1,
// // // // // //     backgroundColor: "white",
// // // // // //     borderRadius: 20,
// // // // // //     padding: 20,
// // // // // //     minHeight: 120,
// // // // // //   },
// // // // // //   mealHeader: {
// // // // // //     flexDirection: "row",
// // // // // //     justifyContent: "space-between",
// // // // // //     alignItems: "flex-start",
// // // // // //     marginBottom: 12,
// // // // // //   },
// // // // // //   mealTitle: {
// // // // // //     fontSize: 18,
// // // // // //     fontWeight: "bold",
// // // // // //     color: "#333",
// // // // // //   },
// // // // // //   mealTime: {
// // // // // //     fontSize: 14,
// // // // // //     color: "#666",
// // // // // //     marginTop: 4,
// // // // // //   },
// // // // // //   mealFood: {
// // // // // //     fontSize: 16,
// // // // // //     color: "#666",
// // // // // //     marginTop: 12,
// // // // // //   },
// // // // // //   ingredientsInfo: {
// // // // // //     marginTop: 12,
// // // // // //   },
// // // // // //   ingredientsTitle: {
// // // // // //     fontSize: 14,
// // // // // //     fontWeight: "600",
// // // // // //     color: "#333",
// // // // // //     marginBottom: 4,
// // // // // //   },
// // // // // //   ingredientText: {
// // // // // //     fontSize: 12,
// // // // // //     color: "#666",
// // // // // //   },
// // // // // //   setupPrompt: {
// // // // // //     alignItems: "center",
// // // // // //     padding: 20,
// // // // // //     backgroundColor: "#f1e3ec",
// // // // // //     borderRadius: 20,
// // // // // //     marginTop: 20,
// // // // // //   },
// // // // // //   setupPromptTitle: {
// // // // // //     fontSize: 20,
// // // // // //     fontWeight: "bold",
// // // // // //     color: "#333",
// // // // // //     marginTop: 15,
// // // // // //     marginBottom: 10,
// // // // // //   },
// // // // // //   setupPromptText: {
// // // // // //     fontSize: 16,
// // // // // //     color: "#666",
// // // // // //     textAlign: "center",
// // // // // //     marginBottom: 20,
// // // // // //   },
// // // // // //   setupButton: {
// // // // // //     backgroundColor: "transparent",
// // // // // //     borderWidth: 2,
// // // // // //     borderColor: "#666",
// // // // // //     paddingVertical: 15,
// // // // // //     paddingHorizontal: 30,
// // // // // //     borderRadius: 12,
// // // // // //   },
// // // // // //   setupButtonText: {
// // // // // //     color: "#666",
// // // // // //     fontSize: 18,
// // // // // //     fontWeight: "bold",
// // // // // //   },
// // // // // //   chatButton: {
// // // // // //     position: "absolute",
// // // // // //     bottom: 24,
// // // // // //     right: 24,
// // // // // //     backgroundColor: "#4CAF50",
// // // // // //     borderRadius: 30,
// // // // // //     width: 60,
// // // // // //     height: 60,
// // // // // //     justifyContent: "center",
// // // // // //     alignItems: "center",
// // // // // //     elevation: 5,
// // // // // //     shadowColor: "#000",
// // // // // //     shadowOffset: { width: 0, height: 2 },
// // // // // //     shadowOpacity: 0.3,
// // // // // //     shadowRadius: 4,
// // // // // //   },
// // // // // //   chatIcon: {
// // // // // //     width: 30,
// // // // // //     height: 30,
// // // // // //     tintColor: "#FFF",
// // // // // //   },
// // // // // // });


// // // // // import { useMealPlan } from "@/components/MealPlanContext";
// // // // // import { Ionicons } from "@expo/vector-icons";
// // // // // import React, { useState } from "react";
// // // // // import {
// // // // //   Dimensions,
// // // // //   Image,
// // // // //   ScrollView,
// // // // //   StyleSheet,
// // // // //   Text,
// // // // //   TouchableOpacity,
// // // // //   View,
// // // // // } from "react-native";
// // // // // import { SafeAreaView } from 'react-native-safe-area-context';
// // // // // import ChatScreen from "../../components/ChatScreen";

// // // // // const { width } = Dimensions.get("window");

// // // // // // Home Screen Component
// // // // // const HomeScreen = ({ onNavigate }: { onNavigate?: (tab: string) => void }) => {
// // // // //   const [selectedView, setSelectedView] = useState("Daily");
// // // // //   const [expandedMealId, setExpandedMealId] = useState<string | null>(null);
// // // // //   const [isChatModalVisible, setIsChatModalVisible] = useState(false); // State for modal visibility
// // // // //   const { meals, nutritionalData, getTotalNutrition, personalInfo } = useMealPlan();
// // // // //   const totalNutrition = getTotalNutrition();

// // // // //   const MetricCard = ({
// // // // //     icon,
// // // // //     color,
// // // // //     title,
// // // // //     value,
// // // // //     target,
// // // // //   }: {
// // // // //     icon: string;
// // // // //     color: string;
// // // // //     title: string;
// // // // //     value: number;
// // // // //     target: number;
// // // // //   }) => {
// // // // //     const percentage = target > 0 ? Math.min((value / target) * 100, 100) : 0;
// // // // //     const isOverTarget = value > target;

// // // // //     return (
// // // // //       <View style={styles.metricCard}>
// // // // //         <View style={[styles.metricIcon, { backgroundColor: color }]}>
// // // // //           <Ionicons name={icon as any} size={20} color="white" />
// // // // //         </View>
// // // // //         <Text style={styles.metricTitle}>{title}:</Text>
// // // // //         <Text style={styles.metricValue}>
// // // // //           {value}/{target}
// // // // //           {title === "Calorie" ? " kcal" : "g"}
// // // // //         </Text>
// // // // //         <View style={styles.progressBar}>
// // // // //           <View
// // // // //             style={[
// // // // //               styles.progressFill,
// // // // //               {
// // // // //                 width: `${percentage}%`,
// // // // //                 backgroundColor: isOverTarget ? "#FF5722" : "#4CAF50",
// // // // //               },
// // // // //             ]}
// // // // //           />
// // // // //         </View>
// // // // //         <Text
// // // // //           style={[
// // // // //             styles.percentageText,
// // // // //             { color: isOverTarget ? "#FF5722" : "#4CAF50" },
// // // // //           ]}
// // // // //         >
// // // // //           {percentage.toFixed(0)}%
// // // // //         </Text>
// // // // //       </View>
// // // // //     );
// // // // //   };

// // // // //   // In HomeScreen - Replace the MealCard component
// // // // // const MealCard = ({ meal }: { meal: any }) => {
// // // // //   const getActionIcon = () => {
// // // // //     if (!meal.hasFood) return { name: 'add-circle-outline', color: '#999' };
// // // // //     if (meal.isEaten) return { name: 'checkmark-circle', color: '#4CAF50' };
// // // // //     return { name: 'checkbox-outline', color: '#FF9800' };
// // // // //   };

// // // // //   const actionIcon = getActionIcon();

// // // // //   return (
// // // // //     <TouchableOpacity
// // // // //       style={[
// // // // //         styles.mealCard,
// // // // //         meal.hasFood && meal.isEaten && styles.mealCardCompleted
// // // // //       ]}
// // // // //       onPress={() => setExpandedMealId(expandedMealId === meal.id ? null : meal.id)}
// // // // //     >
// // // // //       <View style={styles.mealHeader}>
// // // // //         <View style={styles.mealInfo}>
// // // // //           <Text style={[
// // // // //             styles.mealTitle,
// // // // //             meal.hasFood && meal.isEaten && styles.mealTitleCompleted
// // // // //           ]}>
// // // // //             {meal.title}
// // // // //           </Text>
// // // // //           <Text style={styles.mealTime}>({meal.time})</Text>
// // // // //         </View>
// // // // //         <Ionicons 
// // // // //           name={actionIcon.name as any} 
// // // // //           size={20} 
// // // // //           color={actionIcon.color} 
// // // // //         />
// // // // //       </View>
// // // // //       {meal.food && (
// // // // //         <Text style={[
// // // // //           styles.mealFood,
// // // // //           meal.isEaten && styles.mealFoodCompleted
// // // // //         ]}>
// // // // //           {meal.food.name}
// // // // //           {meal.isEaten && ' ✓'}
// // // // //         </Text>
// // // // //       )}
// // // // //       {meal.food && expandedMealId === meal.id && meal.food.ingredients && (
// // // // //         <View style={styles.ingredientsInfo}>
// // // // //           <Text style={styles.ingredientsTitle}>Main Ingredients:</Text>
// // // // //           {meal.food.ingredients.map((ingredient: any, index: number) => (
// // // // //             <Text key={index} style={styles.ingredientText}>
// // // // //               • {ingredient.name}: {ingredient.weight}
// // // // //             </Text>
// // // // //           ))}
// // // // //         </View>
// // // // //       )}
// // // // //     </TouchableOpacity>
// // // // //   );
// // // // // };

// // // // //   return (
// // // // //     <SafeAreaView style={styles.container}>
// // // // //       <ScrollView showsVerticalScrollIndicator={false}>
// // // // //         {/* Header */}
// // // // //         <View style={styles.header}>
// // // // //           <View style={styles.dateContainer}>
// // // // //             <Ionicons name="time-outline" size={16} color="#666" />
// // // // //             <Text style={styles.dateText}>July 14, 2025</Text>
// // // // //             <Ionicons name="chevron-down" size={16} color="#666" />
// // // // //           </View>
// // // // //           <TouchableOpacity>
// // // // //             <Ionicons name="person-outline" size={24} color="#333" />
// // // // //           </TouchableOpacity>
// // // // //         </View>

// // // // //         {/* Greeting */}
// // // // //         <View style={styles.greetingContainer}>
// // // // //           <Text style={styles.greetingText}>Greetings there,</Text>
// // // // //           <Text style={styles.questionText}>Are You Eating Healthy?</Text>
// // // // //         </View>

// // // // //         {/* Metrics */}
// // // // //         <View style={styles.metricsContainer}>
// // // // //           {personalInfo ? (
// // // // //             <>
// // // // //               <MetricCard
// // // // //                 icon="flame"
// // // // //                 color="#FFC107"
// // // // //                 title="Calorie"
// // // // //                 value={totalNutrition.calories}
// // // // //                 target={nutritionalData.calories}
// // // // //               />
// // // // //               <MetricCard
// // // // //                 icon="water"
// // // // //                 color="#2196F3"
// // // // //                 title="Protein"
// // // // //                 value={totalNutrition.protein}
// // // // //                 target={nutritionalData.protein}
// // // // //               />
// // // // //               <MetricCard
// // // // //                 icon="leaf"
// // // // //                 color="#4CAF50"
// // // // //                 title="Carbs"
// // // // //                 value={totalNutrition.carbs}
// // // // //                 target={nutritionalData.carbs}
// // // // //               />
// // // // //             </>
// // // // //           ) : (
// // // // //             <View style={styles.setupPrompt}>
// // // // //               <Ionicons name="person-add" size={48} color="#999" />
// // // // //               <Text style={styles.setupPromptTitle}>Complete Your Profile</Text>
// // // // //               <Text style={styles.setupPromptText}>
// // // // //                 Set up your personal information to get personalized nutrition
// // // // //                 targets and AI recommendations.
// // // // //               </Text>
// // // // //               <TouchableOpacity
// // // // //                 style={styles.setupButton}
// // // // //                 onPress={() => onNavigate?.("meals")}
// // // // //               >
// // // // //                 <Text style={styles.setupButtonText}>Go to Meals & Setup</Text>
// // // // //               </TouchableOpacity>
// // // // //             </View>
// // // // //           )}
// // // // //         </View>

// // // // //         {/* View Toggle */}
// // // // //         <View style={styles.toggleContainer}>
// // // // //           <TouchableOpacity
// // // // //             style={[
// // // // //               styles.toggleButton,
// // // // //               selectedView === "Daily" && styles.toggleButtonActive,
// // // // //             ]}
// // // // //             onPress={() => setSelectedView("Daily")}
// // // // //           >
// // // // //             <Ionicons
// // // // //               name="calendar"
// // // // //               size={16}
// // // // //               color={selectedView === "Daily" ? "#333" : "#999"}
// // // // //             />
// // // // //             <Text
// // // // //               style={[
// // // // //                 styles.toggleText,
// // // // //                 selectedView === "Daily" && styles.toggleTextActive,
// // // // //               ]}
// // // // //             >
// // // // //               Daily
// // // // //             </Text>
// // // // //           </TouchableOpacity>
// // // // //           <TouchableOpacity
// // // // //             style={[
// // // // //               styles.toggleButton,
// // // // //               selectedView === "Weekly" && styles.toggleButtonActive,
// // // // //             ]}
// // // // //             onPress={() => setSelectedView("Weekly")}
// // // // //           >
// // // // //             <Ionicons
// // // // //               name="calendar-outline"
// // // // //               size={16}
// // // // //               color={selectedView === "Weekly" ? "#333" : "#999"}
// // // // //             />
// // // // //             <Text
// // // // //               style={[
// // // // //                 styles.toggleText,
// // // // //                 selectedView === "Weekly" && styles.toggleTextActive,
// // // // //               ]}
// // // // //             >
// // // // //               Weekly
// // // // //             </Text>
// // // // //           </TouchableOpacity>
// // // // //         </View>

// // // // //         {/* Meals */}
// // // // //         <View style={styles.mealsContainer}>
// // // // //           <View style={styles.mealRow}>
// // // // //             {meals.slice(0, 2).map((meal) => (
// // // // //               <MealCard key={meal.id} meal={meal} />
// // // // //             ))}
// // // // //           </View>
// // // // //           <View style={styles.mealRow}>
// // // // //             {meals.slice(2, 4).map((meal) => (
// // // // //               <MealCard key={meal.id} meal={meal} />
// // // // //             ))}
// // // // //           </View>
// // // // //         </View>
// // // // //       </ScrollView>

// // // // //       {/* Chat Icon Button */}
// // // // //       <TouchableOpacity
// // // // //         style={styles.chatButton}
// // // // //         onPress={() => setIsChatModalVisible(true)}
// // // // //         accessibilityLabel="Open Diet Assistant"
// // // // //       >
// // // // //         <Image
// // // // //           source={require("../../assets/images/chat_logo.svg")} // Adjust path as needed
// // // // //           style={styles.chatIcon}
// // // // //         />
// // // // //       </TouchableOpacity>

// // // // //       {/* Chat Modal */}
// // // // //       <ChatScreen
// // // // //         visible={isChatModalVisible}
// // // // //         onClose={() => setIsChatModalVisible(false)}
// // // // //         nutritionalData={nutritionalData}
// // // // //         totalNutrition={totalNutrition}
// // // // //         personalInfo={personalInfo}
// // // // //         onNavigate={onNavigate}
// // // // //       />
// // // // //     </SafeAreaView>
// // // // //   );
// // // // // };

// // // // // export default HomeScreen;

// // // // // const styles = StyleSheet.create({
// // // // //   container: {
// // // // //     flex: 1,
// // // // //     backgroundColor: "#f1e3ec",
// // // // //   },
// // // // //   header: {
// // // // //     flexDirection: "row",
// // // // //     justifyContent: "space-between",
// // // // //     alignItems: "center",
// // // // //     paddingHorizontal: 24,
// // // // //     paddingTop: 16,
// // // // //     paddingBottom: 24,
// // // // //   },
// // // // //   dateContainer: {
// // // // //     flexDirection: "row",
// // // // //     alignItems: "center",
// // // // //     gap: 10,
// // // // //   },
// // // // //   dateText: {
// // // // //     fontSize: 16,
// // // // //     color: "#666",
// // // // //   },
// // // // //   greetingContainer: {
// // // // //     paddingHorizontal: 24,
// // // // //     marginBottom: 36,
// // // // //   },
// // // // //   greetingText: {
// // // // //     fontSize: 26,
// // // // //     color: "#999",
// // // // //     fontWeight: "300",
// // // // //   },
// // // // //   // Add to StyleSheet.create in HomeScreen
// // // // // mealCardCompleted: {
// // // // //   backgroundColor: '#E8F5E8',
// // // // //   borderWidth: 2,
// // // // //   borderColor: '#4CAF50',
// // // // // },
// // // // // mealTitleCompleted: {
// // // // //   color: '#2E7D32',
// // // // // },
// // // // // mealFoodCompleted: {
// // // // //   color: '#4CAF50',
// // // // //   fontWeight: '600',
// // // // // },
// // // // // mealInfo: {
// // // // //   flex: 1,
// // // // // },
// // // // //   questionText: {
// // // // //     fontSize: 32,
// // // // //     color: "#333",
// // // // //     fontWeight: "bold",
// // // // //     marginTop: 8,
// // // // //   },
// // // // //   metricsContainer: {
// // // // //     flexDirection: "row",
// // // // //     paddingHorizontal: 24,
// // // // //     gap: 16,
// // // // //     marginBottom: 36,
// // // // //   },
// // // // //   metricCard: {
// // // // //     flex: 1,
// // // // //     backgroundColor: "white",
// // // // //     borderRadius: 20,
// // // // //     padding: 20,
// // // // //     alignItems: "center",
// // // // //     minHeight: 120,
// // // // //   },
// // // // //   metricIcon: {
// // // // //     width: 48,
// // // // //     height: 48,
// // // // //     borderRadius: 24,
// // // // //     justifyContent: "center",
// // // // //     alignItems: "center",
// // // // //     marginBottom: 12,
// // // // //   },
// // // // //   metricTitle: {
// // // // //     fontSize: 14,
// // // // //     color: "#666",
// // // // //     marginBottom: 6,
// // // // //   },
// // // // //   metricValue: {
// // // // //     fontSize: 14,
// // // // //     color: "#333",
// // // // //     fontWeight: "600",
// // // // //   },
// // // // //   progressBar: {
// // // // //     width: "100%",
// // // // //     height: 8,
// // // // //     backgroundColor: "#e0e0e0",
// // // // //     borderRadius: 4,
// // // // //     marginTop: 10,
// // // // //     marginBottom: 10,
// // // // //   },
// // // // //   progressFill: {
// // // // //     height: "100%",
// // // // //     borderRadius: 4,
// // // // //   },
// // // // //   percentageText: {
// // // // //     fontSize: 14,
// // // // //     fontWeight: "600",
// // // // //   },
// // // // //   toggleContainer: {
// // // // //     flexDirection: "row",
// // // // //     paddingHorizontal: 24,
// // // // //     marginBottom: 24,
// // // // //     backgroundColor: "white",
// // // // //     marginHorizontal: 24,
// // // // //     borderRadius: 16,
// // // // //     padding: 6,
// // // // //   },
// // // // //   toggleButton: {
// // // // //     flex: 1,
// // // // //     flexDirection: "row",
// // // // //     alignItems: "center",
// // // // //     justifyContent: "center",
// // // // //     paddingVertical: 16,
// // // // //     borderRadius: 12,
// // // // //     gap: 8,
// // // // //   },
// // // // //   toggleButtonActive: {
// // // // //     backgroundColor: "#f1e3ec",
// // // // //   },
// // // // //   toggleText: {
// // // // //     fontSize: 16,
// // // // //     color: "#999",
// // // // //   },
// // // // //   toggleTextActive: {
// // // // //     color: "#333",
// // // // //     fontWeight: "600",
// // // // //   },
// // // // //   mealsContainer: {
// // // // //     paddingHorizontal: 24,
// // // // //     gap: 16,
// // // // //     paddingBottom: 80, // Prevent overlap with chat button
// // // // //   },
// // // // //   mealRow: {
// // // // //     flexDirection: "row",
// // // // //     gap: 16,
// // // // //   },
// // // // //   mealCard: {
// // // // //     flex: 1,
// // // // //     backgroundColor: "white",
// // // // //     borderRadius: 20,
// // // // //     padding: 20,
// // // // //     minHeight: 120,
// // // // //   },
// // // // //   mealHeader: {
// // // // //     flexDirection: "row",
// // // // //     justifyContent: "space-between",
// // // // //     alignItems: "flex-start",
// // // // //     marginBottom: 12,
// // // // //   },
// // // // //   mealTitle: {
// // // // //     fontSize: 18,
// // // // //     fontWeight: "bold",
// // // // //     color: "#333",
// // // // //   },
// // // // //   mealTime: {
// // // // //     fontSize: 14,
// // // // //     color: "#666",
// // // // //     marginTop: 4,
// // // // //   },
// // // // //   mealFood: {
// // // // //     fontSize: 16,
// // // // //     color: "#666",
// // // // //     marginTop: 12,
// // // // //   },
// // // // //   ingredientsInfo: {
// // // // //     marginTop: 12,
// // // // //   },
// // // // //   ingredientsTitle: {
// // // // //     fontSize: 14,
// // // // //     fontWeight: "600",
// // // // //     color: "#333",
// // // // //     marginBottom: 4,
// // // // //   },
// // // // //   ingredientText: {
// // // // //     fontSize: 12,
// // // // //     color: "#666",
// // // // //   },
// // // // //   setupPrompt: {
// // // // //     alignItems: "center",
// // // // //     padding: 20,
// // // // //     backgroundColor: "#f1e3ec",
// // // // //     borderRadius: 20,
// // // // //     marginTop: 20,
// // // // //   },
// // // // //   setupPromptTitle: {
// // // // //     fontSize: 20,
// // // // //     fontWeight: "bold",
// // // // //     color: "#333",
// // // // //     marginTop: 15,
// // // // //     marginBottom: 10,
// // // // //   },
// // // // //   setupPromptText: {
// // // // //     fontSize: 16,
// // // // //     color: "#666",
// // // // //     textAlign: "center",
// // // // //     marginBottom: 20,
// // // // //   },
// // // // //   setupButton: {
// // // // //     backgroundColor: "transparent",
// // // // //     borderWidth: 2,
// // // // //     borderColor: "#666",
// // // // //     paddingVertical: 15,
// // // // //     paddingHorizontal: 30,
// // // // //     borderRadius: 12,
// // // // //   },
// // // // //   setupButtonText: {
// // // // //     color: "#666",
// // // // //     fontSize: 18,
// // // // //     fontWeight: "bold",
// // // // //   },
// // // // //   chatButton: {
// // // // //     position: "absolute",
// // // // //     bottom: 24,
// // // // //     right: 24,
// // // // //     backgroundColor: "#4CAF50",
// // // // //     borderRadius: 30,
// // // // //     width: 60,
// // // // //     height: 60,
// // // // //     justifyContent: "center",
// // // // //     alignItems: "center",
// // // // //     elevation: 5,
// // // // //     shadowColor: "#000",
// // // // //     shadowOffset: { width: 0, height: 2 },
// // // // //     shadowOpacity: 0.3,
// // // // //     shadowRadius: 4,
// // // // //   },
// // // // //   chatIcon: {
// // // // //     width: 30,
// // // // //     height: 30,
// // // // //     tintColor: "#FFF",
// // // // //   },
// // // // // });


// // // // import { useMealPlan } from "@/components/MealPlanContext";
// // // // import { Ionicons } from "@expo/vector-icons";
// // // // import React, { useState } from "react";
// // // // import {
// // // //   Dimensions,
// // // //   Image,
// // // //   ScrollView,
// // // //   StyleSheet,
// // // //   Text,
// // // //   TouchableOpacity,
// // // //   View,
// // // // } from "react-native";
// // // // import { SafeAreaView } from 'react-native-safe-area-context';
// // // // import ChatScreen from "../../components/ChatScreen";

// // // // const { width } = Dimensions.get("window");

// // // // const HomeScreen = ({ onNavigate }: { onNavigate?: (tab: string) => void }) => {
// // // //   const [selectedView, setSelectedView] = useState("Daily");
// // // //   const [expandedMealId, setExpandedMealId] = useState<string | null>(null);
// // // //   const [isChatModalVisible, setIsChatModalVisible] = useState(false);
// // // //   const { meals, nutritionalData, getTotalNutrition, personalInfo } = useMealPlan();
// // // //   const totalNutrition = getTotalNutrition();

// // // //   const MetricCard = ({
// // // //     icon,
// // // //     color,
// // // //     title,
// // // //     value,
// // // //     target,
// // // //   }: {
// // // //     icon: string;
// // // //     color: string;
// // // //     title: string;
// // // //     value: number;
// // // //     target: number;
// // // //   }) => {
// // // //     const percentage = target > 0 ? Math.min((value / target) * 100, 100) : 0;
// // // //     const isOverTarget = value > target;

// // // //     return (
// // // //       <View style={styles.metricCard}>
// // // //         <View style={[styles.metricIcon, { backgroundColor: color }]}>
// // // //           <Ionicons name={icon as any} size={20} color="white" />
// // // //         </View>
// // // //         <Text style={styles.metricTitle}>{title}:</Text>
// // // //         <Text style={styles.metricValue}>
// // // //           {value}/{target}
// // // //           {title === "Calorie" ? " kcal" : "g"}
// // // //         </Text>
// // // //         <View style={styles.progressBar}>
// // // //           <View
// // // //             style={[
// // // //               styles.progressFill,
// // // //               {
// // // //                 width: `${percentage}%`,
// // // //                 backgroundColor: isOverTarget ? "#FF5722" : "#4CAF50",
// // // //               },
// // // //             ]}
// // // //           />
// // // //         </View>
// // // //         <Text
// // // //           style={[
// // // //             styles.percentageText,
// // // //             { color: isOverTarget ? "#FF5722" : "#4CAF50" },
// // // //           ]}
// // // //         >
// // // //           {percentage.toFixed(0)}%
// // // //         </Text>
// // // //       </View>
// // // //     );
// // // //   };

// // // //   const MealCard = ({ meal }: { meal: any }) => {
// // // //     const getActionIcon = () => {
// // // //       if (!meal.hasFood) return { name: 'add-circle-outline' as const, color: '#999' };
// // // //       if (meal.isEaten) return { name: 'checkmark-circle' as const, color: '#4CAF50' };
// // // //       return { name: 'checkbox-outline' as const, color: '#FF9800' };
// // // //     };

// // // //     const actionIcon = getActionIcon();

// // // //     return (
// // // //       <TouchableOpacity
// // // //         style={[
// // // //           styles.mealCard,
// // // //           meal.hasFood && meal.isEaten && styles.mealCardCompleted,
// // // //           meal.hasFood && !meal.isEaten && styles.mealCardPending
// // // //         ]}
// // // //         onPress={() => setExpandedMealId(expandedMealId === meal.id ? null : meal.id)}
// // // //       >
// // // //         <View style={styles.mealHeader}>
// // // //           <View style={styles.mealInfo}>
// // // //             <Text style={[
// // // //               styles.mealTitle,
// // // //               meal.hasFood && meal.isEaten && styles.mealTitleCompleted,
// // // //               meal.hasFood && !meal.isEaten && styles.mealTitlePending
// // // //             ]}>
// // // //               {meal.title}
// // // //             </Text>
// // // //             <Text style={styles.mealTime}>({meal.time})</Text>
// // // //           </View>
// // // //           <Ionicons name={actionIcon.name} size={20} color={actionIcon.color} />
// // // //         </View>
// // // //         {meal.food && (
// // // //           <Text style={[
// // // //             styles.mealFood,
// // // //             meal.isEaten && styles.mealFoodCompleted,
// // // //             !meal.isEaten && meal.hasFood && styles.mealFoodPending
// // // //           ]}>
// // // //             {meal.food.name}
// // // //             {meal.isEaten && ' ✓'}
// // // //           </Text>
// // // //         )}
// // // //         {meal.food && expandedMealId === meal.id && meal.food.ingredients && (
// // // //           <View style={styles.ingredientsInfo}>
// // // //             <Text style={styles.ingredientsTitle}>Main Ingredients:</Text>
// // // //             {meal.food.ingredients.map((ingredient: any, index: number) => (
// // // //               <Text key={index} style={styles.ingredientText}>
// // // //                 • {ingredient.name}: {ingredient.weight}
// // // //               </Text>
// // // //             ))}
// // // //           </View>
// // // //         )}
// // // //       </TouchableOpacity>
// // // //     );
// // // //   };

// // // //   return (
// // // //     <SafeAreaView style={styles.container}>
// // // //       <ScrollView showsVerticalScrollIndicator={false}>
// // // //         <View style={styles.header}>
// // // //           <View style={styles.dateContainer}>
// // // //             <Ionicons name="time-outline" size={16} color="#666" />
// // // //             <Text style={styles.dateText}>July 14, 2025</Text>
// // // //             <Ionicons name="chevron-down" size={16} color="#666" />
// // // //           </View>
// // // //           <TouchableOpacity>
// // // //             <Ionicons name="person-outline" size={24} color="#333" />
// // // //           </TouchableOpacity>
// // // //         </View>

// // // //         <View style={styles.greetingContainer}>
// // // //           <Text style={styles.greetingText}>Greetings there,</Text>
// // // //           <Text style={styles.questionText}>Are You Eating Healthy?</Text>
// // // //         </View>

// // // //         <View style={styles.metricsContainer}>
// // // //           {personalInfo ? (
// // // //             <>
// // // //               <MetricCard
// // // //                 icon="flame"
// // // //                 color="#FFC107"
// // // //                 title="Calorie"
// // // //                 value={totalNutrition.calories}
// // // //                 target={nutritionalData.calories}
// // // //               />
// // // //               <MetricCard
// // // //                 icon="water"
// // // //                 color="#2196F3"
// // // //                 title="Protein"
// // // //                 value={totalNutrition.protein}
// // // //                 target={nutritionalData.protein}
// // // //               />
// // // //               <MetricCard
// // // //                 icon="leaf"
// // // //                 color="#4CAF50"
// // // //                 title="Carbs"
// // // //                 value={totalNutrition.carbs}
// // // //                 target={nutritionalData.carbs}
// // // //               />
// // // //             </>
// // // //           ) : (
// // // //             <View style={styles.setupPrompt}>
// // // //               <Ionicons name="person-add" size={48} color="#999" />
// // // //               <Text style={styles.setupPromptTitle}>Complete Your Profile</Text>
// // // //               <Text style={styles.setupPromptText}>
// // // //                 Set up your personal information to get personalized nutrition
// // // //                 targets and AI recommendations.
// // // //               </Text>
// // // //               <TouchableOpacity
// // // //                 style={styles.setupButton}
// // // //                 onPress={() => onNavigate?.("meals")}
// // // //               >
// // // //                 <Text style={styles.setupButtonText}>Go to Meals & Setup</Text>
// // // //               </TouchableOpacity>
// // // //             </View>
// // // //           )}
// // // //         </View>

// // // //         <View style={styles.toggleContainer}>
// // // //           <TouchableOpacity
// // // //             style={[
// // // //               styles.toggleButton,
// // // //               selectedView === "Daily" && styles.toggleButtonActive,
// // // //             ]}
// // // //             onPress={() => setSelectedView("Daily")}
// // // //           >
// // // //             <Ionicons
// // // //               name="calendar"
// // // //               size={16}
// // // //               color={selectedView === "Daily" ? "#333" : "#999"}
// // // //             />
// // // //             <Text
// // // //               style={[
// // // //                 styles.toggleText,
// // // //                 selectedView === "Daily" && styles.toggleTextActive,
// // // //               ]}
// // // //             >
// // // //               Daily
// // // //             </Text>
// // // //           </TouchableOpacity>
// // // //           <TouchableOpacity
// // // //             style={[
// // // //               styles.toggleButton,
// // // //               selectedView === "Weekly" && styles.toggleButtonActive,
// // // //             ]}
// // // //             onPress={() => setSelectedView("Weekly")}
// // // //           >
// // // //             <Ionicons
// // // //               name="calendar-outline"
// // // //               size={16}
// // // //               color={selectedView === "Weekly" ? "#333" : "#999"}
// // // //             />
// // // //             <Text
// // // //               style={[
// // // //                 styles.toggleText,
// // // //                 selectedView === "Weekly" && styles.toggleTextActive,
// // // //               ]}
// // // //             >
// // // //               Weekly
// // // //             </Text>
// // // //           </TouchableOpacity>
// // // //         </View>

// // // //         <View style={styles.mealsContainer}>
// // // //           <View style={styles.mealRow}>
// // // //             {meals.slice(0, 2).map((meal) => (
// // // //               <MealCard key={meal.id} meal={meal} />
// // // //             ))}
// // // //           </View>
// // // //           <View style={styles.mealRow}>
// // // //             {meals.slice(2, 4).map((meal) => (
// // // //               <MealCard key={meal.id} meal={meal} />
// // // //             ))}
// // // //           </View>
// // // //         </View>
// // // //       </ScrollView>

// // // //       <TouchableOpacity
// // // //         style={styles.chatButton}
// // // //         onPress={() => setIsChatModalVisible(true)}
// // // //         accessibilityLabel="Open Diet Assistant"
// // // //       >
// // // //         <Image
// // // //           source={require("../../assets/images/chat_logo.svg")}
// // // //           style={styles.chatIcon}
// // // //         />
// // // //       </TouchableOpacity>

// // // //       <ChatScreen
// // // //         visible={isChatModalVisible}
// // // //         onClose={() => setIsChatModalVisible(false)}
// // // //         nutritionalData={nutritionalData}
// // // //         totalNutrition={totalNutrition}
// // // //         personalInfo={personalInfo}
// // // //         onNavigate={onNavigate}
// // // //       />
// // // //     </SafeAreaView>
// // // //   );
// // // // };

// // // // export default HomeScreen;

// // // // const styles = StyleSheet.create({
// // // //   container: {
// // // //     flex: 1,
// // // //     backgroundColor: "#f1e3ec",
// // // //   },
// // // //   header: {
// // // //     flexDirection: "row",
// // // //     justifyContent: "space-between",
// // // //     alignItems: "center",
// // // //     paddingHorizontal: 24,
// // // //     paddingTop: 16,
// // // //     paddingBottom: 24,
// // // //   },
// // // //   dateContainer: {
// // // //     flexDirection: "row",
// // // //     alignItems: "center",
// // // //     gap: 10,
// // // //   },
// // // //   dateText: {
// // // //     fontSize: 16,
// // // //     color: "#666",
// // // //   },
// // // //   greetingContainer: {
// // // //     paddingHorizontal: 24,
// // // //     marginBottom: 36,
// // // //   },
// // // //   greetingText: {
// // // //     fontSize: 26,
// // // //     color: "#999",
// // // //     fontWeight: "300",
// // // //   },
// // // //   questionText: {
// // // //     fontSize: 32,
// // // //     color: "#333",
// // // //     fontWeight: "bold",
// // // //     marginTop: 8,
// // // //   },
// // // //   metricsContainer: {
// // // //     flexDirection: "row",
// // // //     paddingHorizontal: 24,
// // // //     gap: 16,
// // // //     marginBottom: 36,
// // // //   },
// // // //   metricCard: {
// // // //     flex: 1,
// // // //     backgroundColor: "white",
// // // //     borderRadius: 20,
// // // //     padding: 20,
// // // //     alignItems: "center",
// // // //     minHeight: 120,
// // // //   },
// // // //   metricIcon: {
// // // //     width: 48,
// // // //     height: 48,
// // // //     borderRadius: 24,
// // // //     justifyContent: "center",
// // // //     alignItems: "center",
// // // //     marginBottom: 12,
// // // //   },
// // // //   metricTitle: {
// // // //     fontSize: 14,
// // // //     color: "#666",
// // // //     marginBottom: 6,
// // // //   },
// // // //   metricValue: {
// // // //     fontSize: 14,
// // // //     color: "#333",
// // // //     fontWeight: "600",
// // // //   },
// // // //   progressBar: {
// // // //     width: "100%",
// // // //     height: 8,
// // // //     backgroundColor: "#e0e0e0",
// // // //     borderRadius: 4,
// // // //     marginTop: 10,
// // // //     marginBottom: 10,
// // // //   },
// // // //   progressFill: {
// // // //     height: "100%",
// // // //     borderRadius: 4,
// // // //   },
// // // //   percentageText: {
// // // //     fontSize: 14,
// // // //     fontWeight: "600",
// // // //   },
// // // //   toggleContainer: {
// // // //     flexDirection: "row",
// // // //     paddingHorizontal: 24,
// // // //     marginBottom: 24,
// // // //     backgroundColor: "white",
// // // //     marginHorizontal: 24,
// // // //     borderRadius: 16,
// // // //     padding: 6,
// // // //   },
// // // //   toggleButton: {
// // // //     flex: 1,
// // // //     flexDirection: "row",
// // // //     alignItems: "center",
// // // //     justifyContent: "center",
// // // //     paddingVertical: 16,
// // // //     borderRadius: 12,
// // // //     gap: 8,
// // // //   },
// // // //   toggleButtonActive: {
// // // //     backgroundColor: "#f1e3ec",
// // // //   },
// // // //   toggleText: {
// // // //     fontSize: 16,
// // // //     color: "#999",
// // // //   },
// // // //   toggleTextActive: {
// // // //     color: "#333",
// // // //     fontWeight: "600",
// // // //   },
// // // //   mealsContainer: {
// // // //     paddingHorizontal: 24,
// // // //     gap: 16,
// // // //     paddingBottom: 80,
// // // //   },
// // // //   mealRow: {
// // // //     flexDirection: "row",
// // // //     gap: 16,
// // // //   },
// // // //   mealCard: {
// // // //     flex: 1,
// // // //     backgroundColor: "white",
// // // //     borderRadius: 20,
// // // //     padding: 20,
// // // //     minHeight: 120,
// // // //   },
// // // //   mealCardCompleted: {
// // // //     backgroundColor: '#E8F5E8',
// // // //     borderWidth: 2,
// // // //     borderColor: '#4CAF50',
// // // //   },
// // // //   mealCardPending: {
// // // //     backgroundColor: '#FFF3E0',
// // // //     borderWidth: 2,
// // // //     borderColor: '#FF9800',
// // // //   },
// // // //   mealHeader: {
// // // //     flexDirection: "row",
// // // //     justifyContent: "space-between",
// // // //     alignItems: "flex-start",
// // // //     marginBottom: 12,
// // // //   },
// // // //   mealInfo: {
// // // //     flex: 1,
// // // //   },
// // // //   mealTitle: {
// // // //     fontSize: 18,
// // // //     fontWeight: "bold",
// // // //     color: "#333",
// // // //   },
// // // //   mealTitleCompleted: {
// // // //     color: '#2E7D32',
// // // //   },
// // // //   mealTitlePending: {
// // // //     color: '#F57C00',
// // // //   },
// // // //   mealTime: {
// // // //     fontSize: 14,
// // // //     color: "#666",
// // // //     marginTop: 4,
// // // //   },
// // // //   mealFood: {
// // // //     fontSize: 16,
// // // //     color: "#666",
// // // //     marginTop: 12,
// // // //   },
// // // //   mealFoodCompleted: {
// // // //     color: '#4CAF50',
// // // //     fontWeight: '600',
// // // //   },
// // // //   mealFoodPending: {
// // // //     color: '#FF9800',
// // // //     fontWeight: '500',
// // // //   },
// // // //   ingredientsInfo: {
// // // //     marginTop: 12,
// // // //   },
// // // //   ingredientsTitle: {
// // // //     fontSize: 14,
// // // //     fontWeight: "600",
// // // //     color: "#333",
// // // //     marginBottom: 4,
// // // //   },
// // // //   ingredientText: {
// // // //     fontSize: 12,
// // // //     color: "#666",
// // // //   },
// // // //   setupPrompt: {
// // // //     alignItems: "center",
// // // //     padding: 20,
// // // //     backgroundColor: "#f1e3ec",
// // // //     borderRadius: 20,
// // // //     marginTop: 20,
// // // //   },
// // // //   setupPromptTitle: {
// // // //     fontSize: 20,
// // // //     fontWeight: "bold",
// // // //     color: "#333",
// // // //     marginTop: 15,
// // // //     marginBottom: 10,
// // // //   },
// // // //   setupPromptText: {
// // // //     fontSize: 16,
// // // //     color: "#666",
// // // //     textAlign: "center",
// // // //     marginBottom: 20,
// // // //   },
// // // //   setupButton: {
// // // //     backgroundColor: "transparent",
// // // //     borderWidth: 2,
// // // //     borderColor: "#666",
// // // //     paddingVertical: 15,
// // // //     paddingHorizontal: 30,
// // // //     borderRadius: 12,
// // // //   },
// // // //   setupButtonText: {
// // // //     color: "#666",
// // // //     fontSize: 18,
// // // //     fontWeight: "bold",
// // // //   },
// // // //   chatButton: {
// // // //     position: "absolute",
// // // //     bottom: 24,
// // // //     right: 24,
// // // //     backgroundColor: "#4CAF50",
// // // //     borderRadius: 30,
// // // //     width: 60,
// // // //     height: 60,
// // // //     justifyContent: "center",
// // // //     alignItems: "center",
// // // //     elevation: 5,
// // // //     shadowColor: "#000",
// // // //     shadowOffset: { width: 0, height: 2 },
// // // //     shadowOpacity: 0.3,
// // // //     shadowRadius: 4,
// // // //   },
// // // //   chatIcon: {
// // // //     width: 30,
// // // //     height: 30,
// // // //     tintColor: "#FFF",
// // // //   },
// // // // });


// // // import { useMealPlan } from "@/components/MealPlanContext";
// // // import { Ionicons } from "@expo/vector-icons";
// // // import React, { useState } from "react";
// // // import {
// // //   Dimensions,
// // //   Image,
// // //   ScrollView,
// // //   StyleSheet,
// // //   Text,
// // //   TouchableOpacity,
// // //   View,
// // // } from "react-native";
// // // import { SafeAreaView } from 'react-native-safe-area-context';
// // // import ChatScreen from "../../components/ChatScreen";

// // // const { width } = Dimensions.get("window");

// // // const HomeScreen = ({ onNavigate }: { onNavigate?: (tab: string) => void }) => {
// // //   const [selectedView, setSelectedView] = useState("Daily");
// // //   const [expandedMealId, setExpandedMealId] = useState<string | null>(null);
// // //   const [isChatModalVisible, setIsChatModalVisible] = useState(false);
// // //   const { meals, nutritionalData, getTotalNutrition, personalInfo, toggleMealConsumed } = useMealPlan();
// // //   const totalNutrition = getTotalNutrition();

// // //   const MetricCard = ({
// // //     icon,
// // //     color,
// // //     title,
// // //     value,
// // //     target,
// // //   }: {
// // //     icon: string;
// // //     color: string;
// // //     title: string;
// // //     value: number;
// // //     target: number;
// // //   }) => {
// // //     const percentage = target > 0 ? Math.min((value / target) * 100, 100) : 0;
// // //     const isOverTarget = value > target;

// // //     return (
// // //       <View style={styles.metricCard}>
// // //         <View style={[styles.metricIcon, { backgroundColor: color }]}>
// // //           <Ionicons name={icon as any} size={20} color="white" />
// // //         </View>
// // //         <Text style={styles.metricTitle}>{title}:</Text>
// // //         <Text style={styles.metricValue}>
// // //           {value}/{target}
// // //           {title === "Calorie" ? " kcal" : "g"}
// // //         </Text>
// // //         <View style={styles.progressBar}>
// // //           <View
// // //             style={[
// // //               styles.progressFill,
// // //               {
// // //                 width: `${percentage}%`,
// // //                 backgroundColor: isOverTarget ? "#FF5722" : "#4CAF50",
// // //               },
// // //             ]}
// // //           />
// // //         </View>
// // //         <Text
// // //           style={[
// // //             styles.percentageText,
// // //             { color: isOverTarget ? "#FF5722" : "#4CAF50" },
// // //           ]}
// // //         >
// // //           {percentage.toFixed(0)}%
// // //         </Text>
// // //       </View>
// // //     );
// // //   };

// // //   // ✅ FIXED: REAL MEAL STATUS LOGIC
// // //   const MealCard = ({ meal }: { meal: any }) => {
// // //     const getActionIcon = () => {
// // //       // ✅ REAL STATUS CHECK
// // //       if (!meal.hasFood || !meal.food) {
// // //         return { name: 'add-circle-outline' as const, color: '#4CAF50' }; // Green +
// // //       }
// // //       if (meal.consumed) {
// // //         return { name: 'checkmark-circle' as const, color: '#4CAF50' }; // Green ✅
// // //       }
// // //       return { name: 'checkbox-outline' as const, color: '#FF9800' }; // Orange ☐
// // //     };

// // //     const actionIcon = getActionIcon();
// // //     const showFood = meal.hasFood && meal.food;
// // //     const isEaten = showFood && meal.consumed;
// // //     const isPending = showFood && !meal.consumed;

// // //     const handleCardPress = () => {
// // //       if (showFood) {
// // //         // ✅ TOGGLE CONSUMED STATUS
// // //         toggleMealConsumed(meal.id);
// // //       } else {
// // //         // Navigate to add meal
// // //         onNavigate?.("meals");
// // //       }
// // //     };

// // //     return (
// // //       <TouchableOpacity
// // //         style={[
// // //           styles.mealCard,
// // //           isEaten && styles.mealCardCompleted,
// // //           isPending && styles.mealCardPending
// // //         ]}
// // //         onPress={handleCardPress}
// // //         activeOpacity={0.7}
// // //       >
// // //         <View style={styles.mealHeader}>
// // //           <View style={styles.mealInfo}>
// // //             <Text style={[
// // //               styles.mealTitle,
// // //               isEaten && styles.mealTitleCompleted,
// // //               isPending && styles.mealTitlePending
// // //             ]}>
// // //               {meal.title}
// // //             </Text>
// // //             <Text style={styles.mealTime}>({meal.time})</Text>
// // //           </View>
// // //           <Ionicons name={actionIcon.name} size={20} color={actionIcon.color} />
// // //         </View>
        
// // //         {showFood ? (
// // //           <View>
// // //             <Text style={[
// // //               styles.mealFood,
// // //               isEaten && styles.mealFoodCompleted,
// // //               isPending && styles.mealFoodPending
// // //             ]}>
// // //               {meal.food.name}
// // //               {isEaten && ' ✓'}
// // //             </Text>
// // //             {expandedMealId === meal.id && meal.food.ingredients && (
// // //               <View style={styles.ingredientsInfo}>
// // //                 <Text style={styles.ingredientsTitle}>Main Ingredients:</Text>
// // //                 {meal.food.ingredients.map((ingredient: any, index: number) => (
// // //                   <Text key={index} style={styles.ingredientText}>
// // //                     • {ingredient.name}: {ingredient.weight}
// // //                   </Text>
// // //                 ))}
// // //               </View>
// // //             )}
// // //           </View>
// // //         ) : (
// // //           <Text style={styles.mealCardEmpty}>Tap to add meal</Text>
// // //         )}
// // //       </TouchableOpacity>
// // //     );
// // //   };

// // //   return (
// // //     <SafeAreaView style={styles.container}>
// // //       <ScrollView showsVerticalScrollIndicator={false}>
// // //         <View style={styles.header}>
// // //           <View style={styles.dateContainer}>
// // //             <Ionicons name="time-outline" size={16} color="#666" />
// // //             <Text style={styles.dateText}>July 14, 2025</Text>
// // //             <Ionicons name="chevron-down" size={16} color="#666" />
// // //           </View>
// // //           <TouchableOpacity>
// // //             <Ionicons name="person-outline" size={24} color="#333" />
// // //           </TouchableOpacity>
// // //         </View>

// // //         <View style={styles.greetingContainer}>
// // //           <Text style={styles.greetingText}>Greetings there,</Text>
// // //           <Text style={styles.questionText}>Are You Eating Healthy?</Text>
// // //         </View>

// // //         <View style={styles.metricsContainer}>
// // //           {personalInfo ? (
// // //             <>
// // //               <MetricCard
// // //                 icon="flame"
// // //                 color="#FFC107"
// // //                 title="Calorie"
// // //                 value={totalNutrition.calories}
// // //                 target={nutritionalData.calories}
// // //               />
// // //               <MetricCard
// // //                 icon="water"
// // //                 color="#2196F3"
// // //                 title="Protein"
// // //                 value={totalNutrition.protein}
// // //                 target={nutritionalData.protein}
// // //               />
// // //               <MetricCard
// // //                 icon="leaf"
// // //                 color="#4CAF50"
// // //                 title="Carbs"
// // //                 value={totalNutrition.carbs}
// // //                 target={nutritionalData.carbs}
// // //               />
// // //             </>
// // //           ) : (
// // //             <View style={styles.setupPrompt}>
// // //               <Ionicons name="person-add" size={48} color="#999" />
// // //               <Text style={styles.setupPromptTitle}>Complete Your Profile</Text>
// // //               <Text style={styles.setupPromptText}>
// // //                 Set up your personal information to get personalized nutrition
// // //                 targets and AI recommendations.
// // //               </Text>
// // //               <TouchableOpacity
// // //                 style={styles.setupButton}
// // //                 onPress={() => onNavigate?.("meals")}
// // //               >
// // //                 <Text style={styles.setupButtonText}>Go to Meals & Setup</Text>
// // //               </TouchableOpacity>
// // //             </View>
// // //           )}
// // //         </View>

// // //         <View style={styles.toggleContainer}>
// // //           <TouchableOpacity
// // //             style={[
// // //               styles.toggleButton,
// // //               selectedView === "Daily" && styles.toggleButtonActive,
// // //             ]}
// // //             onPress={() => setSelectedView("Daily")}
// // //           >
// // //             <Ionicons
// // //               name="calendar"
// // //               size={16}
// // //               color={selectedView === "Daily" ? "#333" : "#999"}
// // //             />
// // //             <Text
// // //               style={[
// // //                 styles.toggleText,
// // //                 selectedView === "Daily" && styles.toggleTextActive,
// // //               ]}
// // //             >
// // //               Daily
// // //             </Text>
// // //           </TouchableOpacity>
// // //           <TouchableOpacity
// // //             style={[
// // //               styles.toggleButton,
// // //               selectedView === "Weekly" && styles.toggleButtonActive,
// // //             ]}
// // //             onPress={() => setSelectedView("Weekly")}
// // //           >
// // //             <Ionicons
// // //               name="calendar-outline"
// // //               size={16}
// // //               color={selectedView === "Weekly" ? "#333" : "#999"}
// // //             />
// // //             <Text
// // //               style={[
// // //                 styles.toggleText,
// // //                 selectedView === "Weekly" && styles.toggleTextActive,
// // //               ]}
// // //             >
// // //               Weekly
// // //             </Text>
// // //           </TouchableOpacity>
// // //         </View>

// // //         <View style={styles.mealsContainer}>
// // //           <View style={styles.mealRow}>
// // //             {meals.slice(0, 2).map((meal) => (
// // //               <MealCard key={meal.id} meal={meal} />
// // //             ))}
// // //           </View>
// // //           <View style={styles.mealRow}>
// // //             {meals.slice(2, 4).map((meal) => (
// // //               <MealCard key={meal.id} meal={meal} />
// // //             ))}
// // //           </View>
// // //         </View>
// // //       </ScrollView>

// // //       <TouchableOpacity
// // //         style={styles.chatButton}
// // //         onPress={() => setIsChatModalVisible(true)}
// // //         accessibilityLabel="Open Diet Assistant"
// // //       >
// // //         <Image
// // //           source={require("../../assets/images/chat_logo.svg")}
// // //           style={styles.chatIcon}
// // //         />
// // //       </TouchableOpacity>

// // //       {/* <ChatScreen
// // //         visible={isChatModalVisible}
// // //         onClose={() => setIsChatModalVisible(false)}
// // //         nutritionalData={nutritionalData}
// // //         totalNutrition={totalNutrition}
// // //         personalInfo={personalInfo}
// // //         onNavigate={onNavigate}
// // //       /> */}
// // //       <ChatScreen
// // //   visible={isChatModalVisible}
// // //   onClose={() => setIsChatModalVisible(false)}
// // //   onNavigate={onNavigate}
// // // />
// // //     </SafeAreaView>
// // //   );
// // // };

// // // export default HomeScreen;

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     backgroundColor: "#e8f1eaff",
// // //   },
// // //   header: {
// // //     flexDirection: "row",
// // //     justifyContent: "space-between",
// // //     alignItems: "center",
// // //     paddingHorizontal: 24,
// // //     paddingTop: 16,
// // //     paddingBottom: 24,
// // //   },
// // //   dateContainer: {
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //     gap: 10,
// // //   },
// // //   dateText: {
// // //     fontSize: 16,
// // //     color: "#666",
// // //   },
// // //   greetingContainer: {
// // //     paddingHorizontal: 24,
// // //     marginBottom: 36,
// // //   },
// // //   greetingText: {
// // //     fontSize: 26,
// // //     color: "#999",
// // //     fontWeight: "300",
// // //   },
// // //   questionText: {
// // //     fontSize: 32,
// // //     color: "#333",
// // //     fontWeight: "bold",
// // //     marginTop: 8,
// // //   },
// // //   metricsContainer: {
// // //     flexDirection: "row",
// // //     paddingHorizontal: 24,
// // //     gap: 16,
// // //     marginBottom: 36,
// // //   },
// // //   metricCard: {
// // //     flex: 1,
// // //     backgroundColor: "white",
// // //     borderRadius: 20,
// // //     padding: 20,
// // //     alignItems: "center",
// // //     minHeight: 120,
// // //   },
// // //   metricIcon: {
// // //     width: 48,
// // //     height: 48,
// // //     borderRadius: 24,
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     marginBottom: 12,
// // //   },
// // //   metricTitle: {
// // //     fontSize: 14,
// // //     color: "#666",
// // //     marginBottom: 6,
// // //   },
// // //   metricValue: {
// // //     fontSize: 14,
// // //     color: "#333",
// // //     fontWeight: "600",
// // //   },
// // //   progressBar: {
// // //     width: "100%",
// // //     height: 8,
// // //     backgroundColor: "#e0e0e0",
// // //     borderRadius: 4,
// // //     marginTop: 10,
// // //     marginBottom: 10,
// // //   },
// // //   progressFill: {
// // //     height: "100%",
// // //     borderRadius: 4,
// // //   },
// // //   percentageText: {
// // //     fontSize: 14,
// // //     fontWeight: "600",
// // //   },
// // //   toggleContainer: {
// // //     flexDirection: "row",
// // //     paddingHorizontal: 24,
// // //     marginBottom: 24,
// // //     backgroundColor: "white",
// // //     marginHorizontal: 24,
// // //     borderRadius: 16,
// // //     padding: 6,
// // //   },
// // //   toggleButton: {
// // //     flex: 1,
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //     justifyContent: "center",
// // //     paddingVertical: 16,
// // //     borderRadius: 12,
// // //     gap: 8,
// // //   },
// // //   toggleButtonActive: {
// // //     backgroundColor: "#e8f1eaff",
// // //   },
// // //   toggleText: {
// // //     fontSize: 16,
// // //     color: "#999",
// // //   },
// // //   toggleTextActive: {
// // //     color: "#333",
// // //     fontWeight: "600",
// // //   },
// // //   mealsContainer: {
// // //     paddingHorizontal: 24,
// // //     gap: 16,
// // //     paddingBottom: 80,
// // //   },
// // //   mealRow: {
// // //     flexDirection: "row",
// // //     gap: 16,
// // //   },
// // //   mealCard: {
// // //     flex: 1,
// // //     backgroundColor: "white",
// // //     borderRadius: 20,
// // //     padding: 20,
// // //     minHeight: 120,
// // //   },
// // //   // ✅ FIXED STYLES
// // //   mealCardCompleted: {
// // //     backgroundColor: '#E8F5E8',
// // //     borderWidth: 2,
// // //     borderColor: '#4CAF50',
// // //   },
// // //   mealCardPending: {
// // //     backgroundColor: '#FFF3E0',
// // //     borderWidth: 2,
// // //     borderColor: '#FF9800',
// // //   },
// // //   mealHeader: {
// // //     flexDirection: "row",
// // //     justifyContent: "space-between",
// // //     alignItems: "flex-start",
// // //     marginBottom: 12,
// // //   },
// // //   mealInfo: {
// // //     flex: 1,
// // //   },
// // //   mealTitle: {
// // //     fontSize: 18,
// // //     fontWeight: "bold",
// // //     color: "#333",
// // //   },
// // //   mealTitleCompleted: {
// // //     color: '#2E7D32',
// // //   },
// // //   mealTitlePending: {
// // //     color: '#F57C00',
// // //   },
// // //   mealTime: {
// // //     fontSize: 14,
// // //     color: "#666",
// // //     marginTop: 4,
// // //   },
// // //   mealFood: {
// // //     fontSize: 16,
// // //     color: "#666",
// // //     marginTop: 12,
// // //   },
// // //   mealFoodCompleted: {
// // //     color: '#4CAF50',
// // //     fontWeight: '600',
// // //   },
// // //   mealFoodPending: {
// // //     color: '#FF9800',
// // //     fontWeight: '500',
// // //   },
// // //   // ✅ NEW EMPTY STATE
// // //   mealCardEmpty: {
// // //     fontSize: 14,
// // //     color: '#999',
// // //     textAlign: 'center',
// // //     marginTop: 20,
// // //   },
// // //   ingredientsInfo: {
// // //     marginTop: 12,
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
// // //   setupPrompt: {
// // //     alignItems: "center",
// // //     padding: 20,
// // //     backgroundColor: "#e8f1eaff",
// // //     borderRadius: 20,
// // //     marginTop: 20,
// // //   },
// // //   setupPromptTitle: {
// // //     fontSize: 20,
// // //     fontWeight: "bold",
// // //     color: "#333",
// // //     marginTop: 15,
// // //     marginBottom: 10,
// // //   },
// // //   setupPromptText: {
// // //     fontSize: 16,
// // //     color: "#666",
// // //     textAlign: "center",
// // //     marginBottom: 20,
// // //   },
// // //   setupButton: {
// // //     backgroundColor: "transparent",
// // //     borderWidth: 2,
// // //     borderColor: "#666",
// // //     paddingVertical: 15,
// // //     paddingHorizontal: 30,
// // //     borderRadius: 12,
// // //   },
// // //   setupButtonText: {
// // //     color: "#666",
// // //     fontSize: 18,
// // //     fontWeight: "bold",
// // //   },
// // //   chatButton: {
// // //     position: "absolute",
// // //     bottom: 24,
// // //     right: 24,
// // //     backgroundColor: "#4CAF50",
// // //     borderRadius: 30,
// // //     width: 60,
// // //     height: 60,
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     elevation: 5,
// // //     shadowColor: "#000",
// // //     shadowOffset: { width: 0, height: 2 },
// // //     shadowOpacity: 0.3,
// // //     shadowRadius: 4,
// // //   },
// // //   chatIcon: {
// // //     width: 30,
// // //     height: 30,
// // //     tintColor: "#FFF",
// // //   },
// // // });


// // import { useMealPlan } from "@/components/MealPlanContext";
// // import { Ionicons } from "@expo/vector-icons";
// // import React, { useState, useEffect } from "react";
// // import {
// //   Dimensions,
// //   Image,
// //   ScrollView,
// //   StyleSheet,
// //   Text,
// //   TouchableOpacity,
// //   View,
// // } from "react-native";
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import ChatScreen from "../../components/ChatScreen";
// // import StorageService from "@/services/StorageService";

// // const { width } = Dimensions.get("window");

// // // ✅ MOTIVATIONAL QUOTES
// // const motivationalQuotes = [
// //   "Small steps every day lead to big results.",
// //   "Your health is your wealth.",
// //   "One healthy meal at a time.",
// //   "Fuel your body, feed your soul.",
// //   "Progress, not perfection.",
// //   "Every bite counts.",
// //   "Strong body, strong mind.",
// //   "Nourish to flourish.",
// //   "Health is the greatest investment.",
// //   "You are what you eat.",
// //   "Consistency beats perfection.",
// //   "Transform your plate, transform your life.",
// //   "Eat well, feel well, be well.",
// // ];

// // const HomeScreen = ({ onNavigate }: { onNavigate?: (tab: string) => void }) => {
// //   const [selectedView, setSelectedView] = useState("Daily");
// //   const [expandedMealId, setExpandedMealId] = useState<string | null>(null);
// //   const [isChatModalVisible, setIsChatModalVisible] = useState(false);
// //   const [currentDate, setCurrentDate] = useState(new Date());
// //   const [dailyQuote, setDailyQuote] = useState("");
  
// //   const { meals, nutritionalData, getTotalNutrition, personalInfo, toggleMealConsumed } = useMealPlan();
// //   const totalNutrition = getTotalNutrition();
// //   const storage = StorageService;

// //   // ✅ DYNAMIC DATE AND DAILY QUOTE
// //   useEffect(() => {
// //     const updateDateAndQuote = async () => {
// //       const now = new Date();
// //       setCurrentDate(now);
      
// //       try {
// //         const today = now.toDateString();
// //         const storedDate = await storage.getQuoteDate();
// //         const storedQuote = await storage.getDailyQuote();
        
// //         if (today !== storedDate) {
// //           // New day - pick new random quote
// //           const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
// //           setDailyQuote(randomQuote);
// //           await storage.saveDailyQuote(today, randomQuote);
// //         } else if (storedQuote) {
// //           // Use stored quote for today
// //           setDailyQuote(storedQuote);
// //         } else {
// //           // Fallback
// //           const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
// //           setDailyQuote(randomQuote);
// //           await storage.saveDailyQuote(today, randomQuote);
// //         }
// //       } catch (error) {
// //         console.log('Quote storage error, using fallback:', error);
// //         // Fallback to random quote
// //         const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
// //         setDailyQuote(randomQuote);
// //       }
// //     };

// //     updateDateAndQuote();
    
// //     // Update date every minute
// //     const interval = setInterval(() => {
// //       setCurrentDate(new Date());
// //     }, 60000); // 1 minute

// //     return () => clearInterval(interval);
// //   }, []);

// //   // ✅ DYNAMIC GREETING BASED ON TIME
// //   const getGreeting = () => {
// //     const hour = currentDate.getHours();
// //     if (hour < 12) return "Good Morning";
// //     if (hour < 17) return "Good Afternoon";
// //     return "Good Evening";
// //   };

// //   // ✅ FORMATTED DATE
// //   const formattedDate = currentDate.toLocaleDateString('en-US', {
// //     weekday: 'long',
// //     year: 'numeric',
// //     month: 'long',
// //     day: 'numeric'
// //   });

// //   const MetricCard = ({
// //     icon,
// //     color,
// //     title,
// //     value,
// //     target,
// //   }: {
// //     icon: string;
// //     color: string;
// //     title: string;
// //     value: number;
// //     target: number;
// //   }) => {
// //     const percentage = target > 0 ? Math.min((value / target) * 100, 100) : 0;
// //     const isOverTarget = value > target;

// //     return (
// //       <View style={styles.metricCard}>
// //         <View style={[styles.metricIcon, { backgroundColor: color }]}>
// //           <Ionicons name={icon as any} size={20} color="white" />
// //         </View>
// //         <Text style={styles.metricTitle}>{title}:</Text>
// //         <Text style={styles.metricValue}>
// //           {value}/{target}
// //           {title === "Calorie" ? " kcal" : "g"}
// //         </Text>
// //         <View style={styles.progressBar}>
// //           <View
// //             style={[
// //               styles.progressFill,
// //               {
// //                 width: `${percentage}%`,
// //                 backgroundColor: isOverTarget ? "#FF5722" : "#4CAF50",
// //               },
// //             ]}
// //           />
// //         </View>
// //         <Text
// //           style={[
// //             styles.percentageText,
// //             { color: isOverTarget ? "#FF5722" : "#4CAF50" },
// //           ]}
// //         >
// //           {percentage.toFixed(0)}%
// //         </Text>
// //       </View>
// //     );
// //   };

// //   // ✅ FIXED: REAL MEAL STATUS LOGIC
// //   const MealCard = ({ meal }: { meal: any }) => {
// //     const getActionIcon = () => {
// //       if (!meal.hasFood || !meal.food) {
// //         return { name: 'add-circle-outline' as const, color: '#4CAF50' };
// //       }
// //       if (meal.consumed) {
// //         return { name: 'checkmark-circle' as const, color: '#4CAF50' };
// //       }
// //       return { name: 'checkbox-outline' as const, color: '#FF9800' };
// //     };

// //     const actionIcon = getActionIcon();
// //     const showFood = meal.hasFood && meal.food;
// //     const isEaten = showFood && meal.consumed;
// //     const isPending = showFood && !meal.consumed;

// //     const handleCardPress = () => {
// //       if (showFood) {
// //         toggleMealConsumed(meal.id);
// //       } else {
// //         onNavigate?.("meals");
// //       }
// //     };

// //     return (
// //       <TouchableOpacity
// //         style={[
// //           styles.mealCard,
// //           isEaten && styles.mealCardCompleted,
// //           isPending && styles.mealCardPending
// //         ]}
// //         onPress={handleCardPress}
// //         activeOpacity={0.7}
// //       >
// //         <View style={styles.mealHeader}>
// //           <View style={styles.mealInfo}>
// //             <Text style={[
// //               styles.mealTitle,
// //               isEaten && styles.mealTitleCompleted,
// //               isPending && styles.mealTitlePending
// //             ]}>
// //               {meal.title}
// //             </Text>
// //             <Text style={styles.mealTime}>({meal.time})</Text>
// //           </View>
// //           <Ionicons name={actionIcon.name} size={20} color={actionIcon.color} />
// //         </View>
        
// //         {showFood ? (
// //           <View>
// //             <Text style={[
// //               styles.mealFood,
// //               isEaten && styles.mealFoodCompleted,
// //               isPending && styles.mealFoodPending
// //             ]}>
// //               {meal.food.name}
// //               {isEaten && ' ✓'}
// //             </Text>
// //             {expandedMealId === meal.id && meal.food.ingredients && (
// //               <View style={styles.ingredientsInfo}>
// //                 <Text style={styles.ingredientsTitle}>Main Ingredients:</Text>
// //                 {meal.food.ingredients.map((ingredient: any, index: number) => (
// //                   <Text key={index} style={styles.ingredientText}>
// //                     • {ingredient.name}: {ingredient.weight}
// //                   </Text>
// //                 ))}
// //               </View>
// //             )}
// //           </View>
// //         ) : (
// //           <Text style={styles.mealCardEmpty}>Tap to add meal</Text>
// //         )}
// //       </TouchableOpacity>
// //     );
// //   };

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <ScrollView showsVerticalScrollIndicator={false}>
// //         <View style={styles.header}>
// //           <View style={styles.dateContainer}>
// //             {/* ✅ DOWN ARROW REMOVED */}
// //             <Ionicons name="time-outline" size={16} color="#666" />
// //             <Text style={styles.dateText}>{formattedDate}</Text>
// //           </View>
// //           <TouchableOpacity>
// //             <Ionicons name="person-outline" size={24} color="#333" />
// //           </TouchableOpacity>
// //         </View>

// //         <View style={styles.greetingContainer}>
// //           <Text style={styles.greetingText}>{getGreeting()},</Text>
// //           <Text style={styles.quoteText}>{dailyQuote}</Text>
// //         </View>

// //         <View style={styles.metricsContainer}>
// //           {personalInfo ? (
// //             <>
// //               <MetricCard
// //                 icon="flame"
// //                 color="#FFC107"
// //                 title="Calorie"
// //                 value={totalNutrition.calories}
// //                 target={nutritionalData.calories}
// //               />
// //               <MetricCard
// //                 icon="water"
// //                 color="#2196F3"
// //                 title="Protein"
// //                 value={totalNutrition.protein}
// //                 target={nutritionalData.protein}
// //               />
// //               <MetricCard
// //                 icon="leaf"
// //                 color="#4CAF50"
// //                 title="Carbs"
// //                 value={totalNutrition.carbs}
// //                 target={nutritionalData.carbs}
// //               />
// //             </>
// //           ) : (
// //             <View style={styles.setupPrompt}>
// //               <Ionicons name="person-add" size={48} color="#999" />
// //               <Text style={styles.setupPromptTitle}>Complete Your Profile</Text>
// //               <Text style={styles.setupPromptText}>
// //                 Set up your personal information to get personalized nutrition
// //                 targets and AI recommendations.
// //               </Text>
// //               <TouchableOpacity
// //                 style={styles.setupButton}
// //                 onPress={() => onNavigate?.("meals")}
// //               >
// //                 <Text style={styles.setupButtonText}>Go to Meals & Setup</Text>
// //               </TouchableOpacity>
// //             </View>
// //           )}
// //         </View>

// //         <View style={styles.toggleContainer}>
// //   <TouchableOpacity
// //     style={[
// //       styles.toggleButton,
// //       selectedView === "Daily" && styles.toggleButtonActive,
// //     ]}
// //     onPress={() => setSelectedView("Daily")}
// //   >
// //     <Ionicons name="today" size={16} color={selectedView === "Daily" ? "#333" : "#999"} />
// //     <Text style={[styles.toggleText, selectedView === "Daily" && styles.toggleTextActive]}>
// //       Daily
// //     </Text>
// //   </TouchableOpacity>
// //   <TouchableOpacity
// //     style={[
// //       styles.toggleButton,
// //       selectedView === "Weekly" && styles.toggleButtonActive,
// //     ]}
// //     onPress={() => onNavigate?.("weekly")} // ✅ Navigate to Weekly
// //   >
// //     <Ionicons name="calendar-outline" size={16} color={selectedView === "Weekly" ? "#333" : "#999"} />
// //     <Text style={[styles.toggleText, selectedView === "Weekly" && styles.toggleTextActive]}>
// //       Weekly
// //     </Text>
// //   </TouchableOpacity>
// // </View>

// //         <View style={styles.mealsContainer}>
// //           <View style={styles.mealRow}>
// //             {meals.slice(0, 2).map((meal) => (
// //               <MealCard key={meal.id} meal={meal} />
// //             ))}
// //           </View>
// //           <View style={styles.mealRow}>
// //             {meals.slice(2, 4).map((meal) => (
// //               <MealCard key={meal.id} meal={meal} />
// //             ))}
// //           </View>
// //         </View>
// //       </ScrollView>

// //       <TouchableOpacity
// //         style={styles.chatButton}
// //         onPress={() => setIsChatModalVisible(true)}
// //         accessibilityLabel="Open Diet Assistant"
// //       >
// //         <Image
// //           source={require("../../assets/images/chat_logo.svg")}
// //           style={styles.chatIcon}
// //         />
// //       </TouchableOpacity>

// //       <ChatScreen
// //         visible={isChatModalVisible}
// //         onClose={() => setIsChatModalVisible(false)}
// //         onNavigate={onNavigate}
// //       />
// //     </SafeAreaView>
// //   );
// // };

// // export default HomeScreen;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#e8f1eaff",
// //   },
// //   header: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     paddingHorizontal: 24,
// //     paddingTop: 16,
// //     paddingBottom: 24,
// //   },
// //   dateContainer: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     gap: 10,
// //   },
// //   dateText: {
// //     fontSize: 16,
// //     color: "#666",
// //   },
// //   greetingContainer: {
// //     paddingHorizontal: 24,
// //     marginBottom: 36,
// //   },
// //   greetingText: {
// //     fontSize: 26,
// //     color: "#999",
// //     fontWeight: "300",
// //   },
// //   quoteText: {
// //     fontSize: 32,
// //     color: "#333",
// //     fontWeight: "bold",
// //     marginTop: 8,
// //     lineHeight: 38,
// //   },
// //   metricsContainer: {
// //     flexDirection: "row",
// //     paddingHorizontal: 24,
// //     gap: 16,
// //     marginBottom: 36,
// //   },
// //   metricCard: {
// //     flex: 1,
// //     backgroundColor: "white",
// //     borderRadius: 20,
// //     padding: 20,
// //     alignItems: "center",
// //     minHeight: 120,
// //   },
// //   metricIcon: {
// //     width: 48,
// //     height: 48,
// //     borderRadius: 24,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     marginBottom: 12,
// //   },
// //   metricTitle: {
// //     fontSize: 14,
// //     color: "#666",
// //     marginBottom: 6,
// //   },
// //   metricValue: {
// //     fontSize: 14,
// //     color: "#333",
// //     fontWeight: "600",
// //   },
// //   progressBar: {
// //     width: "100%",
// //     height: 8,
// //     backgroundColor: "#e0e0e0",
// //     borderRadius: 4,
// //     marginTop: 10,
// //     marginBottom: 10,
// //   },
// //   progressFill: {
// //     height: "100%",
// //     borderRadius: 4,
// //   },
// //   percentageText: {
// //     fontSize: 14,
// //     fontWeight: "600",
// //   },
// //   toggleContainer: {
// //     flexDirection: "row",
// //     paddingHorizontal: 24,
// //     marginBottom: 24,
// //     backgroundColor: "white",
// //     marginHorizontal: 24,
// //     borderRadius: 16,
// //     padding: 6,
// //   },
// //   toggleButton: {
// //     flex: 1,
// //     flexDirection: "row",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     paddingVertical: 16,
// //     borderRadius: 12,
// //     gap: 8,
// //   },
// //   toggleButtonActive: {
// //     backgroundColor: "#e8f1eaff",
// //   },
// //   toggleText: {
// //     fontSize: 16,
// //     color: "#999",
// //   },
// //   toggleTextActive: {
// //     color: "#333",
// //     fontWeight: "600",
// //   },
// //   mealsContainer: {
// //     paddingHorizontal: 24,
// //     gap: 16,
// //     paddingBottom: 80,
// //   },
// //   mealRow: {
// //     flexDirection: "row",
// //     gap: 16,
// //   },
// //   mealCard: {
// //     flex: 1,
// //     backgroundColor: "white",
// //     borderRadius: 20,
// //     padding: 20,
// //     minHeight: 120,
// //   },
// //   mealCardCompleted: {
// //     backgroundColor: '#E8F5E8',
// //     borderWidth: 2,
// //     borderColor: '#4CAF50',
// //   },
// //   mealCardPending: {
// //     backgroundColor: '#FFF3E0',
// //     borderWidth: 2,
// //     borderColor: '#FF9800',
// //   },
// //   mealHeader: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "flex-start",
// //     marginBottom: 12,
// //   },
// //   mealInfo: {
// //     flex: 1,
// //   },
// //   mealTitle: {
// //     fontSize: 18,
// //     fontWeight: "bold",
// //     color: "#333",
// //   },
// //   mealTitleCompleted: {
// //     color: '#2E7D32',
// //   },
// //   mealTitlePending: {
// //     color: '#F57C00',
// //   },
// //   mealTime: {
// //     fontSize: 14,
// //     color: "#666",
// //     marginTop: 4,
// //   },
// //   mealFood: {
// //     fontSize: 16,
// //     color: "#666",
// //     marginTop: 12,
// //   },
// //   mealFoodCompleted: {
// //     color: '#4CAF50',
// //     fontWeight: '600',
// //   },
// //   mealFoodPending: {
// //     color: '#FF9800',
// //     fontWeight: '500',
// //   },
// //   mealCardEmpty: {
// //     fontSize: 14,
// //     color: '#999',
// //     textAlign: 'center',
// //     marginTop: 20,
// //   },
// //   ingredientsInfo: {
// //     marginTop: 12,
// //   },
// //   ingredientsTitle: {
// //     fontSize: 14,
// //     fontWeight: "600",
// //     color: "#333",
// //     marginBottom: 4,
// //   },
// //   ingredientText: {
// //     fontSize: 12,
// //     color: "#666",
// //   },
// //   setupPrompt: {
// //     alignItems: "center",
// //     padding: 20,
// //     backgroundColor: "#e8f1eaff",
// //     borderRadius: 20,
// //     marginTop: 20,
// //   },
// //   setupPromptTitle: {
// //     fontSize: 20,
// //     fontWeight: "bold",
// //     color: "#333",
// //     marginTop: 15,
// //     marginBottom: 10,
// //   },
// //   setupPromptText: {
// //     fontSize: 16,
// //     color: "#666",
// //     textAlign: "center",
// //     marginBottom: 20,
// //   },
// //   setupButton: {
// //     backgroundColor: "transparent",
// //     borderWidth: 2,
// //     borderColor: "#666",
// //     paddingVertical: 15,
// //     paddingHorizontal: 30,
// //     borderRadius: 12,
// //   },
// //   setupButtonText: {
// //     color: "#666",
// //     fontSize: 18,
// //     fontWeight: "bold",
// //   },
// //   chatButton: {
// //     position: "absolute",
// //     bottom: 24,
// //     right: 24,
// //     backgroundColor: "#4CAF50",
// //     borderRadius: 30,
// //     width: 60,
// //     height: 60,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     elevation: 5,
// //     shadowColor: "#000",
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.3,
// //     shadowRadius: 4,
// //   },
// //   chatIcon: {
// //     width: 30,
// //     height: 30,
// //     tintColor: "#FFF",
// //   },
// // });


// import { useMealPlan } from "@/components/MealPlanContext";
// import { Ionicons } from "@expo/vector-icons";
// import React, { useState, useEffect } from "react";
// import {
//   Dimensions,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { SafeAreaView } from 'react-native-safe-area-context';
// import ChatScreen from "../../components/ChatScreen";
// import StorageService from "@/services/StorageService";

// const { width } = Dimensions.get("window");

// // ✅ MOTIVATIONAL QUOTES
// const motivationalQuotes = [
//   "Small steps every day lead to big results.",
//   "Your health is your wealth.",
//   "One healthy meal at a time.",
//   "Fuel your body, feed your soul.",
//   "Progress, not perfection.",
//   "Every bite counts.",
//   "Strong body, strong mind.",
//   "Nourish to flourish.",
//   "Health is the greatest investment.",
//   "You are what you eat.",
//   "Consistency beats perfection.",
//   "Transform your plate, transform your life.",
//   "Eat well, feel well, be well.",
// ];

// interface HomeScreenProps {
//   onNavigate?: (tab: string) => void;
// }

// const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
//   const [expandedMealId, setExpandedMealId] = useState<string | null>(null);
//   const [isChatModalVisible, setIsChatModalVisible] = useState(false);
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [dailyQuote, setDailyQuote] = useState("");
  
//   const { meals, nutritionalData, getTotalNutrition, personalInfo, toggleMealConsumed } = useMealPlan();
//   const totalNutrition = getTotalNutrition();
//   const storage = StorageService;

//   // ✅ DYNAMIC DATE AND DAILY QUOTE
//   useEffect(() => {
//     const updateDateAndQuote = async () => {
//       const now = new Date();
//       setCurrentDate(now);
      
//       try {
//         const today = now.toDateString();
//         const storedDate = await storage.getQuoteDate();
//         const storedQuote = await storage.getDailyQuote();
        
//         if (today !== storedDate) {
//           const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
//           setDailyQuote(randomQuote);
//           await storage.saveDailyQuote(today, randomQuote);
//         } else if (storedQuote) {
//           setDailyQuote(storedQuote);
//         } else {
//           const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
//           setDailyQuote(randomQuote);
//           await storage.saveDailyQuote(today, randomQuote);
//         }
//       } catch (error) {
//         console.log('Quote storage error, using fallback:', error);
//         const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
//         setDailyQuote(randomQuote);
//       }
//     };

//     updateDateAndQuote();
    
//     const interval = setInterval(() => {
//       setCurrentDate(new Date());
//     }, 60000);

//     return () => clearInterval(interval);
//   }, []);

//   // ✅ DYNAMIC GREETING
//   const getGreeting = () => {
//     const hour = currentDate.getHours();
//     if (hour < 12) return "Good Morning";
//     if (hour < 17) return "Good Afternoon";
//     return "Good Evening";
//   };

//   const formattedDate = currentDate.toLocaleDateString('en-US', {
//     weekday: 'long',
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric'
//   });

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

//   const MealCard = ({ meal }: { meal: any }) => {
//     const getActionIcon = () => {
//       if (!meal.hasFood || !meal.food) {
//         return { name: 'add-circle-outline' as const, color: '#4CAF50' };
//       }
//       if (meal.consumed) {
//         return { name: 'checkmark-circle' as const, color: '#4CAF50' };
//       }
//       return { name: 'checkbox-outline' as const, color: '#FF9800' };
//     };

//     const actionIcon = getActionIcon();
//     const showFood = meal.hasFood && meal.food;
//     const isEaten = showFood && meal.consumed;
//     const isPending = showFood && !meal.consumed;

//     const handleCardPress = () => {
//       if (showFood) {
//         toggleMealConsumed(meal.id);
//       } else {
//         onNavigate?.("meals");
//       }
//     };

//     return (
//       <TouchableOpacity
//         style={[
//           styles.mealCard,
//           isEaten && styles.mealCardCompleted,
//           isPending && styles.mealCardPending
//         ]}
//         onPress={handleCardPress}
//         activeOpacity={0.7}
//       >
//         <View style={styles.mealHeader}>
//           <View style={styles.mealInfo}>
//             <Text style={[
//               styles.mealTitle,
//               isEaten && styles.mealTitleCompleted,
//               isPending && styles.mealTitlePending
//             ]}>
//               {meal.title}
//             </Text>
//             <Text style={styles.mealTime}>({meal.time})</Text>
//           </View>
//           <Ionicons name={actionIcon.name} size={20} color={actionIcon.color} />
//         </View>
        
//         {showFood ? (
//           <View>
//             <Text style={[
//               styles.mealFood,
//               isEaten && styles.mealFoodCompleted,
//               isPending && styles.mealFoodPending
//             ]}>
//               {meal.food.name}
//               {isEaten && ' ✓'}
//             </Text>
//             {expandedMealId === meal.id && meal.food.ingredients && (
//               <View style={styles.ingredientsInfo}>
//                 <Text style={styles.ingredientsTitle}>Main Ingredients:</Text>
//                 {meal.food.ingredients.map((ingredient: any, index: number) => (
//                   <Text key={index} style={styles.ingredientText}>
//                     • {ingredient.name}: {ingredient.weight}
//                   </Text>
//                 ))}
//               </View>
//             )}
//           </View>
//         ) : (
//           <Text style={styles.mealCardEmpty}>Tap to add meal</Text>
//         )}
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <View style={styles.header}>
//           <View style={styles.dateContainer}>
//             <Ionicons name="time-outline" size={16} color="#666" />
//             <Text style={styles.dateText}>{formattedDate}</Text>
//           </View>
//           <TouchableOpacity onPress={() => onNavigate?.('profile')}>
//             <Ionicons name="person-outline" size={24} color="#333" />
//           </TouchableOpacity>
//         </View>

//         <View style={styles.greetingContainer}>
//           <Text style={styles.greetingText}>{getGreeting()},</Text>
//           <Text style={styles.quoteText}>{dailyQuote}</Text>
//         </View>

//         <View style={styles.metricsContainer}>
//           {personalInfo ? (
//             <>
//               <MetricCard
//                 icon="flame"
//                 color="#FFC107"
//                 title="Calorie"
//                 value={totalNutrition.calories}
//                 target={nutritionalData.calories || 2000}
//               />
//               <MetricCard
//                 icon="water"
//                 color="#2196F3"
//                 title="Protein"
//                 value={totalNutrition.protein}
//                 target={nutritionalData.protein || 150}
//               />
//               <MetricCard
//                 icon="leaf"
//                 color="#4CAF50"
//                 title="Carbs"
//                 value={totalNutrition.carbs}
//                 target={nutritionalData.carbs || 250}
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
//                 onPress={() => onNavigate?.("profile")}
//               >
//                 <Text style={styles.setupButtonText}>Setup Profile</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         </View>

//         {/* ✅ NEW ACTION BUTTONS - DIRECT NAVIGATION */}
//         <View style={styles.actionButtonsContainer}>
//           <TouchableOpacity
//             style={styles.actionButton}
//             onPress={() => onNavigate?.("meals")}
//             activeOpacity={0.7}
//           >
//             <Ionicons name="add-circle-outline" size={24} color="#4CAF50" />
//             <Text style={styles.actionButtonText}>Add Meals</Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity
//             style={styles.actionButton}
//             onPress={() => onNavigate?.("weekly")} // ✅ WORKS NOW!
//             activeOpacity={0.7}
//           >
//             <Ionicons name="calendar-outline" size={24} color="#2196F3" />
//             <Text style={styles.actionButtonText}>Weekly Progress</Text>
//           </TouchableOpacity>
//         </View>

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

//       <TouchableOpacity
//         style={styles.chatButton}
//         onPress={() => setIsChatModalVisible(true)}
//         accessibilityLabel="Open Diet Assistant"
//       >
//         <Image
//           source={require("../../assets/images/chat_logo.svg")}
//           style={styles.chatIcon}
//         />
//       </TouchableOpacity>

//       {/* <ChatScreen
//         visible={isChatModalVisible}
//         onClose={() => setIsChatModalVisible(false)}
//         onNavigate={onNavigate}
//       /> */}
//       <ChatScreen
//   visible={isChatModalVisible}
//   onClose={() => setIsChatModalVisible(false)}
//   onNavigate={onNavigate}
//   nutritionalData={nutritionalData}
//   totalNutrition={totalNutrition}
//   personalInfo={personalInfo}
// />
//     </SafeAreaView>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#e8f1eaff",
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
//   quoteText: {
//     fontSize: 32,
//     color: "#333",
//     fontWeight: "bold",
//     marginTop: 8,
//     lineHeight: 38,
//   },
//   metricsContainer: {
//     flexDirection: "row",
//     paddingHorizontal: 24,
//     gap: 16,
//     marginBottom: 24,
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
//   // ✅ NEW ACTION BUTTONS STYLES
//   actionButtonsContainer: {
//     flexDirection: "row",
//     paddingHorizontal: 24,
//     gap: 16,
//     marginBottom: 24,
//   },
//   actionButton: {
//     flex: 1,
//     backgroundColor: "white",
//     borderRadius: 16,
//     paddingVertical: 20,
//     paddingHorizontal: 16,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   actionButtonText: {
//     fontSize: 14,
//     color: "#666",
//     marginTop: 8,
//     fontWeight: "500",
//   },
//   mealsContainer: {
//     paddingHorizontal: 24,
//     gap: 16,
//     paddingBottom: 120, // Extra space for buttons
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
//   mealCardCompleted: {
//     backgroundColor: '#E8F5E8',
//     borderWidth: 2,
//     borderColor: '#4CAF50',
//   },
//   mealCardPending: {
//     backgroundColor: '#FFF3E0',
//     borderWidth: 2,
//     borderColor: '#FF9800',
//   },
//   mealHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     marginBottom: 12,
//   },
//   mealInfo: {
//     flex: 1,
//   },
//   mealTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   mealTitleCompleted: {
//     color: '#2E7D32',
//   },
//   mealTitlePending: {
//     color: '#F57C00',
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
//   mealFoodCompleted: {
//     color: '#4CAF50',
//     fontWeight: '600',
//   },
//   mealFoodPending: {
//     color: '#FF9800',
//     fontWeight: '500',
//   },
//   mealCardEmpty: {
//     fontSize: 14,
//     color: '#999',
//     textAlign: 'center',
//     marginTop: 20,
//   },
//   ingredientsInfo: {
//     marginTop: 12,
//   },
//   ingredientsTitle: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#333",
//     marginBottom: 4,
//   },
//   ingredientText: {
//     fontSize: 12,
//     color: "#666",
//   },
//   setupPrompt: {
//     alignItems: "center",
//     padding: 20,
//     backgroundColor: "#e8f1eaff",
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
//     backgroundColor: "#4CAF50",
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 12,
//   },
//   setupButtonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   chatButton: {
//     position: "absolute",
//     bottom: 90, // Above bottom nav
//     right: 24,
//     backgroundColor: "#4CAF50",
//     borderRadius: 30,
//     width: 60,
//     height: 60,
//     justifyContent: "center",
//     alignItems: "center",
//     elevation: 5,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//   },
//   chatIcon: {
//     width: 30,
//     height: 30,
//     tintColor: "#FFF",
//   },
// });


import { useMealPlan } from "@/components/MealPlanContext";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import ChatScreen from "../../components/ChatScreen";
import StorageService from "@/services/StorageService";

const { width } = Dimensions.get("window");

// ✅ MOTIVATIONAL QUOTES
const motivationalQuotes = [
  "Small steps every day lead to big results.",
  "Your health is your wealth.",
  "One healthy meal at a time.",
  "Fuel your body, feed your soul.",
  "Progress, not perfection.",
  "Every bite counts.",
  "Strong body, strong mind.",
  "Nourish to flourish.",
  "Health is the greatest investment.",
  "You are what you eat.",
  "Consistency beats perfection.",
  "Transform your plate, transform your life.",
  "Eat well, feel well, be well.",
];

interface HomeScreenProps {
  onNavigate?: (tab: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const [expandedMealId, setExpandedMealId] = useState<string | null>(null);
  const [isChatModalVisible, setIsChatModalVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dailyQuote, setDailyQuote] = useState("");
  
  const { meals, nutritionalData, getTotalNutrition, personalInfo, toggleMealConsumed } = useMealPlan();
  const totalNutrition = getTotalNutrition();
  const storage = StorageService;

  // ✅ DYNAMIC DATE AND DAILY QUOTE
  useEffect(() => {
    const updateDateAndQuote = async () => {
      const now = new Date();
      setCurrentDate(now);
      
      try {
        const today = now.toDateString();
        const storedDate = await storage.getQuoteDate();
        const storedQuote = await storage.getDailyQuote();
        
        if (today !== storedDate) {
          const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
          setDailyQuote(randomQuote);
          await storage.saveDailyQuote(today, randomQuote);
        } else if (storedQuote) {
          setDailyQuote(storedQuote);
        } else {
          const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
          setDailyQuote(randomQuote);
          await storage.saveDailyQuote(today, randomQuote);
        }
      } catch (error) {
        console.log('Quote storage error, using fallback:', error);
        const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
        setDailyQuote(randomQuote);
      }
    };

    updateDateAndQuote();
    
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // ✅ DYNAMIC GREETING
  const getGreeting = () => {
    const hour = currentDate.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

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

  const MealCard = ({ meal }: { meal: any }) => {
    const getActionIcon = () => {
      if (!meal.hasFood || !meal.food) {
        return { name: 'add-circle-outline' as const, color: '#4CAF50' };
      }
      if (meal.consumed) {
        return { name: 'checkmark-circle' as const, color: '#4CAF50' };
      }
      return { name: 'square-outline' as const, color: '#FF9800' };
    };

    const actionIcon = getActionIcon();
    const showFood = meal.hasFood && meal.food;
    const isEaten = showFood && meal.consumed;
    const isPending = showFood && !meal.consumed;

    const handleCardPress = () => {
      if (!meal.hasFood || !meal.food) {
        onNavigate?.("meals");
      } else {
        setExpandedMealId(expandedMealId === meal.id ? null : meal.id);
      }
    };

    const handleIconPress = () => {
      if (meal.hasFood && meal.food) {
        toggleMealConsumed(meal.id);
      } else {
        onNavigate?.("meals");
      }
    };

    return (
      <TouchableOpacity
        style={[
          styles.mealCard,
          isEaten && styles.mealCardCompleted,
          isPending && styles.mealCardPending
        ]}
        onPress={handleCardPress}
        activeOpacity={0.7}
      >
        <View style={styles.mealHeader}>
          <View style={styles.mealInfo}>
            <Text style={[
              styles.mealTitle,
              isEaten && styles.mealTitleCompleted,
              isPending && styles.mealTitlePending
            ]}>
              {meal.title}
            </Text>
            <Text style={styles.mealTime}>({meal.time})</Text>
          </View>
          <TouchableOpacity onPress={handleIconPress}>
            <Ionicons name={actionIcon.name} size={20} color={actionIcon.color} />
          </TouchableOpacity>
        </View>
        
        {showFood ? (
          <View>
            <Text style={[
              styles.mealFood,
              isEaten && styles.mealFoodCompleted,
              isPending && styles.mealFoodPending
            ]}>
              {meal.food.name}
              {isEaten && ' ✓'}
            </Text>
            {expandedMealId === meal.id && meal.food.ingredients && (
              <View style={styles.ingredientsInfo}>
                <Text style={styles.ingredientsTitle}>Main Ingredients:</Text>
                {meal.food.ingredients.map((ingredient: any, index: number) => (
                  <Text key={index} style={styles.ingredientText}>
                    • {ingredient.name}: {ingredient.weight}
                  </Text>
                ))}
              </View>
            )}
          </View>
        ) : (
          <Text style={styles.mealCardEmpty}>Tap to add meal</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.dateContainer}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={styles.dateText}>{formattedDate}</Text>
          </View>
          <TouchableOpacity onPress={() => onNavigate?.('profile')}>
            <Ionicons name="person-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>{getGreeting()},</Text>
          <Text style={styles.quoteText}>{dailyQuote}</Text>
        </View>

        <View style={styles.metricsContainer}>
          {personalInfo ? (
            <>
              <MetricCard
                icon="flame"
                color="#FFC107"
                title="Calorie"
                value={totalNutrition.calories}
                target={nutritionalData.calories || 2000}
              />
              <MetricCard
                icon="water"
                color="#2196F3"
                title="Protein"
                value={totalNutrition.protein}
                target={nutritionalData.protein || 150}
              />
              <MetricCard
                icon="leaf"
                color="#4CAF50"
                title="Carbs"
                value={totalNutrition.carbs}
                target={nutritionalData.carbs || 250}
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
                onPress={() => onNavigate?.("profile")}
              >
                <Text style={styles.setupButtonText}>Setup Profile</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* ✅ NEW ACTION BUTTONS - DIRECT NAVIGATION */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onNavigate?.("meals")}
            activeOpacity={0.7}
          >
            <Ionicons name="add-circle-outline" size={24} color="#4CAF50" />
            <Text style={styles.actionButtonText}>Add Meals</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onNavigate?.("weekly")}
            activeOpacity={0.7}
          >
            <Ionicons name="calendar-outline" size={24} color="#2196F3" />
            <Text style={styles.actionButtonText}>Weekly Progress</Text>
          </TouchableOpacity>
        </View>

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

      <TouchableOpacity
        style={styles.chatButton}
        onPress={() => setIsChatModalVisible(true)}
        accessibilityLabel="Open Diet Assistant"
      >
        <Image
          source={require("../../assets/images/chat_logo.svg")}
          style={styles.chatIcon}
        />
      </TouchableOpacity>

      <ChatScreen
        visible={isChatModalVisible}
        onClose={() => setIsChatModalVisible(false)}
        onNavigate={onNavigate}
        nutritionalData={nutritionalData}
        totalNutrition={totalNutrition}
        personalInfo={personalInfo}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8f1eaff",
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
  quoteText: {
    fontSize: 32,
    color: "#333",
    fontWeight: "bold",
    marginTop: 8,
    lineHeight: 38,
  },
  metricsContainer: {
    flexDirection: "row",
    paddingHorizontal: 24,
    gap: 16,
    marginBottom: 24,
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
  actionButtonsContainer: {
    flexDirection: "row",
    paddingHorizontal: 24,
    gap: 16,
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  actionButtonText: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
    fontWeight: "500",
  },
  mealsContainer: {
    paddingHorizontal: 24,
    gap: 16,
    paddingBottom: 120,
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
  mealCardCompleted: {
    backgroundColor: '#E8F5E8',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  mealCardPending: {
    backgroundColor: '#FFF3E0',
    borderWidth: 2,
    borderColor: '#FF9800',
  },
  mealHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  mealInfo: {
    flex: 1,
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  mealTitleCompleted: {
    color: '#2E7D32',
  },
  mealTitlePending: {
    color: '#F57C00',
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
  mealFoodCompleted: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  mealFoodPending: {
    color: '#FF9800',
    fontWeight: '500',
  },
  mealCardEmpty: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
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
    backgroundColor: "#e8f1eaff",
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
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  setupButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  chatButton: {
    position: "absolute",
    bottom: 90,
    right: 24,
    backgroundColor: "#4CAF50",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  chatIcon: {
    width: 30,
    height: 30,
    tintColor: "#FFF",
  },
});