import Ionicons from '@expo/vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

import { RouteNavigation } from '../../routes';
import { Theme, ThemeModeScheme, useTheme } from '../../styles';
import { DEFAULT_UPDATE_MESSAGE, openStoreUrl } from '../../utils/updateLogic';

export const UpdateScreen = () => {
  const route = useRoute<RouteNavigation<'UpdateScreen'>>();
  const { storeUrl } = route.params;
  const { theme, mode } = useTheme();
  const styles = createStyles(theme, mode);

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/Dust.png')} style={styles.bg} resizeMode="cover">
        <View style={styles.content}>
          <View style={styles.iconCircle}>
            <Ionicons name="chatbubble-ellipses" size={24} style={styles.iconSize} />
          </View>
          <Text style={styles.title}>Update to the latest version</Text>
          <Text style={styles.desc}>{DEFAULT_UPDATE_MESSAGE}</Text>
          <TouchableOpacity style={styles.cta} onPress={() => openStoreUrl(storeUrl)}>
            <Text style={styles.ctaText}>Update Now!</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const createStyles = (theme: Theme, mode: ThemeModeScheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background
    },
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
      backgroundColor: theme.colors.strokeErrorBackground,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
      borderColor: theme.colors.strokeError,
      borderWidth: 1
    },
    iconSize: { fontSize: 24, color: theme.colors.strokeError },
    title: {
      fontSize: 22,
      fontWeight: '600',
      color: mode === 'dark' ? theme.colors.white : theme.colors.black,
      textAlign: 'center',
      marginBottom: 12
    },
    desc: {
      color: mode === 'dark' ? theme.colors.white : theme.colors.black,
      textAlign: 'center',
      marginBottom: 12,
      fontSize: 18
    },
    cta: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 22
    },
    ctaText: { color: theme.colors.white, fontWeight: 'bold' }
  });
