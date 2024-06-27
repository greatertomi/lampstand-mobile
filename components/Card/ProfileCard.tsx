import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
import { BodyText, HeadingMedium } from '../Typography';
import { Theme, useTheme, utilities } from '../../styles';

export type ProfileCardProps = {
  image: ImageSourcePropType;
  name: string;
  email: string;
};

export const ProfileCard = ({ image, name, email }: ProfileCardProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <View style={utilities.gap_1}>
        <HeadingMedium bold>{name}</HeadingMedium>
        <BodyText style={styles.email}>{email}</BodyText>
      </View>
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      gap: 16,
      borderRadius: 10,
      backgroundColor: theme.colors.background
    },
    image: {
      width: 82,
      height: 82,
      borderRadius: 50
    },
    email: {
      color: theme.colors.tertiaryText
    }
  });
