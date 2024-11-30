import ColorModeToggle from '@/components/ColorModeToggle';
import { useCategory } from '@/hooks/sutra/useCategory';
import { Tabs } from 'expo-router';
import { useColorMode } from 'native-base';
import React from 'react';
import { Image } from 'react-native';

// Mapping object for icons
const ICONS = {
  home: require('@/assets/images/home.png'),
  sutra: require('@/assets/images/sutra.png'),
  book: require('@/assets/images/book.png'),
  calendar: require('@/assets/images/calendar.png'),
};

export default function TabLayout() {
  const { colorMode } = useColorMode();

  const { category } = useCategory();

  // Helper Function: Render Tabs
  const renderTab = (
    name: string,
    title: string,
    iconKey: keyof typeof ICONS
  ) => (
    <Tabs.Screen
      name={name}
      options={{
        title,
        tabBarIcon: ({ focused }) => (
          <Image
            source={ICONS[iconKey]} // Use statically mapped icons
            style={{
              width: 24,
              height: 24,
              opacity: focused ? 1 : 0.5,
            }}
          />
        ),
      }}
    />
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorMode === 'dark' ? 'white' : 'black',
        tabBarStyle: {
          backgroundColor: colorMode === 'dark' ? '#1f1f1f' : '#ffffff',
          borderTopWidth: 1,
          borderTopColor: colorMode === 'dark' ? '#333' : '#ccc',
          height: 60, // Space for icons and text
        },
        tabBarLabelStyle: {
          fontFamily: 'PhetsarathOT',
          fontSize: 14,
          lineHeight: 18,
        },
        tabBarItemStyle: {
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: 'auto',
        },
        headerStyle: {
          backgroundColor: colorMode === 'dark' ? '#1f1f1f' : '#ffffff',
        },
        headerTitleStyle: {
          fontFamily: 'PhetsarathOT',
          fontSize: 18,
        },
        headerTintColor: colorMode === 'dark' ? '#ffffff' : '#1f1f1f',
        headerRight: () => <ColorModeToggle />,
        lazy: true, // Lazily load tabs for performance
      }}
    >
      {/* Home Tab */}
      {renderTab('index', 'ໜ້າຫຼັກ', 'home')}

      {/* Sutra Tab */}
      {renderTab('(sutra)/sutra', 'ພຣະສູດ', 'sutra')}

      {/* Book Tab */}
      {renderTab('(book)/book', 'ປື້ມ', 'book')}

      {/* Calendar Tab */}
      {renderTab('(calendar)/calendar', 'ປະຕິທິນທັມ', 'calendar')}

      {/* ItemsScreen Tab */}
      <Tabs.Screen
        name='(sutra)/ItemsScreen'
        options={{
          title: category, // Dynamically set the title
          href: null, // Disable native tab navigation
        }}
      />
    </Tabs>
  );
}
