import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { BodyText, HeadingMedium } from '../Typography';
import { Theme, useTheme, utilities } from '../../styles';
import { useAuthState, useProfilePicState } from '../../store';
import { getDefaultIcon } from '../../utils';

export type ProfileCardProps = {
  onPress?: () => void;
  showOverlay?: boolean;
};

export const ProfileCard = ({ onPress, showOverlay = false }: ProfileCardProps) => {
  const { theme } = useTheme();
  const { user } = useAuthState();
  const { optimisticPic } = useProfilePicState();
  const styles = createStyleSheet(theme);

  const profilePicture = optimisticPic ? optimisticPic : user?.profilePicture;

  return (
    <Pressable style={({ pressed }) => [pressed && { opacity: 0.5 }, styles.container]} onPress={onPress}>
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
      <View style={utilities.gap_1}>
        <HeadingMedium bold>{user?.fullName}</HeadingMedium>
        <BodyText variant="tertiary">{user?.emailAddress}</BodyText>
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
