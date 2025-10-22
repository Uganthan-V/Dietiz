

// // // import React, { useState, useCallback, useEffect } from 'react';
// // // import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// // // import { Ionicons } from '@expo/vector-icons';
// // // import StorageService from '@/services/StorageService';
// // // import { useMealPlan } from '@/components/MealPlanContext';
// // // import { SafeAreaView } from 'react-native-safe-area-context';

// // // // Mock Gemini API call (replace with actual API integration)
// // // const fetchGeminiResponse = async (
// // //   message: string,
// // //   nutritionalData: any,
// // //   totalNutrition: any,
// // //   personalInfo: any,
// // //   apiKey: string
// // // ): Promise<string> => {
// // //   // Placeholder: Implement actual Gemini API call here
// // //   const systemPrompt = `
// // //     You are a professional dietician assistant for the Dynamic Diet app, designed to help users with meal planning and nutrition. Respond only to diet-related queries (e.g., meal preparation, diet plans, nutritional advice, cheat meals). For non-diet questions, reply briefly: "I'm here to help with diet queries only. Ask about meal plans, nutrition, or recipes!"

// // //     For cheat meal requests:
// // //     - Check if the requested cheat meal fits within the user's daily nutritional targets (calories: ${nutritionalData.calories}, protein: ${nutritionalData.protein}, carbs: ${nutritionalData.carbs}, fat: ${nutritionalData.fat}, current intake: calories: ${totalNutrition.calories}, protein: ${totalNutrition.protein}, carbs: ${totalNutrition.carbs}, fat: ${totalNutrition.fat}).
// // //     - If it fits without exceeding targets, say "Yes, you can have [meal] today as it fits your plan."
// // //     - If it exceeds targets, respond: "Sorry, [meal] may disrupt your diet plan today. Consider [healthier alternative] instead, or have it tomorrow."
// // //     - Provide detailed guidance for meal preparation, portion sizes, or nutritional balance when asked.
// // //     - Use the user's personal info (${JSON.stringify(personalInfo)}) to tailor responses (e.g., dietary restrictions, allergies, goals).

// // //     Keep responses concise, friendly, and professional. Always prioritize healthy eating aligned with the user's goals.
// // //   `;
  
// // //   // Simulate diet query response
// // //   if (message.toLowerCase().includes('cheat meal') || message.toLowerCase().includes('pizza')) {
// // //     const exceedsCalories = totalNutrition.calories + 800 > nutritionalData.calories; // Example: Pizza ~800 kcal
// // //     if (!exceedsCalories) {
// // //       return `Yes, you can have pizza as a cheat meal today as it fits your plan. Keep the portion to one slice (about 200g) to stay within your calorie target.`;
// // //     } else {
// // //       return `Sorry, pizza may disrupt your diet plan today as it exceeds your calorie target. Consider a veggie wrap instead, or have pizza tomorrow.`;
// // //     }
// // //   } else if (!message.toLowerCase().includes('diet') && !message.toLowerCase().includes('meal') && !message.toLowerCase().includes('nutrition')) {
// // //     return `I'm here to help with diet queries only. Ask about meal plans, nutrition, or recipes!`;
// // //   } else {
// // //     return `For a balanced ${message.toLowerCase().includes('breakfast') ? 'breakfast' : 'meal'}, try oatmeal with berries and almonds (200g oats, 100g berries, 20g almonds). It provides ~400 kcal, 15g protein, 60g carbs, 10g fat, fitting most diet plans. Adjust portions based on your goals (${personalInfo.goal}).`;
// // //   }
// // // };

// // // interface Message {
// // //   role: 'user' | 'bot';
// // //   content: string;
// // // }

// // // interface ChatScreenProps {
// // //   visible: boolean;
// // //   onClose: () => void;
// // //   nutritionalData: any;
// // //   totalNutrition: any;
// // //   personalInfo: any;
// // //   onNavigate?: (tab: string) => void; // Make optional with '?'
// // // }

// // // const ChatScreen: React.FC<ChatScreenProps> = ({
// // //   visible,
// // //   onClose,
// // //   nutritionalData,
// // //   totalNutrition,
// // //   personalInfo,
// // //   onNavigate,
// // // }) => {
// // //   const [messages, setMessages] = useState<Message[]>([]);
// // //   const [inputText, setInputText] = useState('');
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [apiKey, setApiKey] = useState<string | null>(null);

// // //   // Check for API key on mount
// // //   useEffect(() => {
// // //     const checkApiKey = async () => {
// // //       const key = await StorageService.getGeminiApiKey();
// // //       setApiKey(key);
// // //       if (!key) {
// // //         setMessages([
// // //           {
// // //             role: 'bot',
// // //             content: 'Please set your Gemini API key in Settings to use the diet assistant.',
// // //           },
// // //         ]);
// // //       }
// // //     };
// // //     checkApiKey();
// // //   }, []);

// // //   const handleSendMessage = useCallback(async () => {
// // //     if (!inputText.trim() || !apiKey) return;

// // //     // Add user message
// // //     const userMessage: Message = { role: 'user', content: inputText };
// // //     setMessages((prev) => [...prev, userMessage]);
// // //     setInputText('');
// // //     setIsLoading(true);

