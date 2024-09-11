import React from 'react';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import { BodyText, BodyTextLarge } from '../Typography';
import { PrimaryButton } from '../Button';
import { Theme, useTheme, utilities as utils } from '../../styles';

export type AlertProps = {
  variant: 'success' | 'error';
  message?: string;
  onDismiss: () => void;
};

export const Alert = ({ variant, message, onDismiss }: AlertProps) => {
  const { theme } = useTheme();
  const styles = createStylesheet(theme, variant);
  const containerStyles = variant === 'success' ? styles.successContainer : styles.errorContainer;

  return (
    <View style={[styles.container, containerStyles]}>
      <BodyTextLarge variant="white" bold>
        {variant === 'success' ? 'Success' : 'Error'}
      </BodyTextLarge>
      <View style={utils.gap_1}>
        <BodyText variant="white">{message}</BodyText>
        <PrimaryButton title="Dismiss" style={styles.button} onPress={onDismiss} />
      </View>
    </View>
  );
};

const createStylesheet = (theme: Theme, variant: string) =>
  StyleSheet.create({
    container: {
      borderRadius: 10,
      paddingVertical: 12,
      paddingHorizontal: 12,
      opacity: 0.9,
      gap: 6,
      zIndex: 2,
      position: 'absolute',
      width: '90%',
      top: Constants.statusBarHeight,
      alignSelf: 'center'
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
