import { Platform } from 'react-native';

export const processMimeType = (mimeType?: string): string => {
  switch (mimeType) {
    case 'pdf': {
      return Platform.OS === 'android' ? 'application/pdf' : 'pdf';
    }
    case 'mobi': {
      return Platform.OS === 'android' ? 'application/x-mobipocket-ebook' : 'mobi';
    }
    default: {
      return Platform.OS === 'android' ? 'application/epub+zip' : 'epub';
    }
  }
};
