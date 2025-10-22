// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   FlatList,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   Dimensions,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import StorageService from '@/services/StorageService';
// import { useMealPlan } from '@/components/MealPlanContext';

// const { width } = Dimensions.get('window');
// const WEEK_CARD_WIDTH = width * 0.9;

// interface DayData {
//   date: string;
//   dateObj: Date;
//   mealsHad: number;
//   mealsTotal: number;
//   successRate: number;
//   meals: any[];
// }

// interface WeekData {
//   weekNumber: number;
//   startDate: Date;
//   days: DayData[];
//   totalMealsHad: number;
//   totalMealsPossible: number;
//   weekSuccessRate: number;
// }

// const WeeklyScreen = ({ onNavigate }: { onNavigate?: (tab: string) => void }) => {
//   const [weeks, setWeeks] = useState<WeekData[]>([]);
//   const [selectedWeek, setSelectedWeek] = useState<WeekData | null>(null);
//   const [selectedDay, setSelectedDay] = useState<DayData | null>(null);
//   const [viewMode, setViewMode] = useState<'weeks' | 'weekDays' | 'dayDetails'>('weeks');

//   const { meals } = useMealPlan();
//   const storage = StorageService;

//   // ✅ FETCH ALL HISTORICAL DATA
//   const loadWeeklyData = useCallback(async () => {
//     try {
//       const allMealsHistory = await storage.getMealsHistory?.() || [];
//       const weeksData: WeekData[] = [];

//       // Group by weeks (Monday start)
//       const today = new Date();
//       const weeksBack = 12; // 3 months

//       for (let weekOffset = weeksBack - 1; weekOffset >= 0; weekOffset--) {
//         const weekStart = new Date(today);
//         weekStart.setDate(today.getDate() - (today.getDay() === 0 ? 6 : today.getDay() - 1));
//         weekStart.setDate(weekStart.getDate() - (weekOffset * 7));

//         const weekDays: DayData[] = [];
//         let totalHad = 0;
//         let totalPossible = 0;

//         for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
//           const dayDate = new Date(weekStart);
//           dayDate.setDate(weekStart.getDate() + dayOffset);
//           const dateKey = dayDate.toISOString().split('T')[0];

//           // Filter meals for this day
//           const dayMeals = allMealsHistory.filter((history: any) => 
//             history.date === dateKey
//           );

//           const mealsHad = dayMeals.filter((m: any) => m.consumed).length;
//           const mealsTotal = dayMeals.length;

//           const day: DayData = {
//             date: dateKey,
//             dateObj: new Date(dayDate),
//             mealsHad,
//             mealsTotal,
//             successRate: mealsTotal > 0 ? (mealsHad / mealsTotal) * 100 : 0,
//             meals: dayMeals,
//           };

//           weekDays.push(day);
//           totalHad += mealsHad;
//           totalPossible += mealsTotal;
//         }

//         const weekSuccessRate = totalPossible > 0 ? (totalHad / totalPossible) * 100 : 0;

//         weeksData.push({
//           weekNumber: weeksBack - weekOffset,
//           startDate: new Date(weekStart),
//           days: weekDays,
//           totalMealsHad: totalHad,
//           totalMealsPossible: totalPossible,
//           weekSuccessRate,
//         });
//       }

//       setWeeks(weeksData);
//     } catch (error) {
//       console.error('Error loading weekly data:', error);
//       setWeeks([]);
//     }
//   }, []);

//   useEffect(() => {
//     loadWeeklyData();
//   }, []);

//   const getSuccessColor = (percentage: number) => {
//     if (percentage >= 90) return '#4CAF50'; // Green
//     if (percentage >= 70) return '#FFC107'; // Yellow
//     return '#FF5722'; // Red
//   };

//   const getSuccessEmoji = (percentage: number) => {
//     if (percentage >= 90) return '🥇';
//     if (percentage >= 70) return '🥉';
//     return '📉';
//   };

//   const renderWeekCard = ({ item }: { item: WeekData }) => (
//     <TouchableOpacity
//       style={[
//         styles.weekCard,
//         { borderLeftColor: getSuccessColor(item.weekSuccessRate) }
//       ]}
//       onPress={() => {
//         setSelectedWeek(item);
//         setViewMode('weekDays');
//       }}
//     >
//       <View style={styles.weekHeader}>
//         <Text style={styles.weekNumber}>Week {item.weekNumber}</Text>
//         <Text style={styles.weekDate}>
//           {item.startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - 
//           {new Date(item.startDate.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//         </Text>
//       </View>
      
