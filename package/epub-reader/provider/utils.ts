import { lightColorScheme } from '../../../styles';
import { Note, Highlight } from '../../types';

/**
 * Safely escape text for use in JavaScript strings
 * Handles newlines, quotes, backslashes, and other special characters
 */
const escapeForJavaScript = (text: string): string => {
  if (!text) return '';
  return text
    .replaceAll('\\', '\\\\')
    .replaceAll("'", "\\'")
    .replaceAll('"', '\\"')
    .replaceAll('\n', '\\n')
    .replaceAll('\r', '\\r')
    .replaceAll('\t', '\\t');
};

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
    (function() {
      try {
        // Check if note icon already exists to prevent duplicates
        const existingNote = document.querySelector('[data-note-id=${JSON.stringify(note.id)}]');
        if (existingNote) {
          console.log('Note icon already exists for:', ${JSON.stringify(note.id)});
          return;
        }

        const range = rendition.getRange(${JSON.stringify(note.cfiRange)});
        if (range && range.startContainer && range.endContainer) {
          // Validate range before inserting
          const startNode = range.startContainer;
          const startOffset = range.startOffset;

          // Check if the offset is valid
          if (startNode.nodeType === Node.TEXT_NODE && startOffset > startNode.length) {
            console.error('Invalid range offset:', startOffset, 'exceeds node length:', startNode.length);
            return;
          }

          const noteIcon = document.createElement('span');
          noteIcon.innerHTML = '${NOTE_ICON_SVG.replaceAll('COLOR_PLACEHOLDER', iconColor)}';
          noteIcon.style.cursor = 'pointer';
          noteIcon.style.display = 'inline-block';
          noteIcon.style.margin = '0 2px';
          noteIcon.style.verticalAlign = 'middle';
          noteIcon.setAttribute('data-note-id', ${JSON.stringify(note.id)});
          noteIcon.setAttribute('data-note-cfi', ${JSON.stringify(note.cfiRange)});
          noteIcon.setAttribute('data-note-text', '${escapedText}');
          noteIcon.setAttribute('data-note-comment', '${escapedComment}');
          noteIcon.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'onNoteClick',
              noteItem: {
                id: ${JSON.stringify(note.id)},
                text: '${escapedText}',
                cfiRange: ${JSON.stringify(note.cfiRange)},
                comment: '${escapedComment}',
                createdAt: '${note.createdAt}'
              }
            }));
          };

          // Use collapsed range at the end for safer insertion
          range.collapse(false);
          range.insertNode(noteIcon);
        } else {
          console.error('Range not found or invalid for cfi:', ${JSON.stringify(note.cfiRange)});
        }
      } catch (error) {
        console.error('Failed to inject note icon:', error.message, 'for cfi:', ${JSON.stringify(note.cfiRange)});
      }
    })();
    true;
  `;
};
