export const processMimeType = (mimeType?: string): string => {
  switch (mimeType) {
    case 'application/pdf': {
      return 'pdf';
    }
    case 'application/x-mobipocket-ebook': {
      return 'mobi';
    }
    default: {
      return 'epub';
    }
  }
};
