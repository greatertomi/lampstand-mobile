import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { BodyText, BodyTextSmall, SecondaryButton } from '../components';
import { Theme, useTheme, utilities } from '../styles';
import { uploadIcon } from '../assets';

interface WelcomeProps {
  onPress: () => void;
}

export const Welcome = ({ onPress }: WelcomeProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  return (
    <View style={styles.nullUser}>
      <BodyText bold>Welcome to Lampstand!</BodyText>
      <BodyTextSmall>Let’s start by filling your bookshelf:</BodyTextSmall>
      <View style={[utilities.width_100, utilities.mt_1]}>
        <SecondaryButton
          title="Import your books"
          icon={<SvgXml xml={uploadIcon({ color: theme.colors.primary, size: 14 })} />}
          onPress={onPress}
        />
      </View>
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    nullUser: {
      height: 185,
      marginTop: 40,
      padding: 20,
      borderWidth: 1,
      backgroundColor: theme.colors.cardBackground,
      borderColor: theme.colors.cardBorderColor,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8
    }
  });
