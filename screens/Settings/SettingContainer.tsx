import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { HeadingMedium, IconButton } from '../../components';
import { useTheme, utilities } from '../../styles';

type SettingContainerProps = {
  title: string;
  children: ReactNode;
};

export const SettingContainer = ({ title, children }: SettingContainerProps) => (
  <View style={styles.headerContainer}>
    <View style={styles.header}>
      <IconButton>
        <Entypo name="chevron-left" size={24} color={useTheme().theme.colors.text} />
      </IconButton>
      <View style={utilities.flex}>
        <HeadingMedium bold style={utilities.align_self_center}>
          {title}
        </HeadingMedium>
      </View>
    </View>
    <View>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    padding: 16
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    marginVertical: 34
  }
});
