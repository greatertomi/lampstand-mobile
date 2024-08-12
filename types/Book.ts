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

export interface NewMetadata {
  title?: string;
  creator?: {
    text: string;
    'file-as'?: string;
    role: string;
  };
  source?: string;
  identifier?:
    | {
        text: string | number;
        id?: string;
        scheme?: string;
      }
    | (string | number | { text: string | number; id?: string; scheme?: string })[];
  publisher?: string;
  type?: string;
  format?: string;
  rights?: string;
  language?: string;
  meta?: {
    [key: number]: {
      name: string;
      content: string;
    };
    content?: string;
    name?: string;
  }[];
  description?:
    | {
        text: string;
        xmlns?: string;
      }
    | string;
  contributor?: {
    text: string;
    role: string;
  };
  subject?: string;
  date?:
    | string
    | {
        text: string;
        event?: string;
      };
  dc?: string;
  opf?: string;
  calibre?: string;
  xsi?: string;
  dcterms?: string;
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
