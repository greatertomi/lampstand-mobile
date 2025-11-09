import { CustomThemeSettings } from '../package/epub-reader/provider/CustomThemeProvider';
import { FontInfo } from '../styles/fonts';

export interface PresetStyle {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  activeBorderColor: string;
  fontWeight: 'normal' | 'bold';
}

export interface WebViewPresetStyle {
  body: {
    background: string;
    color: string;
    fontWeight: string;
  };
  a: {
    color: string;
  };
  '.toc': {
    color: string;
  };
  'h1, h2, h3, h4, h5, h6, p': {
    color: string;
  };
  '*': {
    fontWeight: string;
  };
}

export interface ThemeStyles {
  body: {
    background: string;
    color: string;
    'font-family': string;
    'font-weight': string;
    'line-height': string;
    'letter-spacing': string;
    'word-spacing': string;
    'font-size': string;
  };
  a: {
    color: string;
  };
  '.toc': {
    color: string;
  };
  'h1, h2, h3, h4, h5, h6, p': {
    color: string;
    'margin-bottom': string;
    'font-size': string;
  };
  '*': {
    'font-family': string;
    'font-weight': string;
    'line-height': string;
    'letter-spacing': string;
    'word-spacing': string;
  };
}

export interface BuildThemeInjectionParams {
  fontInfo: FontInfo;
  base64Font: string | null;
  uniqueThemeId: string;
  themeStyles: ThemeStyles;
  themePrefix: string;
}

export interface BuildThemeStylesParams {
  presetStyle: WebViewPresetStyle;
  fontFamily: string;
  fontWeight: string;
  customSettings: CustomThemeSettings | undefined;
  fontSize: string;
}
