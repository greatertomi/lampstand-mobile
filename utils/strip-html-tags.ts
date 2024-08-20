type DescriptionType = string | { text: string } | undefined;

export const stripHtmlTags = (value: DescriptionType): string => {
  if (!value) return '';

  const description = typeof value === 'string' ? value : value.text;

  return description.replaceAll(/<\/?[^>]+(>|$)/g, '');
};
