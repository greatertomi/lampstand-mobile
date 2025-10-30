import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useCallback, useMemo } from 'react';
import { Platform, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BodyTextLarge, BodyTextSmall, PressableItem, BodyText } from '../../../../components';
import { Separator } from '../../../../components/Separator';
import { useReader, useCustomTheme } from '../../../../package/epub-reader';
import { CustomThemeSettings } from '../../../../package/epub-reader/provider/CustomThemeProvider';
import { generatePreviewStyles } from '../../../../package/epub-reader/provider/enhanced-theme';
import { READING_PRESET } from '../../../../package/types';
import { RootStackParamList } from '../../../../routes/types';
import { useTheme, Theme } from '../../../../styles';

import { FontSelectionModal } from './FontSelectionModal';
import { SpacingControl } from './SpacingControl';

type CustomizeThemeRouteProp = RouteProp<RootStackParamList, 'CustomizeTheme'>;

const SPACING_STEP = 5;
const MIN_SPACING = 0;
const MAX_SPACING = 100;

const PreviewCard = ({
  preset,
  customSettings,
  theme
}: {
  preset: READING_PRESET;
  customSettings: CustomThemeSettings;
  theme: Theme;
}) => {
  const presetInfo = useMemo(() => {
    switch (preset) {
      case READING_PRESET.PAPER: {
        return {
          title: 'Paper',
          description: `At the heart of this conflict stood Lyla, a 
            brilliant young engineer disillusioned by the Syndicate's 
            exploitation of temporal resources. Secretly a member of 
            the Chrono Echoes.`
        };
      }
      case READING_PRESET.BOLD: {
        return {
          title: 'Bold',
          description: `At the heart of this conflict stood Lyla, a 
            brilliant young engineer disillusioned by the Syndicate's 
            exploitation of temporal resources. Secretly a member of
            the Chrono Echoes.`
        };
      }
      default: {
        return {
          title: 'Original',
          description: `At the heart of this conflict stood Lyla, a 
            brilliant young engineer disillusioned by the Syndicate's
            exploitation of temporal resources. Secretly a member of
            the Chrono Echoes.`
        };
      }
    }
  }, [preset]);

  const getPresetColors = useCallback(() => {
    const { colors } = theme;

    if (preset === READING_PRESET.PAPER) {
      return {
        backgroundColor: colors.presetPaperBackground,
        textColor: colors.paperText,
        borderColor: colors.paperBorderColor
      };
    }

    if (preset === READING_PRESET.BOLD) {
      return {
        backgroundColor: colors.cardBackground,
        textColor: colors.text,
        borderColor: colors.border
      };
    }

    // Default preset
    return {
      backgroundColor: colors.cardBackground,
      textColor: colors.text,
      borderColor: colors.border
    };
  }, [preset, theme]);

  const colors = getPresetColors();
  const previewStyles = generatePreviewStyles(customSettings, theme.colors, preset);

  return (
    <View
      style={[
        styles.previewContainer,
        {
          backgroundColor: colors.backgroundColor,
          borderColor: colors.borderColor,
          borderWidth: StyleSheet.hairlineWidth,
          overflow: 'hidden'
        }
      ]}
    >
      <View style={[{ marginBottom: 8 }]}>
        <BodyText bold style={{ color: colors.textColor }}>
          {presetInfo.title}
        </BodyText>
      </View>
      <BodyTextSmall style={[previewStyles, { color: colors.textColor }]}>{presetInfo.description}</BodyTextSmall>
      {/* Gradient Fade Overlay */}
      <LinearGradient
        colors={['transparent', `${colors.backgroundColor}E6`, colors.backgroundColor]}
        style={styles.fadeOverlay}
      />
    </View>
  );
};

