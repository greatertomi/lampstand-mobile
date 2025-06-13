import { PreinstalledBook, PreinstalledBookKey } from '../../../types';
import { logger, setLocalStorageItem } from '../../../utils';

import { preinstalledBookUploader } from './genericBookUploader';

type PreinstalledBooksProps = {
  didDBInitialized: boolean;
  checkPreInstalledBooks: string | null;
};

const books: PreinstalledBook[] = [
  {
    filename:
      'M.D._Richard_Restak_-_Think_Smart__A_Neuroscientist_s_Prescription_for_Improving_Your_Brain_s_' +
      'Performance_2009_doruvj.epub',
    secure_url:
      'https://res.cloudinary.com/mosidrum/raw/upload/v1749120109/M.D._Richard_Restak_-_Think_Smart__A_' +
      'Neuroscientist_s_Prescription_for_Improving_Your_Brain_s_Performance_2009_doruvj.epub',
    url:
      'http://res.cloudinary.com/mosidrum/raw/upload/v1749120109/M.D._Richard_Restak_-_Think_Smart__A_' +
      'Neuroscientist_s_Prescription_for_Improving_Your_Brain_s_Performance_2009_doruvj.epub',
    format: 'epub',
    size: 501_324,
    uploadedAt: '2025-06-05T10:41:49+00:00'
  },
  {
    filename:
      'Neil_Fiore_-_The_Now_Habit__A_Strategic_Program_for_Overcoming_Procrastination_and_Enjoying_' +
      'Guilt-Free_Play-Tarcher_2007_pkr2d6.epub',
    secure_url:
      'https://res.cloudinary.com/mosidrum/raw/upload/v1749120109/Neil_Fiore_-_The_Now_Habit__A_' +
      'Strategic_Program_for_Overcoming_Procrastination_and_Enjoying_Guilt-Free_Play-Tarcher_2007_pkr2d6.epub',
    url:
      'http://res.cloudinary.com/mosidrum/raw/upload/v1749120109/Neil_Fiore_-_The_Now_Habit__A_' +
      'Strategic_Program_for_Overcoming_Procrastination_and_Enjoying_Guilt-Free_Play-Tarcher_2007_pkr2d6.epub',
    format: 'epub',
    size: 593_283,
    uploadedAt: '2025-06-05T10:41:49+00:00'
  }
];

export const preinstalledBooks = ({ didDBInitialized, checkPreInstalledBooks }: PreinstalledBooksProps) => {
  if (books && didDBInitialized && checkPreInstalledBooks !== PreinstalledBookKey.KEY) {
    try {
      preinstalledBookUploader(books).then(() => setLocalStorageItem(PreinstalledBookKey.KEY, PreinstalledBookKey.KEY));
    } catch (error) {
      logger.error('Error initializing preinstalled books: ', error);
    }
  }
};
