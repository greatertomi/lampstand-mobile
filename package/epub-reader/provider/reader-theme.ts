/* eslint-disable no-restricted-syntax */

import { Asset } from 'expo-asset';
import { RefObject } from 'react';
import { Appearance } from 'react-native';

import { ThemeModeScheme } from '../../../styles';
import { DEFAULT_FONT_KEY, getFontInfo } from '../../../styles/fonts';
import {
  BuildThemeStylesParams,
  BuildThemeInjectionParams,
  ThemeStyles,
  WebViewPresetStyle
} from '../../../types/reader';
import { logger } from '../../../utils';
import { READING_PRESET } from '../../types';

import { CustomThemeSettings } from './CustomThemeProvider';

import type WebView from 'react-native-webview';

const FONT_INJECTION_DELAY_MS = 50;
const CUSTOM_FONT_STYLE_ID = 'custom-font-style';
const THEME_PREFIX = 'theme-';
const IMPORTANT_SUFFIX = ' !important';

const LIGHT_BG = '#fff';
const DARK_BG = '#121212';
const LIGHT_PAPER_BG = '#F0E2C8';
const DARK_PAPER_BG = '#2B1D0E';
const LIGHT_BOLD_BG = '#FAFAFA';
const DARK_BOLD_BG = '#1C1C1E';
const LIGHT_TEXT = '#000 !important';
const DARK_TEXT = '#fff !important';
const LIGHT_LINK_COLOR = '#0000EE';
const DARK_LINK_COLOR = '#009DDB';
const BOLD_FONT_WEIGHT = 'bold !important';
const ORIGINAL_FONT_WEIGHT = 'normal !important';

// --------------------------
// Helper functions
// --------------------------
const readFileAsDataURL = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener('loadend', () => {
      resolve(reader.result as string);
    });

    reader.addEventListener('error', () => {
      reject(new Error('Failed to read file as data URL'));
    });

    reader.readAsDataURL(blob);
  });

const buildFontFaceCSS = (fontName: string, base64Data: string): string => `
  @font-face {
    font-family: '${fontName}';
    src: url('${base64Data}') format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
`;

const loadFontAsBase64 = async (fontAsset: number): Promise<string> => {
  const asset = Asset.fromModule(fontAsset);
  await asset.downloadAsync();

  if (!asset.localUri) {
    throw new Error('Font URI not available after download');
  }

  const response = await fetch(asset.localUri);
  if (!response.ok) {
    throw new Error(`Failed to fetch font: ${response.statusText}`);
  }

  const blob = await response.blob();
  return readFileAsDataURL(blob);
};

