import { SourceType } from '../types';

export const isFsUri = (value: string) => value.startsWith('file:///');

export const isURL = (value: string) => value.slice(0, 4) === 'http';

export const getSourceType = (source: string): SourceType | undefined => {
  if (source.includes('base64,') || source.length > 1000) {
    return SourceType.BASE64;
  }

  if (source.includes('.epub')) {
    return SourceType.EPUB;
  }

  if (source.includes('.opf')) {
    return SourceType.OPF;
  }
  return undefined;
};

export const getSourceName = (source: string): string | undefined => {
  const extension = getSourceType(source);
  const randomName = Date.now().toString();

  if (extension === SourceType.BASE64) {
    return randomName;
  }

  if (extension === SourceType.EPUB) {
    return `${randomName}.epub`;
  }

  if (extension === SourceType.OPF) {
    return `${randomName}.opf`;
  }

  return undefined;
};
