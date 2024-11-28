import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { BodyText, TagText, ToggleButton } from '../../../components';
import { Theme, useTheme } from '../../../styles';

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    readingMode: {
      flexDirection: 'row',
      backgroundColor: theme.colors.primary,
      padding: 2,
      borderRadius: 5
    },
    scrolling: {
      padding: 8,
      backgroundColor: theme.colors.background,
      borderRadius: 5
    }
  });

export const usePreferenceListItems = () => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);
  const [isEnabled, setIsEnabled] = useState(false);
  const onValueChange = (value: boolean) => setIsEnabled(value);

  return [
    {
      title: 'Reading mode',
      rightElement: (
        <View style={styles.readingMode}>
          <TagText style={[utils.p_1]}>Paging</TagText>
          <View style={styles.scrolling}>
            <TagText>Scrolling</TagText>
          </View>
        </View>
      ),
      isPressable: false,
      onPress: () => {}
    },
    {
      title: 'Auto-scrolling',
      rightElement: <ToggleButton isEnabled={isEnabled} onValueChange={onValueChange} />,
      isPressable: false,
      onPress: () => {}
    },
    {
      title: 'Customise theme',
      rightElement: <MaterialIcons name="keyboard-arrow-right" size={24} color={theme.colors.text} />,
      isPressable: true,
      onPress: () => {}
    },
    {
      title: 'Language',
      rightElement: (
        <View style={[utils.flex_dir_row, utils.align_items_center, utils.gap_1]}>
          <BodyText style={utils.mr_1}>English</BodyText>
          <MaterialIcons name="keyboard-arrow-right" size={24} color={theme.colors.text} />
        </View>
      ),
      isPressable: true,
      onPress: () => {}
    },
    {
      title: 'Bookmarks',
      rightElement: <MaterialIcons name="keyboard-arrow-right" size={24} color={theme.colors.text} />,
      isPressable: true,
      onPress: () => {}
    },
    {
      title: 'Low light',
      rightElement: (
        <View style={[utils.flex_dir_row, utils.gap_1]}>
          <BodyText style={utils.mr_1}>Match device settings</BodyText>
          <MaterialIcons name="keyboard-arrow-right" size={24} color={theme.colors.text} />
        </View>
      ),
      isPressable: true,
      onPress: () => {}
    }
  ];
};
