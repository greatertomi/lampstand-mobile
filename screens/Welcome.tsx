import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { uploadIcon } from '../assets';
import { BodyText, BodyTextSmall, PrimaryButton } from '../components';
import { Theme, useTheme, utilities } from '../styles';

interface WelcomeProps {
  onPress: () => void;
  isAllBooksFinished: boolean;
}

export const Welcome = ({ onPress, isAllBooksFinished }: WelcomeProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  return (
    <View>
      <View style={styles.nullUser}>
        {isAllBooksFinished ? (
          <BodyText>Import more books to read</BodyText>
        ) : (
          <BodyText bold>Welcome to Lampstand!</BodyText>
        )}
        <BodyTextSmall>{`${isAllBooksFinished ? 'Continue' : 'Let’s start by'} filling your bookshelf:`}</BodyTextSmall>

        <View style={[utilities.width_75, utilities.mt_1]}>
          <PrimaryButton
            title="Import books"
            icon={<SvgXml xml={uploadIcon({ color: theme.colors.white, size: 14 })} />}
            onPress={onPress}
          />
        </View>
      </View>
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    nullUser: {
      height: 185,
      marginTop: 30,
      borderWidth: 1,
      backgroundColor: theme.colors.cardBackground,
      borderColor: theme.colors.border,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8
    }
  });
