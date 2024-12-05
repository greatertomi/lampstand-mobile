import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Theme, useTheme } from '../../../styles';
import { SettingContainer } from '../../Settings';

import { LowLight } from './LowLight';
import { PreferenceList } from './PreferenceList';
import { usePreferenceListItems } from './usePreferenceItems';

export const ReadingPreference = () => {
  const [isLowLightModal, setIsLowLightModal] = useState(false);
  const preferenceListItem = usePreferenceListItems(isLowLightModal, setIsLowLightModal);
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
            onPress={item.onPress}
          />
        ))}
      </View>
      <LowLight isLowLightModal={isLowLightModal} setIsLowLightModal={setIsLowLightModal} />
    </SettingContainer>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      padding: 10,
      backgroundColor: theme.colors.background,
      borderRadius: 8
    }
  });
