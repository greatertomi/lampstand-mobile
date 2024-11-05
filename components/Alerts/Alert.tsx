import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { BodyText, BodyTextLarge } from '../Typography';
import { PrimaryButton } from '../Button';
import { Theme, useTheme, utilities as utils } from '../../styles';

export type AlertProps = {
  variant: 'success' | 'error' | 'info';
  message?: string;
  onDismiss: () => void;
};

export const Alert = ({ variant, message, onDismiss }: AlertProps) => {
  const { theme } = useTheme();
  const styles = createStylesheet(theme, variant);
  const translateY = useSharedValue(-100);
  const containerStyles = variant === 'success' ? styles.successContainer : styles.errorContainer;

  const animatedStyle = useAnimatedStyle(() => {
    translateY.value = withTiming(0, { duration: 300 });
    return {
      transform: [{ translateY: translateY.value }]
    };
  });

  return (
    <Animated.View style={[styles.container, containerStyles, animatedStyle]}>
      <View style={[utils.mt_4, utils.gap_1]}>
        <BodyTextLarge variant="white" bold>
          {variant === 'success' ? 'Success' : 'Error'}
        </BodyTextLarge>
        <View style={utils.gap_1}>
          <BodyText variant="white">{message}</BodyText>
          <PrimaryButton title="Dismiss" style={styles.button} onPress={onDismiss} />
        </View>
      </View>
    </Animated.View>
  );
};

const createStylesheet = (theme: Theme, variant: string) =>
  StyleSheet.create({
    container: {
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20,
      paddingVertical: 20,
      paddingHorizontal: 12,
      opacity: 0.9,
      zIndex: 1,
      position: 'absolute',
      width: '100%',
      top: 0
    },
    successContainer: {
      backgroundColor: theme.colors.success
    },
    errorContainer: {
      backgroundColor: theme.colors.redError
    },
    button: {
      borderWidth: 0,
      backgroundColor: variant === 'success' ? theme.colors.successButton : theme.colors.redErrorButton
    }
  });
