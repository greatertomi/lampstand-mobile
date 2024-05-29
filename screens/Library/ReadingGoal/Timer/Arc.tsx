import * as React from 'react';
import { Dimensions, Text, View, StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg';
import Animated, { useAnimatedProps, useDerivedValue, interpolate, Extrapolate } from 'react-native-reanimated';
import { FontAwesome6 } from '@expo/vector-icons';
import { BodyTextSmall } from '../../../../components';
import { Theme, useTheme } from '../../../../styles';

const { width } = Dimensions.get('window');
const size = width - 170;
const height = width - 270;
const strokeWidth = 10;
const AnimatedPath = Animated.createAnimatedComponent(Path);
const { PI, cos, sin } = Math;
const r = (size - strokeWidth) / 2;
const cx = size / 2;
const cy = size / 2;
const A = PI + PI * 0.4;
const startAngle = PI + PI * 0.2;
const endAngle = 2 * PI - PI * 0.2;
const x1 = cx - r * cos(startAngle);
const y1 = -r * sin(startAngle) + cy;
const x2 = cx - r * cos(endAngle);
const y2 = -r * sin(endAngle) + cy;
const d = `M ${x1} ${y1} A ${r} ${r} 0 1 0 ${x2} ${y2}`;

interface CircularProgressProps {
  progress: Animated.SharedValue<number>;
  remainingTime: string;
}

export const Arc = ({ progress, remainingTime }: CircularProgressProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const circumference = r * A;
  const alpha = useDerivedValue(() => interpolate(progress.value, [0, 1], [A, 0], Extrapolate.CLAMP));
  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = alpha.value * r;
    return {
      strokeDashoffset
    };
  });

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', width: size, height: size }}>
      <Svg width={size} height={height}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="100%" y2="0">
            <Stop offset="0" stopColor={theme.colors.toggleButtonThumb} />
            <Stop offset="1" stopColor={theme.colors.toggleButtonThumb} />
          </LinearGradient>
        </Defs>
        <Path
          stroke={theme.colors.primary}
          fill="none"
          strokeDasharray={`${circumference}, ${circumference}`}
          {...{ d, strokeWidth }}
        />
        <AnimatedPath
          stroke="url(#grad)"
          fill="none"
          strokeDasharray={`${circumference}, ${circumference}`}
          animatedProps={animatedProps}
          {...{ d, strokeWidth }}
        />
      </Svg>
      <View style={styles.timerText}>
        <Text style={styles.remainingTime}>{remainingTime}</Text>
        <BodyTextSmall style={styles.goal}>
          of your 15- minute goal
          <FontAwesome6 name="chevron-right" size={12} color={theme.colors.secondaryText} />
        </BodyTextSmall>
      </View>
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    timerText: {
      position: 'absolute',
      top: 90,
      alignItems: 'center'
    },
    remainingTime: {
      fontSize: 36,
      fontWeight: 'bold'
    },
    goal: {
      color: theme.colors.secondaryText
    }
  });
