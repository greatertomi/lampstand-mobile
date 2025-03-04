/* eslint-disable  @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { apiService, endpoints } from '../api';
import { UploadedBook, useAuthState, useFromLoginRouteState } from '../store';
import { logger, processMimeType } from '../utils';

export const useSyncBooksWithBackend = (books: UploadedBook[]) => {
  const { isAuthenticated } = useAuthState();
  const { isFromLogin, setIsFromLogin } = useFromLoginRouteState();

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
    if (!isFromLogin || !backendBooks || !isAuthenticated) {
      return;
    }

    (async () => {
      try {
        const bookDifference = books.filter(
          (book) => !backendBooks.some((backendBook: any) => backendBook.id === book.id)
        );

        if (bookDifference.length > 0) {
          const formData = prepareFormDataBooks(bookDifference);
          await handleMultipleBooksUpload(formData);
        }
      } catch (err) {
        logger.error('Error during sync:', err);
      } finally {
        setIsFromLogin(false);
      }
    })();
  }, [isFromLogin, backendBooks, books, handleMultipleBooksUpload, setIsFromLogin, isAuthenticated]);

  const prepareFormDataBooks = (values: UploadedBook[]) => {
    const formData = new FormData();

    values.forEach((value) => {
      formData.append('files', {
        uri: value.filePath,
        type: processMimeType(value.mimeType),
        name: value.filePath.split('/').pop()
      } as any);
    });

    values.forEach((file) => {
      formData.append('ids', file.id);
    });
    return formData;
  };

  return {
    error: fetchError
  };
};