//       <View style={styles.weekStats}>
//         <View style={styles.weekSuccess}>
//           <Text style={[styles.weekSuccessRate, { color: getSuccessColor(item.weekSuccessRate) }]}>
//             {item.weekSuccessRate.toFixed(0)}%
//           </Text>
//           <Text style={styles.weekSuccessLabel}>Success</Text>
//         </View>
//         <View style={styles.weekMeals}>
//           <Text style={styles.weekMealsText}>
//             {item.totalMealsHad}/{item.totalMealsPossible} meals
//           </Text>
//         </View>
//       </View>

//       <View style={[styles.weekStatusBadge, { backgroundColor: getSuccessColor(item.weekSuccessRate) + '20' }]}>
//         <Text style={styles.weekStatusText}>
//           {getSuccessEmoji(item.weekSuccessRate)} {item.weekSuccessRate.toFixed(0)}% completed
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );

//   const renderDayCard = ({ item }: { item: DayData }) => (
//     <TouchableOpacity
//       style={[
//         styles.dayCard,
//         { borderLeftColor: getSuccessColor(item.successRate) }
//       ]}
//       onPress={() => {
//         setSelectedDay(item);
//         setViewMode('dayDetails');
//       }}
//     >
//       <View style={styles.dayHeader}>
//         <Text style={styles.dayName}>
//           {item.dateObj.toLocaleDateString('en-US', { weekday: 'short' })}
//         </Text>
//         <Text style={styles.dayDate}>
//           {item.dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//         </Text>
//       </View>
      
//       <View style={styles.dayStats}>
//         <View style={styles.daySuccess}>
//           <Text style={[styles.daySuccessRate, { color: getSuccessColor(item.successRate) }]}>
//             {item.successRate.toFixed(0)}%
//           </Text>
//           <Text style={styles.daySuccessLabel}>
//             {item.mealsHad}/{item.mealsTotal} meals
//           </Text>
//         </View>
//       </View>

//       <View style={[styles.dayStatusBadge, { backgroundColor: getSuccessColor(item.successRate) + '20' }]}>
//         <Text style={styles.dayStatusText}>
//           {getSuccessEmoji(item.successRate)} {item.mealsHad} meals eaten
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );

//   const renderMealDetail = ({ item }: { item: any }) => (
//     <View style={[
//       styles.mealDetailCard,
//       item.consumed && styles.mealDetailCompleted
//     ]}>
//       <View style={styles.mealDetailHeader}>
//         <Text style={styles.mealDetailTitle}>{item.title}</Text>
//         <Ionicons 
//           name={item.consumed ? "checkmark-circle" : "time-outline"} 
//           size={20} 
//           color={item.consumed ? "#4CAF50" : "#FF9800"} 
//         />
//       </View>
      
//       {item.food && (
//         <View style={styles.mealDetailContent}>
//           <Text style={styles.mealDetailFood}>{item.food.name}</Text>
//           <View style={styles.macroRow}>
//             <View style={styles.macroItem}>
//               <Text style={styles.macroLabel}>🔥</Text>
//               <Text style={styles.macroValue}>{item.food.calories}kcal</Text>
//             </View>
//             <View style={styles.macroItem}>
//               <Text style={styles.macroLabel}>💪</Text>
//               <Text style={styles.macroValue}>{item.food.protein}g</Text>
//             </View>
//             <View style={styles.macroItem}>
//               <Text style={styles.macroLabel}>🍞</Text>
//               <Text style={styles.macroValue}>{item.food.carbs}g</Text>
//             </View>
//             <View style={styles.macroItem}>
//               <Text style={styles.macroLabel}>🧈</Text>
//               <Text style={styles.macroValue}>{item.food.fat}g</Text>
//             </View>
//           </View>
          
//           {item.food.ingredients && item.food.ingredients.length > 0 && (
//             <View style={styles.ingredientsContainer}>
//               <Text style={styles.ingredientsTitle}>Ingredients:</Text>
//               {item.food.ingredients.map((ingredient: any, index: number) => (
//                 <View key={index} style={styles.ingredientItem}>
//                   <Text style={styles.ingredientName}>{ingredient.name}</Text>
//                   <Text style={styles.ingredientWeight}>{ingredient.weight}</Text>
//                 </View>
//               ))}
//             </View>
//           )}
//         </View>
//       )}
//     </View>
//   );

