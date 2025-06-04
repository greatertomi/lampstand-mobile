import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { Theme, useTheme, utilities as utils } from '../../styles';
import { PrimaryButton, SecondaryButton } from '../Button';
import { BodyText, BodyTextLarge, BodyTextSmall, TagText } from '../Typography';

export type AlertProps = {
  variant: 'success' | 'error' | 'info';
  message?: string | ReactNode;
  description?: string;
  onOkayButtonTitle?: string;
  onDismissButtonTitle?: string;
  onOkay?: () => void;
  onDismiss: () => void;
};

export const Alert = ({
  variant,
  message,
  onOkayButtonTitle,
  onDismissButtonTitle,
  description,
  onDismiss,
  onOkay
}: AlertProps) => {
  const { theme } = useTheme();
  const styles = createStylesheet(theme, variant);
  const translateY = useSharedValue(-100);
  const containerStyles = variant === 'success' ? styles.successContainer : styles.errorContainer;
  const infoContainerStyles = variant === 'info' && styles.infoContainer;

  const animatedStyle = useAnimatedStyle(() => {
    translateY.value = withTiming(0, { duration: 300 });
    return {
      transform: [{ translateY: translateY.value }]
    };
  });

  if (variant === 'info') {
    return (
      <Animated.View style={[styles.container, infoContainerStyles, animatedStyle]}>
        <View style={[utils.mt_4, utils.gap_1]}>
          <BodyTextSmall variant="default" bold>
            {message}
          </BodyTextSmall>
          <TagText variant="default">{description}</TagText>
          <View style={utils.gap_1}>
            <PrimaryButton title={onOkayButtonTitle} onPress={onOkay} />
            <SecondaryButton title={onDismissButtonTitle} onPress={onDismiss} />
          </View>
        </View>
      </Animated.View>
    );
  }

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
      backgroundColor: theme.colors.errorAlertBg
    },
    infoContainer: {
      backgroundColor: theme.colors.infoAlertBg
    },
    button: {
      borderWidth: 0,
      backgroundColor: variant === 'success' ? theme.colors.successAlertBtn : theme.colors.errorAlertBtn
    }
  });
