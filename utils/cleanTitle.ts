export const cleanTitle = (title: string | undefined): string => {
  if (typeof title !== 'string') {
    return '';
  }

  const separatorIndex = Math.min(
    title.includes(':') ? title.indexOf(':') : Number.POSITIVE_INFINITY,
    title.includes('-') ? title.indexOf('-') : Number.POSITIVE_INFINITY
  );

  if (separatorIndex === Number.POSITIVE_INFINITY) return title;

  return title.slice(0, Math.max(0, separatorIndex)).trim();
};
