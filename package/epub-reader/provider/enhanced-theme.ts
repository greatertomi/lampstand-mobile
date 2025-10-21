/* eslint-disable no-restricted-syntax */

import { RefObject } from 'react';
import { Appearance } from 'react-native';

import { ThemeModeScheme } from '../../../styles';
import { READING_PRESET } from '../../types';
import { CustomThemeSettings } from '../hooks/useCustomTheme';

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

const PRESET_STYLES = {
  [READING_PRESET.ORIGINAL]: {
    light: { body: { background: LIGHT_BG, color: LIGHT_TEXT }, a: { color: LIGHT_LINK_COLOR } },
    dark: { body: { background: DARK_BG, color: DARK_TEXT }, a: { color: DARK_LINK_COLOR } }
  },
  [READING_PRESET.PAPER]: {
    light: { body: { background: LIGHT_PAPER_BG, color: LIGHT_TEXT }, a: { color: LIGHT_LINK_COLOR } },
    dark: { body: { background: DARK_PAPER_BG, color: DARK_TEXT }, a: { color: DARK_LINK_COLOR } }
  },
  [READING_PRESET.BOLD]: {
    light: { body: { background: LIGHT_BOLD_BG, color: LIGHT_TEXT }, a: { color: LIGHT_LINK_COLOR } },
    dark: { body: { background: DARK_BOLD_BG, color: DARK_TEXT }, a: { color: DARK_LINK_COLOR } }
  }
};

