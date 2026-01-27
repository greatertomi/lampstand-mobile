import React from 'react';
import { DimensionValue, I18nManager, Platform, StyleProp, View, ViewStyle } from 'react-native';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
  Directions,
  TouchableWithoutFeedback
} from 'react-native-gesture-handler';

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
  const singleTap = Gesture.Tap()
    .maxDuration(250)
    .onStart(() => {
      'worklet';

      onSingleTap();
    })
    .runOnJS(true);

  const doubleTap = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(2)
    .onStart(() => {
      'worklet';

      onDoubleTap();
    })
    .runOnJS(true);

  const longPress = Gesture.LongPress()
    .onStart(() => {
      'worklet';

      onLongPress();
    })
    .runOnJS(true);

  const swipeLeft = Gesture.Fling()
    .enabled(false)
    .direction(I18nManager.isRTL ? Directions.RIGHT : Directions.LEFT)
    .onStart(() => {
      'worklet';

      onSwipeLeft();
    })
    .runOnJS(true);

  const swipeRight = Gesture.Fling()
    .enabled(false)
    .direction(I18nManager.isRTL ? Directions.LEFT : Directions.RIGHT)
    .onStart(() => {
      'worklet';

      onSwipeRight();
    })
    .runOnJS(true);

  const swipeUp = Gesture.Fling()
    .direction(Directions.UP)
    .onStart(() => {
      'worklet';

      onSwipeUp();
    })
    .runOnJS(true);

  const swipeDown = Gesture.Fling()
    .direction(Directions.DOWN)
    .onStart(() => {
      'worklet';

      onSwipeDown();
    })
    .runOnJS(true);

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
          gesture={Gesture.Exclusive(swipeLeft, swipeRight, swipeUp, swipeDown, longPress, doubleTap, singleTap)}
        >
          <TouchableWithoutFeedback
            style={{ width, height } as StyleProp<ViewStyle>}
            onPress={() => Platform.OS === 'ios' && handleDoubleTap()}
            onLongPress={() => Platform.OS === 'ios' && onLongPress()}
          >
            {children}
          </TouchableWithoutFeedback>
        </GestureDetector>
      </GestureHandlerRootView>
    );
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={Gesture.Exclusive(doubleTap, swipeLeft, swipeRight)}>
        <View style={{ width, height } as StyleProp<ViewStyle>}>{children}</View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};
