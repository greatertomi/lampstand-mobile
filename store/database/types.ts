export interface UploadedBook {
  title?: string;
  mimeType: string;
  size: number;
  name?: string;
  filePath: string;
  progress: number;
  cover: string | null;
  description?: string;
}
