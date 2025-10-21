import { CustomBottomNav, NAV_ITEMS } from '@/components/CustomBottomNav';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabLayout() {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen onNavigate={handleTabPress} />;
      case 'meals':
        return <MealsScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <HomeScreen onNavigate={handleTabPress} />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Screen Content */}
      <View style={styles.content}>
        {renderScreen()}
      </View>
      
      {/* Custom Bottom Navigation */}
      <CustomBottomNav
        items={NAV_ITEMS}
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />
    </View>
  );
}

// Import the screen components
import HomeScreen from './index';
import MealsScreen from './meals';
import ProfileScreen from './profile';
import SettingsScreen from './settings';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1e3ec',
  },
  content: {
    flex: 1,
  },
});

