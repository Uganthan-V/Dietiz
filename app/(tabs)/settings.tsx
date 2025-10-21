import { useMealPlan } from '@/components/MealPlanContext';
import StorageService from '@/services/StorageService';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const SettingsScreen = () => {
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [storageStats, setStorageStats] = useState({
    hasPersonalInfo: false,
    hasMeals: false,
    hasApiKey: false,
    isFirstTime: true,
  });

  const { clearPersonalInfo, clearAllMeals } = useMealPlan();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const apiKey = await StorageService.getGeminiApiKey();
      if (apiKey) {
        setGeminiApiKey(apiKey);
      }

      const stats = await StorageService.getStorageStats();
      setStorageStats(stats);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleSaveApiKey = async () => {
    if (!geminiApiKey.trim()) {
      Alert.alert('Error', 'Please enter a valid API key.');
      return;
    }

    try {
      await StorageService.saveGeminiApiKey(geminiApiKey.trim());
      setShowApiKeyModal(false);
      await loadSettings();
      Alert.alert('Success', 'API key saved successfully!');
    } catch (error) {
      console.error('Error saving API key:', error);
      Alert.alert('Error', 'Failed to save API key.');
    }
  };

  const handleClearApiKey = async () => {
    Alert.alert(
      'Clear API Key',
      'Are you sure you want to clear your Gemini API key? This will disable AI recommendations.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive', 
          onPress: async () => {
            try {
              await StorageService.clearGeminiApiKey();
              setGeminiApiKey('');
              await loadSettings();
              Alert.alert('Success', 'API key cleared successfully!');
            } catch (error) {
              console.error('Error clearing API key:', error);
              Alert.alert('Error', 'Failed to clear API key.');
            }
          }
        },
      ]
    );
  };

  const handleClearAllData = async () => {
    Alert.alert(
      'Clear All localStorage Data',
      'This will permanently delete ALL data stored in your device:\n\n• Personal information\n• Meal data\n• API keys\n• App settings\n\nThis action cannot be undone and will reset the app to its initial state.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear Everything', 
          style: 'destructive', 
          onPress: async () => {
            try {
              // Show loading state
              Alert.alert(
                'Clearing Data...',
                'Please wait while we clear all localStorage data.',
                [],
                { cancelable: false }
              );
              
              // Clear all data from localStorage
              await StorageService.clearAllData();
              
              // Clear context state
              clearPersonalInfo();
              clearAllMeals();
              setGeminiApiKey('');
              
              // Reload settings to reflect changes
              await loadSettings();
              
              // Show success message
              Alert.alert(
                'Data Cleared Successfully!',
                'All localStorage data has been permanently deleted. The app has been reset to its initial state.',
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      // Optionally navigate to home or show setup screen
                    }
                  }
                ]
              );
            } catch (error) {
              console.error('Error clearing all data:', error);
              Alert.alert(
                'Error',
                'Failed to clear all data. Please try again.',
                [{ text: 'OK' }]
              );
            }
          }
        },
      ]
    );
  };

  const SettingItem = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    showSwitch = false, 
    switchValue = false, 
    onSwitchChange = () => {},
    showArrow = true 
  }: {
    icon: string;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    showSwitch?: boolean;
    switchValue?: boolean;
    onSwitchChange?: (value: boolean) => void;
    showArrow?: boolean;
  }) => (
    <TouchableOpacity 
      style={styles.settingItem} 
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingIcon}>
        <Ionicons name={icon as any} size={24} color="#4CAF50" />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {showSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
          thumbColor={switchValue ? '#fff' : '#f4f3f4'}
        />
      ) : showArrow && onPress ? (
        <Ionicons name="chevron-forward" size={20} color="#CCC" />
      ) : null}
    </TouchableOpacity>
  );

  const ApiKeyModal = () => (
    <Modal
      visible={showApiKeyModal}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setShowApiKeyModal(false)}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setShowApiKeyModal(false)}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Gemini API Key</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView style={styles.modalContent}>
          <View style={styles.modalSection}>
            <Text style={styles.modalSectionTitle}>How to get your API key:</Text>
            <Text style={styles.modalText}>
              1. Go to Google AI Studio (https://makersuite.google.com/app/apikey)
            </Text>
            <Text style={styles.modalText}>
              2. Sign in with your Google account
            </Text>
            <Text style={styles.modalText}>
              3. Click "Create API Key"
            </Text>
            <Text style={styles.modalText}>
              4. Copy the generated key and paste it below
            </Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>API Key</Text>
            <TextInput
              style={styles.textInput}
              value={geminiApiKey}
              onChangeText={setGeminiApiKey}
              placeholder="Enter your Gemini API key"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSaveApiKey}>
            <Text style={styles.saveButtonText}>Save API Key</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>

        {/* AI Configuration */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Configuration</Text>
          <SettingItem
            icon="key"
            title="Gemini API Key"
            subtitle={storageStats.hasApiKey ? "API key configured" : "Required for AI recommendations"}
            onPress={() => setShowApiKeyModal(true)}
          />
          {storageStats.hasApiKey && (
            <SettingItem
              icon="trash-outline"
              title="Clear API Key"
              subtitle="Remove stored API key"
              onPress={handleClearApiKey}
            />
          )}
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          <SettingItem
            icon="notifications"
            title="Notifications"
            subtitle="Get reminders for meals"
            showSwitch={true}
            switchValue={notificationsEnabled}
            onSwitchChange={setNotificationsEnabled}
            showArrow={false}
          />
          <SettingItem
            icon="moon"
            title="Dark Mode"
            subtitle="Use dark theme"
            showSwitch={true}
            switchValue={darkModeEnabled}
            onSwitchChange={setDarkModeEnabled}
            showArrow={false}
          />
        </View>

        {/* Data Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Management</Text>
          <SettingItem
            icon="person"
            title="Personal Information"
            subtitle={storageStats.hasPersonalInfo ? "Profile completed" : "No profile data"}
            onPress={() => {
              // Navigate to profile setup
            }}
          />
          <SettingItem
            icon="restaurant"
            title="Meal Data"
            subtitle={storageStats.hasMeals ? "Meals saved" : "No meal data"}
            onPress={() => {
              // Show meal data
            }}
          />
        </View>

        {/* Storage Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Storage Statistics</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Personal Info</Text>
              <Text style={[styles.statValue, { color: storageStats.hasPersonalInfo ? '#4CAF50' : '#FF5722' }]}>
                {storageStats.hasPersonalInfo ? 'Saved' : 'Not Set'}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Meals</Text>
              <Text style={[styles.statValue, { color: storageStats.hasMeals ? '#4CAF50' : '#FF5722' }]}>
                {storageStats.hasMeals ? 'Saved' : 'None'}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>API Key</Text>
              <Text style={[styles.statValue, { color: storageStats.hasApiKey ? '#4CAF50' : '#FF5722' }]}>
                {storageStats.hasApiKey ? 'Configured' : 'Not Set'}
              </Text>
            </View>
          </View>
          
          {/* localStorage Details */}
          <View style={styles.localStorageContainer}>
            <Text style={styles.localStorageTitle}>localStorage Contents</Text>
            <Text style={styles.localStorageDescription}>
              This shows what data is currently stored in your device's localStorage:
            </Text>
            <View style={styles.localStorageItems}>
              <View style={styles.localStorageItem}>
                <Ionicons name="person" size={16} color="#4CAF50" />
                <Text style={styles.localStorageItemText}>
                  Personal Information: {storageStats.hasPersonalInfo ? '✓ Stored' : '✗ Not stored'}
                </Text>
              </View>
              <View style={styles.localStorageItem}>
                <Ionicons name="restaurant" size={16} color="#4CAF50" />
                <Text style={styles.localStorageItemText}>
                  Meal Data: {storageStats.hasMeals ? '✓ Stored' : '✗ Not stored'}
                </Text>
              </View>
              <View style={styles.localStorageItem}>
                <Ionicons name="key" size={16} color="#4CAF50" />
                <Text style={styles.localStorageItemText}>
                  API Keys: {storageStats.hasApiKey ? '✓ Stored' : '✗ Not stored'}
                </Text>
              </View>
              <View style={styles.localStorageItem}>
                <Ionicons name="settings" size={16} color="#4CAF50" />
                <Text style={styles.localStorageItemText}>
                  App Settings: {storageStats.isFirstTime ? '✗ Not stored' : '✓ Stored'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Danger Zone</Text>
          <SettingItem
            icon="trash"
            title="Clear All Data"
            subtitle="Permanently delete all app data"
            onPress={handleClearAllData}
          />
          
          {/* New prominent localStorage clear button */}
          <TouchableOpacity 
            style={styles.dangerButton} 
            onPress={handleClearAllData}
          >
            <View style={styles.dangerButtonContent}>
              <Ionicons name="trash" size={24} color="#FF5722" />
              <View style={styles.dangerButtonText}>
                <Text style={styles.dangerButtonTitle}>Clear All localStorage</Text>
                <Text style={styles.dangerButtonSubtitle}>
                  Delete all personal info, meals, API keys, and settings
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#FF5722" />
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Information</Text>
          <SettingItem
            icon="information-circle"
            title="Version"
            subtitle="1.0.0"
            showArrow={false}
          />
          <SettingItem
            icon="document-text"
            title="Privacy Policy"
            onPress={() => {
              // Open privacy policy
            }}
          />
          <SettingItem
            icon="help-circle"
            title="Help & Support"
            onPress={() => {
              // Open help
            }}
          />
        </View>
      </ScrollView>

      {/* API Key Modal */}
      <ApiKeyModal />
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1e3ec',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 20,
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  statsContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#f1e3ec',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  modalSection: {
    marginBottom: 24,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF3E0', // Light orange background
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginTop: 12,
    marginHorizontal: 20,
  },
  dangerButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dangerButtonText: {
    marginLeft: 12,
  },
  dangerButtonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF5722',
  },
  dangerButtonSubtitle: {
    fontSize: 12,
    color: '#FF5722',
    marginTop: 2,
  },
  localStorageContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
  localStorageTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  localStorageDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  localStorageItems: {
    //
  },
  localStorageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  localStorageItemText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
}); 
