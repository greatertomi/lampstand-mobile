import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Theme, useTheme, utilities } from '../../styles';
import { SettingContainer } from './SettingContainer';
import { BodyText, BodyTextLarge } from '../../components';

export const DeleteAccount = () => {
  const { theme } = useTheme();
  const styles = createStylesheet(theme);

  return (
    <SettingContainer title="Delete Account" useButton buttonTitle="Delete my Account">
      <View style={styles.container}>
        <BodyTextLarge bold>Deleting your account will:</BodyTextLarge>
        <View>
          {Array.from({ length: 4 }, (_, index) => (
            <View key={index} style={[utilities.flex_dir_row, utilities.align_items_center]}>
              <Entypo name="dot-single" size={24} color="black" />
              <BodyText key={index}>Deleting your account will:</BodyText>
            </View>
          ))}
        </View>
      </View>
    </SettingContainer>
  );
};

const createStylesheet = (theme: Theme) => StyleSheet.create({
  container: {
    padding: 24,
    borderRadius: 10,
    gap: 8,
    backgroundColor: theme.colors.background,
  }
});
