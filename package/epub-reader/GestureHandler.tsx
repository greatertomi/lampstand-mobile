import React from 'react';
import { Dimensions, DimensionValue, Platform, StyleProp, View, ViewStyle } from 'react-native';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
  Directions,
  TouchableWithoutFeedback
} from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS, withSpring } from 'react-native-reanimated';

interface Props {
  width?: DimensionValue;
  height?: DimensionValue;
  onSingleTap: () => void;
  onDoubleTap: () => void;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onSwipeUp: () => void;
  onSwipeDown: () => void;
  onLongPress: () => void;
  children: React.ReactNode;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const DRAG_X = SCREEN_WIDTH / 4;
const DURATION = 500;
const ZERO = 0;

export const GestureHandler = ({
  width = '100%',
  height = '100%',
  onSingleTap,
  onDoubleTap,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onLongPress,
  children
}: Props) => {
  const translateX = useSharedValue(0);
  const effect = { damping: 15, stiffness: 100, mass: 0.5 };

  const singleTap = Gesture.Tap().maxDuration(250).onStart(onSingleTap);

  const doubleTap = Gesture.Tap().maxDuration(250).numberOfTaps(2).onStart(onDoubleTap);

  const longPress = Gesture.LongPress().onStart(onLongPress);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }]
  }));

  const swipeLeft = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
    })
    .onEnd((e) => {
      translateX.value = e.translationX < -DRAG_X ? withTiming(-SCREEN_WIDTH, { duration: DURATION }, () => {
        runOnJS(onSwipeLeft)();
        translateX.value = withSpring(ZERO, effect);
      }) : withTiming(ZERO, { duration: DURATION });
    });

  const swipeRight = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
    })
    .onEnd((e) => {
      translateX.value = e.translationX > DRAG_X ? withTiming(SCREEN_WIDTH, { duration: DURATION }, () => {
        runOnJS(onSwipeRight)();
        translateX.value = withSpring(ZERO, effect);
      }) : withTiming(ZERO, { duration: DURATION });
    });

  const swipeUp = Gesture.Fling().direction(Directions.UP).onStart(onSwipeUp);

  const swipeDown = Gesture.Fling().direction(Directions.DOWN).onStart(onSwipeDown);

  let lastTap: number | null = null;
  let timer: NodeJS.Timeout;

  const handleDoubleTap = () => {
    if (lastTap) {
      onDoubleTap();
      clearTimeout(timer);
      lastTap = null;
    } else {
      lastTap = Date.now();
      timer = setTimeout(() => {
        onSingleTap();
        lastTap = null;
        clearTimeout(timer);
      }, 500);
    }
  };

  if (Platform.OS === 'ios') {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <GestureDetector
          gesture={Gesture.Simultaneous(
            Gesture.Exclusive(swipeUp, swipeDown, longPress, doubleTap, singleTap),
            swipeLeft,
            swipeRight
          )}
        >
          <Animated.View style={[{ width, height }, animatedStyle]}>
            <TouchableWithoutFeedback
              style={{ width, height } as StyleProp<ViewStyle>}
              onPress={() => Platform.OS === 'ios' && handleDoubleTap()}
              onLongPress={() => Platform.OS === 'ios' && onLongPress()}
            >
              {children}
            </TouchableWithoutFeedback>
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    );
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector
        gesture={Gesture.Simultaneous(
          Gesture.Exclusive(swipeUp, swipeDown, longPress, doubleTap, singleTap),
          swipeLeft,
          swipeRight
        )}
      >
        <Animated.View style={[{ width, height }, animatedStyle]}>
          <View style={{ width, height } as StyleProp<ViewStyle>}>{children}</View>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};
