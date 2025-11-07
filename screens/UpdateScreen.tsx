import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Linking } from 'react-native';

import { messageText } from '../components/Card/UpdateBanner';
import { Theme, useTheme, utilities as utils } from '../styles';

type Props = {
  storeUrl: string;
  message?: string;
};

export const UpdateScreen = ({ storeUrl, message }: Props) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/Dust.png')} style={styles.bg} resizeMode="cover">
        <View style={styles.content}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>💬</Text>
          </View>
          <Text style={styles.title}>Update to the latest version</Text>
          <Text style={styles.desc}>
            {message ??
              messageText}
          </Text>
          <TouchableOpacity style={styles.cta} onPress={() => Linking.openURL(storeUrl)}>
            <Text style={styles.ctaText}>Update Now!</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: { flex: 1 },
    bg: { flex: 1 },
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 24
    },
    iconCircle: {
      width: 64,
      height: 64,
      borderRadius: 16,
      backgroundColor: theme.colors.cardBackground,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16
    },
    iconText: { fontSize: 24 },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: theme.colors.white,
      textAlign: 'center',
      marginBottom: 12
    },
    desc: {
      color: theme.colors.white,
      textAlign: 'center',
      marginBottom: 20
    },
    cta: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 22,
      ...utils.mt_1
    },
    ctaText: { color: theme.colors.white, fontWeight: 'bold' }
  });
