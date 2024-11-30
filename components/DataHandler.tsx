import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface DataHandlerProps {
  isLoading: boolean; // Whether data is loading
  error: Error | null; // Any error that occurred
  data: any[] | null; // The fetched data
  loadingMessage?: string; // Optional custom loading message
  emptyMessage?: string; // Optional custom empty data message
  children: React.ReactNode;
}

export const DataHandler: React.FC<DataHandlerProps> = ({
  isLoading,
  error,
  data,
  loadingMessage = 'Loading...', // Default loading message
  emptyMessage = 'No data available.', // Default empty message
  children,
}) => {
  if (isLoading) {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator size='large' color='#333' />
        <ThemedText type='default'>{loadingMessage}</ThemedText>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText type='default' style={styles.errorText}>
          Error fetching data: {error.message}
        </ThemedText>
      </ThemedView>
    );
  }

  if (!data || data.length === 0) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText type='default'>{emptyMessage}</ThemedText>
      </ThemedView>
    );
  }

  // If none of the above states apply, render children (data rendering logic)
  return <>{children}</>;
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
