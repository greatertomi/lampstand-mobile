import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { BodyText, PressableItem, TagText, ToggleButton } from '../../../components';
import { Theme, useTheme } from '../../../styles';

enum ReadingMode {
  Paging = 'paging',
  Scrolling = 'scrolling'
}

export const usePreferenceListItems = () => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);
  const [isEnabled, setIsEnabled] = useState(false);
  const onValueChange = (value: boolean) => setIsEnabled(value);
  const [readingMode, setReadingMode] = useState<ReadingMode>(ReadingMode.Scrolling);
  const toggleMode = (mode: ReadingMode) => setReadingMode(mode);

  return [
    {
      title: 'Reading mode',
      rightElement: (
        <View style={styles.readingMode}>
          <PressableItem
            style={[styles.item, readingMode === ReadingMode.Paging && styles.selected]}
            onPress={() => toggleMode(ReadingMode.Paging)}
          >
            <TagText>Paging</TagText>
          </PressableItem>
          <PressableItem
            style={[styles.item, readingMode === ReadingMode.Scrolling && styles.selected]}
            onPress={() => toggleMode(ReadingMode.Scrolling)}
          >
            <TagText>Scrolling</TagText>
          </PressableItem>
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

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    readingMode: {
      flexDirection: 'row',
      backgroundColor: theme.colors.primary,
      alignSelf: 'center',
      padding: 2,
      borderRadius: 5
    },
    item: {
      padding: 8,
      borderRadius: 5
    },
    selected: {
      backgroundColor: theme.colors.white
    }
  });
