import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { BodyTextLarge, BodyText, Dialog } from '../../../../components';
import { Theme, useTheme } from '../../../../styles';
import { FONT_KEYS, FONT_DISPLAY_NAMES, FontKey } from '../../../../styles/fonts';

interface FontSelectionModalProps {
  isVisible: boolean;
  onClose: () => void;
  selectedFont: string;
  onSelectFont: (fontValue: FontKey) => void;
}

const TRANSPARENT_BG = 'transparent';

export const FontSelectionModal = ({ isVisible, onClose, selectedFont, onSelectFont }: FontSelectionModalProps) => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const utils = theme.utilities;

  const handleFontSelect = (fontValue: FontKey) => {
    onSelectFont(fontValue);
    onClose();
  };

  const allFonts: FontKey[] = Object.values(FONT_KEYS);

  return (
    <Dialog isVisible={isVisible} onClose={onClose} isOverlay padding={0}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <BodyTextLarge bold>Lampstand Reading Fonts</BodyTextLarge>
        </View>

        {/* Content */}
        <ScrollView style={[utils.flex]} showsVerticalScrollIndicator={false}>
          <View>
            {allFonts.map((fontKey) => (
              <TouchableOpacity
                key={fontKey}
                onPress={() => handleFontSelect(fontKey)}
                style={[
                  styles.listItem,
                  {
                    backgroundColor: selectedFont === fontKey ? theme.colors.inactiveButtonColor : TRANSPARENT_BG
                  }
                ]}
              >
                <View style={[utils.flex]}>
                  <BodyText style={{ fontFamily: fontKey, fontSize: 16 }}>{FONT_DISPLAY_NAMES[fontKey]}</BodyText>
                </View>
                <View style={styles.iconContainer}>
                  {selectedFont === fontKey && <FontAwesome5 name="check" size={16} color={theme.colors.primary} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </Dialog>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 8,
      paddingBottom: 16
    },
    listItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 12,
      borderRadius: 8,
      marginHorizontal: 8,
      marginVertical: 2
    },
    iconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8
    }
  });