//   const renderBackButton = () => (
//     <TouchableOpacity
//       style={styles.backButton}
//       onPress={() => {
//         if (viewMode === 'dayDetails') {
//           setViewMode('weekDays');
//           setSelectedDay(null);
//         } else if (viewMode === 'weekDays') {
//           setViewMode('weeks');
//           setSelectedWeek(null);
//         }
//       }}
//     >
//       <Ionicons name="arrow-back" size={24} color="#4CAF50" />
//       <Text style={styles.backButtonText}>
//         {viewMode === 'dayDetails' ? 'Week Overview' : 
//          viewMode === 'weekDays' ? 'All Weeks' : 'Home'}
//       </Text>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>📊 Weekly Progress</Text>
//         <TouchableOpacity onPress={() => onNavigate?.('home')}>
//           <Ionicons name="home" size={24} color="#4CAF50" />
//         </TouchableOpacity>
//       </View>

//       {renderBackButton()}

//       {viewMode === 'weeks' && (
//         <FlatList
//           data={weeks}
//           renderItem={renderWeekCard}
//           keyExtractor={(item) => `week-${item.weekNumber}`}
//           contentContainerStyle={styles.listContainer}
//           showsVerticalScrollIndicator={false}
//         />
//       )}

//       {viewMode === 'weekDays' && selectedWeek && (
//         <View style={styles.weekDaysContainer}>
//           <View style={styles.weekSummary}>
//             <Text style={styles.weekSummaryTitle}>Week {selectedWeek.weekNumber}</Text>
//             <Text style={[styles.weekSummaryRate, { color: getSuccessColor(selectedWeek.weekSuccessRate) }]}>
//               {selectedWeek.weekSuccessRate.toFixed(0)}% Success
//             </Text>
//             <Text style={styles.weekSummaryMeals}>
//               {selectedWeek.totalMealsHad}/{selectedWeek.totalMealsPossible} meals completed
//             </Text>
//           </View>

//           <FlatList
//             data={selectedWeek.days}
//             renderItem={renderDayCard}
//             keyExtractor={(item) => item.date}
//             contentContainerStyle={styles.listContainer}
//             showsVerticalScrollIndicator={false}
//             numColumns={2}
//           />
//         </View>
//       )}

//       {viewMode === 'dayDetails' && selectedDay && (
//         <View style={styles.dayDetailsContainer}>
//           <View style={styles.daySummary}>
//             <Text style={styles.daySummaryDate}>
//               {selectedDay.dateObj.toLocaleDateString('en-US', {
//                 weekday: 'long',
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric'
//               })}
//             </Text>
//             <Text style={[styles.daySummaryRate, { color: getSuccessColor(selectedDay.successRate) }]}>
//               {selectedDay.successRate.toFixed(0)}% • {selectedDay.mealsHad}/{selectedDay.mealsTotal} meals
//             </Text>
//           </View>

