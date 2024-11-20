import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';

import { Theme, useTheme } from '../../styles';
import { IconButton } from '../Button';
import { BodyTextLarge, BodyTextSmall } from '../Typography';

export type ModeSwitcherProps = {
  title: string;
  description: string;
  image: ImageSourcePropType | React.ReactNode;
  isSelected: boolean;
  onPress: () => void;
};

export const ModeSwitcher = ({ title, description, image, isSelected, onPress }: ModeSwitcherProps) => {
  const { theme } = useTheme();
  const styles = createStylesheet(theme);

  return (
    <View style={styles.modeContainer}>
      <View style={styles.imageContainer}>
        {React.isValidElement(image) ? (
          <View>{image}</View>
        ) : (
          <Image source={image as ImageSourcePropType} style={styles.image} />
        )}
      </View>
      <View style={styles.textIcon}>
        <View style={styles.textContainer}>
          <BodyTextLarge bold>{title}</BodyTextLarge>
          <BodyTextSmall variant="secondary">{description}</BodyTextSmall>
        </View>
        {isSelected !== undefined && (
          <IconButton onPress={onPress}>
            {isSelected ? (
              <AntDesign name="checkcircle" size={24} color={theme.colors.text} />
            ) : (
              <View style={styles.unselected} />
            )}
          </IconButton>
        )}
      </View>
    </View>
  );
};

const createStylesheet = (theme: Theme) =>
  StyleSheet.create({
    modeContainer: {
      backgroundColor: theme.colors.background,
      flexDirection: 'row',
      gap: 16,
      padding: 10,
      borderRadius: 10
    },
    imageContainer: {
      width: '30%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 10
    },
    textIcon: {
      width: '70%',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16
    },
    textContainer: {
      width: '75%',
      gap: 8
    },
    unselected: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: theme.colors.cardBorderColor,
      borderWidth: 2,
      borderColor: 'transparent'
    }
  });
