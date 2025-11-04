import { lightColorScheme } from '../../../styles';
import { Note, Highlight } from '../../types';

/**
 * Safely escape text for use in JavaScript strings
 * Handles newlines, quotes, backslashes, and other special characters
 */
const escapeForJavaScript = (text: string): string => {
  if (!text) return '';
  return text
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t');
};

// SVG icon for notes
const NOTE_ICON_SVG =
  '<svg width="16" height="16" viewBox="0 0 512 512" fill="none" ' +
  'xmlns="http://www.w3.org/2000/svg"><path d="M144 464a16 16 0 01-16-16v-64H64a48.05 48.05 ' +
  '0 01-48-48V80a48.05 48.05 0 0148-48h384a48.05 48.05 0 0148 48v256a48.05 48.05 0 01-48 ' +
  '48H245.74l-91.49 76.29A16.05 16.05 0 01144 464z" fill="COLOR_PLACEHOLDER" stroke="COLOR_PLACEHOLDER" ' +
  'stroke-width="32" stroke-linecap="round" stroke-linejoin="round"/></svg>';

export const injectHighlightAnnotation = (item: Highlight) => `
  rendition.annotations.highlight(
    '${item.cfiRange}',
    {},
    (e) => {},
    '${item.colour}',
    { fill: '${item.colour}' }
  );
`;

export const injectNoteAnnotation = (note: Note, iconColor = lightColorScheme.inactiveButtonColor) => {
  const escapedText = escapeForJavaScript(note.text || '');
  const escapedComment = escapeForJavaScript(note.comment || '');

  return `
    const range = rendition.getRange('${note.cfiRange}');
    if (range) {
      const noteIcon = document.createElement('span');
      noteIcon.innerHTML = '${NOTE_ICON_SVG.replaceAll('COLOR_PLACEHOLDER', iconColor)}';
      noteIcon.style.cursor = 'pointer';
      noteIcon.style.display = 'inline-block';
      noteIcon.style.margin = '0 2px';
      noteIcon.style.verticalAlign = 'middle';
      noteIcon.setAttribute('data-note-id', '${note.id}');
      noteIcon.setAttribute('data-note-cfi', '${note.cfiRange}');
      noteIcon.setAttribute('data-note-text', '${escapedText}');
      noteIcon.setAttribute('data-note-comment', '${escapedComment}');
      noteIcon.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'onNoteClick',
          noteItem: {
            id: '${note.id}',
            text: '${escapedText}',
            cfiRange: '${note.cfiRange}',
            comment: '${escapedComment}',
            createdAt: '${note.createdAt}'
          }
        }));
      };
      range.insertNode(noteIcon);
    } else {
      console.error('Range not found for cfi:', '${note.cfiRange}');
    }
  `;
};
