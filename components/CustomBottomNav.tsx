import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Animated,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

export interface NavItem {
  id: string;
  icon: string;
  activeIcon: string;
  label: string;
}

interface CustomBottomNavProps {
  items: NavItem[];
  activeTab: string;
  onTabPress: (id: string) => void;
  backgroundColor?: string;
  activeBackgroundColor?: string;
  iconColor?: string;
  activeIconColor?: string;
}

export const CustomBottomNav: React.FC<CustomBottomNavProps> = ({
  items,
  activeTab,
  onTabPress,
  backgroundColor = 'white',
  activeBackgroundColor = '#e8f1eaff',
  iconColor = '#666',
  activeIconColor = '#333',
}) => {
  return (
    <View style={[styles.bottomNav, { backgroundColor }]}>
      {items.map((item, index) => {
        const isActive = activeTab === item.id;
        
        return (
          <TouchableOpacity
            key={item.id}
            style={styles.navItem}
            onPress={() => onTabPress(item.id)}
            activeOpacity={0.7}
          >
            <Animated.View style={[
              styles.iconContainer,
              isActive && { backgroundColor: activeBackgroundColor }
            ]}>
              <Ionicons
                name={isActive ? item.activeIcon as any : item.icon as any}
                size={24}
                color={isActive ? activeIconColor : iconColor}
              />
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  iconContainer: {
    padding: 8,
    borderRadius: 12,
  },
});

export const NAV_ITEMS: NavItem[] = [
  {
    id: 'home',
    icon: 'home-outline',
    activeIcon: 'home',
    label: 'Home',
  },
  {
    id: 'meals',
    icon: 'restaurant-outline',
    activeIcon: 'restaurant',
    label: 'Meals',
  },
  {
    id: 'profile',
    icon: 'person-outline',
    activeIcon: 'person',
    label: 'Profile',
  },
  {
    id: 'settings',
    icon: 'settings-outline',
    activeIcon: 'settings',
    label: 'Settings',
  },
]; 