// --------------------------
// Theme Injection Script Builder
// --------------------------
const buildThemeInjectionScript = (params: BuildThemeInjectionParams): string => {
  const { fontInfo, base64Font, uniqueThemeId, themeStyles, themePrefix } = params;
  const fontStyle = base64Font ? buildFontFaceCSS(fontInfo.name, base64Font) : null;

  return `
    (function() {
      try {
        console.log('Applying theme${fontStyle ? ` with font: ${fontInfo.name}` : ' (no custom font)'}');

        if (rendition?.themes?.registered) {
          Object.keys(rendition.themes.registered)
            .filter(name => name.startsWith('${themePrefix}'))
            .forEach(name => rendition.themes.unregister(name));
        }

        ${
          fontStyle
            ? `
        const applyFontToContents = (contents) => {
          try {
            if (!contents?.document) return;
            const existingStyle = contents.document.getElementById('${CUSTOM_FONT_STYLE_ID}');
            existingStyle?.remove();
            const style = contents.document.createElement('style');
            style.id = '${CUSTOM_FONT_STYLE_ID}';
            style.textContent = \`${fontStyle}\`;
            contents.document.head.appendChild(style);
          } catch (e) { 
            console.error('Error applying font to content:', e); 
          }
        };
        `
            : ''
        }

        rendition.themes.register('${uniqueThemeId}', ${JSON.stringify(themeStyles)});
        rendition.themes.select('${uniqueThemeId}');

        ${
          fontStyle
            ? `
        rendition.getContents()?.forEach(applyFontToContents);
        if (rendition._fontListener) {
          rendition.off('rendered', rendition._fontListener);
        }
        rendition._fontListener = () => {
          setTimeout(
            () => rendition.getContents()?.forEach(applyFontToContents), 
            ${FONT_INJECTION_DELAY_MS}
          );
        };
        rendition.on('rendered', rendition._fontListener);
        `
            : ''
        }

        console.log('Theme${fontStyle ? ' and font' : ''} registered successfully');
      } catch (error) {
        console.error('Error applying theme:', error);
      }
    })();
  `;
};

// --------------------------
// Preset Styles Configuration
// --------------------------
const PRESET_STYLES: Record<READING_PRESET, Record<'light' | 'dark', WebViewPresetStyle>> = {
  [READING_PRESET.ORIGINAL]: {
    light: {
      body: {
        background: LIGHT_BG,
        color: LIGHT_TEXT,
        fontWeight: ORIGINAL_FONT_WEIGHT
      },
      a: { color: LIGHT_LINK_COLOR },
      '.toc': { color: LIGHT_TEXT },
      'h1, h2, h3, h4, h5, h6, p': { color: LIGHT_TEXT },
      '*': { fontWeight: ORIGINAL_FONT_WEIGHT }
    },
    dark: {
      body: {
        background: DARK_BG,
        color: DARK_TEXT,
        fontWeight: ORIGINAL_FONT_WEIGHT
      },
      a: { color: DARK_LINK_COLOR },
      '.toc': { color: DARK_TEXT },
      'h1, h2, h3, h4, h5, h6, p': { color: DARK_TEXT },
      '*': { fontWeight: ORIGINAL_FONT_WEIGHT }
    }
  },
  [READING_PRESET.PAPER]: {
    light: {
      body: {
        background: LIGHT_PAPER_BG,
        color: LIGHT_TEXT,
        fontWeight: ORIGINAL_FONT_WEIGHT
      },
      a: { color: LIGHT_LINK_COLOR },
      '.toc': { color: LIGHT_TEXT },
      'h1, h2, h3, h4, h5, h6, p': { color: LIGHT_TEXT },
      '*': { fontWeight: ORIGINAL_FONT_WEIGHT }
    },
    dark: {
      body: {
        background: DARK_PAPER_BG,
        color: DARK_TEXT,
        fontWeight: ORIGINAL_FONT_WEIGHT
      },
      a: { color: DARK_LINK_COLOR },
      '.toc': { color: DARK_TEXT },
      'h1, h2, h3, h4, h5, h6, p': { color: DARK_TEXT },
      '*': { fontWeight: ORIGINAL_FONT_WEIGHT }
    }
  },
  [READING_PRESET.BOLD]: {
    light: {
      body: {
        background: LIGHT_BOLD_BG,
        color: LIGHT_TEXT,
        fontWeight: BOLD_FONT_WEIGHT
      },
      a: { color: LIGHT_LINK_COLOR },
      '.toc': { color: LIGHT_TEXT },
      'h1, h2, h3, h4, h5, h6, p': { color: LIGHT_TEXT },
      '*': { fontWeight: BOLD_FONT_WEIGHT }
    },
    dark: {
      body: {
        background: DARK_BOLD_BG,
        color: DARK_TEXT,
        fontWeight: BOLD_FONT_WEIGHT
      },
      a: { color: DARK_LINK_COLOR },
      '.toc': { color: DARK_TEXT },
      'h1, h2, h3, h4, h5, h6, p': { color: DARK_TEXT },
      '*': { fontWeight: BOLD_FONT_WEIGHT }
    }
  }
};

// --------------------------
// Theme Styles Builder
// --------------------------
const buildThemeStyles = (params: BuildThemeStylesParams): ThemeStyles => {
  const { presetStyle, fontFamily, fontWeight, customSettings, fontSize } = params;

  const lineHeight = customSettings?.lineSpacing
    ? `${1 + customSettings.lineSpacing / 100}${IMPORTANT_SUFFIX}`
    : `1.5${IMPORTANT_SUFFIX}`;

  const letterSpacing = customSettings?.letterSpacing
    ? `${customSettings.letterSpacing / 100}em${IMPORTANT_SUFFIX}`
    : `normal${IMPORTANT_SUFFIX}`;

  const wordSpacing = customSettings?.wordSpacing
    ? `${customSettings.wordSpacing / 10}em${IMPORTANT_SUFFIX}`
    : `normal${IMPORTANT_SUFFIX}`;

  const paragraphMargin = customSettings?.paragraphSpacing
    ? `${customSettings.paragraphSpacing / 10}em${IMPORTANT_SUFFIX}`
    : `1em${IMPORTANT_SUFFIX}`;

  return {
    body: {
      background: presetStyle.body.background,
      color: presetStyle.body.color,
      'font-family': `${fontFamily} !important`,
      'font-weight': fontWeight,
      'line-height': lineHeight,
      'letter-spacing': letterSpacing,
      'word-spacing': wordSpacing,
      'font-size': `${fontSize} !important`
    },
    a: { color: presetStyle.a.color },
    '.toc': { color: presetStyle['.toc'].color },
    'h1, h2, h3, h4, h5, h6, p': {
      color: presetStyle['h1, h2, h3, h4, h5, h6, p'].color,
      'margin-bottom': paragraphMargin,
      'font-size': `${fontSize} !important`
    },
    '*': {
      'font-family': `${fontFamily} !important`,
      'font-weight': fontWeight,
      'line-height': lineHeight,
      'letter-spacing': letterSpacing,
      'word-spacing': wordSpacing
    }
  };
};

// --------------------------
// Theme injection function
// --------------------------
interface InjectThemeParams {
  theme: ThemeModeScheme;
  book: RefObject<WebView>;
  preset?: READING_PRESET;
  customSettings?: CustomThemeSettings;
  fontSize?: string;
}

export const injectTheme = ({
  theme,
  book,
  preset = READING_PRESET.ORIGINAL,
  customSettings,
  fontSize = '1em'
}: InjectThemeParams) => {
  const resolvedTheme: 'light' | 'dark' =
    theme === ThemeModeScheme.System ? (Appearance.getColorScheme() === 'dark' ? 'dark' : 'light') : theme;

  const uniqueThemeId = `${THEME_PREFIX}${resolvedTheme}-${preset}-${Date.now()}`;
  const presetStyle = PRESET_STYLES[preset][resolvedTheme];

  // Determine font
  let selectedFontKey = customSettings?.fontFamily || DEFAULT_FONT_KEY;
  if (preset === READING_PRESET.BOLD && !customSettings?.fontFamily) {
    selectedFontKey = 'urbanist-bold';
  }

  logger.info('Font selection for theme injection:', {
    customSettingsFontFamily: customSettings?.fontFamily,
    selectedFontKey,
    preset
  });

  const fontInfo = getFontInfo(selectedFontKey);
  const fontFamily = `'${fontInfo.name}', -apple-system, sans-serif`;
  const fontWeight = customSettings?.isBoldText ? BOLD_FONT_WEIGHT : presetStyle.body.fontWeight;

  const themeStyles = buildThemeStyles({
    presetStyle,
    fontFamily,
    fontWeight,
    customSettings,
    fontSize
  });

  // Inject theme
  (async () => {
    try {
      let base64Font: string | null = null;
      try {
        logger.info('Loading font asset:', { fontName: fontInfo.name });
        base64Font = await loadFontAsBase64(fontInfo.asset);
      } catch (error) {
        logger.error('Error loading font asset, continuing without custom font:', error);
      }

      const injectScript = buildThemeInjectionScript({
        fontInfo,
        base64Font,
        uniqueThemeId,
        themeStyles,
        themePrefix: THEME_PREFIX
      });

      book.current?.injectJavaScript(injectScript);
    } catch (error) {
      logger.error('Error injecting theme:', error);
    }
  })();
};
