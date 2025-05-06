import Constants from 'expo-constants';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { BodyText, BodyTextLarge } from '../../components';
import { Theme, useTheme } from '../../styles';

import { SettingContainer } from './SettingContainer';

export const AboutLampstand = () => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const appVersion = Constants.manifest2?.extra?.expoClient?.version || Constants.expoConfig?.version || 'Unknown';

  return (
    <SettingContainer title="About Lampstand">
      <View style={styles.container}>
        <View>
          <BodyTextLarge bold>Version</BodyTextLarge>
          <BodyText>{appVersion}</BodyText>
        </View>
        <View>
          <BodyTextLarge bold>Licences</BodyTextLarge>
          <BodyText>74747747289393</BodyText>
        </View>
      </View>
    </SettingContainer>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      padding: 10,
      gap: 24,
      borderRadius: 10,
      backgroundColor: theme.colors.cardBackground
    }
  });
