import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { StyleSheet, View, Animated, Easing } from 'react-native';

import { Theme, useTheme } from '../../styles';

interface SkeletonComponentProps {
  width: number;
  height: number;
}

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
export const SkeletonComponent = ({ width, height }: SkeletonComponentProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.inOut(Easing.linear),
        useNativeDriver: true
      })
    ).start();
  });

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width]
  });
  return (
    <View style={[styles.container, { height, width }]}>
      <AnimatedLinearGradient
        colors={[theme.colors.skeletonTransparent, theme.colors.skeletonBase, theme.colors.skeletonTransparent]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[StyleSheet.absoluteFill, { transform: [{ translateX }] }]}
      />
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.cardBackground,
      borderRadius: 10,
      overflow: 'hidden'
    }
  });
