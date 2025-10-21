import { useMealPlan } from '@/components/MealPlanContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

// Stats Screen Component
const StatsScreen = () => {
  const [selectedView, setSelectedView] = useState('Grid');
  const { nutritionalData, getTotalNutrition } = useMealPlan();
  const totalNutrition = getTotalNutrition();

  const chartData = {
    labels: ['22 Mar', '23 Mar', '24 Mar', '25 Mar', '26 Mar'],
    datasets: [
      {
        data: [72, 64, 58, 98, 80],
        strokeWidth: 3,
        color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(102, 102, 102, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#4CAF50',
    },
  };

  const StatCard = ({ 
    icon, 
    color, 
    title, 
    value,
    target
  }: { 
    icon: string; 
    color: string; 
    title: string; 
    value: number;
    target: number;
  }) => (
    <View style={styles.statCard}>
      <View style={styles.statCardHeader}>
        <View style={[styles.statIcon, { backgroundColor: color }]}>
          <Ionicons name={icon as any} size={16} color="white" />
        </View>
        <Ionicons name="expand-outline" size={16} color="#999" />
      </View>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={styles.statValue}>{value}/{target}{title === 'Calorie' ? ' kcal' : 'g'}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>Your Stats</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="person-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Smiley Icon */}
        <View style={styles.smileyContainer}>
          <View style={styles.smileyIcon}>
            <Text style={styles.smileyText}>😊</Text>
          </View>
        </View>

        {/* Chart */}
        <View style={styles.chartContainer}>
          <LineChart
            data={chartData}
            width={width - 40}
            height={200}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>

        {/* View Toggle */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              selectedView === 'Grid' && styles.toggleButtonActive
            ]}
            onPress={() => setSelectedView('Grid')}
          >
            <Ionicons name="grid" size={16} color={selectedView === 'Grid' ? '#333' : '#999'} />
            <Text style={[
              styles.toggleText,
              selectedView === 'Grid' && styles.toggleTextActive
            ]}>Grid</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              selectedView === 'Compact' && styles.toggleButtonActive
            ]}
            onPress={() => setSelectedView('Compact')}
          >
            <Ionicons name="list" size={16} color={selectedView === 'Compact' ? '#333' : '#999'} />
            <Text style={[
              styles.toggleText,
              selectedView === 'Compact' && styles.toggleTextActive
            ]}>Compact</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <StatCard
              icon="flame"
              color="#FFC107"
              title="Calorie"
              value={totalNutrition.calories}
              target={nutritionalData.calories}
            />
            <StatCard
              icon="water"
              color="#2196F3"
              title="Protein"
              value={totalNutrition.protein}
              target={nutritionalData.protein}
            />
          </View>
          <View style={styles.statsRow}>
            <StatCard
              icon="leaf"
              color="#4CAF50"
              title="Carbs"
              value={totalNutrition.carbs}
              target={nutritionalData.carbs}
            />
            <StatCard
              icon="fitness"
              color="#FF5722"
              title="Fat"
              value={totalNutrition.fat}
              target={nutritionalData.fat}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StatsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1e3ec',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  smileyContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  smileyIcon: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF9C4',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smileyText: {
    fontSize: 24,
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  chart: {
    borderRadius: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
  },
  toggleButtonActive: {
    backgroundColor: '#f1e3ec',
  },
  toggleText: {
    fontSize: 14,
    color: '#999',
  },
  toggleTextActive: {
    color: '#333',
    fontWeight: '600',
  },
  statsContainer: {
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 100, // Add bottom margin for tab bar
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    minHeight: 120,
  },
  statCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
}); 