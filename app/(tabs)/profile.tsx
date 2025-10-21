import { useMealPlan } from '@/components/MealPlanContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const ProfileScreen = () => {
  const { getTotalNutrition, nutritionalData } = useMealPlan();
  const totalNutrition = getTotalNutrition();

  const ProfileCard = ({ 
    icon, 
    color, 
    title, 
    value, 
    subtitle 
  }: { 
    icon: string; 
    color: string; 
    title: string; 
    value: string; 
    subtitle?: string; 
  }) => (
    <View style={styles.profileCard}>
      <View style={[styles.profileIcon, { backgroundColor: color }]}>
        <Ionicons name={icon as any} size={20} color="white" />
      </View>
      <View style={styles.profileContent}>
        <Text style={styles.profileTitle}>{title}</Text>
        <Text style={styles.profileValue}>{value}</Text>
        {subtitle && <Text style={styles.profileSubtitle}>{subtitle}</Text>}
      </View>
    </View>
  );

  const AchievementCard = ({ 
    icon, 
    title, 
    description, 
    achieved 
  }: { 
    icon: string; 
    title: string; 
    description: string; 
    achieved: boolean; 
  }) => (
    <View style={[styles.achievementCard, achieved && styles.achievementCardAchieved]}>
      <View style={[styles.achievementIcon, achieved && styles.achievementIconAchieved]}>
        <Ionicons name={icon as any} size={20} color={achieved ? "#4CAF50" : "#999"} />
      </View>
      <View style={styles.achievementContent}>
        <Text style={[styles.achievementTitle, achieved && styles.achievementTitleAchieved]}>
          {title}
        </Text>
        <Text style={styles.achievementDescription}>{description}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="settings-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* User Info */}
        <View style={styles.userSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>T</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Tanim</Text>
              <Text style={styles.userEmail}>tanim@example.com</Text>
            </View>
          </View>
        </View>

        {/* Stats Overview */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Your Stats</Text>
          <View style={styles.statsGrid}>
            <ProfileCard
              icon="flame"
              color="#FFC107"
              title="Total Calories"
              value={`${totalNutrition.calories} kcal`}
              subtitle={`${Math.round((totalNutrition.calories / nutritionalData.calories) * 100)}% of daily goal`}
            />
            <ProfileCard
              icon="trophy"
              color="#FFD700"
              title="Streak"
              value="7 days"
              subtitle="Current streak"
            />
            <ProfileCard
              icon="checkmark-circle"
              color="#4CAF50"
              title="Meals Completed"
              value="3/4"
              subtitle="Today's progress"
            />
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <AchievementCard
            icon="star"
            title="First Week"
            description="Complete 7 days of meal planning"
            achieved={true}
          />
          <AchievementCard
            icon="nutrition"
            title="Protein Master"
            description="Meet protein goals for 5 consecutive days"
            achieved={true}
          />
          <AchievementCard
            icon="leaf"
            title="Healthy Eater"
            description="Stay within calorie goals for 10 days"
            achieved={false}
          />
          <AchievementCard
            icon="fitness"
            title="Consistency King"
            description="Plan meals for 30 consecutive days"
            achieved={false}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="person-outline" size={20} color="#4CAF50" />
              <Text style={styles.actionText}>Edit Profile</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="notifications-outline" size={20} color="#4CAF50" />
              <Text style={styles.actionText}>Notifications</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="help-circle-outline" size={20} color="#4CAF50" />
              <Text style={styles.actionText}>Help & Support</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="share-outline" size={20} color="#4CAF50" />
              <Text style={styles.actionText}>Share Progress</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerButton: {
    padding: 8,
  },
  userSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  statsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  statsGrid: {
    gap: 12,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profileContent: {
    flex: 1,
  },
  profileTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  profileValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  profileSubtitle: {
    fontSize: 12,
    color: '#999',
  },
  achievementsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    opacity: 0.6,
  },
  achievementCardAchieved: {
    opacity: 1,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  achievementIconAchieved: {
    backgroundColor: '#E8F5E8',
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#999',
    marginBottom: 4,
  },
  achievementTitleAchieved: {
    color: '#333',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#666',
  },
  actionsSection: {
    paddingHorizontal: 20,
  },
  actionButtons: {
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  actionText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
}); 
