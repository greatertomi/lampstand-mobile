import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

import { Theme, ThemeModeScheme, useTheme } from '../../styles';
import { DEFAULT_UPDATE_MESSAGE, openStoreUrl } from '../../utils/updateLogic';
import { BodyText } from '../Typography';

interface UpdateBannerProps {
  mandatory: boolean;
  storeUrl: string;
  message?: string;
  onClose: () => void;
  onUpdatePress?: () => void;
}

export const UpdateBanner = ({ mandatory, storeUrl, message, onClose, onUpdatePress }: UpdateBannerProps) => {
  const { theme, mode } = useTheme();
  const styles = createStyleSheet(theme, mode);

  const handleUpdate = onUpdatePress ?? (() => openStoreUrl(storeUrl));

  return (
    <ImageBackground
      source={require('../../assets/Dust.png')}
      resizeMode="cover"
      style={styles.backgroundImage}
      imageStyle={styles.imageStyle}
    >
      <View style={styles.overlay}>
        <View style={styles.wrapperHead}>
          {!mandatory && (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Close"
              onPress={onClose}
              style={[styles.closeBtn]}
            >
              <Text style={styles.closeText}>×</Text>
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.title}>Update to the latest version</Text>

        <Text style={styles.message}>{message ?? DEFAULT_UPDATE_MESSAGE}</Text>

        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <BodyText>Update Now!</BodyText>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const createStyleSheet = (theme: Theme, mode: ThemeModeScheme) =>
  StyleSheet.create({
    backgroundImage: {
      width: '100%',
      minHeight: 160,
      borderRadius: 10,
      overflow: 'hidden',
      marginTop: 16,
      backgroundColor: mode === 'dark' ? theme.colors.cardBackground : theme.colors.primary,
      borderWidth: 1,
      borderColor: theme.colors.border
    },
    imageStyle: {
      borderRadius: 10,
      opacity: 0.85,
      flex: 1
    },
    overlay: {
      padding: 16,
      alignItems: 'center'
    },
    wrapperHead: {
      width: '100%',
      alignItems: 'flex-end'
    },

    closeBtn: {
      width: 24,
      height: 24,
      borderRadius: 14,
      backgroundColor: theme.colors.white,
      alignItems: 'center',
      justifyContent: 'center'
    },

    closeText: {
      color: theme.colors.black,
      fontSize: 18,
      fontWeight: '600'
      //   marginTop: -2,
    },
    title: {
      color: theme.colors.white,
      fontSize: 16,
      fontWeight: '700',
      marginBottom: 6,
      textAlign: 'center'
    },
    message: {
      color: theme.colors.white,
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 14,
      lineHeight: 18
    },
    updateButton: {
      backgroundColor: mode === 'dark' ? theme.colors.primary : theme.colors.white,
      borderRadius: 20,
      paddingVertical: 10,
      paddingHorizontal: 24
    }
  });