//           <FlatList
//             data={selectedDay.meals}
//             renderItem={renderMealDetail}
//             keyExtractor={(item, index) => `${item.title}-${index}`}
//             contentContainerStyle={styles.listContainer}
//             showsVerticalScrollIndicator={false}
//           />
//         </View>
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f9fa',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 24,
//     paddingVertical: 16,
//     backgroundColor: 'white',
//     borderBottomWidth: 1,
//     borderBottomColor: '#e9ecef',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   backButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 24,
//     paddingVertical: 16,
//     backgroundColor: 'white',
//     marginBottom: 16,
//     gap: 12,
//   },
//   backButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#4CAF50',
//   },
//   listContainer: {
//     padding: 24,
//     paddingBottom: 100,
//   },
//   weekCard: {
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 20,
//     marginBottom: 16,
//     borderLeftWidth: 4,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   weekHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   weekNumber: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   weekDate: {
//     fontSize: 14,
//     color: '#666',
//   },
//   weekStats: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   weekSuccess: {
//     alignItems: 'center',
//   },
//   weekSuccessRate: {
//     fontSize: 32,
//     fontWeight: 'bold',
//   },
//   weekSuccessLabel: {
//     fontSize: 12,
//     color: '#666',
//     marginTop: 4,
//   },
//   weekMeals: {
//     alignItems: 'center',
//   },
//   weekMealsText: {
//     fontSize: 14,
//     color: '#666',
//   },
//   weekStatusBadge: {
//     padding: 12,
//     borderRadius: 12,
//     alignItems: 'center',
//   },
//   weekStatusText: {
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   dayCard: {
//     flex: 1,
//     backgroundColor: 'white',
//     borderRadius: 16,
//     padding: 16,
//     margin: 8,
//     borderLeftWidth: 4,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   dayHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   dayName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   dayDate: {
//     fontSize: 14,
//     color: '#666',
//   },
//   dayStats: {
//     alignItems: 'center',
//   },
//   daySuccess: {
//     alignItems: 'center',
//   },
//   daySuccessRate: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   daySuccessLabel: {
//     fontSize: 12,
//     color: '#666',
//     marginTop: 4,
//   },
//   dayStatusBadge: {
//     padding: 10,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 12,
//   },
//   dayStatusText: {
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   weekDaysContainer: {
//     flex: 1,
//   },
//   weekSummary: {
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 24,
//     alignItems: 'center',
//     marginBottom: 24,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   weekSummaryTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 8,
//   },
//   weekSummaryRate: {
//     fontSize: 28,
//     fontWeight: 'bold',
//   },
//   weekSummaryMeals: {
//     fontSize: 16,
//     color: '#666',
//     marginTop: 8,
//   },
//   dayDetailsContainer: {
//     flex: 1,
//   },
//   daySummary: {
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 24,
//     alignItems: 'center',
//     marginBottom: 24,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   daySummaryDate: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 8,
//     textAlign: 'center',
//   },
//   daySummaryRate: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   mealDetailCard: {
//     backgroundColor: 'white',
//     borderRadius: 16,
//     padding: 20,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   mealDetailCompleted: {
//     backgroundColor: '#E8F5E8',
//     borderLeftWidth: 4,
//     borderLeftColor: '#4CAF50',
//   },
//   mealDetailHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   mealDetailTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     flex: 1,
//   },
//   mealDetailContent: {
//     marginTop: 12,
//   },
//   mealDetailFood: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 16,
//   },
//   macroRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 16,
//     padding: 12,
//     backgroundColor: '#f8f9fa',
//     borderRadius: 12,
//   },
//   macroItem: {
//     alignItems: 'center',
//     flex: 1,
//   },
//   macroLabel: {
//     fontSize: 16,
//     marginBottom: 4,
//   },
//   macroValue: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#333',
//   },
//   ingredientsContainer: {
//     marginTop: 16,
//     padding: 12,
//     backgroundColor: '#f0f8ff',
//     borderRadius: 12,
//   },
//   ingredientsTitle: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 8,
//   },
//   ingredientItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 4,
//   },
//   ingredientName: {
//     fontSize: 14,
//     color: '#333',
//   },
//   ingredientWeight: {
//     fontSize: 14,
//     color: '#666',
//     fontWeight: '500',
//   },
// });

// export default WeeklyScreen;

import React, { useState, useEffect, useCallback } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import StorageService from '@/services/StorageService';
import { useMealPlan } from '@/components/MealPlanContext';

const { width } = Dimensions.get('window');

interface DayData {
  date: string;
  dateObj: Date;
  mealsHad: number;
  mealsTotal: number;
  successRate: number;
  meals: any[];
  hasData: boolean; // ✅ REAL DATA EXISTS?
}

interface WeekData {
  weekNumber: number;
  startDate: Date;
  days: DayData[];
  totalMealsHad: number;
  totalMealsPossible: number;
  weekSuccessRate: number;
}

const WeeklyScreen = ({ onNavigate }: { onNavigate?: (tab: string) => void }) => {
  const [weeks, setWeeks] = useState<WeekData[]>([]);
  const [selectedWeek, setSelectedWeek] = useState<WeekData | null>(null);
  const [selectedDay, setSelectedDay] = useState<DayData | null>(null);
  const [viewMode, setViewMode] = useState<'weeks' | 'weekDays' | 'dayDetails'>('weeks');

  const storage = StorageService;

  // ✅ LOAD ONLY REAL EXISTING DATA
  const loadWeeklyData = useCallback(async () => {
    try {
      // Get ALL real meal history
      const allMealsHistory = await storage.getMealsHistory();
      console.log('🍽️  TOTAL REAL HISTORY:', allMealsHistory.length, 'meals');
      console.log('📅 ALL DATES WITH DATA:', [...new Set(allMealsHistory.map((h: any) => h.date))]);

      if (allMealsHistory.length === 0) {
        setWeeks([]);
        return;
      }

      // Get unique dates with data (last 12 weeks max)
      const datesWithData = [...new Set(allMealsHistory.map((h: any) => h.date))]
        .map(date => ({ date, dateObj: new Date(date) }))
        .sort((a, b) => b.dateObj.getTime() - a.dateObj.getTime())
        .slice(0, 84); // 12 weeks * 7 days

      // Group into weeks
      const weeksData: WeekData[] = [];
      let currentWeek: DayData[] = [];
      let weekNumber = 1;

      datesWithData.forEach(({ date, dateObj }) => {
        const weekStart = new Date(dateObj);
        weekStart.setDate(dateObj.getDate() - (dateObj.getDay() === 0 ? 6 : dateObj.getDay() - 1));
        
        // New week
        if (currentWeek.length === 0 || 
            Math.abs(weekStart.getTime() - currentWeek[0]?.dateObj.getTime()) > 7 * 24 * 60 * 60 * 1000) {
          
          if (currentWeek.length > 0) {
            weeksData.push({
              weekNumber: weekNumber++,
              startDate: new Date(currentWeek[0].dateObj),
              days: currentWeek,
              totalMealsHad: currentWeek.reduce((sum, day) => sum + day.mealsHad, 0),
              totalMealsPossible: currentWeek.reduce((sum, day) => sum + day.mealsTotal, 0),
              weekSuccessRate: currentWeek.reduce((sum, day) => sum + day.mealsHad, 0) / 
                              Math.max(currentWeek.reduce((sum, day) => sum + day.mealsTotal, 0), 1) * 100,
            });
          }
          
          currentWeek = [];
        }

        // Get meals for this day
        const dayMeals = allMealsHistory.filter((history: any) => history.date === date);
        const mealsHad = dayMeals.filter((m: any) => m.consumed).length;
        const mealsTotal = dayMeals.length;

        currentWeek.push({
          date,
          dateObj: new Date(date),
          mealsHad,
          mealsTotal,
          successRate: mealsTotal > 0 ? (mealsHad / mealsTotal) * 100 : 0,
          meals: dayMeals,
          hasData: true,
        });
      });

      // Add final week
      if (currentWeek.length > 0) {
        weeksData.push({
          weekNumber: weekNumber,
          startDate: new Date(currentWeek[0].dateObj),
          days: currentWeek,
          totalMealsHad: currentWeek.reduce((sum, day) => sum + day.mealsHad, 0),
          totalMealsPossible: currentWeek.reduce((sum, day) => sum + day.mealsTotal, 0),
          weekSuccessRate: currentWeek.reduce((sum, day) => sum + day.mealsHad, 0) / 
                          Math.max(currentWeek.reduce((sum, day) => sum + day.mealsTotal, 0), 1) * 100,
        });
      }

      // Reverse to show most recent first
      weeksData.reverse();
      
      setWeeks(weeksData);
      console.log('📊 GENERATED WEEKS:', weeksData.length);
      console.log('📋 FULL DATA:', JSON.stringify(weeksData, null, 2));
      
    } catch (error) {
      console.error('Error loading weekly data:', error);
      setWeeks([]);
    }
  }, []);

  useEffect(() => {
    loadWeeklyData();
  }, []);

  const getSuccessColor = (percentage: number) => {
    if (percentage >= 90) return '#4CAF50';
    if (percentage >= 70) return '#FFC107';
    if (percentage > 0) return '#FF9800';
    return '#6c757d'; // Grey for no data
  };

  const getSuccessEmoji = (percentage: number) => {
    if (percentage >= 90) return '🥇';
    if (percentage >= 70) return '🥉';
    if (percentage > 0) return '📈';
    return '⭕';
  };

  const renderWeekCard = ({ item }: { item: WeekData }) => (
    <TouchableOpacity
      style={[
        styles.weekCard,
        { borderLeftColor: getSuccessColor(item.weekSuccessRate) }
      ]}
      onPress={() => {
        setSelectedWeek(item);
        setViewMode('weekDays');
      }}
      activeOpacity={0.8}
    >
      <View style={styles.weekHeader}>
        <Text style={styles.weekNumber}>Week {item.weekNumber}</Text>
        <Text style={styles.weekDate}>
          {item.startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - 
          {new Date(item.startDate.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </Text>
      </View>
      
      <View style={styles.weekStats}>
        <View style={styles.weekSuccess}>
          <Text style={[styles.weekSuccessRate, { color: getSuccessColor(item.weekSuccessRate) }]}>
            {item.weekSuccessRate.toFixed(0)}%
          </Text>
          <Text style={styles.weekSuccessLabel}>Success</Text>
        </View>
        <View style={styles.weekMeals}>
          <Text style={styles.weekMealsText}>
            {item.totalMealsHad}/{item.totalMealsPossible} meals
          </Text>
        </View>
      </View>

      <View style={[styles.weekStatusBadge, { backgroundColor: getSuccessColor(item.weekSuccessRate) + '20' }]}>
        <Text style={styles.weekStatusText}>
          {getSuccessEmoji(item.weekSuccessRate)} {item.weekSuccessRate.toFixed(0)}% completed
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderDayCard = ({ item }: { item: DayData }) => (
    <TouchableOpacity
      style={[
        styles.dayCard,
        { borderLeftColor: getSuccessColor(item.successRate) }
      ]}
      onPress={() => {
        setSelectedDay(item);
        setViewMode('dayDetails');
      }}
      activeOpacity={0.8}
    >
      <View style={styles.dayHeader}>
        <Text style={styles.dayName}>
          {item.dateObj.toLocaleDateString('en-US', { weekday: 'short' })}
        </Text>
        <Text style={styles.dayDate}>
          {item.dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </Text>
      </View>
      
      <View style={styles.dayStats}>
        <View style={styles.daySuccess}>
          <Text style={[styles.daySuccessRate, { color: getSuccessColor(item.successRate) }]}>
            {item.successRate.toFixed(0)}%
          </Text>
          <Text style={styles.daySuccessLabel}>
            {item.mealsHad}/{item.mealsTotal} meals
          </Text>
        </View>
      </View>

      <View style={[styles.dayStatusBadge, { backgroundColor: getSuccessColor(item.successRate) + '20' }]}>
        <Text style={styles.dayStatusText}>
          {getSuccessEmoji(item.successRate)} {item.mealsHad} meals eaten
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderMealDetail = ({ item }: { item: any }) => (
    <View style={[
      styles.mealDetailCard,
      item.consumed && styles.mealDetailCompleted
    ]}>
      <View style={styles.mealDetailHeader}>
        <Text style={styles.mealDetailTitle}>{item.title}</Text>
        <Ionicons 
          name={item.consumed ? "checkmark-circle" : "time-outline"} 
          size={20} 
          color={item.consumed ? "#4CAF50" : "#FF9800"} 
        />
      </View>
      
      {item.food && (
        <View style={styles.mealDetailContent}>
          <Text style={styles.mealDetailFood}>{item.food.name}</Text>
          <View style={styles.macroRow}>
            <View style={styles.macroItem}>
              <Text style={styles.macroLabel}>🔥</Text>
              <Text style={styles.macroValue}>{item.food.calories}kcal</Text>
            </View>
            <View style={styles.macroItem}>
              <Text style={styles.macroLabel}>💪</Text>
              <Text style={styles.macroValue}>{item.food.protein}g</Text>
            </View>
            <View style={styles.macroItem}>
              <Text style={styles.macroLabel}>🍞</Text>
              <Text style={styles.macroValue}>{item.food.carbs}g</Text>
            </View>
            <View style={styles.macroItem}>
              <Text style={styles.macroLabel}>🧈</Text>
              <Text style={styles.macroValue}>{item.food.fat}g</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );

  const renderBackButton = () => (
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => {
        if (viewMode === 'dayDetails') {
          setViewMode('weekDays');
          setSelectedDay(null);
        } else if (viewMode === 'weekDays') {
          setViewMode('weeks');
          setSelectedWeek(null);
        }
      }}
    >
      <Ionicons name="arrow-back" size={24} color="#4CAF50" />
      <Text style={styles.backButtonText}>
        {viewMode === 'dayDetails' ? 'Week Overview' : 
         viewMode === 'weekDays' ? 'All Weeks' : ''}
      </Text>
    </TouchableOpacity>
  );

  // ✅ EMPTY STATE
  if (weeks.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>📊 Weekly Progress</Text>
          <TouchableOpacity onPress={() => onNavigate?.('home')}>
            <Ionicons name="home" size={24} color="#4CAF50" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.emptyContainer}>
          <Ionicons name="analytics-outline" size={64} color="#ccc" />
          <Text style={styles.emptyTitle}>No Data Yet</Text>
          <Text style={styles.emptySubtitle}>
            Log your first meal to see your progress here
          </Text>
          <TouchableOpacity 
            style={styles.emptyButton}
            onPress={() => onNavigate?.('meals')}
          >
            <Text style={styles.emptyButtonText}>Add First Meal</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📊 Weekly Progress</Text>
        <TouchableOpacity onPress={() => onNavigate?.('home')}>
          <Ionicons name="home" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {renderBackButton()}

      {viewMode === 'weeks' && (
        <FlatList
          data={weeks}
          renderItem={renderWeekCard}
          keyExtractor={(item) => `week-${item.weekNumber}`}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      {viewMode === 'weekDays' && selectedWeek && (
        <View style={styles.weekDaysContainer}>
          <View style={styles.weekSummary}>
            <Text style={styles.weekSummaryTitle}>Week {selectedWeek.weekNumber}</Text>
            <Text style={[styles.weekSummaryRate, { color: getSuccessColor(selectedWeek.weekSuccessRate) }]}>
              {selectedWeek.weekSuccessRate.toFixed(0)}% Success
            </Text>
            <Text style={styles.weekSummaryMeals}>
              {selectedWeek.totalMealsHad}/{selectedWeek.totalMealsPossible} meals completed
            </Text>
          </View>

          <FlatList
            data={selectedWeek.days}
            renderItem={renderDayCard}
            keyExtractor={(item) => item.date}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            numColumns={2}
          />
        </View>
      )}

      {viewMode === 'dayDetails' && selectedDay && (
        <View style={styles.dayDetailsContainer}>
          <View style={styles.daySummary}>
            <Text style={styles.daySummaryDate}>
              {selectedDay.dateObj.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Text>
            <Text style={[styles.daySummaryRate, { color: getSuccessColor(selectedDay.successRate) }]}>
              {selectedDay.successRate.toFixed(0)}% • {selectedDay.mealsHad}/{selectedDay.mealsTotal} meals
            </Text>
          </View>

          <FlatList
            data={selectedDay.meals}
            renderItem={renderMealDetail}
            keyExtractor={(item, index) => `${item.title}-${index}`}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  emptyButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  emptyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'white',
    marginBottom: 16,
    gap: 12,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
  },
  listContainer: {
    padding: 24,
    paddingBottom: 100,
  },
  weekCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  weekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  weekNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  weekDate: {
    fontSize: 14,
    color: '#666',
  },
  weekStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  weekSuccess: {
    alignItems: 'center',
  },
  weekSuccessRate: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  weekSuccessLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  weekMeals: {
    alignItems: 'center',
  },
  weekMealsText: {
    fontSize: 14,
    color: '#666',
  },
  weekStatusBadge: {
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  weekStatusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  dayCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    margin: 8,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dayName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  dayDate: {
    fontSize: 14,
    color: '#666',
  },
  dayStats: {
    alignItems: 'center',
  },
  daySuccess: {
    alignItems: 'center',
  },
  daySuccessRate: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  daySuccessLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  dayStatusBadge: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  dayStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  weekDaysContainer: {
    flex: 1,
  },
  weekSummary: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  weekSummaryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  weekSummaryRate: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  weekSummaryMeals: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  dayDetailsContainer: {
    flex: 1,
  },
  daySummary: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  daySummaryDate: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  daySummaryRate: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  mealDetailCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  mealDetailCompleted: {
    backgroundColor: '#E8F5E8',
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  mealDetailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  mealDetailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  mealDetailContent: {
    marginTop: 12,
  },
  mealDetailFood: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  macroRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
  },
  macroItem: {
    alignItems: 'center',
    flex: 1,
  },
  macroLabel: {
    fontSize: 16,
    marginBottom: 4,
  },
  macroValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});

export default WeeklyScreen;