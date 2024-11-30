import { QueryClient } from "@tanstack/react-query";

// Initialize QueryClient instance for TanStack Query

export const queryClient = new QueryClient({
     defaultOptions: {
          queries: {
               staleTime: Infinity, // Cache queries indefinitely
               retry: 1, // Retry failed queries once
               refetchOnWindowFocus: false, // Disable refetching on window focus
               throwOnError: (error: any) => {
                    // create notification message error
                    console.log('=> Query Error:', error.message);
                    return true;
               },
          },
          mutations: {
               onError: (error: any) => {
                    console.log('=> Mutation Error:', error.message);
               },
          },
     },
});