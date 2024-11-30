import { localStorageData } from "@/service/cache";
import { sutraApi } from "@/service/sutra";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { queryClient } from '@/service/queryClient';

// Define types for navigation routes
type RootStackParamItemsScreen = {
     Categories: undefined;
     Items: { category: string }; // Category string for filtering items
     Details: { item: any }; // Details screen expects an item object
};


// Define route parameters
export type RootStackParamSutraScreen = {
     Categories: undefined;
     '(sutra)/ItemsScreen': { category: string }; // Match route name
     Details: { item: any };
};


// Define navigation prop for the SutraScreen
type SutraScreenNavigationProp = StackNavigationProp<
     RootStackParamSutraScreen,
     'Categories'
>;

export const useSutra = () => {
     const { data, isLoading, error } = useQuery({
          queryKey: ['sutra'],
          queryFn: sutraApi,
     });

     const info = data?.map((item) => item);

     // SutraScreen

     const navigation = useNavigation<SutraScreenNavigationProp>(); // Typed navigation

     // Safely ensure data isn't null or undefined
     const categoryData = data || [];

     // Collect unique categories from the data
     const categories = Array.from(
          new Set(categoryData.map((item: any) => item['ໝວດທັມ']) || [])
     );

     // Handle navigation to ItemsScreen
     const handleCategoryPress = (category: string) => {
          // Navigate to the Items screen by passing the selected category
          if (Platform.OS === 'web') {
               // For web, append the category key to the URL search params
               const url = new URL(window.location.href);
               url.searchParams.set('category', category);
               window.history.pushState({}, '', url.toString());
               queryClient.setQueryData(['category'], category);
               navigation.navigate('(sutra)/ItemsScreen', { category }); // Match route name
          } else {
               queryClient.setQueryData(['category'], category);
               navigation.navigate('(sutra)/ItemsScreen', { category }); // Match route name
          }

     };

     // ItemsScreen
     const route = useRoute<RouteProp<RootStackParamItemsScreen, 'Items'>>();

     // Get the category parameter from navigation or URL (for web)
     const category =
          Platform.OS === 'web'
               ? new URLSearchParams(window.location.search).get('category') || ''
               : route.params?.category || ''; // Handle undefined values safely

     // Filter data based on the selected category (or fallback category)
     const filteredItems = data?.filter((item: any) => {
          const itemCategory = item['ໝວດທັມ']; // Assumes `item['ໝວດທັມ']` is the category field
          return (
               itemCategory === category ||
               (!category && itemCategory === localStorageData.getCategory())
          );
     });

     return {
          // State
          data: info, isLoading, error,

          // ItemsScreen
          filteredItems, category,

          // SutraScreen
          categories,
          handleCategoryPress

     };
};

