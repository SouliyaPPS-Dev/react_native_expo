import { localStorageData } from "@/service/cache";
import { queryClient } from "@/service/queryClient";
import { sutraApi } from "@/service/sutra";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

// Define Types for Navigation
type RootStackParamItemsScreen = {
     Categories: undefined;
     Items: { category: string }; // Category for filtering items
     Details: { item: any }; // Passing an item object
};
type RootStackParamSutraScreen = RootStackParamItemsScreen & {
     "(sutra)/ItemsScreen": { category: string }; // Match route name
};
type SutraScreenNavigationProp = StackNavigationProp<RootStackParamSutraScreen, "Categories">;

// Custom Hook for Fetching and Filtering Sutras
export const useSutra = () => {
     const [resolvedCategory, setResolvedCategory] = useState<string>("");
     const navigation = useNavigation<SutraScreenNavigationProp>();
     const route = useRoute<RouteProp<RootStackParamItemsScreen, "Items">>();

     // Fetch Sutra API Data
     const { data, isLoading, error } = useQuery({
          queryKey: ["sutra"],
          queryFn: sutraApi,
     });
     const sutraData = data || [];

     // Extract Unique Categories from Data
     const categories = Array.from(new Set(sutraData.map((item: any) => item["ໝວດທັມ"])));

     // Handle Navigation to Items Screen
     const handleCategoryPress = (category: string) => {
          queryClient.setQueryData(["category"], category); // Cache category
          navigation.navigate("(sutra)/ItemsScreen", { category });
     };

     // Resolve Category on Component Mount
     useEffect(() => {
          const resolveCategory = async () => {
               let category = "";
               if (Platform.OS === "web") {
                    category =
                         new URLSearchParams(window.location.search || "").get("category") || "";
               } else {
                    category = route?.params?.category || (await localStorageData.getCategory());
               }
               setResolvedCategory(category);
          };
          resolveCategory();
     }, [route?.params]);

     // Filter Items Based on Resolved Category
     const filteredItems = sutraData.filter((item: any) => {
          return item["ໝວດທັມ"] === resolvedCategory;
     });

     return {
          // Expose Data and Utility Functions
          data,
          isLoading,
          error,
          filteredItems,
          category: resolvedCategory,
          categories,
          handleCategoryPress,
     };
};