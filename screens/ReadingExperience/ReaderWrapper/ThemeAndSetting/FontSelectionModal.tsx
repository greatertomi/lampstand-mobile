import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

import { BodyTextLarge, BodyText, Dialog } from '../../../../components';
import { useTheme } from '../../../../styles';

interface FontFamily {
  label: string;
  value: string;
}

interface FontSelectionModalProps {
  isVisible: boolean;
  onClose: () => void;
  selectedFont: string;
  onSelectFont: (fontValue: string) => void;
}

const getFontDisplayName = (fontValue: string) => {
  const fontMap: Record<string, string> = {
    'plus-jakarta-sans': 'Plus Jakarta Sans',
    'poetsen-one': 'Poetsen One',
    'purple-purse': 'Purple Purse',
    'cabinet-grotesk': 'Cabinet Grotesk',
    'seymour-one': 'Seymour One',
    bogart: 'Bogart',
    'port-lligat-slab': 'Port Lligat Slab',
    'urbanist-bold': 'Urbanist Bold'
  };
  return fontMap[fontValue] || fontValue;
};

const FONT_KEY_PLUS_JAKARTA = 'plus-jakarta-sans';
const FONT_KEY_POETSEN_ONE = 'poetsen-one';
const FONT_KEY_PURPLE_PURSE = 'purple-purse';
const FONT_KEY_CABINET_GROTESK = 'cabinet-grotesk';
const FONT_KEY_SEYMOUR_ONE = 'seymour-one';
const FONT_KEY_BOGART = 'bogart';
const FONT_KEY_PORT_LLIGAT = 'port-lligat-slab';

const FONT_VALUES = {
  PLUS_JAKARTA: FONT_KEY_PLUS_JAKARTA,
  POETSEN_ONE: FONT_KEY_POETSEN_ONE,
  PURPLE_PURSE: FONT_KEY_PURPLE_PURSE,
  CABINET_GROTESK: FONT_KEY_CABINET_GROTESK,
  SEYMOUR_ONE: FONT_KEY_SEYMOUR_ONE,
  BOGART: FONT_KEY_BOGART,
  PORT_LLIGAT: FONT_KEY_PORT_LLIGAT
} as const;

const TRANSPARENT_BG = 'transparent';

const FONT_FAMILIES: FontFamily[] = [
  { label: getFontDisplayName(FONT_KEY_PLUS_JAKARTA), value: FONT_KEY_PLUS_JAKARTA },
  { label: getFontDisplayName(FONT_KEY_POETSEN_ONE), value: FONT_KEY_POETSEN_ONE },
  { label: getFontDisplayName(FONT_KEY_PURPLE_PURSE), value: FONT_KEY_PURPLE_PURSE },
  { label: getFontDisplayName(FONT_KEY_CABINET_GROTESK), value: FONT_KEY_CABINET_GROTESK },
  { label: getFontDisplayName(FONT_KEY_SEYMOUR_ONE), value: FONT_KEY_SEYMOUR_ONE },
  { label: getFontDisplayName(FONT_KEY_BOGART), value: FONT_KEY_BOGART },
  { label: getFontDisplayName(FONT_KEY_PORT_LLIGAT), value: FONT_KEY_PORT_LLIGAT },
  { label: getFontDisplayName('urbanist-bold'), value: 'urbanist-bold' }
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
            <View>
              {/* Suggested Section */}
              {/* <BodyTextLarge bold style={[utils.mb_2, utils.px_3]}>
                Suggested
              </BodyTextLarge> */}

              {FONT_FAMILIES.filter((font) => font.value === FONT_VALUES.PLUS_JAKARTA).map((font) => (
                <TouchableOpacity
                  key={font.value}
                  onPress={() => handleFontSelect(font.value)}
                  style={[
                    utils.flex_dir_row,
                    utils.justify_content_between,
                    utils.align_items_center,
                    utils.py_3,
                    utils.px_3,
                    {
                      backgroundColor: selectedFont === font.value ? theme.colors.inactiveButtonColor : TRANSPARENT_BG
                    }
                  ]}
                >
                  <View style={[utils.flex]}>
                    <BodyText style={{ fontFamily: font.value, fontSize: 16 }}>{font.label}</BodyText>
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
                    utils.py_3,
                    utils.px_3,
                    {
                      backgroundColor: selectedFont === font.value ? theme.colors.inactiveButtonColor : TRANSPARENT_BG,
                      borderRadius: 8
                    }
                  ]}
                >
                  <View style={[utils.flex]}>
                    <BodyText style={{ fontFamily: font.value, fontSize: 16 }}>{font.label}</BodyText>
                  </View>

                  <View style={[utils.flex_dir_row, utils.align_items_center, utils.gap_2]}>
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