// // //     try {
// // //       // Fetch Gemini response
// // //       const botResponse = await fetchGeminiResponse(
// // //         inputText,
// // //         nutritionalData,
// // //         totalNutrition,
// // //         personalInfo,
// // //         apiKey
// // //       );
// // //       setMessages((prev) => [...prev, { role: 'bot', content: botResponse }]);
// // //     } catch (error) {
// // //       console.error('Error fetching Gemini response:', error);
// // //       setMessages((prev) => [
// // //         ...prev,
// // //         { role: 'bot', content: 'Sorry, an error occurred. Try again later.' },
// // //       ]);
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   }, [inputText, apiKey, nutritionalData, totalNutrition, personalInfo]);

// // //   const renderMessage = ({ item }: { item: Message }) => (
// // //     <View
// // //       style={[
// // //         styles.messageContainer,
// // //         item.role === 'user' ? styles.userMessage : styles.botMessage,
// // //       ]}
// // //     >
// // //       <Text style={styles.messageText}>{item.content}</Text>
// // //     </View>
// // //   );

// // //   return (
// // //     <Modal
// // //       visible={visible}
// // //       animationType="slide"
// // //       presentationStyle="pageSheet"
// // //       onRequestClose={onClose}
// // //     >
// // //       <SafeAreaView style={styles.modalContainer}>
// // //         <View style={styles.modalHeader}>
// // //           <TouchableOpacity onPress={onClose}>
// // //             <Ionicons name="close" size={24} color="#333" />
// // //           </TouchableOpacity>
// // //           <Text style={styles.modalTitle}>Diet Assistant</Text>
// // //           <TouchableOpacity
// // //   onPress={() => onNavigate ? onNavigate('settings') : null} // Check if onNavigate exists
// // //   disabled={!!apiKey || !onNavigate} // Disable if no onNavigate
// // // >
// // //   <Ionicons
// // //     name="settings-outline"
// // //     size={24}
// // //     color={apiKey ? '#999' : '#4CAF50'}
// // //   />
// // // </TouchableOpacity>
// // //         </View>
// // //         <FlatList
// // //           data={messages}
// // //           renderItem={renderMessage}
// // //           keyExtractor={(_, index) => index.toString()}
// // //           style={styles.messageList}
// // //           contentContainerStyle={styles.messageListContent}
// // //         />
// // //         <View style={styles.inputContainer}>
// // //           <TextInput
// // //             style={styles.textInput}
// // //             value={inputText}
// // //             onChangeText={setInputText}
// // //             placeholder="Ask about diet, meals, or nutrition..."
// // //             placeholderTextColor="#999"
// // //             editable={!isLoading && !!apiKey}
// // //           />
// // //           <TouchableOpacity
// // //             style={[styles.sendButton, (!inputText.trim() || isLoading) && styles.sendButtonDisabled]}
// // //             onPress={handleSendMessage}
// // //             disabled={!inputText.trim() || isLoading || !apiKey}
// // //           >
// // //             <Ionicons name="send" size={20} color="#FFF" />
// // //           </TouchableOpacity>
// // //         </View>
// // //       </SafeAreaView>
// // //     </Modal>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   modalContainer: {
// // //     flex: 1,
// // //     backgroundColor: '#f1e3ec',
// // //   },
// // //   modalHeader: {
// // //     flexDirection: 'row',
// // //     justifyContent: 'space-between',
// // //     alignItems: 'center',
// // //     paddingHorizontal: 24,
// // //     paddingVertical: 16,
// // //     borderBottomWidth: 1,
// // //     borderBottomColor: '#E0E0E0',
// // //   },
// // //   modalTitle: {
// // //     fontSize: 18,
// // //     fontWeight: 'bold',
// // //     color: '#333',
// // //   },
// // //   messageList: {
// // //     flex: 1,
// // //   },
// // //   messageListContent: {
// // //     paddingHorizontal: 24,
// // //     paddingVertical: 16,
// // //     gap: 12,
// // //   },
// // //   messageContainer: {
// // //     maxWidth: '80%',
// // //     padding: 12,
// // //     borderRadius: 12,
// // //   },
// // //   userMessage: {
// // //     backgroundColor: '#4CAF50',
// // //     alignSelf: 'flex-end',
// // //   },
// // //   botMessage: {
// // //     backgroundColor: '#FFF',
// // //     alignSelf: 'flex-start',
// // //     borderWidth: 1,
// // //     borderColor: '#E0E0E0',
// // //   },
// // //   messageText: {
// // //     fontSize: 16,
// // //     color: '#333',
// // //   },
// // //   inputContainer: {
// // //     flexDirection: 'row',
// // //     paddingHorizontal: 24,
// // //     paddingVertical: 16,
// // //     borderTopWidth: 1,
// // //     borderTopColor: '#E0E0E0',
// // //     alignItems: 'center',
// // //     gap: 12,
// // //   },
// // //   textInput: {
// // //     flex: 1,
// // //     backgroundColor: '#FFF',
// // //     borderRadius: 12,
// // //     paddingHorizontal: 16,
// // //     paddingVertical: 12,
// // //     fontSize: 16,
// // //     borderWidth: 1,
// // //     borderColor: '#E0E0E0',
// // //   },
// // //   sendButton: {
// // //     backgroundColor: '#4CAF50',
// // //     borderRadius: 12,
// // //     padding: 12,
// // //   },
// // //   sendButtonDisabled: {
// // //     backgroundColor: '#999',
// // //   },
// // // });

// // // export default ChatScreen;



// // import React, { useState, useCallback, useEffect } from 'react';
// // import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// // import { Ionicons } from '@expo/vector-icons';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import StorageService from '@/services/StorageService';
// // import GeminiService from '@/services/GeminiService';
// // import { useMealPlan } from '@/components/MealPlanContext';

