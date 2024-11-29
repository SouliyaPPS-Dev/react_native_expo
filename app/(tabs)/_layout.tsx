import React from 'react';
import { Image } from 'react-native';
import ColorModeToggle from '@/components/ColorModeToggle';
import { Tabs } from 'expo-router';
import { useColorMode } from 'native-base';

export default function TabLayout() {
  const { colorMode } = useColorMode();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorMode === 'dark' ? 'white' : 'black',
        tabBarStyle: {
          backgroundColor: colorMode === 'dark' ? '#1f1f1f' : '#ffffff',
          borderTopWidth: 1,
          borderTopColor: colorMode === 'dark' ? '#333' : '#ccc',
          height: 60, // Adjust height for icons and text stacking
        },
        tabBarLabelStyle: {
          fontFamily: 'PhetsarathOT',
          fontSize: 14, // Larger font size for readability
          lineHeight: 18, // Ensure adequate spacing for taller text
        },
        tabBarItemStyle: {
          flexDirection: 'column', // Stack image and text vertically
          justifyContent: 'center',
          alignItems: 'center',
          width: 'auto',
        },
        headerStyle: {
          backgroundColor: colorMode === 'light' ? '#ffffff' : '#1f1f1f',
        },
        headerTitleStyle: {
          fontFamily: 'PhetsarathOT',
          fontSize: 18,
        },
        headerTintColor: colorMode === 'dark' ? '#ffffff' : '#1f1f1f',
        headerRight: () => <ColorModeToggle />,
        lazy: true,
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name='index'
        options={{
          title: 'ໜ້າຫຼັກ',
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('@/assets/images/home.png') // Active state image
                  : require('@/assets/images/home.png') // Inactive state image
              }
              style={{
                width: 24,
                height: 24,
                opacity: focused ? 1 : 0.5,
              }}
            />
          ),
        }}
      />
      {/* Sutra Tab */}
      <Tabs.Screen
        name='(sutra)/sutra'
        options={{
          title: 'ພຣະສູດ',
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('@/assets/images/sutra.png') // Active state
                  : require('@/assets/images/sutra.png') // Inactive state
              }
              style={{
                width: 24,
                height: 24,
                opacity: focused ? 1 : 0.5,
              }}
            />
          ),
        }}
      />
      {/* Book Tab */}
      <Tabs.Screen
        name='(book)/book'
        options={{
          title: 'ປື້ມ',
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('@/assets/images/book.png') // Active state
                  : require('@/assets/images/book.png') // Inactive state
              }
              style={{
                width: 24,
                height: 24,
                opacity: focused ? 1 : 0.5,
              }}
            />
          ),
        }}
      />
      {/* Calendar Tab */}
      <Tabs.Screen
        name='(calendar)/calendar'
        options={{
          title: 'ປະຕິທິນທັມ',
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('@/assets/images/calendar.png') // Active state
                  : require('@/assets/images/calendar.png') // Inactive state
              }
              style={{
                width: 24,
                height: 24,
                opacity: focused ? 1 : 0.5,
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
