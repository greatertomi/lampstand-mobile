import React from 'react';
import { Modal, View, Text, TouchableOpacity, Linking, StyleSheet, ImageBackground } from 'react-native';

import { Theme, useTheme } from '../../styles';

interface UpdateModalProps {
  visible: boolean;
  mandatory: boolean;
  storeUrl: string;
  message?: string;
  onClose: () => void;
}

export const UpdateModal = ({ visible, mandatory, storeUrl, message, onClose }: UpdateModalProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  const handleUpdate = () => void Linking.openURL(storeUrl);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalWrapper}>
          {!mandatory && (
            <TouchableOpacity accessibilityRole="button" accessibilityLabel="Close" style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeText}>×</Text>
            </TouchableOpacity>
          )}
          <ImageBackground
            source={require('../../assets/Dust.png')}
            imageStyle={styles.imageBg}
            style={styles.modal}
          >
            <Text style={styles.title}>Update to the latest version</Text>
            <Text style={styles.message}>
              {message ?? 'A brand new version of the lamp stand app is available in the App Store. Please update your use all of our amazing features'}
            </Text>

            <TouchableOpacity onPress={handleUpdate} style={styles.updateButton}>
              <Text style={styles.updateText}>Update Now!</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </View>
    </Modal>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.overlayBackground
    },
    modalWrapper: {
      width: '90%',
      borderRadius: 16,
      overflow: 'hidden'
    },
    imageBg: {
      resizeMode: 'cover',
      borderRadius: 16
    },
    modal: {
      paddingVertical: 24,
      paddingHorizontal: 16,
      alignItems: 'center',
      backgroundColor: theme.colors.cardBackground,
      borderRadius: 16
    },
    closeBtn: {
      position: 'absolute',
      right: 10,
      top: 10,
      zIndex: 2,
      backgroundColor: theme.colors.cardBackground,
      width: 24,
      height: 24,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.colors.border
    },
    closeText: {
      color: theme.colors.text,
      fontSize: 18
    },
    title: {
      fontWeight: 'bold',
      fontSize: 22,
      marginBottom: 12,
      color: theme.colors.white,
      textAlign: 'center'
    },
    message: {
      textAlign: 'center',
      marginBottom: 16,
      color: theme.colors.white
    },
    updateButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 22,
      alignSelf: 'center'
    },
    updateText: {
      color: theme.colors.white,
      fontWeight: 'bold'
    }
  });
