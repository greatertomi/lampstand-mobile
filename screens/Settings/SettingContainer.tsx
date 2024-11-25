import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { BodyTextSmall, HeadingMedium, IconButton, PrimaryButton } from '../../components';
import { Theme, useTheme } from '../../styles';

type SettingContainerProps = {
  title: string;
  description?: string;
  children: ReactNode;
  useButton?: boolean;
  buttonTitle?: string;
  onPress?: () => void;
};

export const SettingContainer = ({
  title,
  description,
  children,
  useButton,
  buttonTitle,
  onPress
}: SettingContainerProps) => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <IconButton onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" size={24} color={theme.colors.text} />
        </IconButton>
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
      <View style={[utils.flex, utils.mb_4, utils.mt_4]}>
        <ScrollView>{children}</ScrollView>
        {useButton && (
          <View>
            <PrimaryButton title={buttonTitle} onPress={onPress} />
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
