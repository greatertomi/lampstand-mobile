export const processMimeType = (mimeType?: string): string => (mimeType === 'application/pdf' ? 'pdf' : 'epub');