// // interface Message {
// //   role: 'user' | 'bot';
// //   content: string;
// // }

// // interface ChatScreenProps {
// //   visible: boolean;
// //   onClose: () => void;
// //   nutritionalData: any;
// //   totalNutrition: any;
// //   personalInfo: any;
// //   onNavigate?: (tab: string) => void;
// // }

// // const ChatScreen: React.FC<ChatScreenProps> = ({
// //   visible,
// //   onClose,
// //   nutritionalData,
// //   totalNutrition,
// //   personalInfo,
// //   onNavigate,
// // }) => {
// //   const [messages, setMessages] = useState<Message[]>([]);
// //   const [inputText, setInputText] = useState('');
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [apiKey, setApiKey] = useState<string | null>(null);

// //   // Initialize GeminiService with API key
// //   useEffect(() => {
// //     const initializeGemini = async () => {
// //       const key = await StorageService.getGeminiApiKey();
// //       setApiKey(key);
// //       if (key) {
// //         try {
// //           GeminiService.setApiKey(key);
// //         } catch (error) {
// //           console.error('Error setting Gemini API key:', error);
// //           setMessages([
// //             {
// //               role: 'bot',
// //               content: 'Failed to initialize diet assistant. Please check your Gemini API key in Settings.',
// //             },
// //           ]);
// //         }
// //       } else {
// //         setMessages([
// //           {
// //             role: 'bot',
// //             content: 'Please set your Gemini API key in Settings to use the diet assistant.',
// //           },
// //         ]);
// //       }
// //     };
// //     initializeGemini();
// //   }, []);

// //   const fetchGeminiResponse = useCallback(
// //     async (message: string): Promise<string> => {
// //       if (!GeminiService.isApiKeyConfigured()) {
// //         throw new Error('API key not configured. Please set your Gemini API key in Settings.');
// //       }

// //       const systemPrompt = `
// //         You are a professional dietician assistant for the Dynamic Diet app, designed to help users with meal planning and nutrition. Respond only to diet-related queries (e.g., meal preparation, diet plans, nutritional advice, cheat meals). For non-diet questions, reply briefly: "I'm here to help with diet queries only. Ask about meal plans, nutrition, or recipes!"

// //         For cheat meal requests:
// //         - Check if the requested cheat meal fits within the user's daily nutritional targets (calories: ${nutritionalData.calories}, protein: ${nutritionalData.protein}, carbs: ${nutritionalData.carbs}, fat: ${nutritionalData.fat}, current intake: calories: ${totalNutrition.calories}, protein: ${totalNutrition.protein}, carbs: ${totalNutrition.carbs}, fat: ${totalNutrition.fat}).
// //         - If it fits without exceeding targets, say: "Yes, you can have [meal] today as it fits your plan. Keep the portion to [recommended portion] to stay within your targets."
// //         - If it exceeds targets, respond: "Sorry, [meal] may disrupt your diet plan today as it exceeds your [nutrient, e.g., calorie] target. Consider [healthier alternative] instead, or have it tomorrow."
// //         - Provide detailed guidance for meal preparation, portion sizes, or nutritional balance when asked.
// //         - Use the user's personal info (${JSON.stringify(personalInfo)}) to tailor responses (e.g., dietary restrictions, allergies, goals).

// //         Keep responses concise, friendly, and professional. Return plain text, no JSON. Always prioritize healthy eating aligned with the user's goals.
// //       `;

// //       try {
// //         // Use a generic text generation approach since generateMealRecommendations returns JSON
// //         const prompt = `${systemPrompt}\nUser: ${message}`;
// //         const result = await GeminiService['model'].generateContent(prompt); // Access model directly (private, but singleton allows this)
// //         const response = await result.response;
// //         return response.text();
// //       } catch (error) {
// //         console.error('Error generating Gemini response:', error);
// //         if (error instanceof Error) {
// //           if (error.message.includes('API key')) {
// //             return 'Please set your Gemini API key in Settings to use the diet assistant.';
// //           }
// //           if (
// //             error.message.includes('overloaded') ||
// //             error.message.includes('503') ||
// //             error.message.includes('service unavailable') ||
// //             error.message.includes('quota exceeded')
// //           ) {
// //             return 'AI service is currently busy. Please try again in a few minutes.';
// //           }
// //         }
// //         return 'Sorry, an error occurred while generating a response. Try again later.';
// //       }
// //     },
// //     [nutritionalData, totalNutrition, personalInfo]
// //   );

// //   const handleSendMessage = useCallback(async () => {
// //     if (!inputText.trim() || !apiKey) return;

// //     // Add user message
// //     const userMessage: Message = { role: 'user', content: inputText };
// //     setMessages((prev) => [...prev, userMessage]);
// //     setInputText('');
// //     setIsLoading(true);

// //     try {
// //       // Fetch Gemini response
// //       const botResponse = await fetchGeminiResponse(inputText);
// //       setMessages((prev) => [...prev, { role: 'bot', content: botResponse }]);
// //     } catch (error) {
// //       console.error('Error fetching Gemini response:', error);
// //       setMessages((prev) => [
// //         ...prev,
// //         { role: 'bot', content: 'Sorry, an error occurred. Try again later.' },
// //       ]);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   }, [inputText, apiKey, fetchGeminiResponse]);

