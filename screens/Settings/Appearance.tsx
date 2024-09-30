import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SettingContainer } from './SettingContainer';
import { BodyText, BodyTextLarge, DropdownPicker } from '../../components';
import { Theme, useTheme } from '../../styles';

interface AppearanceProps {
  topLeftDivBackground: string;
  topRightDivBackground: string;
  bottomLeftDivBackground: string;
  bottomRightDivBackground: string;
}

const fontSizes = [
  { label: '12px', value: '12' },
  { label: '14px', value: '14' },
  { label: '16px', value: '16' },
  { label: '18px', value: '18' }
];

export const Appearance = () => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const [appearanceMode, setAppearanceMode] = useState<string>('Light');
  const [selectedFontSize, setSelectedFontSize] = useState<string>('14');
  const styles = createStyleSheet(theme);
  const DIV_RADIUS = 10;

  const fullGraySlab = <View style={styles.graySlab} />;
  const halfGraySlab = <View style={styles.halfSlab} />;
  const fullPrimarySlab = <View style={styles.primarySlab} />;
  const roundDots = <View style={styles.roundedDots} />;
  const topLeft = (background: string) => (
    <View style={[styles.baseStyle, { backgroundColor: background, borderTopLeftRadius: DIV_RADIUS }]} />
  );
  const topRight = (background: string) => (
    <View style={[styles.baseStyle, { backgroundColor: background, borderTopRightRadius: DIV_RADIUS }]} />
  );
  const bottomLeft = (background: string) => (
    <View style={[styles.baseStyle, { backgroundColor: background, borderBottomLeftRadius: DIV_RADIUS }]} />
  );
  const bottomRight = (background: string) => (
    <View style={[styles.baseStyle, { backgroundColor: background, borderBottomRightRadius: DIV_RADIUS }]} />
  );

  const dummySkeleton = (
    <View style={styles.skeleton}>
      <View style={{ gap: 3 }}>
        <View style={[utils.align_self_center]}>{fullGraySlab}</View>
        <View style={[utils.align_self_center]}>{halfGraySlab}</View>
      </View>
      <View style={[utils.align_items_center, utils.gap_3]}>
        <View style={[utils.flex_dir_row, { gap: 2 }]}>
          {Array.from({ length: 5 }, (_, index) => (
            <View key={index}>{roundDots}</View>
          ))}
        </View>
        {fullPrimarySlab}
      </View>
    </View>
  );

  const selectiveMode = ({
    topRightDivBackground,
    topLeftDivBackground,
    bottomLeftDivBackground,
    bottomRightDivBackground
  }: AppearanceProps) => (
    <View style={styles.mode}>
      <View style={utils.flex_dir_row}>
        {topLeft(topLeftDivBackground)}
        {topRight(topRightDivBackground)}
      </View>
      {dummySkeleton}
      <View style={utils.flex_dir_row}>
        {bottomLeft(bottomLeftDivBackground)}
        {bottomRight(bottomRightDivBackground)}
      </View>
    </View>
  );

  const appearances = [
    {
      title: 'Light',
      component: selectiveMode({
        topLeftDivBackground: theme.colors.secondaryBackground,
        topRightDivBackground: theme.colors.secondaryBackground,
        bottomRightDivBackground: theme.colors.background,
        bottomLeftDivBackground: theme.colors.background
      })
    },
    {
      title: 'Dark',
      component: selectiveMode({
        topLeftDivBackground: theme.colors.tertiaryText,
        topRightDivBackground: theme.colors.tertiaryText,
        bottomRightDivBackground: theme.colors.text,
        bottomLeftDivBackground: theme.colors.text
      })
    },
    {
      title: 'System',
      component: selectiveMode({
        topLeftDivBackground: theme.colors.secondaryBackground,
        topRightDivBackground: theme.colors.tertiaryText,
        bottomRightDivBackground: theme.colors.text,
        bottomLeftDivBackground: theme.colors.background
      })
    }
  ];

  return (
    <SettingContainer title="Appearance">
      <BodyTextLarge bold style={utils.mb_2}>
        Theme
      </BodyTextLarge>
      <View style={utils.gap_4}>
        <View style={styles.section}>
          <View style={utils.gap_1}>
            <BodyText bold>Mode</BodyText>
            <View style={[utils.flex_dir_row, utils.align_items_center, utils.justify_content_evenly]}>
              {appearances.map((appearance) => (
                <Pressable onPress={() => setAppearanceMode(appearance.title)} style={utils.gap_2}>
                  <View style={appearanceMode === appearance.title && styles.active}>{appearance.component}</View>
                  <BodyText bold style={utils.text_center}>
                    {appearance.title}
                  </BodyText>
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={utils.gap_1}>
            <BodyText bold>Text Size</BodyText>
            <BodyText style={{ color: theme.colors.secondaryText }}>Change the size of your font</BodyText>
            <View style={[utils.mt_n2, utils.mb_2]}>
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
  const slabBackground = '#898a8d';

  return StyleSheet.create({
    section: {
      backgroundColor: theme.colors.background,
      borderRadius: 10,
      padding: 12
    },
    graySlab: {
      height: 8,
      width: 44,
      borderRadius: 2,
      backgroundColor: slabBackground
    },
    primarySlab: {
      height: 8,
      width: 44,
      borderRadius: 2,
      backgroundColor: theme.colors.primary
    },
    halfSlab: {
      height: 8,
      width: 19,
      borderRadius: 2,
      backgroundColor: slabBackground
    },
    roundedDots: {
      width: 6,
      height: 6,
      borderRadius: 50,
      backgroundColor: slabBackground
    },
    baseStyle: {
      width: 36,
      height: 64
    },
    skeleton: {
      position: 'absolute',
      height: '100%',
      justifyContent: 'space-between',
      padding: 10,
      zIndex: 10
    },
    mode: {
      width: 76,
      height: 132,
      borderWidth: 2,
      borderRadius: 10,
      borderColor: theme.colors.border,
      alignItems: 'center',
      position: 'relative'
    },
    active: {
      borderRadius: 10,
      borderWidth: 2,
      borderColor: theme.colors.primary,
      padding: 4
    }
  });
};
