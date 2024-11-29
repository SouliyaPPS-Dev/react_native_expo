import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function Book() {
  return (
    <ParallaxScrollView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type='default'>
          ພິກຂຸ ທ. ! ເພາະອາໄສຕາດ້ວຍ ຮູບທັງຫຼາຍດ້ວຍ
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
