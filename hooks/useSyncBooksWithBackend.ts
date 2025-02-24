/* eslint-disable  @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { apiService, endpoints } from '../api';
import { UploadedBook, useAuthState } from '../store';
import { processMimeType } from '../utils';

export const useSyncBooksWithBackend = (books: UploadedBook[], isFromLogin: boolean) => {
  const { isAuthenticated } = useAuthState();
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'completed' | 'error'>('idle');
  const [error, setError] = useState<Error | null>(null);

  const { data: backendBooks, error: fetchError } = useSWR(endpoints.getBooks, async (url: string) => {
    const res = await apiService.get(url);
    return res.data.data;
  });

  const { trigger: handleMultipleBooksUpload } = useSWRMutation(
    endpoints.saveMultipleBooks,
    async (url, { arg }: { arg: FormData }) => {
      const response = await apiService.post(url, arg);
      return response.data;
    }
  );

  useEffect(() => {
    if (!isFromLogin || !isAuthenticated || !backendBooks || syncStatus !== 'idle') {
      return;
    }

    (async () => {
      try {
        setSyncStatus('syncing');

        const bookDifference = books.filter(
          (book) => !backendBooks.some((backendBook: any) => backendBook.title === book.title)
        );

        if (bookDifference.length > 0) {
          const formData = prepareFormDataBooks(bookDifference);
          await handleMultipleBooksUpload(formData);
        }

        setSyncStatus('completed');
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error during sync'));
        setSyncStatus('error');
      }
    })();
  }, [backendBooks, books, isAuthenticated, isFromLogin, handleMultipleBooksUpload, syncStatus]);

  const prepareFormDataBooks = (values: UploadedBook[]) => {
    const formData = new FormData();
    values.forEach((value) => {
      formData.append('files', {
        uri: value.filePath,
        type: processMimeType(value.mimeType),
        name: value.filePath.split('/').pop()
      } as any);
    });
    return formData;
  };

  return {
    syncStatus,
    error: error || fetchError,
    isSyncing: syncStatus === 'syncing',
    isComplete: syncStatus === 'completed'
  };
};
