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
const THEME_PREFIX = 'theme-';
const IMPORTANT_SUFFIX = ' !important';

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

  // Determine the font based on preset and custom settings
  let selectedFontKey = customSettings?.fontFamily || 'plus-jakarta-sans';
  if (preset === READING_PRESET.BOLD && !customSettings?.fontFamily) {
    selectedFontKey = 'urbanist-bold';
  }

  const fontInfo = getFontInfo(selectedFontKey);
  const fontFamily = `'${fontInfo.name}', -apple-system, sans-serif`;

  const fontWeight = customSettings?.isBoldText ? BOLD_FONT_WEIGHT : presetStyle.body.fontWeight;

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

  const themeStyles = {
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
    '.toc': {
      color: presetStyle['.toc'].color
    },
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

  // Load font asset and inject into WebView
  (async () => {
    try {
      const asset = Asset.fromModule(fontInfo.asset);
      await asset.downloadAsync();
      const fontUri = asset.localUri;

      if (!fontUri) {
        throw new Error('Font URI not available');
      }

      logger.info('Injecting font into WebView:', { fontName: fontInfo.name, fontUri });

      const injectScript = `
        (function() {
          try {
            console.log('Applying theme with font: ${fontInfo.name}');
            
            // Remove all previous theme registrations
            if (rendition && rendition.themes) {
              Object.keys(rendition.themes.registered || {}).forEach(function(themeName) {
                if (themeName.startsWith('${THEME_PREFIX}')) {
                  rendition.themes.unregister(themeName);
                }
              });
            }
            
            // Inject font face into all content iframes
            var fontStyle = \`
              @font-face {
                font-family: '${fontInfo.name}';
                src: url('file://${fontUri}') format('truetype');
                font-weight: normal;
                font-style: normal;
                font-display: swap;
              }
            \`;
            
            // Function to apply font to content
            var applyFontToContents = function(contents) {
              try {
                if (!contents || !contents.document) {
                  console.error('Invalid contents object');
                  return;
                }
                
                // Remove existing font style
                var existingStyle = contents.document.getElementById('custom-font-style');
                if (existingStyle) {
                  existingStyle.remove();
                }
                
                // Add new font style
                var style = contents.document.createElement('style');
                style.id = 'custom-font-style';
                style.innerHTML = fontStyle;
                contents.document.head.appendChild(style);
                
                console.log('Font style injected into content');
              } catch (e) {
                console.error('Error applying font to content:', e);
              }
            };
            
            // Register new theme with font family
            rendition.themes.register('${uniqueThemeId}', ${JSON.stringify(themeStyles)});
            rendition.themes.select('${uniqueThemeId}');
            
            // Apply to current contents
            if (rendition.getContents) {
              var contents = rendition.getContents();
              contents.forEach(applyFontToContents);
            }
            
            // Clean up old listeners and register for future content
            if (rendition._fontListener) {
              rendition.off('rendered', rendition._fontListener);
            }
            
            rendition._fontListener = function(section) {
              setTimeout(function() {
                if (rendition.getContents) {
                  rendition.getContents().forEach(applyFontToContents);
                }
              }, 50);
            };
            
            rendition.on('rendered', rendition._fontListener);
            
            console.log('Theme and font registered successfully');
            
          } catch (error) {
            console.error('Error applying theme:', error);
          }
        })();
      `;

      book.current?.injectJavaScript(injectScript);
    } catch (error) {
      logger.error('Error loading font asset:', error);

      // Fallback: inject theme without custom font
      const fallbackScript = `
        (function() {
          try {
            console.log('Applying fallback theme without custom font');
            
            if (rendition && rendition.themes) {
              Object.keys(rendition.themes.registered || {}).forEach(function(themeName) {
                if (themeName.startsWith('${THEME_PREFIX}')) {
                  rendition.themes.unregister(themeName);
                }
              });
              
              rendition.themes.register('${uniqueThemeId}', ${JSON.stringify(themeStyles)});
              rendition.themes.select('${uniqueThemeId}');
              
              console.log('Fallback theme applied');
            }
          } catch (error) {
            console.error('Error applying fallback theme:', error);
          }
        })();
      `;

      book.current?.injectJavaScript(fallbackScript);
    }
  })();
};
