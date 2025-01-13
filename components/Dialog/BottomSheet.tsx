import { useCallback, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  Extrapolation
} from 'react-native-reanimated';

import { PressableItem } from '../Pressable';

type BottomSheetProps = {
  children?: React.ReactNode;
};

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 20;
const damping = 10;
const START_HEIGHT = -SCREEN_HEIGHT / 3;

export const BottomSheet = ({ children }: BottomSheetProps) => {
  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });

  const scrollTo = useCallback(
    (destination: number) => {
      'worklet';

      translateY.value = withSpring(destination, { damping });
    },
    [translateY]
  );

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
    })
    .onEnd(() => {
      if (translateY.value > START_HEIGHT) {
        scrollTo(0);
      } else if (translateY.value < -SCREEN_HEIGHT / 1.4) {
        scrollTo(MAX_TRANSLATE_Y);
      }
    });

  useEffect(() => {
    scrollTo(START_HEIGHT);
  }, [scrollTo]);

  const reAnimatedBottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
      [20, 5],
      Extrapolation.CLAMP
    );

    return {
      borderRadius,
      transform: [{ translateY: translateY.value }]
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, reAnimatedBottomSheetStyle]}>
        <PressableItem onPress={() => scrollTo(0)}>
          <View style={styles.line} />
        </PressableItem>
        {children}
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: 'blue',
    position: 'absolute',
    top: SCREEN_HEIGHT
  },
  line: {
    width: 40,
    height: 5,
    backgroundColor: 'gray',
    borderRadius: 5,
    alignSelf: 'center',
    marginVertical: 15
  }
});
