import { DataHandler } from '@/components/DataHandler';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useSutra } from '@/hooks/sutra/useSutra';
import React from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SutraScreen() {
  const { data, isLoading, error, categories, handleCategoryPress } =
    useSutra();

  // Render each category card
  const renderCategory = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleCategoryPress(item)}
    >
      <ImageBackground
        source={require('@/assets/images/Icon-512.png')}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay}>
          <Text style={styles.categoryText}>{item}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <ParallaxScrollView>
      <DataHandler isLoading={isLoading} error={error} data={data || []}>
        {/* Display categories in a FlatList with grid layout */}
        <FlatList
          data={categories}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderCategory}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContainer}
        />
      </DataHandler>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
    overflow: 'hidden',
    height: 150,
    backgroundColor: '#f5f5f5',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    borderRadius: 8,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});
