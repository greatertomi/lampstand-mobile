import { Highlight } from '../package/types';

export const trimTitle = (title: string, maxWords: number = 5) => {
  const words = title.split(' ');
  return words.length > maxWords ? `${words.slice(0, maxWords).join(' ')}...` : title;
};

export const normalizeText = (txt: string): string =>
  txt
    .trim()
    .replaceAll(/\s+/g, ' ')
    .replaceAll(/[!"',.:;?-]/g, '')
    .toLowerCase();

export const isHighlightMatch = (item: Highlight, cfiRange: string, searchText: string): boolean => {
  const isCfiMatch = item.cfiRange.includes(cfiRange) || cfiRange.includes(item.cfiRange);
  if (isCfiMatch) return true;

  const normalizedItemText = normalizeText(item.text);
  const normalizedSearchText = normalizeText(searchText);

  const doesTextMatch =
    normalizedItemText.includes(normalizedSearchText) || normalizedSearchText.includes(normalizedItemText);

  const minMatchLength = Math.min(20, normalizedSearchText.length, normalizedItemText.length);
  const hasSignificantOverlap =
    normalizedItemText.slice(0, Math.max(0, minMatchLength)) ===
      normalizedSearchText.slice(0, Math.max(0, minMatchLength)) ||
    normalizedItemText.includes(normalizedSearchText.slice(0, Math.max(0, minMatchLength))) ||
    normalizedSearchText.includes(normalizedItemText.slice(0, Math.max(0, minMatchLength)));

  return doesTextMatch || hasSignificantOverlap;
};
