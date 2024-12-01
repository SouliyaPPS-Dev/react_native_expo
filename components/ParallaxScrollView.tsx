import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import { ThemedView } from '@/components/ThemedView';
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import { useColorMode } from 'native-base';

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  headerImage?: ReactElement; // Optional header image
  headerBackgroundColor?: { dark: string; light: string }; // Optional background color
  renderScrollComponent?: (props: any) => React.ReactElement; // Custom scroll component
}>;

export default function ParallaxScrollView({
  children,
  headerImage, // Optional prop
  headerBackgroundColor,
  renderScrollComponent,
}: Props) {
  const { colorMode } = useColorMode(); // Handle theme mode toggle
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const bottom = useBottomTabOverflow();

  const ScrollComponent = renderScrollComponent || Animated.ScrollView;

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  const shouldRenderHeader = !!headerImage; // Boolean to check if headerImage exists

  return (
    <ThemedView style={styles.container}>
      <ScrollComponent
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}
      >
        {/* Conditionally render the header */}
        {shouldRenderHeader && (
          <Animated.View
            style={[
              styles.header,
              {
                backgroundColor:
                  headerBackgroundColor?.[colorMode as 'dark' | 'light'] ||
                  'transparent',
              },
              headerAnimatedStyle,
            ]}
          >
            {headerImage}
          </Animated.View>
        )}

        {/* Content */}
        <ThemedView style={styles.content}>{children}</ThemedView>
      </ScrollComponent>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT, // Default header height
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
});
