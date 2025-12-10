import { useMemo } from 'react';

import { useReader } from '../package/epub-reader';
import { PRESET_STYLES } from '../package/epub-reader/provider/reader-theme';
import { DEFAULT_FONT_SIZE } from '../package/fonts/fontData';
import { useTheme } from '../styles';

interface PreviewHtmlProps {
  spacing: {
    letter: number;
    word: number;
    line: number;
    paragraph: number;
  };
  selectedFontName: string;
  isBold: boolean;
  base64Font?: string | null;
}

const SAMPLE_TEXT = `
  <h2>Bold</h2>
  <p>
    At the heart of this conflict stood Lyla,
    a brilliant young engineer disillusioned by the Syndic exploitation of temporal resources
  </p>
   <p>
    At the heart of this conflict stood Lyla,
    a brilliant young engineer disillusioned by the Syndic exploitation of temporal resources
  </p>
  <p>
    Another long paragraph to make sure we have enough content to scroll inside this preview container.
    This ensures the scrollbar actually appears and the user can test spacing.
  </p>
`;

export const usePreviewHtml = ({ spacing, selectedFontName, isBold, base64Font }: PreviewHtmlProps) => {
  const { preset } = useReader();
  const { theme, mode } = useTheme();

  const previewStyle = useMemo(
    () => ({
      fontFamily: selectedFontName,
      fontWeight: isBold ? '700' : '400',
      letterSpacing: (spacing.letter / 100) * 14,
      wordSpacing: (spacing.word / 100) * 14,
      lineHeight: 20 + (spacing.line / 100) * 20,
      paragraphSpacing: (spacing.paragraph / 100) * 20
    }),
    [selectedFontName, isBold, spacing]
  );

  const defaultPreviewStyle = useMemo(() => {
    const resolvedMode = mode === 'dark' ? 'dark' : 'light';

    const presetStyle = PRESET_STYLES[preset]?.[resolvedMode];

    return {
      fontSize: DEFAULT_FONT_SIZE,
      color: presetStyle?.body?.color || theme.colors.text,
      backgroundColor: presetStyle?.body?.background || theme.colors.background
    };
  }, [mode, preset, theme.colors.text, theme.colors.background]);

  return useMemo(() => {
    const fontFace = base64Font
      ? `
        @font-face {
          font-family: '${previewStyle.fontFamily}';
          src: url('${base64Font}') format('truetype');
          font-weight: normal;
          font-style: normal;
        }
      `
      : '';

    return `
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style>
            ${fontFace}

            body {
              margin: 0;
              padding: 16px;
              background: ${defaultPreviewStyle.backgroundColor};
              color: ${defaultPreviewStyle.color};
              font-family: '${previewStyle.fontFamily}', sans-serif;
              font-size: ${defaultPreviewStyle.fontSize}px;
              line-height: ${Math.round(previewStyle.lineHeight * 100) / 100}px;
              letter-spacing: ${Math.round(previewStyle.letterSpacing * 100) / 100};
              word-spacing: ${Math.round(previewStyle.wordSpacing * 100) / 100};
              font-weight: ${previewStyle.fontWeight};
              overflow-y: auto;
            }

            p {
              display: block;
              margin-top: 0;
              margin-bottom: ${Math.round(previewStyle.paragraphSpacing)}px;
              font-family: '${previewStyle.fontFamily}', sans-serif;
              font-weight: ${previewStyle.fontWeight};
            }

            h2 {
              font-family: '${previewStyle.fontFamily}', sans-serif;
              font-weight: ${previewStyle.fontWeight};
            }

            p:last-child {
              margin-bottom: 0;
            }
          </style>
        </head>
        <body>
          ${SAMPLE_TEXT}
        </body>
      </html>
    `;
  }, [previewStyle, defaultPreviewStyle, base64Font]);
};
