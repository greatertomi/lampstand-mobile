import { UploadedBook } from '../../store';

export interface handleExistingOrNewBookProps {
  title?: string;
  author?: string;
  book: UploadedBook;
  formData: FormData;
  onExistingBookFound: (book: UploadedBook) => void;
  onUploadSuccess: () => void;
  handleBackendUpload: (book: FormData) => void;
}

export type HandleBookUploadProps = Pick<
  handleExistingOrNewBookProps,
  'onExistingBookFound' | 'onUploadSuccess' | 'handleBackendUpload'
>;

export interface createBookObjectProps {
  title?: string;
  mimeType: string;
  size?: number;
  author?: string;
  newUri: string;
  bookCover: string | null;
  desc?: string;
}

export interface createFormDataType extends Omit<createBookObjectProps, 'desc' | 'size'> {
  name: string;
}
