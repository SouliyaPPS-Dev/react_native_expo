import { colorModeManager } from '@/constants/colorModeManager';
import { bgColor, nativeBaseTheme } from '@/constants/nativeBaseTheme';
import { queryClient } from '@/service/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { Box, NativeBaseProvider, useColorMode } from 'native-base';
import React, { useEffect } from 'react';
import { Platform } from 'react-native'; // Import Platform to detect the current platform
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Prevent splash screen auto-hide
SplashScreen.preventAutoHideAsync();

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

  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider
        theme={nativeBaseTheme(colorMode)}
        colorModeManager={colorModeManager}
      >
        <SafeAreaProvider>
          <Box
            flex={1}
            fontFamily='PhetsarathOT'
            bg={{
              base: bgColor(colorMode),
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
        </SafeAreaProvider>
      </NativeBaseProvider>

      {/* Conditionally render ReactQueryDevtools for web only */}
      {Platform.OS === 'web' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
