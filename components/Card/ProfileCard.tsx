import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { BodyText, HeadingMedium } from '../Typography';
import { Theme, useTheme, utilities } from '../../styles';
import { useAuthState } from '../../store';
import { getDefaultIcon } from '../../utils';

export type ProfileCardProps = {
  name?: string;
  email?: string;
  onPress?: () => void;
  showOverlay?: boolean;
};

export const ProfileCard = ({ name, email, onPress, showOverlay = false }: ProfileCardProps) => {
  const { theme } = useTheme();
  const { user } = useAuthState();
  const styles = createStyleSheet(theme);
  return (
    <Pressable style={({ pressed }) => [pressed && { opacity: 0.5 }, styles.container]} onPress={onPress}>
      <View style={styles.imageContainer}>
        {showOverlay && <View style={styles.overlay} />}
        {user?.profilePicture ? (
          <Image source={{ uri: user?.profilePicture }} style={styles.image} />
        ) : (
          <SvgXml xml={getDefaultIcon(82, user?.id)} style={styles.image} />
        )}
      </View>
      <View style={utilities.gap_1}>
        <HeadingMedium bold>{name}</HeadingMedium>
        <BodyText variant="tertiary">{email}</BodyText>
      </View>
    </Pressable>
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
    imageContainer: {
      position: 'relative'
    },
    image: {
      width: 82,
      height: 82,
      borderRadius: 50
    },
    overlay: {
      position: 'absolute',
      width: 82,
      height: 82,
      borderRadius: 50,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1
    }
  });
