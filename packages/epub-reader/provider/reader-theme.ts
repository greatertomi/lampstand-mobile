/* eslint-disable no-restricted-syntax */

import { RefObject } from 'react';
import { Appearance } from 'react-native';

import { PresetThemeCustomization } from '../../../services/presetThemeStorage';
import { ThemeModeScheme } from '../../../styles';
import { FONT_DATA, preloadFontData, FontKey, getFontBase64 } from '../../fonts';
import { READING_PRESET } from '../../types';

import type WebView from 'react-native-webview';

type InjectThemeType = {
  theme: ThemeModeScheme;
  book: RefObject<WebView>;
  preset: READING_PRESET;
  customization?: PresetThemeCustomization | null;
};

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

export const PRESET_STYLES = {
  [READING_PRESET.ORIGINAL]: {
    light: {
      body: { background: LIGHT_BG, color: LIGHT_TEXT, fontWeight: ORIGINAL_FONT_WEIGHT },
      a: { color: LIGHT_LINK_COLOR },
      '.toc': { color: LIGHT_TEXT },
      'h1, h2, h3, h4, h5, h6, p': { color: LIGHT_TEXT },
      '*': { fontWeight: ORIGINAL_FONT_WEIGHT }
    },
    dark: {
      body: { background: DARK_BG, color: DARK_TEXT, fontWeight: ORIGINAL_FONT_WEIGHT },
      a: { color: DARK_LINK_COLOR },
      '.toc': { color: DARK_TEXT },
      'h1, h2, h3, h4, h5, h6, p': { color: DARK_TEXT },
      '*': { fontWeight: ORIGINAL_FONT_WEIGHT }
    }
  },
  [READING_PRESET.PAPER]: {
    light: {
      body: { background: LIGHT_PAPER_BG, color: LIGHT_TEXT, fontWeight: ORIGINAL_FONT_WEIGHT },
      a: { color: LIGHT_LINK_COLOR },
      '.toc': { color: LIGHT_TEXT },
      'h1, h2, h3, h4, h5, h6, p': { color: LIGHT_TEXT },
      '*': { fontWeight: ORIGINAL_FONT_WEIGHT }
    },
    dark: {
      body: { background: DARK_PAPER_BG, color: DARK_TEXT, fontWeight: ORIGINAL_FONT_WEIGHT },
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

export const injectTheme = async ({
  theme,
  book,
  preset = READING_PRESET.ORIGINAL,
  customization
}: InjectThemeType) => {
  const resolvedTheme: 'light' | 'dark' =
    theme === ThemeModeScheme.System ? (Appearance.getColorScheme() === 'dark' ? 'dark' : 'light') : theme;

  const uniqueThemeId = `${resolvedTheme}-${Date.now()}`;
  const presetStyle = PRESET_STYLES[preset][resolvedTheme];

  let activeFontKey: FontKey = preset === READING_PRESET.BOLD ? 'UrbanistBold' : 'PlusJakartaSans';

  if (customization) {
    activeFontKey = customization.fontKey as FontKey;
  }

  const fontFamily = `'${activeFontKey}', sans-serif`;
  const fontWeight = customization?.isBold ? 'bold !important' : presetStyle.body.fontWeight;

  await preloadFontData(activeFontKey, getFontBase64);
  const fontBase64 = FONT_DATA[activeFontKey];

  const letterSpacing = customization ? `${(customization.spacing.letter / 100) * 14}px` : '0px';

  const wordSpacing = customization ? `${(customization.spacing.word / 100) * 14}px` : '0px';

  const lineHeightMultiplier = customization ? 1 + customization.spacing.line / 100 : 1;

  const paragraphMargin = customization ? `${(customization.spacing.paragraph / 100) * 20}px` : '0px';

  const fontInjectionJS = `
  (function() {
    const fontKey = '${activeFontKey}';
    const fontData = '${fontBase64}'; /* Potentially large string */

    if (!fontData || fontData === 'undefined') return;

    const css = \`
      @font-face {
        font-family: '\${fontKey}';
        src: url('\${fontData}') format('truetype');
        font-weight: normal;
        font-style: normal;
      }
    \`;

    // 0. Safe Access to Rendition
    const getRendition = () => {
        try {
            if (typeof window.rendition !== 'undefined') return window.rendition;
            if (typeof rendition !== 'undefined') return rendition;
        } catch (e) {
            // ReferenceError if rendition not defined
        }
        return null;
    };
    const renditionInstance = getRendition();

    if (!renditionInstance) return;

    const applyStyle = (doc) => {
        if (!doc) return;
        let style = doc.querySelector('style[data-font-key="' + fontKey + '"]');
        if (!style) {
          style = doc.createElement('style');
          style.setAttribute('data-font-key', fontKey);
          style.innerHTML = css;
          doc.head.appendChild(style);
        }
    };

    // 1. Apply to current contents immediately
    if (renditionInstance.getContents) {
      renditionInstance.getContents().forEach(c => {
        applyStyle(c.document);
      });
    }

    // 2. Register hook for future contents
    if (renditionInstance.hooks && renditionInstance.hooks.content) {
        renditionInstance.hooks.content.register(function(contents) {
            applyStyle(contents.document);
        });
    }
  })();
`;

  const themeStyles = {
    body: {
      background: presetStyle.body.background,
      color: presetStyle.body.color,
      'font-family': `${fontFamily} !important`,
      'font-weight': fontWeight,
      'letter-spacing': `${letterSpacing} !important`,
      'word-spacing': `${wordSpacing} !important`
    },
    a: { color: presetStyle.a.color },
    '.toc': { color: presetStyle['.toc'].color },
    'h1, h2, h3, h4, h5, h6, p': {
      color: presetStyle['h1, h2, h3, h4, h5, h6, p'].color,
      'line-height': `${lineHeightMultiplier} !important`
    },
    p: { 'margin-bottom': `${paragraphMargin} !important` },
    '*': {
      'font-family': `${fontFamily} !important`,
      'font-weight': fontWeight,
      'letter-spacing': `${letterSpacing} !important`,
      'word-spacing': `${wordSpacing} !important`
    }
  };

  const themeInjectionJS = `
    rendition.themes.register('${uniqueThemeId}', ${JSON.stringify(themeStyles)});
    rendition.themes.select('${uniqueThemeId}');
  `;

  book.current?.injectJavaScript(`
    ${fontInjectionJS}
    ${themeInjectionJS}
    true;
  `);
};
