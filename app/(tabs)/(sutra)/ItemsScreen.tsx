import { DataHandler } from '@/components/DataHandler';
import { useSutra } from '@/hooks/sutra/useSutra';
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function ItemsScreen() {
  const { data, isLoading, error, filteredItems, category } = useSutra();

  // Render a single item in the list
  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.itemCard}>
      <Text style={styles.itemTitle}>{item['ຊື່ພຣະສູດ']}</Text>
    </TouchableOpacity>
  );

  return (
    <DataHandler isLoading={isLoading} error={error} data={data || []}>
      <View style={styles.container}>
        {filteredItems && filteredItems.length > 0 ? (
          <FlatList
            data={filteredItems}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <Text style={styles.noItemsText}>
            {category
              ? `No items found for the category "${category}".`
              : 'No data available.'}
          </Text>
        )}
      </View>
    </DataHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
  itemCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  noItemsText: {
    marginTop: 50,
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});
