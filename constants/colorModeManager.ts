import { ColorMode } from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Color Mode Manager for persistent theme
export const colorModeManager = {
     get: async () => {
          try {
               const val = await AsyncStorage.getItem('@color-mode');
               return val === 'dark' ? 'dark' : 'light';
          } catch (e) {
               return 'light';
          }
     },
     set: async (value: ColorMode) => {
          try {
               if (value) {
                    await AsyncStorage.setItem('@color-mode', value);
               }
          } catch (e) {
               console.log(e);
          }
     },
};