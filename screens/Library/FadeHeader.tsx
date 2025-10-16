import React from 'react';
import { Animated, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BodyText, BodyTextSmall } from '../../components';
import { Theme, useTheme } from '../../styles';

interface FadeHeaderProps {
  title: string;
  scrollY: Animated.Value;
  fadeDistance?: number;
}

const HEADER_HEIGHT = 100;

export const FadeHeader: React.FC<FadeHeaderProps> = ({ title, scrollY, fadeDistance = 40 }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const opacity = scrollY.interpolate({
    inputRange: [0, fadeDistance],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <BodyTextSmall style={styles.title}>{title}</BodyTextSmall>
      </SafeAreaView>
    </Animated.View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: HEADER_HEIGHT,
      zIndex: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
      paddingBottom: 8
    },
    safeArea: {
      alignItems: 'center',
      justifyContent: 'center',
      height: HEADER_HEIGHT
    },
    title: {
      color: theme.colors.text,
      fontSize: 20,
      fontWeight: '600'
    }
  });