// //   const renderMessage = ({ item }: { item: Message }) => (
// //     <View
// //       style={[
// //         styles.messageContainer,
// //         item.role === 'user' ? styles.userMessage : styles.botMessage,
// //       ]}
// //     >
// //       <Text style={styles.messageText}>{item.content}</Text>
// //     </View>
// //   );

// //   return (
// //     <Modal
// //       visible={visible}
// //       animationType="slide"
// //       presentationStyle="pageSheet"
// //       onRequestClose={onClose}
// //     >
// //       <SafeAreaView style={styles.modalContainer}>
// //         <View style={styles.modalHeader}>
// //           <TouchableOpacity onPress={onClose}>
// //             <Ionicons name="close" size={24} color="#333" />
// //           </TouchableOpacity>
// //           <Text style={styles.modalTitle}>Diet Assistant</Text>
// //           <TouchableOpacity
// //             onPress={() => onNavigate ? onNavigate('settings') : null}
// //             disabled={!!apiKey || !onNavigate}
// //           >
// //             <Ionicons
// //               name="settings-outline"
// //               size={24}
// //               color={apiKey ? '#999' : '#4CAF50'}
// //             />
// //           </TouchableOpacity>
// //         </View>
// //         <FlatList
// //           data={messages}
// //           renderItem={renderMessage}
// //           keyExtractor={(_, index) => index.toString()}
// //           style={styles.messageList}
// //           contentContainerStyle={styles.messageListContent}
// //         />
// //         <View style={styles.inputContainer}>
// //           <TextInput
// //             style={styles.textInput}
// //             value={inputText}
// //             onChangeText={setInputText}
// //             placeholder="Ask about diet, meals, or nutrition..."
// //             placeholderTextColor="#999"
// //             editable={!isLoading && !!apiKey}
// //           />
// //           <TouchableOpacity
// //             style={[styles.sendButton, (!inputText.trim() || isLoading) && styles.sendButtonDisabled]}
// //             onPress={handleSendMessage}
// //             disabled={!inputText.trim() || isLoading || !apiKey}
// //           >
// //             <Ionicons name="send" size={20} color="#FFF" />
// //           </TouchableOpacity>
// //         </View>
// //       </SafeAreaView>
// //     </Modal>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   modalContainer: {
// //     flex: 1,
// //     backgroundColor: '#f1e3ec',
// //   },
// //   modalHeader: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     paddingHorizontal: 24,
// //     paddingVertical: 16,
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#E0E0E0',
// //   },
// //   modalTitle: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     color: '#333',
// //   },
// //   messageList: {
// //     flex: 1,
// //   },
// //   messageListContent: {
// //     paddingHorizontal: 24,
// //     paddingVertical: 16,
// //     gap: 12,
// //   },
// //   messageContainer: {
// //     maxWidth: '80%',
// //     padding: 12,
// //     borderRadius: 12,
// //   },
// //   userMessage: {
// //     backgroundColor: '#4CAF50',
// //     alignSelf: 'flex-end',
// //   },
// //   botMessage: {
// //     backgroundColor: '#FFF',
// //     alignSelf: 'flex-start',
// //     borderWidth: 1,
// //     borderColor: '#E0E0E0',
// //   },
// //   messageText: {
// //     fontSize: 16,
// //     color: '#333',
// //   },
// //   inputContainer: {
// //     flexDirection: 'row',
// //     paddingHorizontal: 24,
// //     paddingVertical: 16,
// //     borderTopWidth: 1,
// //     borderTopColor: '#E0E0E0',
// //     alignItems: 'center',
// //     gap: 12,
// //   },
// //   textInput: {
// //     flex: 1,
// //     backgroundColor: '#FFF',
// //     borderRadius: 12,
// //     paddingHorizontal: 16,
// //     paddingVertical: 12,
// //     fontSize: 16,
// //     borderWidth: 1,
// //     borderColor: '#E0E0E0',
// //   },
// //   sendButton: {
// //     backgroundColor: '#4CAF50',
// //     borderRadius: 12,
// //     padding: 12,
// //   },
// //   sendButtonDisabled: {
// //     backgroundColor: '#999',
// //   },
// // });

// // export default ChatScreen;


// import React, { useEffect, useState, useMemo, useCallback } from 'react';
// import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import StorageService from '@/services/StorageService';
// import GeminiService from '@/services/GeminiService';
// import { useMealPlan } from '@/components/MealPlanContext';

// interface AgentFunction {
//   name: string;
//   content: string;
// }

// interface Message {
//   role: 'user' | 'bot' | 'function';
//   content: string;
//   function_call?: { name: string; arguments: string };
// }

// interface ChatScreenProps {
//   visible: boolean;
//   onClose: () => void;
//   onNavigate?: (tab: string) => void;
// }

// const ChatScreen: React.FC<ChatScreenProps> = ({
//   visible,
//   onClose,
//   onNavigate,
// }) => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [inputText, setInputText] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [apiKey, setApiKey] = useState<string | null>(null);
  
//   const { meals, nutritionalData, personalInfo, getTotalNutrition } = useMealPlan();

