import AsyncStorage from '@react-native-async-storage/async-storage';
import { localStorageData } from '@/service/cache'; // Handles platform-specific web storage
import { queryClient } from '@/service/queryClient';
import { useQuery } from '@tanstack/react-query';
import { Platform } from 'react-native';
import { useEffect, useState } from 'react';

// Helper: Get Category from Query Params (Web Only)
const getCategoryFromQueryParams = (): string | null => {
     if (Platform.OS === 'web' && typeof window !== 'undefined') {
          return new URLSearchParams(window.location.search).get('category');
     }
     return null;
};

// Helper: Get Initial Category (Platform Agnostic)
const getInitialCategory = async (): Promise<string> => {
     if (Platform.OS === 'web') {
          return getCategoryFromQueryParams() ?? localStorageData.getCategory() ?? 'ທັມ';
     }
     const savedCategory = await AsyncStorage.getItem('category');
     return savedCategory ?? 'ທັມ';
};

// Hook: Manage and Sync Categories
export const useCategory = () => {
     const [resolvedCategory, setResolvedCategory] = useState<string>('ທັມ'); // Default Category

     // Fetch the current category, with fallback logic
     const { data: category } = useQuery<string>({
          queryKey: ['category'],
          queryFn: async () => queryClient.getQueryData<string>(['category']) ?? (await getInitialCategory()),
     });


     // Sync with Query Params on Web
     useEffect(() => {
          if (Platform.OS === 'web') {
               const syncCategoryWithParams = () => {
                    const urlCategory = getCategoryFromQueryParams();
                    if (urlCategory) {
                         queryClient.setQueryData(['category'], urlCategory);
                         localStorageData.setCategory(urlCategory);
                         setResolvedCategory(urlCategory);
                    }
               };

               // Initialize on mount
               syncCategoryWithParams();

               // Listen for Browser Navigation
               window.addEventListener('popstate', syncCategoryWithParams);
               return () => window.removeEventListener('popstate', syncCategoryWithParams);
          }
     }, []);

     // Sync to Local Storage (Web or Mobile)
     useEffect(() => {
          if (category) {
               setResolvedCategory(category);
               if (Platform.OS === 'web') {
                    localStorageData.setCategory(category);
               } else {
                    AsyncStorage.setItem('category', category).catch(console.error);
                    setResolvedCategory(category);
               }
          }
     }, [category]);

     return { category: resolvedCategory, getInitialCategory };
};