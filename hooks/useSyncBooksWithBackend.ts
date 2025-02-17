/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { apiService, endpoints } from '../api';
import { UploadedBook, useAuthState } from '../store';
import { processMimeType } from '../utils';

export const useSyncBooksWithBackend = (books: UploadedBook[]) => {
  const { isAuthenticated } = useAuthState();
  const [booksToSend, setBooksToSend] = useState<UploadedBook[]>([]);

  const { data: backendBooks, mutate: fetchBackendBook } = useSWR(
    isAuthenticated ? endpoints.getBooks : null,
    async (url: string) => {
      const res = await apiService.get(url);
      return res.data.data;
    }
  );

  const { trigger: handleMultipleBooksUpload, data: uploadResponse } = useSWRMutation(
    endpoints.saveMultipleBooks,
    async (url, { arg }: { arg: FormData }) => {
      const response = await apiService.post(url, arg);
      return response.data;
    }
  );

  useEffect(() => {
    fetchBackendBook();
    if (!isAuthenticated || !backendBooks) return;

    const bookDifference = books.filter(
      (book) => !backendBooks.some((backendBook: any) => backendBook.title === book.title)
    );

    if (bookDifference.length > 0) {
      setBooksToSend(bookDifference);
    }
  }, [backendBooks, books, isAuthenticated, fetchBackendBook]);

  useEffect(() => {
    (async () => {
      if (!isAuthenticated || booksToSend.length === 0) return;

      const formData = prepareFormDataBooks(booksToSend);
      await handleMultipleBooksUpload(formData);

      setBooksToSend([]);
    })();
  }, [booksToSend, handleMultipleBooksUpload, isAuthenticated]);

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

  return { uploadResponse };
};