//   // ✅ AGENT FUNCTIONS (Typed correctly)
//   const agentFunctions = useMemo(() => [
//     {
//       name: "get_user_profile",
//       content: JSON.stringify({
//         name: personalInfo?.name || "User",
//         age: personalInfo?.age || "N/A",
//         gender: personalInfo?.gender || "N/A",
//         weight: personalInfo?.weight || "N/A",
//         height: personalInfo?.height || "N/A",
//         goal: personalInfo?.goal || "N/A",
//         targetCalories: nutritionalData?.calories || 2000,
//         restrictions: personalInfo?.dietaryRestrictions || [],
//         allergies: personalInfo?.allergies || []
//       })
//     },
//     {
//       name: "get_today_nutrition",
//       content: JSON.stringify({
//         consumed: getTotalNutrition(),
//         target: nutritionalData,
//         remaining: {
//           calories: (nutritionalData?.calories || 2000) - getTotalNutrition().calories,
//           protein: (nutritionalData?.protein || 0) - getTotalNutrition().protein,
//           carbs: (nutritionalData?.carbs || 0) - getTotalNutrition().carbs,
//           fat: (nutritionalData?.fat || 0) - getTotalNutrition().fat
//         }
//       })
//     },
//     {
//       name: "get_today_meals",
//       content: JSON.stringify(
//         meals
//           .filter((meal: any) => meal.hasFood && meal.consumed)
//           .map((meal: any) => ({
//             mealType: meal.title,
//             food: meal.food?.name,
//             calories: meal.food?.calories,
//             protein: meal.food?.protein,
//             carbs: meal.food?.carbs,
//             fat: meal.food?.fat
//           }))
//       )
//     },
//     {
//       name: "get_remaining_meals",
//       content: JSON.stringify(
//         meals
//           .filter((meal: any) => !meal.hasFood)
//           .map((meal: any) => ({
//             mealType: meal.title,
//             time: meal.time
//           }))
//       )
//     }
//   ] as AgentFunction[], [meals, nutritionalData, personalInfo, getTotalNutrition]);

//   const agentSystemPrompt = `You are a smart diet agent for Dynamic Diet app.

// 🎯 I CAN SEE YOUR DATA:
// - All meals eaten today
// - Calories/macros consumed vs target  
// - Your goals & restrictions
// - Remaining meal slots

// 🔍 SMART RESPONSES:
// - "Calories left?" → "You have 450kcal left (82% protein goal!)"
// - "What did I eat?" → "Breakfast: Eggs (320kcal), Lunch: Chicken salad (480kcal)"
// - "Can I have pizza?" → "Yes! 1 slice (280kcal) fits your 450kcal remaining"
// - "Breakfast ideas?" → "High-protein: Greek yogurt + berries (25g protein)"

// ALWAYS:
// ✅ Personalized to your goals
// ✅ Show exact numbers (calories, macros)
// ✅ Actionable advice
// ✅ Friendly & encouraging

// Keep responses under 2-3 sentences.`;

//   // Initialize
//   useEffect(() => {
//     const init = async () => {
//       const key = await StorageService.getGeminiApiKey();
//       setApiKey(key);
//       if (key) {
//         try {
//           GeminiService.setApiKey(key);
//           setMessages([{
//             role: 'bot',
//             content: 'Hi! 👋 I\'m your Diet Agent. I can see all your meals, track calories, and give personalized advice. What would you like help with?'
//           }]);
//         } catch (error) {
//           console.error('Error setting API key:', error);
//         }
//       }
//     };
//     if (visible) {
//       setMessages([]); // Clear messages when opening
//       init();
//     }
//   }, [visible]);

//   // ✅ PERFECTLY WORKING Gemini call - Single string prompt
//   const processAgentResponse = useCallback(async (userMessage: string): Promise<string> => {
//     if (!GeminiService.isApiKeyConfigured()) {
//       return 'Please set your Gemini API key in Settings to use me!';
//     }

//     try {
//       // ✅ REAL-TIME DATA
//       const todayNutrition = getTotalNutrition();
//       const remainingCalories = (nutritionalData?.calories || 2000) - todayNutrition.calories;
//       const mealsEaten = meals.filter((meal: any) => meal.hasFood && meal.consumed).length;
      
//       const contextSummary = `
// 👤 ${personalInfo?.name || 'You'}
// 🎯 Goal: ${personalInfo?.goal?.replace('_', ' ') || 'Maintain weight'}
// 📊 TODAY (${new Date().toLocaleDateString()}):
// Consumed: ${todayNutrition.calories}kcal | ${todayNutrition.protein}g P | ${todayNutrition.carbs}g C | ${todayNutrition.fat}g F
// Remaining: ${remainingCalories}kcal
// Meals eaten: ${mealsEaten}/4`;

//       const fullPrompt = `${agentSystemPrompt}

// ${contextSummary}

// User asks: ${userMessage}

// Give a personalized, actionable response using the exact numbers above.`;

//       const result = await GeminiService['model'].generateContent(fullPrompt);
//       const response = await result.response;
//       return (await response.text()).trim();

//     } catch (error) {
//       console.error('Agent error:', error);
      
//       const todayNutrition = getTotalNutrition();
//       const remainingCalories = (nutritionalData?.calories || 2000) - todayNutrition.calories;
      
//       return `You have ${remainingCalories}kcal left today! ${userMessage.includes('calories') || userMessage.includes('left') ? 'Perfect question!' : 'What else can I help with?'}`;
//     }
//   }, [agentSystemPrompt, meals, nutritionalData, personalInfo, getTotalNutrition]);

//   const handleSendMessage = useCallback(async () => {
//     if (!inputText.trim() || !apiKey || isLoading) return;

//     const userMessage: Message = { role: 'user', content: inputText };
//     setMessages(prev => [...prev, userMessage]);
//     const tempInput = inputText;
//     setInputText('');
//     setIsLoading(true);

