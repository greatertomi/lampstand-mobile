import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  BodyText,
  BodyTextSmall,
  HeadingSmall,
  KeyboardAwareContainer,
  PressableItem,
  PrimaryButton
} from '../../components';
import { Theme, useTheme } from '../../styles';

type SettingContainerProps = {
  title: string;
  description?: string;
  children: ReactNode;
  useButton?: boolean;
  loading?: boolean;
  disable?: boolean;
  buttonTitle?: string;
  onPress?: () => void;
  buttonStyle?: object;
  backButtonText?: string;
};

export const SettingContainer = ({
  title,
  description,
  children,
  useButton,
  loading,
  disable,
  buttonTitle,
  onPress,
  buttonStyle,
  backButtonText = 'Back'
}: SettingContainerProps) => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <PressableItem onPress={() => navigation.goBack()} style={styles.backButton}>
          <View style={styles.backButtonContent}>
            <Entypo name="chevron-left" size={24} color={theme.colors.text} />
            <BodyText>{backButtonText}</BodyText>
          </View>
        </PressableItem>
        <View style={styles.titleContainer}>
          <HeadingSmall bold align="center">
            {title}
          </HeadingSmall>
        </View>
        <View style={styles.rightSpacer} />
      </View>
      <KeyboardAwareContainer>
        {description && (
          <View style={[utils.align_self_center, utils.mt_1]}>
            <BodyTextSmall>{description}</BodyTextSmall>
          </View>
        )}
        <View style={[utils.flex, utils.mb_5, utils.mt_4, utils.justify_content_between]}>
          <View>{children}</View>
          {useButton && (
            <View style={[utils.mt_3]}>
              <PrimaryButton
                title={buttonTitle}
                onPress={onPress}
                loading={loading}
                disabled={disable}
                style={buttonStyle}
              />
            </View>
          )}
        </View>
      </KeyboardAwareContainer>
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    headerContainer: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 16,
      backgroundColor: theme.colors.background
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      position: 'relative',
      marginTop: 48
    },
    backButton: {
      minWidth: 44,
      minHeight: 44,
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingVertical: 8,
      paddingRight: 8
    },
    backButtonContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4
    },
    titleContainer: {
      flex: 1,
      alignItems: 'center'
    },
    rightSpacer: {
      width: 44
    }
  });
