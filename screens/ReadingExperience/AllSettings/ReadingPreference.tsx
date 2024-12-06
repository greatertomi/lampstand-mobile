import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Theme, useTheme } from '../../../styles';
import { SettingContainer } from '../../Settings';

import { PreferenceList } from './PreferenceList';
import { usePreferenceListItems } from './usePreferenceItems';

export const ReadingPreference = () => {
  const preferenceListItem = usePreferenceListItems();
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  return (
    <SettingContainer title="Reading preferences">
      <View style={styles.container}>
        {preferenceListItem.map((item, index) => (
          <PreferenceList
            key={index}
            title={item.title}
            rightElement={item.rightElement}
            hasUnderline={index !== preferenceListItem.length - 1}
            isPressable={item.isPressable}
          />
        ))}
      </View>
    </SettingContainer>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      padding: 10,
      backgroundColor: theme.colors.white,
      borderRadius: 8
    }
  });