export const injectEnhancedTheme = (
  theme: ThemeModeScheme,
  book: RefObject<WebView>,
  preset: READING_PRESET = READING_PRESET.ORIGINAL,
  customSettings?: CustomThemeSettings
) => {
  const resolvedTheme: 'light' | 'dark' =
    theme === ThemeModeScheme.System ? (Appearance.getColorScheme() === 'dark' ? 'dark' : 'light') : theme;

  const uniqueThemeId = `enhanced-${resolvedTheme}-${Date.now()}`;
  const presetStyle = PRESET_STYLES[preset][resolvedTheme];

  // Base font settings
  const baseFontSize = customSettings?.fontSize ? parseFloat(customSettings.fontSize.replace('em', '')) : 1.0;
  const fontFamily =
    customSettings?.fontFamily || (preset === READING_PRESET.BOLD ? 'urbanist-bold' : 'plus-jakarta-sans');
  const fontWeight =
    customSettings?.boldText || preset === READING_PRESET.BOLD ? 'bold !important' : 'normal !important';

  // Spacing calculations
  const paragraphSpacing = customSettings?.paragraphSpacing ? `${customSettings.paragraphSpacing / 10}em` : '0em';
  const lineHeight = customSettings?.lineSpacing ? `${1 + customSettings.lineSpacing / 100}` : '1.6';
  const wordSpacing = customSettings?.wordSpacing ? `${customSettings.wordSpacing / 10}em` : 'normal';
  const letterSpacing = customSettings?.letterSpacing ? `${customSettings.letterSpacing / 100}em` : 'normal';

  const enhancedStyles = {
    body: {
      background: presetStyle.body.background,
      color: presetStyle.body.color,
      'font-family': `'${fontFamily}', sans-serif !important`,
      'font-weight': fontWeight,
      'font-size': `${baseFontSize}em !important`,
      'line-height': `${lineHeight} !important`,
      'word-spacing': `${wordSpacing} !important`,
      'letter-spacing': `${letterSpacing} !important`,
      padding: '16px !important',
      margin: '0 !important'
    },
    'p, div': {
      'margin-bottom': `${paragraphSpacing} !important`,
      'line-height': `${lineHeight} !important`,
      'word-spacing': `${wordSpacing} !important`,
      'letter-spacing': `${letterSpacing} !important`
    },
    'h1, h2, h3, h4, h5, h6': {
      color: presetStyle.body.color,
      'font-family': `'${fontFamily}', sans-serif !important`,
      'font-weight': fontWeight,
      'line-height': '1.3 !important',
      'margin-bottom': `calc(${paragraphSpacing} + 0.5em) !important`,
      'letter-spacing': `${letterSpacing} !important`
    },
    a: {
      color: presetStyle.a.color,
      'text-decoration': 'underline'
    },
    '.toc': {
      color: presetStyle.body.color
    },
    blockquote: {
      'margin-left': '1em !important',
      'margin-right': '1em !important',
      'font-style': 'italic !important',
      'border-left': `3px solid ${presetStyle.body.color.replace(' !important', '')} !important`,
      'padding-left': '1em !important',
      'margin-bottom': `${paragraphSpacing} !important`
    },
    code: {
      'font-family': 'monospace !important',
      'background-color': resolvedTheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
      padding: '2px 4px !important',
      'border-radius': '3px !important'
    },
    pre: {
      'background-color': resolvedTheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
      padding: '1em !important',
      'border-radius': '5px !important',
      'overflow-x': 'auto !important',
      'margin-bottom': `${paragraphSpacing} !important`
    },
    'ul, ol': {
      'margin-bottom': `${paragraphSpacing} !important`,
      'padding-left': '2em !important'
    },
    li: {
      'margin-bottom': `calc(${paragraphSpacing} / 2) !important`,
      'line-height': `${lineHeight} !important`
    },
    img: {
      'max-width': '100% !important',
      height: 'auto !important',
      margin: `${paragraphSpacing} 0 !important`
    },
    table: {
      width: '100% !important',
      'border-collapse': 'collapse !important',
      'margin-bottom': `${paragraphSpacing} !important`
    },
    'td, th': {
      border: `1px solid ${presetStyle.body.color.replace(' !important', '')} !important`,
      padding: '8px !important',
      'text-align': 'left !important'
    },
    '*': {
      'font-family': `'${fontFamily}', sans-serif !important`
    }
  };

  const cssString = Object.entries(enhancedStyles)
    .map(([selector, styles]) => {
      const styleString = Object.entries(styles)
        .map(([property, value]) => `${property}: ${value}`)
        .join('; ');
      return `${selector} { ${styleString} }`;
    })
    .join(' ');

  book.current?.injectJavaScript(`
    try {
      // Remove existing custom style
      const existingStyle = document.getElementById('lampstand-custom-theme');
      if (existingStyle) {
        existingStyle.remove();
      }

      // Add new custom style
      const style = document.createElement('style');
      style.id = 'lampstand-custom-theme';
      style.textContent = \`${cssString}\`;
      document.head.appendChild(style);

      // Apply to rendition if available
      if (typeof rendition !== 'undefined') {
        rendition.themes.register('${uniqueThemeId}', ${JSON.stringify(enhancedStyles)});
        rendition.themes.select('${uniqueThemeId}');
        
        // Hook into content loading to apply fonts
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
            ${cssString}
          \`);
        });
      }

      console.log('Enhanced theme applied successfully');
    } catch (error) {
      console.error('Failed to apply enhanced theme:', error);
    }
  `);
};

// Helper function to generate preview styles for the CustomizeTheme component
export const generatePreviewStyles = (
  customSettings: CustomThemeSettings,
  preset: READING_PRESET,
  isDark: boolean = false
): React.CSSProperties => {
  const baseFontSize = parseFloat(customSettings.fontSize.replace('em', ''));
  const lineHeightMultiplier = 1 + customSettings.lineSpacing / 100;

  return {
    fontSize: baseFontSize * 14,
    fontWeight: customSettings.boldText ? 'bold' : 'normal',
    lineHeight: lineHeightMultiplier,
    letterSpacing: customSettings.letterSpacing / 100,
    wordSpacing: customSettings.wordSpacing / 10,
    fontFamily:
      customSettings.fontFamily === 'plus-jakarta-sans'
        ? 'system-ui, -apple-system, sans-serif'
        : customSettings.fontFamily
  } as React.CSSProperties;
};
