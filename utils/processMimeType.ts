import { Platform } from 'react-native';

export const processUploadMimeType = (mimeType?: string): string => {
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

export const processMimeType = (mimeType?: string): string => {
  switch (mimeType) {
    case 'pdf': {
      return 'pdf';
    }
    case 'mobi': {
      return 'mobi';
    }
    default: {
      return 'epub';
    }
  }
};
