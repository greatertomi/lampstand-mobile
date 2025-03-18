/* eslint-disable no-restricted-syntax */

import { RefObject } from 'react';
import { Appearance } from 'react-native';

import { ThemeModeScheme } from '../../../styles';

import type WebView from 'react-native-webview';

type ReaderTheme = {
  light: Record<string, Record<string, string>>;
  dark: Record<string, Record<string, string>>;
};

const LIGHT_BG = '#fff';
const DARK_BG = '#121212';
const LIGHT_TEXT = '#000 !important';
const DARK_TEXT = '#fff !important';
const LIGHT_LINK_COLOR = '#0000EE';
const DARK_LINK_COLOR = '#009DDB';
const DEFAULT_FONT_FAMILY = "'plus-jakarta-sans', sans-serif !important";

const themeStyles: ReaderTheme = {
  light: {
    body: { background: LIGHT_BG, color: LIGHT_TEXT, 'font-family': DEFAULT_FONT_FAMILY },
    a: { color: LIGHT_LINK_COLOR },
    '.toc': { color: LIGHT_TEXT },
    'h1, h2, h3, h4, h5, h6, p': { color: LIGHT_TEXT }
  },
  dark: {
    body: { background: DARK_BG, color: DARK_TEXT, 'font-family': DEFAULT_FONT_FAMILY },
    a: { color: DARK_LINK_COLOR },
    '.toc': { color: DARK_TEXT },
    'h1, h2, h3, h4, h5, h6, p': { color: DARK_TEXT }
  }
};

export const injectTheme = (theme: ThemeModeScheme, book: RefObject<WebView>) => {
  const resolvedTheme: 'light' | 'dark' =
    theme === ThemeModeScheme.System ? (Appearance.getColorScheme() === 'dark' ? 'dark' : 'light') : theme;

  book.current?.injectJavaScript(`
    rendition.themes.register('${resolvedTheme}', ${JSON.stringify(themeStyles[resolvedTheme])});
    rendition.themes.select('${resolvedTheme}');

    rendition.hooks.content.register((contents) => {
      contents.addStylesheet(\`
        @font-face {
          font-family: 'plus-jakarta-sans';
          src: url('../../assets/fonts/PlusJakartaSans-Regular.ttf') format('truetype');
        }
      \`);
    });
  `);
};
