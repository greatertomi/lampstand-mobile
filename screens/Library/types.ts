import { UploadedBook } from '../../store';

export type TabComponentProps = {
  books: UploadedBook[];
  onPress: () => void;
};
