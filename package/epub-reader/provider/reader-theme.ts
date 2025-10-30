/* eslint-disable no-restricted-syntax */

import { RefObject } from 'react';
import { Appearance } from 'react-native';

import { ThemeModeScheme } from '../../../styles';
import { READING_PRESET } from '../../types';
import { CustomThemeSettings } from './CustomThemeProvider';
import { getFontFamilyCSS, generateFontFaceCSS } from '../utils/fontLoader';

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
const DEFAULT_FONT_FAMILY = "'PlusJakartaSans-Regular', sans-serif";
const BOLD_FONT_FAMILY = "'Urbanist-Bold', sans-serif";
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
  preset: READING_PRESET = READING_PRESET.ORIGINAL,
  customSettings?: CustomThemeSettings
) => {
  const resolvedTheme: 'light' | 'dark' =
    theme === ThemeModeScheme.System ? (Appearance.getColorScheme() === 'dark' ? 'dark' : 'light') : theme;
  const uniqueThemeId = `theme-${resolvedTheme}-${preset}-${Date.now()}`;

  const presetStyle = PRESET_STYLES[preset][resolvedTheme];
  
  // Use custom settings if available - use the font loader utility
  const fontFamily = customSettings?.fontFamily 
    ? getFontFamilyCSS(customSettings.fontFamily)
    : (preset === READING_PRESET.BOLD ? BOLD_FONT_FAMILY : DEFAULT_FONT_FAMILY);
  
  const fontWeight = customSettings?.isBoldText 
    ? BOLD_FONT_WEIGHT 
    : presetStyle.body.fontWeight;
  
  const lineHeight = customSettings?.lineSpacing 
    ? `${1 + customSettings.lineSpacing / 100} !important`
    : 'inherit';
  
  const letterSpacing = customSettings?.letterSpacing 
    ? `${customSettings.letterSpacing / 100}em !important`
    : 'inherit';
  
  const wordSpacing = customSettings?.wordSpacing 
    ? `${customSettings.wordSpacing / 10}em !important`
    : 'inherit';
  
  const paragraphMargin = customSettings?.paragraphSpacing 
    ? `${customSettings.paragraphSpacing / 10}em !important`
    : 'inherit';

  const themeStyles = {
    body: {
      background: presetStyle.body.background,
      color: presetStyle.body.color,
      'font-family': `${fontFamily} !important`,
      'font-weight': fontWeight,
      'line-height': lineHeight,
      'letter-spacing': letterSpacing,
      'word-spacing': wordSpacing
    },
    a: { color: presetStyle.a.color },
    '.toc': {
      color: presetStyle['.toc'].color
    },
    'h1, h2, h3, h4, h5, h6, p': {
      color: presetStyle['h1, h2, h3, h4, h5, h6, p'].color,
      'margin-bottom': paragraphMargin
    },
    '*': {
      'font-family': `${fontFamily} !important`,
      'font-weight': fontWeight,
      'line-height': lineHeight,
      'letter-spacing': letterSpacing,
      'word-spacing': wordSpacing
    }
  };

  // Inject fonts and theme asynchronously
  (async () => {
    try {
      const fontFaceCSS = await generateFontFaceCSS();
      
      book.current?.injectJavaScript(`
        (function() {
          try {
            // Remove all previous theme registrations
            if (rendition.themes && rendition.themes.registered) {
              Object.keys(rendition.themes.registered).forEach(function(themeName) {
                if (themeName.startsWith('theme-')) {
                  delete rendition.themes.registered[themeName];
                }
              });
            }

            // Register and select new theme
            rendition.themes.register('${uniqueThemeId}', ${JSON.stringify(themeStyles)});
            rendition.themes.select('${uniqueThemeId}');

            // Inject font faces into the document
            rendition.hooks.content.register(function(contents) {
              var style = contents.document.createElement('style');
              style.innerHTML = \`${fontFaceCSS}\`;
              contents.document.head.appendChild(style);
            });

            // Force re-render to apply changes immediately
            var currentLocation = rendition.currentLocation();
            if (currentLocation && currentLocation.start) {
              setTimeout(function() {
                rendition.display(currentLocation.start.cfi);
              }, 100);
            }

            console.log('Theme and fonts applied successfully: ${uniqueThemeId}');
          } catch (error) {
            console.error('Error applying theme:', error);
          }
        })();
      `);
    } catch (error) {
      console.error('Error loading fonts:', error);
      // Fallback: apply theme without custom fonts
      book.current?.injectJavaScript(`
        (function() {
          try {
            rendition.themes.register('${uniqueThemeId}', ${JSON.stringify(themeStyles)});
            rendition.themes.select('${uniqueThemeId}');
            var currentLocation = rendition.currentLocation();
            if (currentLocation && currentLocation.start) {
              rendition.display(currentLocation.start.cfi);
            }
          } catch (error) {
            console.error('Error applying fallback theme:', error);
          }
        })();
      `);
    }
  })();
};
