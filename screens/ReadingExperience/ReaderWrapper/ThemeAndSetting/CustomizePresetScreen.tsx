import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import {
  BodyText,
  BodyTextLarge,
  BodyTextSmall,
  PressableItem,
  PrimaryButton,
  ToggleButton
} from '../../../../components';
import { useReader } from '../../../../packages/epub-reader';
import { getFont, FontKey, getFontBase64, FONT_CONFIG } from '../../../../packages/fonts';
import { DEFAULT_PRESET_FONTS, hasBoldVariant } from '../../../../packages/fonts/fontUtils';
import { ScreenNavigation } from '../../../../routes';
import { savePresetTheme, loadPresetTheme, deletePresetTheme } from '../../../../services/presetThemeStorage';
import { useToastState } from '../../../../store';
import { Theme, useTheme } from '../../../../styles';
import { logger } from '../../../../utils';
import { ReaderSettingsContainer } from '../ReaderSettingsContainer';

import { FontSelection } from './FontSelection';
import { ListItem, ListItemProps } from './ListItem';
import { PreviewPreset } from './PreviewPresets';
import { SpacingControl } from './SpacingControl';

export const CustomizePresetScreen = () => {
  const { theme } = useTheme();
  const { preset, applyPreset } = useReader();
  const utils = theme.utilities;
  const styles = createStyles(theme);
  const navigate = useNavigation<ScreenNavigation<'Reader'>>();
  const { setToastMessage } = useToastState();

  const [shouldOpenFontSelect, setShouldOpenFontSelect] = useState<boolean>(false);
  const [activeFontKey, setActiveFontKey] = useState<FontKey>(DEFAULT_PRESET_FONTS[preset]);
  const [isBold, setIsBold] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [base64Font, setBase64Font] = useState<string>('');

  const [spacing, setSpacing] = useState({
    letter: 0,
    word: 0,
    line: 0,
    paragraph: 0
  });

  useEffect(() => {
    const loadSavedTheme = async () => {
      setIsLoading(true);
      const savedTheme = await loadPresetTheme(preset);

      if (savedTheme) {
        setActiveFontKey(savedTheme.fontKey);
        setIsBold(savedTheme.isBold);
        setSpacing(savedTheme.spacing);
      } else {
        setActiveFontKey(DEFAULT_PRESET_FONTS[preset]);
        setIsBold(false);
        setSpacing({ letter: 0, word: 0, line: 0, paragraph: 0 });
      }

      setIsLoading(false);
    };

    loadSavedTheme();
  }, [preset]);

  useEffect(() => {
    let isMounted = true;

    const loadFont = async () => {
      const shouldUseBoldFont = isBold && hasBoldVariant(activeFontKey);

      const b64 = shouldUseBoldFont
        ? await getFontBase64(activeFontKey, FONT_CONFIG[activeFontKey].boldFile)
        : await getFontBase64(activeFontKey);

      if (isMounted) {
        setBase64Font(b64);
      }
    };

    loadFont();

    return () => {
      isMounted = false;
    };
  }, [activeFontKey, isBold]);

  const selectedFontName = getFont(activeFontKey);
  const textCustomization: ListItemProps = {
    heading: 'Texts',
    list: [
      {
        icon: 'Aa',
        label: 'Font',
        rightElement: (
          <PressableItem
            onPress={() => setShouldOpenFontSelect(true)}
            style={[utils.flex_dir_row, utils.align_items_center, utils.justify_content_center, utils.gap_1]}
          >
            <BodyTextSmall>{activeFontKey}</BodyTextSmall>
            <AntDesign name="right" size={16} color={theme.colors.text} />
          </PressableItem>
        )
      },
      {
        icon: 'B',
        label: 'Bold Text',
        rightElement: <ToggleButton isEnabled={isBold} onValueChange={(value) => setIsBold(value)} />
      }
    ]
  };

  const handleApplyTheme = async () => {
    try {
      const customization = {
        fontFamily: selectedFontName,
        fontKey: activeFontKey,
        isBold,
        spacing,
        customizedAt: new Date().toISOString()
      };

      await savePresetTheme(preset, customization);
      applyPreset(preset);
      navigate.goBack();
    } catch (error) {
      setToastMessage('Failed to apply theme, try again!');
      logger.error('Failed to apply theme:', error);
    }
  };

  const handleResetTheme = async () => {
    try {
      await deletePresetTheme(preset);

      setSpacing({
        letter: 0,
        word: 0,
        line: 0,
        paragraph: 0
      });
      setIsBold(false);
      setActiveFontKey(DEFAULT_PRESET_FONTS[preset]);

      applyPreset(preset);
      navigate.goBack();
    } catch (error) {
      logger.error('Failed to reset theme:', error);
    }
  };

  const updateSpacing = (key: keyof typeof spacing, value: number) => {
    const cappedValue = Math.min(100, Math.max(0, value));
    setSpacing((prev) => ({ ...prev, [key]: cappedValue }));
  };

  if (isLoading) {
    return (
      <ReaderSettingsContainer title="Customize Theme">
        <View style={[utils.flex, utils.justify_content_center, utils.align_items_center, { minHeight: 200 }]}>
          <BodyTextSmall>Loading theme...</BodyTextSmall>
        </View>
      </ReaderSettingsContainer>
    );
  }

  return (
    <ReaderSettingsContainer title="Customize Theme">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={utils.px_2}>
          <PreviewPreset
            isBold={isBold && !hasBoldVariant(activeFontKey)}
            activeFontKey={activeFontKey}
            spacing={spacing}
            selectedFontName={selectedFontName}
            base64Font={base64Font}
          />

          <View style={utils.mt_2}>
            <ListItem heading={textCustomization.heading} list={textCustomization.list} />
          </View>

          <View style={styles.accessibility}>
            <BodyTextLarge bold style={utils.mb_1}>
              Accessibility & Layout Options
            </BodyTextLarge>
            <SpacingControl
              label="Letter spacing"
              value={spacing.letter}
              onIncrease={() => updateSpacing('letter', spacing.letter + 5)}
              onDecrease={() => updateSpacing('letter', spacing.letter - 5)}
              maxValue={100}
            />

            <SpacingControl
              label="Word spacing"
              value={spacing.word}
              onIncrease={() => updateSpacing('word', spacing.word + 5)}
              onDecrease={() => updateSpacing('word', spacing.word - 5)}
              maxValue={100}
            />

            <SpacingControl
              label="Line spacing"
              value={spacing.line}
              onIncrease={() => updateSpacing('line', spacing.line + 5)}
              onDecrease={() => updateSpacing('line', spacing.line - 5)}
              maxValue={100}
            />

            <SpacingControl
              label="Paragraph spacing"
              value={spacing.paragraph}
              onIncrease={() => updateSpacing('paragraph', spacing.paragraph + 5)}
              onDecrease={() => updateSpacing('paragraph', spacing.paragraph - 5)}
              maxValue={100}
              containerStyle={{ borderBottomWidth: 0 }}
            />
          </View>

          <View style={[utils.mt_2, utils.mb_2]}>
            <PressableItem onPress={handleResetTheme} style={styles.resetBtn}>
              <BodyText variant="error">Reset theme</BodyText>
            </PressableItem>
            <PrimaryButton onPress={handleApplyTheme} title="Apply" />
          </View>
        </View>
      </ScrollView>

      <FontSelection
        setShouldOpenFontSelect={setShouldOpenFontSelect}
        shouldOpenFontSelect={shouldOpenFontSelect}
        activeFontKey={activeFontKey}
        setActiveFontKey={setActiveFontKey}
      />
    </ReaderSettingsContainer>
  );
};

const createStyles = (theme: Theme) => ({
  accessibility: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: 10,
    padding: 20,
    marginTop: 16
  },
  resetBtn: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: theme.colors.cardBackground,
    borderRadius: 10
  }
});
