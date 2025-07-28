import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { useAuthState } from '../../store';
import { Theme, useTheme, utilities } from '../../styles';
import { getDefaultIcon } from '../../utils';
import { PressableItem } from '../Pressable';
import { BodyText, HeadingMedium } from '../Typography';

export type ProfileCardProps = {
  optimisticPic?: string | null;
  onPress?: () => void;
  showOverlay?: boolean;
};

export const ProfileCard = ({ optimisticPic, onPress, showOverlay = false }: ProfileCardProps) => {
  const { theme } = useTheme();
  const { user } = useAuthState();
  const styles = createStyleSheet(theme);

  const profilePicture = optimisticPic || user?.profilePicture;

  return (
    <PressableItem style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        {showOverlay && <View style={styles.overlay} />}
        {profilePicture ? (
          <Image source={{ uri: profilePicture }} style={styles.image} />
        ) : (
          <SvgXml
            xml={getDefaultIcon({
              id: user?.id,
              size: 82
            })}
            style={styles.image}
          />
        )}
      </View>
      <View style={[styles.textContainer, utilities.gap_1]}>
        <HeadingMedium bold numberOfLines={3} ellipsizeMode="tail" style={styles.nameText}>
          {user?.fullName}
        </HeadingMedium>
        <BodyText variant="tertiary">{user?.email}</BodyText>
      </View>
    </PressableItem>
  );
};
const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 14,
      paddingHorizontal: 10,
      gap: 16,
      borderRadius: 10,
      backgroundColor: theme.colors.cardBackground
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
    },
    textContainer: {
      flex: 1,
      flexShrink: 1
    },
    nameText: {
      flexWrap: 'wrap'
    }
  });