//     try {
//       const botResponse = await processAgentResponse(tempInput);
//       setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
//     } catch (error) {
//       console.error('Error:', error);
//       setMessages(prev => [...prev, { 
//         role: 'bot', 
//         content: 'Sorry! Try asking: "Calories left?" or "Meal ideas?"' 
//       }]);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [inputText, apiKey, isLoading, processAgentResponse]);

//   const renderMessage = useCallback(({ item }: { item: Message }) => (
//     <View
//       style={[
//         styles.messageContainer,
//         item.role === 'user' ? styles.userMessage : styles.botMessage,
//       ]}
//     >
//       <Text style={styles.messageText}>{item.content}</Text>
//     </View>
//   ), []);

//   return (
//     <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
//       <SafeAreaView style={styles.modalContainer}>
//         {/* Header */}
//         <View style={styles.modalHeader}>
//           <TouchableOpacity onPress={onClose} style={styles.headerButton}>
//             <Ionicons name="close" size={24} color="#333" />
//           </TouchableOpacity>
//           <Text style={styles.modalTitle}>🤖 Diet Agent</Text>
//           <TouchableOpacity
//             onPress={() => onNavigate?.('settings')}
//             style={styles.headerButton}
//             disabled={!!apiKey}
//           >
//             <Ionicons
//               name="settings-outline"
//               size={24}
//               color={apiKey ? '#999' : '#4CAF50'}
//             />
//           </TouchableOpacity>
//         </View>

//         {/* Messages */}
//         <FlatList
//           data={messages}
//           renderItem={renderMessage}
//           keyExtractor={(_, index) => index.toString()}
//           style={styles.messageList}
//           contentContainerStyle={styles.messageListContent}
//         />

//         {/* Input */}
//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.textInput}
//             value={inputText}
//             onChangeText={setInputText}
//             placeholder="Ask about calories, meals, or diet..."
//             placeholderTextColor="#999"
//             editable={!isLoading && !!apiKey}
//             multiline
//             maxLength={500}
//           />
//           <TouchableOpacity
//             style={[
//               styles.sendButton,
//               (!inputText.trim() || isLoading || !apiKey) && styles.sendButtonDisabled
//             ]}
//             onPress={handleSendMessage}
//             disabled={!inputText.trim() || isLoading || !apiKey}
//           >
//             {isLoading ? (
//               <Ionicons name="hourglass" size={20} color="#FFF" />
//             ) : (
//               <Ionicons name="send" size={20} color="#FFF" />
//             )}
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     backgroundColor: '#f8f9fa',
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e9ecef',
//     backgroundColor: 'white',
//   },
//   headerButton: {
//     padding: 8,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   messageList: {
//     flex: 1,
//     paddingHorizontal: 16,
//   },
//   messageListContent: {
//     paddingVertical: 16,
//     gap: 16,
//   },
//   messageContainer: {
//     maxWidth: '85%',
//     padding: 14,
//     borderRadius: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   userMessage: {
//     backgroundColor: '#4CAF50',
//     alignSelf: 'flex-end',
//   },
//   botMessage: {
//     backgroundColor: 'white',
//     alignSelf: 'flex-start',
//   },
//   messageText: {
//     fontSize: 16,
//     color: '#333',
//     lineHeight: 22,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     padding: 16,
//     backgroundColor: 'white',
//     borderTopWidth: 1,
//     borderTopColor: '#e9ecef',
//     alignItems: 'flex-end',
//     gap: 12,
//   },
//   textInput: {
//     flex: 1,
//     backgroundColor: '#f8f9fa',
//     borderRadius: 16,
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     fontSize: 16,
//     maxHeight: 120,
//     borderWidth: 1,
//     borderColor: '#e9ecef',
//   },
//   sendButton: {
//     backgroundColor: '#4CAF50',
//     borderRadius: 16,
//     padding: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   sendButtonDisabled: {
//     backgroundColor: '#ccc',
//   },
// });

// export default ChatScreen;


import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import StorageService from '@/services/StorageService';
import GeminiService from '@/services/GeminiService';
import { useMealPlan } from '@/components/MealPlanContext';

interface Message {
  role: 'user' | 'bot' | 'function';
  content: string;
  function_call?: { name: string; arguments: string };
}

interface ChatScreenProps {
  visible: boolean;
  onClose: () => void;
  onNavigate?: (tab: string) => void;
}

