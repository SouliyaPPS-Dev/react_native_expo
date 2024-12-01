import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient } from '@tanstack/react-query';

const isBrowser = typeof window !== 'undefined';

// Define a 1-day timeout in milliseconds
const ONE_DAY = 24 * 60 * 60 * 1000;

export const queryClient = new QueryClient({
     defaultOptions: {
          queries: {
               // Mark data as stale after 1 day
               staleTime: ONE_DAY,
               gcTime: 1000 * 60 * 60 * 24, // 24 hours
               retry: false, // Disable retries
               throwOnError: (error: any) => {
                    console.error('Query Error:', error.message);
                    return true;
               },
          },
          mutations: {
               onError: (error: any) => {
                    console.error('Mutation Error:', error.message);
               },
          },
     },
});

// Move asyncStoragePersister before persister
export const asyncStoragePersister = createAsyncStoragePersister({
     storage: AsyncStorage,
});

// Use appropriate persister based on platform
export const persister = isBrowser
     ? createSyncStoragePersister({ storage: window.localStorage })
     : asyncStoragePersister;
