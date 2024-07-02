import React, { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { HeadingMedium, IconButton, PrimaryButton } from '../../components';
import { useTheme, utilities } from '../../styles';

type SettingContainerProps = {
  title: string;
  children: ReactNode;
  useButton?: boolean;
  buttonTitle?: string;
  onPress?: () => void;
};

export const SettingContainer = ({ title, children, useButton, buttonTitle, onPress }: SettingContainerProps) => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <IconButton onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" size={24} color={theme.colors.text} />
        </IconButton>
        <View style={utilities.flex}>
          <HeadingMedium bold style={utilities.align_self_center}>
            {title}
          </HeadingMedium>
        </View>
      </View>
      <View style={[utilities.flex, utilities.mb_4]}>
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

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    marginVertical: 34
  }
});
