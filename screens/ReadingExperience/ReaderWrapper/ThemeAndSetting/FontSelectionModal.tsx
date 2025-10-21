import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Modal, ScrollView, TouchableOpacity, View } from 'react-native';

import { BodyTextLarge, BodyText, BodyTextSmall, PressableItem } from '../../../../components';
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
  PLUS_JAKARTA: 'Plus sans jakarta',
  AVENIR: 'Avenir',
  INTER: 'Inter',
  POPPINS: 'Poppins',
  HELVETICA: 'Helvetica',
  SATOSHI: 'Satoshi',
  TV_SANS: 'Tv sans condemned'
} as const;

const FONT_VALUES = {
  PLUS_JAKARTA: 'plus-jakarta-sans',
  AVENIR: 'Avenir',
  INTER: 'Inter',
  POPPINS: 'Poppins',
  HELVETICA: 'Helvetica',
  SATOSHI: 'Satoshi',
  TV_SANS: 'TvSansCondemned'
} as const;

const DOWNLOADED_LABEL = 'Downloaded';
const SYSTEM_FONT = 'System';
const TRANSPARENT_BG = 'transparent';

const FONT_FAMILIES: FontFamily[] = [
  { label: FONT_LABELS.PLUS_JAKARTA, value: FONT_VALUES.PLUS_JAKARTA, isDownloaded: true },
  { label: FONT_LABELS.AVENIR, value: FONT_VALUES.AVENIR },
  { label: FONT_LABELS.INTER, value: FONT_VALUES.INTER, isDownloaded: true },
  { label: FONT_LABELS.POPPINS, value: FONT_VALUES.POPPINS },
  { label: FONT_LABELS.HELVETICA, value: FONT_VALUES.HELVETICA },
  { label: FONT_LABELS.SATOSHI, value: FONT_VALUES.SATOSHI },
  { label: FONT_LABELS.TV_SANS, value: FONT_VALUES.TV_SANS }
];

export const FontSelectionModal = ({ isVisible, onClose, selectedFont, onSelectFont }: FontSelectionModalProps) => {
  const { theme } = useTheme();
  const utils = theme.utilities;

  const handleFontSelect = (fontValue: string) => {
    onSelectFont(fontValue);
    onClose();
  };

  return (
    <Modal visible={isVisible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={[{ flex: 1, backgroundColor: theme.colors.background }]}>
        {/* Header */}
        <View
          style={[
            utils.flex_dir_row,
            utils.justify_content_between,
            utils.align_items_center,
            utils.px_4,
            utils.py_3,
            { borderBottomWidth: 1, borderBottomColor: theme.colors.border }
          ]}
        >
          <BodyTextLarge bold>Lampstand Reading Fonts</BodyTextLarge>
          <PressableItem onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <FontAwesome5 name="times" size={20} color={theme.colors.text} />
          </PressableItem>
        </View>

        {/* Content */}
        <ScrollView style={[utils.flex]} showsVerticalScrollIndicator={false}>
          <View style={[utils.p_4]}>
            {/* Suggested Section */}
            <View style={[utils.mb_3]}>
              <BodyText bold style={[utils.mb_3]}>
                Suggested
              </BodyText>

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
                    utils.mb_2,
                    {
                      backgroundColor: selectedFont === font.value ? theme.colors.background : TRANSPARENT_BG,
                      borderRadius: 8
                    }
                  ]}
                >
                  <View style={[utils.flex]}>
                    <BodyText
                      style={{
                        fontFamily: font.value === FONT_VALUES.PLUS_JAKARTA ? SYSTEM_FONT : font.value
                      }}
                    >
                      {font.label}
                    </BodyText>
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
                    utils.mb_2,
                    {
                      backgroundColor: selectedFont === font.value ? theme.colors.background : TRANSPARENT_BG,
                      borderRadius: 8
                    }
                  ]}
                >
                  <View style={[utils.flex]}>
                    <BodyText style={{ fontFamily: SYSTEM_FONT }}>{font.label}</BodyText>
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
    </Modal>
  );
};
