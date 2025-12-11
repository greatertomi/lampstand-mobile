import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { Dispatch, SetStateAction } from 'react';
import { View } from 'react-native';

import { BodyText, BodyTextLarge, Dialog, PreferenceList } from '../../../../components';
import { FontKey, FONTS } from '../../../../package/fonts';
import { useTheme } from '../../../../styles';
import { ICON_SIZE } from '../../../../utils';

type FontSelectTypes = {
  setActiveFontKey: Dispatch<SetStateAction<FontKey>>;
  activeFontKey: FontKey;
  setShouldOpenFontSelect: Dispatch<SetStateAction<boolean>>;
  shouldOpenFontSelect: boolean;
};

export const FontSelection = ({
  setShouldOpenFontSelect,
  shouldOpenFontSelect,
  activeFontKey,
  setActiveFontKey
}: FontSelectTypes) => {
  const { theme } = useTheme();
  const utils = theme.utilities;

  const fontFamilies = (Object.keys(FONTS) as FontKey[]).map((key) => ({
    title: key,
    fontKey: key
  }));

  return (
    <Dialog onClose={() => setShouldOpenFontSelect(false)} isVisible={shouldOpenFontSelect} useCancelButton isOverlay>
      <View>
        <BodyTextLarge style={utils.text_center} bold>
          Lampstand Reading Fonts
        </BodyTextLarge>
        {fontFamilies.length === 0 ? (
          <BodyText>Loading fonts...</BodyText>
        ) : (
          fontFamilies.map(({ title, fontKey }, index) => {
            const isActive = activeFontKey === fontKey;

            return (
              <PreferenceList
                key={fontKey}
                title={title}
                hasUnderline={index !== fontFamilies.length - 1}
                rightElement={
                  isActive ? (
                    <MaterialCommunityIcons name="check" size={ICON_SIZE} color={theme.colors.primary} />
                  ) : null
                }
                onPress={() => {
                  setActiveFontKey(fontKey);
                  setShouldOpenFontSelect(false);
                }}
              />
            );
          })
        )}
      </View>
    </Dialog>
  );
};
