/* eslint-disable no-restricted-syntax */

type ThemeStyles = {
  light: Record<string, Record<string, string>>;
  dark: Record<string, Record<string, string>>;
};

const LIGHT_BG = '#fff';
const DARK_BG = '#000';
const LIGHT_TEXT = '#000 !important';
const DARK_TEXT = '#fff !important';
const TEXT_DECORATION = 'none !important';

export const themeStyles: ThemeStyles = {
  light: {
    body: { background: LIGHT_BG, color: LIGHT_TEXT },
    a: { color: LIGHT_TEXT, 'text-decoration': TEXT_DECORATION },
    '.toc': { color: LIGHT_TEXT },
    'h1, h2, h3, h4, h5, h6, p': { color: LIGHT_TEXT }
  },
  dark: {
    body: { background: DARK_BG, color: DARK_TEXT },
    a: { color: DARK_TEXT, 'text-decoration': TEXT_DECORATION },
    '.toc': { color: DARK_TEXT },
    'h1, h2, h3, h4, h5, h6, p': { color: DARK_TEXT }
  }
};
