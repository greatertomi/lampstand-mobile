export const formatBookTitle = (title?: string): string => {
  if (!title) return '';

  const maxShortLength = 80;
  const maxMediumLength = 120;

  if (title.length <= maxShortLength) {
    return title;
  }

  if (title.length <= maxMediumLength) {
    return `${title.split(' ').slice(0, 10).join(' ')}...`;
  }

  const words = title.split(' ');
  const firstFewWords = words.slice(0, 5).join(' ');
  const lastFewWords = words.slice(-3).join(' ');

  return `${firstFewWords} ... ${lastFewWords}`;
};
