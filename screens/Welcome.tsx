import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { uploadIcon } from '../assets';
import { BodyText, BodyTextSmall, SecondaryButton } from '../components';
import { Theme, useTheme, utilities } from '../styles';

interface WelcomeProps {
  onPress: () => void;
  isAllBooksFinished: boolean;
}

export const Welcome = ({ onPress, isAllBooksFinished }: WelcomeProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  return (
    <View style={styles.nullUser}>
      {isAllBooksFinished ? (
        <BodyText>Import more books to read</BodyText>
      ) : (
        <BodyText bold>Welcome to Lampstand!</BodyText>
      )}
      <BodyTextSmall>{`${isAllBooksFinished ? 'Continue' : 'Let’s start by'} filling your bookshelf:`}</BodyTextSmall>
      <View style={[utilities.width_100, utilities.mt_1]}>
        <SecondaryButton
          title={`Import ${isAllBooksFinished ? 'more' : 'your'} books`}
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
      borderColor: theme.colors.border,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8
    }
  });
