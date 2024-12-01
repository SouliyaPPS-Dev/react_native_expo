import { colorModeManager } from '@/constants/colorModeManager';
import { bgColor, nativeBaseTheme } from '@/constants/nativeBaseTheme';
import {
  asyncStoragePersister,
  persister,
  queryClient,
} from '@/service/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { Box, ColorMode, NativeBaseProvider, useColorMode } from 'native-base';
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

  // Determine the appropriate persister based on platform
  const isWeb = Platform.OS === 'web';
  const selectedPersister = isWeb ? persister : asyncStoragePersister;

  return (
    <PersistedAppProvider
      colorMode={colorMode}
      persister={selectedPersister}
      isWeb={isWeb}
    />
  );
}

// Abstracted component for rendering app with persistence and theming
function PersistedAppProvider({
  colorMode,
  persister,
  isWeb,
}: {
  colorMode: ColorMode;
  persister: any;
  isWeb: boolean;
}) {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <NativeBaseProvider
        theme={nativeBaseTheme(colorMode)}
        colorModeManager={colorModeManager}
        isSSR={false}
      >
        <SafeAreaProvider>
          <Box
            flex={1}
            fontFamily='PhetsarathOT'
            bg={{ base: bgColor(colorMode) }}
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
      {isWeb && <ReactQueryDevtools initialIsOpen={false} />}
    </PersistQueryClientProvider>
  );
}
