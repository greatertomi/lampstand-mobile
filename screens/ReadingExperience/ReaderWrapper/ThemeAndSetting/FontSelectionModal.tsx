import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

import { BodyTextLarge, BodyText, BodyTextSmall, Dialog } from '../../../../components';
import { useTheme } from '../../../../styles';

interface FontFamily {
  label: string;
  value: string;
  isDownloaded?: boolean;
}

interface FontSelectionModalProps {
  isVisible: boolean;
  onClose: () => void;
  selectedFont: string;
  onSelectFont: (fontValue: string) => void;
}

// Font family constants
const FONT_LABELS = {
  PLUS_JAKARTA: 'Plus sans jakarata',
  POETSEN_ONE: 'Poetsen One',
  PURPLE_PURSE: 'Purple Purse',
  CABINET_GROTESK: 'Cabinet Grotesk',
  SEYMOUR_ONE: 'Seymour One',
  BOGART: 'Bogart',
  PORT_LLIGAT: 'Port Lligat Slab'
} as const;

const FONT_VALUES = {
  PLUS_JAKARTA: 'plus-jakarta-sans',
  POETSEN_ONE: 'poetsen-one',
  PURPLE_PURSE: 'purple-purse',
  CABINET_GROTESK: 'cabinet-grotesk',
  SEYMOUR_ONE: 'seymour-one',
  BOGART: 'bogart',
  PORT_LLIGAT: 'port-lligat-slab'
} as const;

const DOWNLOADED_LABEL = 'Downloaded';
const SYSTEM_FONT = 'System';
const TRANSPARENT_BG = 'transparent';

const FONT_FAMILIES: FontFamily[] = [
  { label: FONT_LABELS.PLUS_JAKARTA, value: FONT_VALUES.PLUS_JAKARTA, isDownloaded: true },
  { label: FONT_LABELS.POETSEN_ONE, value: FONT_VALUES.POETSEN_ONE },
  { label: FONT_LABELS.PURPLE_PURSE, value: FONT_VALUES.PURPLE_PURSE, isDownloaded: true },
  { label: FONT_LABELS.CABINET_GROTESK, value: FONT_VALUES.CABINET_GROTESK },
  { label: FONT_LABELS.SEYMOUR_ONE, value: FONT_VALUES.SEYMOUR_ONE },
  { label: FONT_LABELS.BOGART, value: FONT_VALUES.BOGART },
  { label: FONT_LABELS.PORT_LLIGAT, value: FONT_VALUES.PORT_LLIGAT }
];

export const FontSelectionModal = ({ isVisible, onClose, selectedFont, onSelectFont }: FontSelectionModalProps) => {
  const { theme } = useTheme();
  const utils = theme.utilities;

  const handleFontSelect = (fontValue: string) => {
    onSelectFont(fontValue);
    onClose();
  };

  return (
    <Dialog isVisible={isVisible} onClose={onClose} isOverlay padding={0}>
      <View style={[{ flex: 1, backgroundColor: theme.colors.background }]}>
        {/* Header */}
        <View
          style={[utils.flex_dir_row, utils.justify_content_center, utils.align_items_center, utils.px_2, utils.pb_4]}
        >
          <BodyTextLarge bold>Lampstand Reading Fonts</BodyTextLarge>
        </View>

        {/* Content */}
        <ScrollView style={[utils.flex]} showsVerticalScrollIndicator={false}>
          <View>
            {/* Suggested Section */}
            <View>
              <BodyTextLarge bold style={[utils.mb_2, utils.px_3]}>
                Suggested
              </BodyTextLarge>

              {FONT_FAMILIES.filter((font) => font.value === FONT_VALUES.PLUS_JAKARTA).map((font) => (
                <TouchableOpacity
                  key={font.value}
                  onPress={() => handleFontSelect(font.value)}
                  style={[
                    utils.flex_dir_row,
                    utils.justify_content_between,
                    utils.align_items_center,
                    utils.py_2,
                    utils.px_3,
                    {
                      backgroundColor: selectedFont === font.value ? theme.colors.inactiveButtonColor : TRANSPARENT_BG
                    }
                  ]}
                >
                  <View style={[utils.flex]}>
                    <BodyText style={{ fontFamily: font.value }}>{font.label}</BodyText>
                  </View>
                  {selectedFont === font.value && <FontAwesome5 name="check" size={16} color={theme.colors.primary} />}
                </TouchableOpacity>
              ))}
            </View>

            {/* All Fonts Section */}
            <View>
              {FONT_FAMILIES.filter((font) => font.value !== FONT_VALUES.PLUS_JAKARTA).map((font) => (
                <TouchableOpacity
                  key={font.value}
                  onPress={() => handleFontSelect(font.value)}
                  style={[
                    utils.flex_dir_row,
                    utils.justify_content_between,
                    utils.align_items_center,
                    utils.py_2,
                    utils.px_3,
                    {
                      backgroundColor: selectedFont === font.value ? theme.colors.inactiveButtonColor : TRANSPARENT_BG,
                      borderRadius: 8
                    }
                  ]}
                >
                  <View style={[utils.flex]}>
                    <BodyText style={{ fontFamily: font.value }}>{font.label}</BodyText>
                  </View>

                  <View style={[utils.flex_dir_row, utils.align_items_center, utils.gap_2]}>
                    {font.isDownloaded && (
                      <View
                        style={[
                          utils.px_2,
                          utils.py_1,
                          {
                            backgroundColor: theme.colors.background,
                            borderRadius: 4
                          }
                        ]}
                      >
                        <BodyTextSmall style={{ color: theme.colors.text, fontSize: 10 }}>
                          {DOWNLOADED_LABEL}
                        </BodyTextSmall>
                      </View>
                    )}

                    {selectedFont === font.value && (
                      <FontAwesome5 name="check" size={16} color={theme.colors.primary} />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </Dialog>
  );
};
