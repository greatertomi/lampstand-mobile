import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BodyText, DropdownPicker } from '../../../../components';
import { Theme, useTheme, utilities } from '../../../../styles';

const sizes = [
  { label: '12px', value: '12' },
  { label: '14px', value: '14' },
  { label: '16px', value: '16' },
  { label: '18px', value: '18' }
];

export const FontSizes = () => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const [selectedFontSize, setSelectedFontSize] = useState<string>('14');

  return (
    <View style={styles.section}>
      <View style={utilities.gap_1}>
        <BodyText bold>Text Size</BodyText>
        <BodyText variant="secondary">Change the size of your font</BodyText>
        <View style={[utilities.mt_n2, utilities.mb_2]}>
          <DropdownPicker value={selectedFontSize} data={sizes} onChange={(item) => setSelectedFontSize(item.value)} />
        </View>
      </View>
    </View>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    section: {
      backgroundColor: theme.colors.background,
      borderRadius: 10,
      padding: 12
    }
  });
