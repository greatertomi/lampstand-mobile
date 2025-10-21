import { FontAwesome5 } from '@expo/vector-icons';
import React, { useCallback, useMemo } from 'react';
import { Platform, View, ScrollView, TouchableOpacity } from 'react-native';

import { BodyText, BodyTextLarge, BodyTextSmall, Dialog, PressableItem } from '../../../../components';
import { useReader } from '../../../../package/epub-reader';
import { CustomThemeSettings, useCustomTheme } from '../../../../package/epub-reader/hooks/useCustomTheme';
import { generatePreviewStyles } from '../../../../package/epub-reader/provider/enhanced-theme';
import { READING_PRESET } from '../../../../package/types';
import { useTheme } from '../../../../styles';
import { logger } from '../../../../utils';

import { SpacingControl } from './SpacingControl';

export type CustomizeThemeProps = {
  isVisible: boolean;
  onClose: () => void;
  selectedPreset: READING_PRESET;
};

const SPACING_STEP = 5;
const MIN_SPACING = 0;
const MAX_SPACING = 100;

export const CustomizeTheme = ({ isVisible, onClose, selectedPreset }: CustomizeThemeProps) => {
  const { theme } = useTheme();
  const { changeFontSize } = useReader();
  const { customSettings, updateSetting, resetSettings, generateCSSStyles } = useCustomTheme();
  const utils = theme.utilities;

  const presetInfo = useMemo(() => {
    switch (selectedPreset) {
      case READING_PRESET.PAPER: {
        return {
          title: 'Paper',
          description: `At the heart of this conflict stood Lyla, a 
            brilliant young engineer disillusioned by the Syndicate's 
            exploitation of temporal resources. Secretly a member of the Chrono Echoes.`
        };
      }
      case READING_PRESET.BOLD: {
        return {
          title: 'Bold',
          description: `At the heart of this conflict stood Lyla, a
             brilliant young engineer disillusioned by the Syndicate's exploitation of temporal
              resources. Secretly a member of the Chrono Echoes.`
        };
      }
      default: {
        return {
          title: 'Original',
          description: `At the heart of this conflict stood Lyla, a brilliant young engineer
             disillusioned by the Syndicate's exploitation of temporal resources. 
             Secretly a member of the Chrono Echoes.`
        };
      }
    }
  }, [selectedPreset]);

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
    // Apply the customizations to the reader
    changeFontSize(customSettings.fontSize);
    // Additional customization logic using generateCSSStyles() would go here
    const cssStyles = generateCSSStyles();
    logger.info('Applying custom styles:', cssStyles);
    onClose();
  }, [customSettings, changeFontSize, generateCSSStyles, onClose]);

  return (
    <Dialog isVisible={isVisible} onClose={onClose} isOverlay>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Header */}
          <View style={[utils.flex_dir_row, utils.justify_content_between, utils.align_items_center]}>
            <View style={[utils.flex_dir_row, utils.align_items_center, utils.gap_3]}>
              <PressableItem onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <FontAwesome5 name="arrow-left" size={20} color={theme.colors.text} />
              </PressableItem>
              <BodyTextLarge bold>Customise Theme</BodyTextLarge>
            </View>
          </View>

          {/* Preview Section */}
          <View
            style={[
              styles.previewContainer,
              {
                backgroundColor:
                  selectedPreset === READING_PRESET.PAPER ? theme.colors.presetPaperBackground : theme.colors.background
              }
            ]}
          >
            <View style={[utils.mb_2]}>
              <BodyText
                bold
                style={{
                  color: selectedPreset === READING_PRESET.PAPER ? theme.colors.paperText : theme.colors.text
                }}
              >
                {presetInfo.title}
              </BodyText>
            </View>
            <BodyTextSmall
              style={[
                generatePreviewStyles(customSettings, theme.colors, selectedPreset),
                {
                  color: selectedPreset === READING_PRESET.PAPER ? theme.colors.paperText : theme.colors.text
                }
              ]}
            >
              {presetInfo.description}
            </BodyTextSmall>
          </View>

          {/* Texts Section */}
          <View style={[utils.mb_5]}>
            <BodyText bold style={[utils.mb_3]}>
              Texts
            </BodyText>

            {/* Font Size */}
            <View style={[utils.flex_dir_row, utils.justify_content_between, utils.align_items_center, utils.py_3]}>
              <View style={[utils.flex_dir_row, utils.align_items_center, utils.gap_3]}>
                <BodyTextSmall>Aa</BodyTextSmall>
                <BodyTextSmall>Font</BodyTextSmall>
              </View>
              <PressableItem
                style={[utils.flex_dir_row, utils.align_items_center, utils.gap_2]}
                onPress={() => {
                  // Open font picker - simplified implementation
                  logger.info('Open font picker');
                }}
              >
                <BodyTextSmall style={{ color: theme.colors.white }}>Plus sans jakarta</BodyTextSmall>
                <FontAwesome5 name="chevron-right" size={12} color={theme.colors.white} />
              </PressableItem>
            </View>

            {/* Bold Text Toggle */}
            <View style={[utils.flex_dir_row, utils.justify_content_between, utils.align_items_center, utils.py_3]}>
              <View style={[utils.flex_dir_row, utils.align_items_center, utils.gap_3]}>
                <BodyText bold>B</BodyText>
                <BodyTextSmall>Bold Text</BodyTextSmall>
              </View>
              <TouchableOpacity
                onPress={() => handleSettingChange('isBoldText', !customSettings.isBoldText)}
                style={[
                  styles.toggle,
                  {
                    backgroundColor: customSettings.isBoldText ? theme.colors.primary : theme.colors.secondaryBackground
                  }
                ]}
              >
                <View
                  style={[
                    styles.toggleThumb,
                    {
                      backgroundColor: theme.colors.white,
                      transform: [{ translateX: customSettings.isBoldText ? 20 : 2 }]
                    }
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Accessibility & Layout Options */}
          <View style={[utils.mb_n5]}>
            <BodyText bold style={[utils.mb_3]}>
              Accessibility & Layout Options
            </BodyText>

            <SpacingControl
              label="Paragraph spacing"
              value={customSettings.paragraphSpacing}
              onIncrease={() => adjustSpacing('paragraphSpacing', true)}
              onDecrease={() => adjustSpacing('paragraphSpacing', false)}
            />

            <SpacingControl
              label="Line spacing"
              value={customSettings.lineSpacing}
              onIncrease={() => adjustSpacing('lineSpacing', true)}
              onDecrease={() => adjustSpacing('lineSpacing', false)}
            />

            <SpacingControl
              label="Word spacing"
              value={customSettings.wordSpacing}
              onIncrease={() => adjustSpacing('wordSpacing', true)}
              onDecrease={() => adjustSpacing('wordSpacing', false)}
            />

            <SpacingControl
              label="Letter spacing"
              value={customSettings.letterSpacing}
              onIncrease={() => adjustSpacing('letterSpacing', true)}
              onDecrease={() => adjustSpacing('letterSpacing', false)}
            />
          </View>

          {/* Reset Theme Button */}
          <PressableItem onPress={resetTheme} style={[utils.py_4, utils.mb_4]}>
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
    </Dialog>
  );
};

const styles = {
  container: {
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    paddingHorizontal: 4
  },
  previewContainer: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
    minHeight: 120
  },
  spacingButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center' as const,
    alignItems: 'center' as const
  },
  toggle: {
    width: 44,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center' as const,
    position: 'relative' as const
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    position: 'absolute' as const
  },
  applyButton: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center' as const,
    marginBottom: 8
  }
};
