/* eslint-disable no-restricted-syntax */

import { RefObject } from 'react';
import { Appearance } from 'react-native';

import { ThemeModeScheme } from '../../../styles';
import { READING_PRESET } from '../types';

import type WebView from 'react-native-webview';

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
const DEFAULT_FONT_FAMILY = "'plus-jakarta-sans', sans-serif";
const BOLD_FONT_FAMILY = "'urbanist-bold', sans-serif";
const BOLD_FONT_WEIGHT = 'bold !important';
const ORIGINAL_FONT_WEIGHT = 'normal !important';

const PRESET_STYLES = {
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

export const injectTheme = (
  theme: ThemeModeScheme,
  book: RefObject<WebView>,
  preset: READING_PRESET = READING_PRESET.ORIGINAL
) => {
  const resolvedTheme: 'light' | 'dark' =
    theme === ThemeModeScheme.System ? (Appearance.getColorScheme() === 'dark' ? 'dark' : 'light') : theme;

  const presetStyle = PRESET_STYLES[preset][resolvedTheme];
  const fontFamily = preset === READING_PRESET.BOLD ? BOLD_FONT_FAMILY : DEFAULT_FONT_FAMILY;

  const themeStyles = {
    body: {
      background: presetStyle.body.background,
      color: presetStyle.body.color,
      'font-family': `${fontFamily} !important`,
      'font-weight': presetStyle.body.fontWeight
    },
    a: { color: presetStyle.a.color },
    '.toc': {
      color: presetStyle['.toc'].color
    },
    'h1, h2, h3, h4, h5, h6, p': {
      color: presetStyle['h1, h2, h3, h4, h5, h6, p'].color
    },
    '*': {
      'font-family': `${fontFamily} !important`,
      'font-weight': presetStyle['*'].fontWeight
    }
  };

  book.current?.injectJavaScript(`
    rendition.themes.register('${resolvedTheme}', ${JSON.stringify(themeStyles)});
    rendition.themes.select('${resolvedTheme}');

    rendition.hooks.content.override((contents) => {
      contents.addStylesheet(\`
        @font-face {
          font-family: 'plus-jakarta-sans';
          src: url('../../assets/fonts/PlusJakartaSans-Regular.ttf') format('truetype');
          font-display: swap;
        }
         @font-face {
          font-family: 'urbanist-bold';
          src: url('../../assets/fonts/Urbanist-Bold.ttf') format('truetype');
          font-display: swap;
        }
      \`);
    });
  `);
};
