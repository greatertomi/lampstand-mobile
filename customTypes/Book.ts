import { ImageSourcePropType } from 'react-native';

export interface BookType {
  id: string;
  title: string;
  author: string;
  categories: string[];
  progress: number;
  image: ImageSourcePropType;
}
