type DescriptionType = string | { text: string } | undefined;

export const cleanDescription = (value: DescriptionType): string => {
  if (!value) return '';

  const description = typeof value === 'string' ? value : value.text;

  return description.replaceAll(/<\/?[^>]+(>|$)/g, '');
};

export const cleanBookName = (bookName: string) => {
  const bookNameWithoutExtension = bookName.split('.').slice(0, -1).join('.').toLowerCase();
  return bookNameWithoutExtension.replaceAll(/[^\d A-Za-z]/g, '').replaceAll(' ', '_');
};

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

export const formatBookProgress = (progress: number) => `${Math.round(progress * 100)}%`;

export const maskPhoneNumber = (phoneNumber: string) => {
  const lastThreeDigits = phoneNumber.slice(-3);
  const maskedPart = phoneNumber.slice(0, -3).replaceAll(/./g, '*');
  return maskedPart + lastThreeDigits;
};
