import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { HeadingSmall, PressableItem } from '../../../components';
import { Theme, useTheme } from '../../../styles';

type ReaderSettingsContainerProps = {
  title: string;
  children: ReactNode;
};

export const ReaderSettingsContainer = ({ children, title }: ReaderSettingsContainerProps) => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <PressableItem onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color={theme.colors.text} />
        </PressableItem>
        <View style={utils.flex}>
          <HeadingSmall bold style={utils.ml_3}>
            {title}
          </HeadingSmall>
        </View>
      </View>
      <View style={utils.flex}>{children}</View>
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 76,
      paddingHorizontal: 16
    }
  });
