import { ImageSourcePropType } from 'react-native';

import { TrackedState } from '../../package/epub-reader';

export interface UploadedBook {
  id: string;
  title?: string;
  mimeType: string;
  size: number;
  author?: string;
  filePath: string;
  cover: string | null;
  image?: ImageSourcePropType;
  description?: string;
  state?: TrackedState;
}