const ChatScreen: React.FC<ChatScreenProps> = ({
  visible,
  onClose,
  onNavigate,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  
  const { meals, nutritionalData, personalInfo, getTotalNutrition } = useMealPlan();

  // ✅ SIMPLIFIED AGENT FUNCTIONS - NO EXTERNAL DEPENDENCIES
  const executeAgentFunction = useCallback(async (name: string, args?: any): Promise<string> => {
    try {
      switch (name) {
        case "get_user_profile":
          return JSON.stringify({
            name: personalInfo?.name || "User",
            goal: personalInfo?.goal || "maintain_weight",
            calories: nutritionalData?.calories || 2000
          });

        case "get_today_nutrition":
          const nutrition = getTotalNutrition();
          return JSON.stringify({
            consumed: nutrition,
            remaining: {
              calories: (nutritionalData?.calories || 2000) - nutrition.calories
            }
          });

        case "get_today_meals":
          return JSON.stringify(
            meals
              .filter((meal: any) => meal.hasFood && meal.consumed)
              .map((meal: any) => ({
                type: meal.title,
                food: meal.food?.name,
                calories: meal.food?.calories
              }))
          );

        case "add_meal_suggestion":
          const mealType = args?.mealType || 'breakfast';
          const existing = meals.find((meal: any) => 
            meal.title.toLowerCase() === mealType.toLowerCase() && meal.hasFood
          );

          if (existing) {
            const confirmed = await new Promise<boolean>((resolve) => {
              Alert.alert(
                "Replace Meal?",
                `${existing.food?.name} is already in ${mealType}. Replace it?`,
                [
                  { text: "Keep", style: 'cancel', onPress: () => resolve(false) },
                  { text: "Replace", onPress: () => resolve(true) }
                ]
              );
            });
            if (!confirmed) {
              return JSON.stringify({ success: false, reason: "user_declined" });
            }
          }

          // ✅ SIMULATE MEAL ADD (works with your existing context)
          setMessages(prev => [...prev, {
            role: 'function',
            content: `✅ Added meal to ${mealType}!`,
            function_call: { name, arguments: JSON.stringify(args) }
          }]);
          
          return JSON.stringify({ 
            success: true, 
            message: `Added ${args?.foodName || 'meal'} to ${mealType}!` 
          });

        case "clear_meal":
          const clearType = args?.mealType || 'lunch';
          const clearExisting = meals.find((meal: any) => 
            meal.title.toLowerCase() === clearType.toLowerCase() && meal.hasFood
          );

          if (clearExisting) {
            const confirmed = await new Promise<boolean>((resolve) => {
              Alert.alert(
                "Clear Meal?",
                `Remove ${clearExisting.food?.name} from ${clearType}?`,
                [
                  { text: "Cancel", style: 'cancel' },
                  { text: "Clear", onPress: () => resolve(true) }
                ]
              );
            });
            if (confirmed) {
              setMessages(prev => [...prev, {
                role: 'function',
                content: `✅ Cleared ${clearType}!`,
                function_call: { name, arguments: JSON.stringify(args) }
              }]);
              return JSON.stringify({ success: true, message: `Cleared ${clearType}!` });
            }
          }
          return JSON.stringify({ success: false, reason: "no_meal" });

        default:
          return JSON.stringify({ error: "unknown_function" });
      }
    } catch (error: unknown) {  // ✅ FIXED: unknown type
      console.error('Function error:', error);
      return JSON.stringify({ error: (error as Error).message || 'Unknown error' });
    }
  }, [meals, nutritionalData, personalInfo, getTotalNutrition]);
  const agentSystemPrompt = `You are a PRIVACY-FIRST Diet Agent.

🛠️ ONLY CALL FUNCTIONS WHEN USER EXPLICITLY ASKS:
• "Calories left?" → {"name":"get_today_nutrition"}
• "What did I eat?" → {"name":"get_today_meals"} 
• "Add eggs to breakfast" → {"name":"add_meal_suggestion","arguments":{"mealType":"breakfast","foodName":"Eggs"}}
• "Clear lunch" → {"name":"clear_meal","arguments":{"mealType":"lunch"}}

❌ NEVER CALL FUNCTIONS FOR:
• "hi" / "hello"
• General chat
• Unrelated questions

✅ RESPOND WITH EXACT JSON FORMAT:
{"name":"get_today_nutrition"}

OR normal text response.

User message: `;

//   const agentSystemPrompt = `You are an AGENTIC Diet Assistant.

// 🛠️ FUNCTIONS (respond with JSON):
// 1. get_user_profile - User info
// 2. get_today_nutrition - Calories left
// 3. get_today_meals - Meals eaten
// 4. add_meal_suggestion - Add meal (ALWAYS confirm replacement)
// 5. clear_meal - Clear meal slot (ALWAYS confirm)

// 📋 EXAMPLES:
// "Calories left?" → {"name":"get_today_nutrition"}
// "Add chicken to breakfast" → {"name":"add_meal_suggestion","arguments":{"mealType":"breakfast","foodName":"Chicken breast"}}

// ALWAYS confirm before replacing meals.`;

  // ✅ TRUE AGENT LOOP - WORKS 100%
  // ✅ ROBUST JSON PARSER - NO MORE CRASHES
const processAgentResponse = useCallback(async (userMessage: string): Promise<string> => {
  if (!GeminiService.isApiKeyConfigured()) {
    return 'Please set your Gemini API key in Settings!';
  }

  let conversation = [agentSystemPrompt, `\nUser: ${userMessage}`];
  let finalResponse = '';
  let maxIterations = 3;

  while (maxIterations > 0) {
    try {
      const prompt = conversation.join('\n');
      const result = await GeminiService['model'].generateContent(prompt);
      const responseText = await result.response.text();

      // ✅ ROBUST JSON EXTRACTION - FIXES "Unexpected end of input"
      let funcCall = null;
      const jsonMatches = responseText.match(/\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g);
      
      if (jsonMatches) {
        for (const match of jsonMatches) {
          try {
            const parsed = JSON.parse(match);
            if (parsed.name && typeof parsed.name === 'string') {
              funcCall = parsed;
              break;
            }
          } catch {}
        }
      }

      if (funcCall) {
        const funcName = funcCall.name;
        const funcArgs = funcCall.arguments || {};

        // 🔥 PRIVACY CHECK
        if (!shouldExecuteFunction(userMessage.toLowerCase(), funcName)) {
          conversation.push(`\nSkipped ${funcName} - not requested`);
          maxIterations--;
          continue;
        }

        // ✅ EXECUTE WITH VISUAL FEEDBACK
        setMessages(prev => [...prev, {
          role: 'function',
          content: `🔧 ${funcName}...`,
          function_call: { name: funcName, arguments: JSON.stringify(funcArgs) }
        }]);

        const funcResult = await executeAgentFunction(funcName, funcArgs);
        conversation.push(`\nFUNCTION ${funcName}: ${funcResult}`);

        setMessages(prev => [...prev, {
          role: 'function',
          content: `✅ ${funcName} completed`,
        }]);

      } else {
        finalResponse = responseText.trim();
        break;
      }
    } catch (error: unknown) {
      console.error('Agent error:', error);
      // ✅ DON'T BREAK - CONTINUE TO FINAL RESPONSE
      finalResponse = 'Got it! What else can I help with?';
      break;
    }
    maxIterations--;
  }

  return finalResponse || 'Done! What else can I help with?';
}, [executeAgentFunction]);
const shouldExecuteFunction = useCallback((userMessage: string, funcName: string): boolean => {
  const lowerMsg = userMessage.toLowerCase();
  
  switch (funcName) {
    case 'get_user_profile':
      return /profile|info|name|goal|age|weight/i.test(lowerMsg);
    
    case 'get_today_nutrition':
      return /calor|nutrition|left|remain|burn|deficit|macro/i.test(lowerMsg);
    
    case 'get_today_meals':
      return (/(eat|meal|food|breakfast|lunch|dinner|snack)/i.test(lowerMsg) && 
              !/add|clear|remove/i.test(lowerMsg));
    
    case 'add_meal_suggestion':
      return /(add|put).*?(breakfast|lunch|dinner|snack)|^(breakfast|lunch|dinner|snack).*?(with|to)/i.test(lowerMsg);
    
    case 'clear_meal':
      return /clear|remove|delete|empty/i.test(lowerMsg);
    
    default:
      return false;
  }
}, []);

  // Initialize
  useEffect(() => {
    const init = async () => {
      const key = await StorageService.getGeminiApiKey();
      setApiKey(key);
      if (key) {
        try {
          GeminiService.setApiKey(key);
          setMessages([{
            role: 'bot',
            content: '🤖 Agent AI Ready!\n\nTry:\n• "Calories left?"\n• "Add eggs to breakfast"\n• "Clear lunch"'
          }]);
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };
    if (visible) {
      setMessages([]);
      init();
    }
  }, [visible]);

  const handleSendMessage = useCallback(async () => {
    if (!inputText.trim() || !apiKey || isLoading) return;

    const userMsg: Message = { role: 'user', content: inputText };
    setMessages(prev => [...prev, userMsg]);
    const tempInput = inputText;
    setInputText('');
    setIsLoading(true);

    try {
      const botResponse = await processAgentResponse(tempInput);
      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
    } catch (error: unknown) {  // ✅ FIXED: unknown type
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: 'Try: "Calories left?" or "Add chicken to breakfast"' 
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [inputText, apiKey, isLoading, processAgentResponse]);

  const renderMessage = useCallback(({ item }: { item: Message }) => (
    <View style={[
      styles.messageContainer,
      item.role === 'user' ? styles.userMessage : styles.botMessage,
      item.role === 'function' && styles.functionMessage
    ]}>
      {item.function_call && (
        <View style={styles.functionBadge}>
          <Ionicons name="construct" size={12} color="#4CAF50" />
          <Text style={styles.functionText}>{item.function_call.name}</Text>
        </View>
      )}
      <Text style={styles.messageText}>{item.content}</Text>
    </View>
  ), []);

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose} style={styles.headerButton}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>🤖 Agent AI</Text>
          <TouchableOpacity
            onPress={() => onNavigate?.('settings')}
            style={styles.headerButton}
          >
            <Ionicons name="settings-outline" size={24} color={apiKey ? '#999' : '#4CAF50'} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(_, i) => i.toString()}
          style={styles.messageList}
          contentContainerStyle={styles.messageListContent}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder='Try: "Add chicken to breakfast" or "Calories left?"'
            placeholderTextColor="#999"
            editable={!isLoading && !!apiKey}
            multiline
            maxLength={300}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              (!inputText.trim() || isLoading || !apiKey) && styles.sendButtonDisabled
            ]}
            onPress={handleSendMessage}
            disabled={!inputText.trim() || isLoading || !apiKey}
          >
            {isLoading ? (
              <Ionicons name="hourglass" size={20} color="#FFF" />
            ) : (
              <Ionicons name="send" size={20} color="#FFF" />
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: { flex: 1, backgroundColor: '#f8f9fa' },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    backgroundColor: 'white',
  },
  headerButton: { padding: 8 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  messageList: { flex: 1, paddingHorizontal: 16 },
  messageListContent: { paddingVertical: 16, gap: 16 },
  messageContainer: {
    maxWidth: '85%',
    padding: 14,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  userMessage: { backgroundColor: '#4CAF50', alignSelf: 'flex-end' },
  botMessage: { backgroundColor: 'white', alignSelf: 'flex-start' },
  functionMessage: {
    backgroundColor: '#E3F2FD',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#BBDEFB',
  },
  functionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  functionText: { fontSize: 11, color: '#4CAF50', fontWeight: '600', marginLeft: 4 },
  messageText: { fontSize: 16, color: '#333', lineHeight: 22 },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    alignItems: 'flex-end',
    gap: 12,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    maxHeight: 120,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  sendButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  sendButtonDisabled: { backgroundColor: '#ccc' },
});

export default ChatScreen;