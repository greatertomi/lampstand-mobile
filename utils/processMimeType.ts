export const processMimeType = (mimeType?: string): string => {
  switch (mimeType) {
    case 'pdf': {
      return 'application/pdf';
    }
    case 'mobi': {
      return 'application/x-mobipocket-ebook';
    }
    default: {
      return 'application/epub+zip';
    }
  }
};
