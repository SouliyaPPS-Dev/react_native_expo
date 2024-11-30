import AsyncStorage from '@react-native-async-storage/async-storage';
import { localStorageData } from '@/service/cache'; // Handles platform-specific web storage
import { queryClient } from '@/service/queryClient';
import { useQuery } from '@tanstack/react-query';
import { Platform } from 'react-native';
import { useEffect, useState } from 'react';

// Helper Function: Read `category` from query params (Web Only)
const getCategoryFromQueryParams = () => {
     if (Platform.OS === 'web') {
          if (typeof window !== 'undefined') {
               const params = new URLSearchParams(window.location.search);
               return params.get('category') ?? null;
          }
     }
     return null;
};

// Function to Get Initial Category (Platform Agnostic)
const getInitialCategory = async () => {
     if (Platform.OS === 'web') {
          const savedCategory = localStorageData.getCategory();
          return savedCategory ?? 'ທັມ'; // Web fallback default
     } else {
          const savedCategory = await AsyncStorage.getItem('category');
          return savedCategory ?? 'ທັມ'; // Mobile fallback default
     }
};

// Custom Hook for Managing Categories
export const useCategory = () => {
     const [resolvedCategory, setResolvedCategory] = useState<string>('ທັມ'); // Default Category
     const { data: category } = useQuery<string>({
          queryKey: ['category'],
          queryFn: async () => {
               // Check if category is already cached
               const cachedCategory = queryClient.getQueryData<string>(['category']);
               return cachedCategory ?? (await getInitialCategory()); // Fallback if not cached
          },
     });

     // Sync on Web: Listen for Browser Navigation (e.g., Back/Forward)
     useEffect(() => {
          if (Platform.OS === 'web') {
               const handlePopState = () => {
                    const urlCategory = getCategoryFromQueryParams();
                    if (urlCategory) {
                         queryClient.setQueryData(['category'], urlCategory);
                         localStorageData.setCategory(urlCategory); // Persist to `localStorage`
                         setResolvedCategory(urlCategory);
                    }
               };
               window.addEventListener('popstate', handlePopState);
               return () => {
                    window.removeEventListener('popstate', handlePopState);
               };
          }
     }, []);

     // Sync on Mobile: Save to AsyncStorage When Category Changes
     useEffect(() => {
          if (category) {
               if (Platform.OS !== 'web') {
                    AsyncStorage.setItem('category', category).catch(console.error);
               }
               setResolvedCategory(category); // Update local state
          }
     }, [category]);

     // Return Resolved Category and a Helper Getter
     return {
          category: resolvedCategory,
          getInitialCategory,
     };
};