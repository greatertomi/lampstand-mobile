const FONT_SIZE = 14;
const WIDTH = 380;

export const truncateText = (text: string) => {
  const ellipsis = '...';
  const charWidth = FONT_SIZE * 0.6;
  const maxChars = Math.floor(WIDTH / charWidth);

  const capitalizedText = text
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  if (capitalizedText.length > maxChars) {
    return capitalizedText.slice(0, maxChars - ellipsis.length) + ellipsis;
  }
  return capitalizedText;
};
