import { ImageSourcePropType } from 'react-native';

export interface BookType {
  id: string;
  title: string;
  author: string;
  categories: string[];
  progress: number;
  image: ImageSourcePropType;
  description: string;
}

export interface Metadata {
  [key: string]: unknown;
}

export interface EpubManifestItem {
  '@_id': string;
  '@_href': string;
  '@_media-type': string;
}

export interface ManifestItem {
  id: string;
  href: string;
  mediaType: string;
}
