import { ImageSourcePropType } from 'react-native';

import { BookTrackedState } from '../../packages/types';

export interface UploadedBook {
  id: string;
  title?: string;
  mimeType: string;
  size: number;
  author?: string;
  filePath: string;
  cover: string | null;
  image?: ImageSourcePropType;
  isFinished: number;
  description?: string;
  state?: BookTrackedState;
}
