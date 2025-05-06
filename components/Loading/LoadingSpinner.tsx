import React, { useEffect, useRef } from 'react';
import { Animated, View, Easing, StyleSheet } from 'react-native';

interface LoadingSpinnerProps {
  primary: string;
  secondary: string;
  size: number;
}

const ANIMATION_DURATION = 600;
const DISTANCE_MULTIPLIER = 1.3125;

export const LoadingSpinner = ({ primary, secondary, size }: LoadingSpinnerProps) => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  const totalDistance = size * DISTANCE_MULTIPLIER;

  const leftTranslateX = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, totalDistance - size + 10]
  });

  const rightTranslateX = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [totalDistance - size + 10, -10]
  });

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(progressAnim, {
          toValue: 1,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease)
        }),
        Animated.timing(progressAnim, {
          toValue: 0,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease)
        })
      ])
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [progressAnim]);

  return (
    <View style={[styles.loader, { height: size, width: totalDistance }]}>
      <Animated.View
        style={[
          styles.circle,
          {
            height: size,
            width: size,
            borderRadius: size / 2,
            backgroundColor: primary,
            transform: [{ translateX: leftTranslateX }]
          }
        ]}
      />
      <Animated.View
        style={[
          styles.circle,
          {
            height: size,
            width: size,
            borderRadius: size / 2,
            backgroundColor: secondary,
            transform: [{ translateX: rightTranslateX }]
          }
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    position: 'absolute',
    top: 0
  }
});
