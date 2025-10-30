/* eslint-disable no-restricted-syntax */

import { Asset } from 'expo-asset';
import { RefObject } from 'react';
import { Appearance } from 'react-native';

import { ThemeModeScheme } from '../../../styles';
import { logger } from '../../../utils';
import { READING_PRESET } from '../../types';

import { CustomThemeSettings } from './CustomThemeProvider';

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
const BOLD_FONT_WEIGHT = 'bold !important';
const ORIGINAL_FONT_WEIGHT = 'normal !important';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getFontInfo = (fontKey: string): { name: string; asset: any } => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fontMap: Record<string, { name: string; asset: any }> = {
    'plus-jakarta-sans': {
      name: 'PlusJakartaSans-Regular',
      asset: require('../../../assets/fonts/PlusJakartaSans-Regular.ttf')
    },
    'poetsen-one': { name: 'PoetsenOne-Regular', asset: require('../../../assets/fonts/PoetsenOne-Regular.ttf') },
    'purple-purse': { name: 'PurplePurse-Regular', asset: require('../../../assets/fonts/PurplePurse-Regular.ttf') },
    'cabinet-grotesk': {
      name: 'CabinetGrotesk-Variable',
      asset: require('../../../assets/fonts/CabinetGrotesk-Variable.ttf')
    },
    'seymour-one': { name: 'SeymourOne-Regular', asset: require('../../../assets/fonts/SeymourOne-Regular.ttf') },
    bogart: { name: 'BOGARTREGULARTRIAL', asset: require('../../../assets/fonts/BOGARTREGULARTRIAL.ttf') },
    'port-lligat-slab': {
      name: 'PortLligatSlab-Regular',
      asset: require('../../../assets/fonts/PortLligatSlab-Regular.ttf')
    },
    'urbanist-bold': { name: 'Urbanist-Bold', asset: require('../../../assets/fonts/Urbanist-Bold.ttf') }
  };
  return (
    fontMap[fontKey] || {
      name: 'PlusJakartaSans-Regular',
      asset: require('../../../assets/fonts/PlusJakartaSans-Regular.ttf')
    }
  );
};

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

// eslint-disable-next-line max-params
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
  const selectedFontKey =
    customSettings?.fontFamily || (preset === READING_PRESET.BOLD ? 'urbanist-bold' : 'plus-jakarta-sans');
  const fontInfo = getFontInfo(selectedFontKey);
  const fontFamily = `'${fontInfo.name}', -apple-system, sans-serif`;

  const fontWeight = customSettings?.isBoldText ? BOLD_FONT_WEIGHT : presetStyle.body.fontWeight;

  const lineHeight = customSettings?.lineSpacing ? `${1 + customSettings.lineSpacing / 100} !important` : 'inherit';

  const letterSpacing = customSettings?.letterSpacing
    ? `${customSettings.letterSpacing / 100}em !important`
    : 'inherit';

  const wordSpacing = customSettings?.wordSpacing ? `${customSettings.wordSpacing / 10}em !important` : 'inherit';

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

  // Load font asset and inject into WebView
  (async () => {
    try {
      const asset = Asset.fromModule(fontInfo.asset);
      await asset.downloadAsync();
      const fontUri = asset.localUri;

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

            // Register new theme
            rendition.themes.register('${uniqueThemeId}', ${JSON.stringify(themeStyles)});
            rendition.themes.select('${uniqueThemeId}');
            
            // Inject font into ALL current iframes in the rendition
            var fontStyleContent = \`
              @font-face {
                font-family: '${fontInfo.name}';
                src: url('file://${fontUri}') format('truetype');
                font-weight: normal;
                font-style: normal;
              }
              body, p, div, span, h1, h2, h3, h4, h5, h6 {
                font-family: '${fontInfo.name}', -apple-system, BlinkMacSystemFont, sans-serif !important;
              }
            \`;
            
            // Apply to current content using rendition.getContents()
            if (rendition.getContents) {
              rendition.getContents().forEach(function(contents) {
                try {
                  var existingStyle = contents.document.getElementById('custom-font-style');
                  if (existingStyle) {
                    existingStyle.remove();
                  }
                  
                  var style = contents.document.createElement('style');
                  style.id = 'custom-font-style';
                  style.innerHTML = fontStyleContent;
                  contents.document.head.appendChild(style);
                } catch (e) {
                  console.error('Error injecting font into content:', e);
                }
              });
            }
            
            // Also register for future content
            rendition.hooks.content.register(function(contents) {
              try {
                var existingStyle = contents.document.getElementById('custom-font-style');
                if (existingStyle) {
                  existingStyle.remove();
                }
                
                var style = contents.document.createElement('style');
                style.id = 'custom-font-style';
                style.innerHTML = fontStyleContent;
                contents.document.head.appendChild(style);
              } catch (e) {
                console.error('Error in content hook:', e);
              }
            });

            // Force re-render to apply changes
            var currentLocation = rendition.currentLocation();
            if (currentLocation && currentLocation.start) {
              setTimeout(function() {
                rendition.display(currentLocation.start.cfi);
              }, 100);
            }
          } catch (error) {
            logger.error('Error applying theme:', error);
          }
        })();
      `);
    } catch (error) {
      logger.error('Error loading font asset:', error);
    }
  })();
};
