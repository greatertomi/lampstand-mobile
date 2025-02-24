import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { BodyTextSmall, HeadingMedium, PressableItem, PrimaryButton } from '../../components';
import { Theme, useTheme } from '../../styles';

type SettingContainerProps = {
  title: string;
  description?: string;
  children: ReactNode;
  useButton?: boolean;
  buttonTitle?: string;
  onPress?: () => void;
  buttonStyle?: object;
};

export const SettingContainer = ({
  title,
  description,
  children,
  useButton,
  buttonTitle,
  onPress,
  buttonStyle
}: SettingContainerProps) => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <PressableItem onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" size={24} color={theme.colors.text} />
        </PressableItem>
        <View style={utils.flex}>
          <HeadingMedium bold style={[utils.align_self_center, utils.ml_n2]}>
            {title}
          </HeadingMedium>
        </View>
      </View>
      {description && (
        <View style={[utils.align_self_center, utils.mt_1]}>
          <BodyTextSmall>{description}</BodyTextSmall>
        </View>
      )}
      <View style={[utils.flex, utils.mb_5, utils.mt_4, utils.justify_content_between]}>
        <View>{children}</View>
        {useButton && (
          <View>
            <PrimaryButton title={buttonTitle} onPress={onPress} style={buttonStyle} />
          </View>
        )}
      </View>
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
    }
  });
