import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet, ImageBackground } from 'react-native';

import { Theme, useTheme } from '../../styles';

interface UpdateModalProps {
  mandatory: boolean;
  storeUrl: string;
  message?: string;
  onClose: () => void;
}

// TODO: CONVERT TO THE UPDATE SCREEN LATER

export const UpdateModal = ({ mandatory, storeUrl, message, onClose }: UpdateModalProps) => {
  const { theme, mode } = useTheme();
  const styles = createStyleSheet(theme, mode);

  const handleUpdate = () => void Linking.openURL(storeUrl);

  return (
    <View style={styles.overlay}>
      <View style={styles.modalWrapper}>
        {!mandatory && (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Close"
            style={styles.closeBtn}
            onPress={onClose}
          >
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>
        )}

        <ImageBackground source={require('../../assets/Dust.png')} imageStyle={styles.imageBg} style={styles.modal}>
          <Text style={styles.title}>Update to the latest version</Text>

          <Text style={styles.message}>
            {message ??
              'A brand new version of the Lampstand app is available in the App Store. Please update to enjoy all our latest features.'}
          </Text>

          <TouchableOpacity onPress={handleUpdate} style={styles.updateButton}>
            <Text style={styles.updateText}>Update Now!</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </View>
  );
};

const createStyleSheet = (theme: Theme, mode: 'light' | 'dark' | 'system') =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    modalWrapper: {
      width: '85%',
      borderRadius: 20,
      overflow: 'hidden'
    },
    imageBg: {
      resizeMode: 'cover',
      borderRadius: 20
    },
    modal: {
      paddingVertical: 30,
      paddingHorizontal: 20,
      alignItems: 'center',
      backgroundColor: mode === 'dark' ? theme.colors.cardBackground : theme.colors.primary,
      borderRadius: 20
    },
    closeBtn: {
      position: 'absolute',
      right: 12,
      top: 12,
      zIndex: 2,
      backgroundColor: theme.colors.cardBackground,
      width: 28,
      height: 28,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.colors.border
    },
    closeText: {
      color: theme.colors.text,
      fontSize: 18,
      fontWeight: '600'
    },
    title: {
      fontWeight: '700',
      fontSize: 20,
      marginBottom: 10,
      color: theme.colors.white,
      textAlign: 'center'
    },
    message: {
      textAlign: 'center',
      marginBottom: 20,
      color: theme.colors.white,
      lineHeight: 20,
      fontSize: 14
    },
    updateButton: {
      backgroundColor: mode === 'dark' ? theme.colors.primary : theme.colors.cardBackground,
      paddingVertical: 12,
      paddingHorizontal: 28,
      borderRadius: 30,
      shadowColor: theme.colors.black,
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 2
    },
    updateText: {
      color: mode === 'dark' ? theme.colors.white : theme.colors.primary,
      fontWeight: '700',
      fontSize: 15
    }
  });
