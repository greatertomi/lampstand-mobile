import React, { ReactNode, useCallback, useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, ViewStyle, StyleProp } from 'react-native';

import { Theme, useTheme } from '../../styles';

const getPercentage = (progress: number) => {
  const percentage = progress;
  const minValue = 0;
  const maxValue = 100;
  const currentValue = progress;

  if (percentage) return Math.max(Math.min(percentage, maxValue), minValue);

  if (currentValue && minValue && maxValue) {
    const newPercent = ((currentValue - minValue) / (maxValue - minValue)) * 100;
    return Math.max(Math.min(newPercent, maxValue), minValue);
  }
  return 0;
};

export interface ProgressSemiCircleProps {
  children: ReactNode;
  progress: number;
  animationSpeed?: number;
  exteriorCircleStyle?: StyleProp<ViewStyle>;
  interiorCircleStyle?: StyleProp<ViewStyle>;
  initialPercentage?: number;
  circleRadius?: number;
}

interface StyleParams {
  rotationAnimation: Animated.Value;
  theme: Theme;
  circleRadius: number;
}

export const ProgressSemiCircle = ({
  children,
  progress,
  initialPercentage = 0,
  animationSpeed = 1000,
  exteriorCircleStyle,
  interiorCircleStyle,
  circleRadius = 97
}: ProgressSemiCircleProps) => {
  const rotationAnimation = useRef(new Animated.Value(initialPercentage)).current;
  const { theme } = useTheme();

  const styles = createStyleSheet({
    rotationAnimation,
    theme,
    circleRadius
  });

  const animate = useCallback(() => {
    const toValue = getPercentage(progress);

    Animated.spring(rotationAnimation, {
      toValue,
      speed: animationSpeed,
      useNativeDriver: true
    }).start();
  }, [animationSpeed, progress, rotationAnimation]);

  useEffect(() => {
    animate();
  }, [animate]);

  return (
    <View style={[styles.exteriorCircle, exteriorCircleStyle]}>
      <View style={styles.rotatingCircleWrap}>
        <Animated.View style={styles.rotatingCircle} />
      </View>
      <View style={[styles.interiorCircle, interiorCircleStyle]}>{children}</View>
    </View>
  );
};

const createStyleSheet = ({ rotationAnimation, theme, circleRadius }: StyleParams) => {
  const progressWidth = 12;
  const interiorCircleRadius = circleRadius - progressWidth;

  return StyleSheet.create({
    exteriorCircle: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      alignItems: 'center',
      overflow: 'hidden',
      width: circleRadius * 2,
      height: circleRadius,
      borderRadius: circleRadius,
      backgroundColor: theme.colors.timerColor
    },
    rotatingCircleWrap: {
      position: 'absolute',
      left: 0,
      width: circleRadius * 2,
      height: circleRadius,
      top: circleRadius
    },
    rotatingCircle: {
      position: 'absolute',
      top: 0,
      left: 0,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      width: circleRadius * 2,
      height: circleRadius,
      borderRadius: circleRadius,
      backgroundColor: theme.colors.primary,
      transform: [
        { translateY: -circleRadius / 2 },
        {
          rotate: rotationAnimation.interpolate({
            inputRange: [0, 100],
            outputRange: ['0deg', '180deg']
          })
        },
        { translateY: circleRadius / 2 }
      ]
    },
    interiorCircle: {
      overflow: 'hidden',
      justifyContent: 'flex-end',
      alignItems: 'center',
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      width: interiorCircleRadius * 2,
      height: interiorCircleRadius,
      borderRadius: interiorCircleRadius,
      backgroundColor: theme.colors.cardBackground,
      top: progressWidth
    }
  });
};
