import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export const localStorageData = (() => {
     // Platform-specific implementations
     const setCategory = async (category: string) => {
          if (Platform.OS === 'web') {
               // Use localStorage for web
               localStorage.setItem('category', category);
          } else {
               // Use AsyncStorage for mobile (iOS/Android)
               await AsyncStorage.setItem('category', category);
          }
     };

     const getCategory = async () => {
          if (Platform.OS === 'web') {
               // Use localStorage for web
               return localStorage.getItem('category') || '';
          } else {
               // Use AsyncStorage for mobile (iOS/Android)
               const category = await AsyncStorage.getItem('category');
               return category || '';
          }
     };

     return { setCategory, getCategory };
})();