const getFontDisplayName = (fontValue: string) => {
  const fontMap: Record<string, string> = {
    'plus-jakarta-sans': 'Plus sans jakarata',
    'poetsen-one': 'Poetsen One',
    'purple-purse': 'Purple Purse',
    'cabinet-grotesk': 'Cabinet Grotesk',
    'seymour-one': 'Seymour One',
    'bogart': 'Bogart',
    'port-lligat-slab': 'Port Lligat Slab'
  };

  return fontMap[fontValue] ?? fontValue;
};

export const CustomizeThemeScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute<CustomizeThemeRouteProp>();
  const selectedPreset = route.params.selectedPreset as READING_PRESET;
  const { changeFontSize, applyPreset } = useReader();
  const { customSettings, updateSetting, resetSettings } = useCustomTheme();
  const utils = theme.utilities;

  const [isShowFontModal, setisShowFontModal] = useState(false);

  const handleSettingChange = useCallback(
    <K extends keyof CustomThemeSettings>(key: K, value: CustomThemeSettings[K]) => {
      updateSetting(key, value);
    },
    [updateSetting]
  );

  const adjustSpacing = useCallback(
    (type: 'paragraphSpacing' | 'lineSpacing' | 'wordSpacing' | 'letterSpacing', increment: boolean) => {
      const currentValue = customSettings[type];
      const newValue = Math.max(
        MIN_SPACING,
        Math.min(MAX_SPACING, currentValue + (increment ? SPACING_STEP : -SPACING_STEP))
      );
      updateSetting(type, newValue);
    },
    [customSettings, updateSetting]
  );

  const resetTheme = useCallback(() => {
    resetSettings(selectedPreset);
    changeFontSize('1.0em');
  }, [selectedPreset, changeFontSize, resetSettings]);

  const applyCustomizations = useCallback(() => {
    changeFontSize(customSettings.fontSize);
    applyPreset(selectedPreset);

    navigation.goBack();
  }, [customSettings, changeFontSize, applyPreset, selectedPreset, navigation]);

  const handleFontSelect = useCallback(
    (fontValue: string) => {
      updateSetting('fontFamily', fontValue);
    },
    [updateSetting]
  );

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Header */}
      <View style={[utils.flex_dir_row, utils.align_items_center, utils.px_4, utils.py_0]}>
        <PressableItem onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <FontAwesome5 name="arrow-left" size={20} color={theme.colors.text} />
        </PressableItem>
        <View style={{ marginHorizontal: 'auto' }}>
          <BodyTextLarge bold>Customize Theme</BodyTextLarge>
        </View>
      </View>

      <ScrollView style={[utils.flex]} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Preview Card */}
          <PreviewCard preset={selectedPreset} customSettings={customSettings} theme={theme} />

          {/* Texts Card */}
          <View
            style={[
              utils.mb_3,
              utils.p_3,
              {
                backgroundColor: theme.colors.cardBackground,
                borderRadius: 8,
                shadowColor: theme.colors.neutralGrey,
                shadowOpacity: 0.1,
                shadowRadius: 3,
                elevation: 2
              }
            ]}
          >
            <BodyText bold style={[utils.mb_3]}>
              Texts
            </BodyText>

            {/* Font Selection */}
            <TouchableOpacity
              onPress={() => setisShowFontModal(true)}
              style={[utils.flex_dir_row, utils.justify_content_between, utils.align_items_center, utils.py_2]}
            >
              <View style={[utils.flex_dir_row, utils.align_items_center, utils.gap_3]}>
                <BodyText bold>Aa</BodyText>
                <BodyText>Font</BodyText>
              </View>
              <View style={[utils.flex_dir_row, utils.align_items_center, utils.gap_2]}>
                <BodyTextSmall style={{ color: theme.colors.text }}>
                  {getFontDisplayName(customSettings.fontFamily)}
                </BodyTextSmall>
                <FontAwesome5 name="chevron-right" size={12} color={theme.colors.text} />
              </View>
            </TouchableOpacity>
            <Separator direction="horizontal" color={theme.colors.inactiveButtonColor} />

            {/* Bold Text Toggle */}
            <View style={[utils.flex_dir_row, utils.justify_content_between, utils.align_items_center, utils.py_2]}>
              <View style={[utils.flex_dir_row, utils.align_items_center, utils.gap_3]}>
                <BodyText bold>B</BodyText>
                <BodyText>Bold Text</BodyText>
              </View>
              <TouchableOpacity
                onPress={() => handleSettingChange('isBoldText', !customSettings.isBoldText)}
                style={[
                  styles.toggle,
                  {
                    backgroundColor: customSettings.isBoldText ? theme.colors.primary : theme.colors.neutralGrey
                  }
                ]}
              >
                <View
                  style={[
                    styles.toggleThumb,
                    {
                      backgroundColor: theme.colors.background,
                      transform: [{ translateX: customSettings.isBoldText ? 20 : 2 }]
                    }
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Accessibility & Layout Options */}
          <View
            style={[
              utils.mb_2,
              utils.p_3,
              {
                backgroundColor: theme.colors.cardBackground,
                borderRadius: 8,
                shadowColor: theme.colors.neutralGrey,
                shadowOpacity: 0.1,
                shadowRadius: 3,
                elevation: 2
              }
            ]}
          >
            <BodyText bold style={[utils.mb_2]}>
              Accessibility & Layout Options
            </BodyText>

            <SpacingControl
              label="Paragraph spacing"
              value={customSettings.paragraphSpacing}
              onIncrease={() => adjustSpacing('paragraphSpacing', true)}
              onDecrease={() => adjustSpacing('paragraphSpacing', false)}
              min={MIN_SPACING}
              max={MAX_SPACING}
            />
            <Separator direction="horizontal" color={theme.colors.inactiveButtonColor} />
            <SpacingControl
              label="Line spacing"
              value={customSettings.lineSpacing}
              onIncrease={() => adjustSpacing('lineSpacing', true)}
              onDecrease={() => adjustSpacing('lineSpacing', false)}
              min={MIN_SPACING}
              max={MAX_SPACING}
            />
            <Separator direction="horizontal" color={theme.colors.inactiveButtonColor} />
            <SpacingControl
              label="Word spacing"
              value={customSettings.wordSpacing}
              onIncrease={() => adjustSpacing('wordSpacing', true)}
              onDecrease={() => adjustSpacing('wordSpacing', false)}
              min={MIN_SPACING}
              max={MAX_SPACING}
            />
            <Separator direction="horizontal" color={theme.colors.inactiveButtonColor} />
            <SpacingControl
              label="Letter spacing"
              value={customSettings.letterSpacing}
              onIncrease={() => adjustSpacing('letterSpacing', true)}
              onDecrease={() => adjustSpacing('letterSpacing', false)}
              min={MIN_SPACING}
              max={MAX_SPACING}
            />
          </View>

          {/* Reset Theme Button */}
          <PressableItem
            onPress={resetTheme}
            style={[
              utils.p_3,
              utils.mb_2,
              {
                backgroundColor: theme.colors.cardBackground,
                borderRadius: 8,
                shadowColor: theme.colors.neutralGrey,
                shadowOpacity: 0.1,
                shadowRadius: 3,
                elevation: 2
              }
            ]}
          >
            <BodyTextSmall style={{ color: theme.colors.error }}>Reset theme</BodyTextSmall>
          </PressableItem>

          {/* Apply Button */}
          <TouchableOpacity
            onPress={applyCustomizations}
            style={[styles.applyButton, { backgroundColor: theme.colors.primary }]}
          >
            <BodyText bold style={{ color: theme.colors.white }}>
              Apply
            </BodyText>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Font Selection Modal */}
      <FontSelectionModal
        isVisible={isShowFontModal}
        onClose={() => setisShowFontModal(!isShowFontModal)}
        selectedFont={customSettings.fontFamily}
        onSelectFont={handleFontSelect}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20
  },
  previewContainer: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
    minHeight: 120
  },
  fadeOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50
  },
  toggle: {
    width: 44,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    position: 'relative'
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    position: 'absolute'
  },
  applyButton: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8
  }
});
