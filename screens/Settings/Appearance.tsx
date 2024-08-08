import React, { useState } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { SettingContainer } from './SettingContainer';
import { BodyText, BodyTextLarge, ModeSwitcher, DropdownPicker } from '../../components';
import { Theme, useTheme, utilities } from '../../styles';

const fontSizes = [
  { label: '12px', value: '12' },
  { label: '14px', value: '14' },
  { label: '16px', value: '16' },
  { label: '18px', value: '18' }
];

export const Appearance = () => {
  const { theme } = useTheme();
  const [appearanceMode, setAppearanceMode] = useState<string>('Light');
  const [selectedFontSize, setSelectedFontSize] = useState<string>('14');
  const styles = createStyleSheet(theme);

  const appearances = [
    {
      title: 'Light',
      description: 'Theme will always be in light mode',
      image: (
        <View style={styles.lightSecondary}>
          <View style={styles.lightPrimary}>
            <BodyTextLarge style={styles.lightText}>Aa</BodyTextLarge>
          </View>
        </View>
      )
    },
    {
      title: 'Dark',
      description: 'Theme will always be in Dark mode',
      image: (
        <View style={styles.darkSecondary}>
          <View style={styles.darkPrimary}>
            <BodyText style={styles.darkText}>Aa</BodyText>
          </View>
        </View>
      )
    },
    {
      title: 'System Preference',
      description: 'Theme will always be in Dark mode',
      image: (
        <View style={styles.system}>
          <View style={styles.left}>
            <View style={styles.leftInner}>
              <BodyText style={utilities.text_center}>Aa</BodyText>
            </View>
          </View>
          <View style={styles.right}>
            <View style={styles.rightInner}>
              <BodyText style={utilities.text_center}>Aa</BodyText>
            </View>
          </View>
        </View>
      )
    }
  ];

  return (
    <SettingContainer title="Appearance">
      <View style={utilities.gap_2}>
        <View style={utilities.gap_2}>
          {appearances.map((mode, index) => (
            <ModeSwitcher
              key={index}
              title={mode.title}
              description={mode.description}
              image={mode.image}
              isSelected={appearanceMode === mode.title}
              onPress={() => setAppearanceMode(mode.title)}
            />
          ))}
        </View>
        <View style={styles.fontSection}>
          <View style={utilities.gap_1}>
            <BodyText bold>Text Size</BodyText>
            <BodyText style={{ color: theme.colors.secondaryText }}>Change the size of your font</BodyText>
            <View style={[utilities.mt_n2, utilities.mb_2]}>
              <DropdownPicker
                value={selectedFontSize}
                data={fontSizes}
                onChange={(item) => setSelectedFontSize(item.value)}
              />
            </View>
          </View>
        </View>
      </View>
    </SettingContainer>
  );
};

const createStyleSheet = (theme: Theme) => {
  const primaryShared = {
    width: 70,
    height: 70,
    borderRadius: 8
  };
  const SecondaryShared = {
    width: 80,
    height: 80,
    borderRadius: 8
  };
  const positioning: ViewStyle = {
    position: 'absolute',
    top: 10,
    left: 10
  };

  return StyleSheet.create({
    line: {
      width: '100%',
      borderWidth: 0.5,
      borderColor: theme.colors.cardBorderColor
    },
    fontSection: {
      backgroundColor: theme.colors.background,
      borderRadius: 10,
      padding: 10
    },
    lightSecondary: {
      ...SecondaryShared,
      position: 'relative',
      borderColor: theme.colors.text,
      borderWidth: 1,
      backgroundColor: theme.colors.secondary
    },
    lightPrimary: {
      ...primaryShared,
      ...positioning,
      borderColor: theme.colors.text,
      borderWidth: 1,
      backgroundColor: theme.colors.background
    },
    lightText: {
      ...positioning,
      color: theme.colors.text
    },
    darkSecondary: {
      ...SecondaryShared,
      borderColor: theme.colors.background,
      borderWidth: 1,
      position: 'relative',
      backgroundColor: theme.colors.text
    },
    darkPrimary: {
      ...primaryShared,
      ...positioning,
      borderColor: theme.colors.background,
      borderWidth: 1,
      backgroundColor: theme.colors.secondary
    },
    darkText: {
      ...positioning,
      color: theme.colors.background
    },
    system: {
      ...SecondaryShared,
      flexDirection: 'row'
    },
    left: {
      position: 'relative',
      width: 40,
      height: 80,
      backgroundColor: theme.colors.text,
      borderRadius: 1,
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      borderColor: theme.colors.text,
      borderWidth: 1,
      borderRightWidth: 0
    },
    right: {
      position: 'relative',
      width: 40,
      height: 80,
      backgroundColor: theme.colors.secondary,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      borderColor: theme.colors.text,
      borderWidth: 1,
      borderLeftWidth: 0
    },
    leftInner: {
      position: 'absolute',
      top: 10,
      left: 5,
      width: 35,
      height: 70,
      backgroundColor: theme.colors.secondary,
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      borderColor: theme.colors.text,
      borderWidth: 1,
      borderRightWidth: 0
    },
    rightInner: {
      position: 'absolute',
      top: 10,
      width: 35,
      height: 70,
      backgroundColor: theme.colors.background,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      borderColor: theme.colors.text,
      borderWidth: 1,
      borderLeftWidth: 0
    }
  });
};
