import { ImageSourcePropType } from 'react-native';

export interface UploadedBook {
  title?: string;
  mimeType: string;
  size: number;
  author?: string;
  filePath: string;
  progress: number;
  cover: string | null;
  image?: ImageSourcePropType;
  description?: string;
}
