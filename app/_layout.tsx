import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import {
  Box,
  ColorMode,
  NativeBaseProvider,
  extendTheme,
  useColorMode,
} from 'native-base';
import React, { useEffect } from 'react';

// Prevent splash screen auto-hide
SplashScreen.preventAutoHideAsync();

// Color Mode Manager for persistent theme
const colorModeManager = {
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

export default function RootLayout() {
  // Detect system color scheme
  const { colorMode } = useColorMode(); // Handle theme mode toggle
  // Load custom fonts (PhetsarathOT)
  const [fontsLoaded, fontsError] = useFonts({
    PhetsarathOT: require('@/assets/fonts/PhetsarathOT.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontsError) {
      SplashScreen.hideAsync(); // Hide splash screen on success or error
    }
  }, [fontsLoaded, fontsError]);

  // Block rendering until fonts are ready
  if (!fontsLoaded && !fontsError) {
    return null;
  }

  // Extend NativeBase Theme with PhetsarathOT as the default font
  const nativeBaseTheme = extendTheme({
    config: {
      initialColorMode: colorMode,
      useSystemColorMode: false, // Do not track system settings
    },
    colors: {
      primary: {
        50: '#f9e8d9', // Lightest shade
        100: '#f2cba8', // Light shade
        500: '#ab5f14', // Base (primary) color
        700: '#7f460f', // Dark shade
      },
      light: {
        background: '#ffffff',
        text: '#000000',
      },
      dark: {
        background: '#121212',
        text: '#ffffff',
      },
    },
    // Map fonts for PhetsarathOT across all components
    fontConfig: {
      PhetsarathOT: {
        400: {
          normal: 'PhetsarathOT', // Lightweight font usage
        },
        700: {
          normal: 'PhetsarathOT', // Bolder font usage
        },
      },
    },
    fonts: {
      heading: 'PhetsarathOT', // Heading text
      body: 'PhetsarathOT', // Body/Paragraph text
      mono: 'PhetsarathOT', // Monospace text
    },
    components: {
      Text: {
        baseStyle: (props: any) => ({
          fontFamily: 'PhetsarathOT',
          color: props.colorMode === 'dark' ? 'dark.text' : 'light.text',
          fontSize: 16,
          lineHeight: 24,
        }),
        sizes: {
          title: { fontSize: 32, fontWeight: 'bold' },
          subtitle: { fontSize: 20, fontWeight: 'bold' },
          default: { fontSize: 16, lineHeight: 24 },
          link: { fontSize: 16, lineHeight: 30, color: '#0a7ea4' },
        },
      },
      Heading: {
        baseStyle: (props: any) => ({
          ...props,
          fontFamily: 'PhetsarathOT',
          color: props.colorMode === 'dark' ? 'dark.text' : 'light.text',
        }),
      },
      Button: {
        baseStyle: (props: any) => ({
          ...props,
          _light: {
            fontFamily: 'PhetsarathOT',
            color: 'light.text', // Light mode text color
          },
          _dark: {
            fontFamily: 'PhetsarathOT',
            color: 'dark.text', // Dark mode text color
          },
        }),
      },
    },
  });

  const bgColor = colorMode === 'dark' ? 'background.dark' : 'background.light';

  return (
    <NativeBaseProvider
      theme={nativeBaseTheme}
      colorModeManager={colorModeManager}
    >
      <Box
        flex={1}
        fontFamily='PhetsarathOT'
        bg={{
          base: bgColor,
        }}
      >
        <Stack>
          <Stack.Screen
            name='(tabs)'
            options={{
              headerShown: false,
            }}
          />
        </Stack>

        <StatusBar style={colorMode === 'dark' ? 'light' : 'dark'} />
      </Box>
    </NativeBaseProvider>
  );
}
