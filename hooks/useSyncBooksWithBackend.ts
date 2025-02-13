import { useState, useEffect } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { apiService, endpoints } from '../api';
import { UploadedBook, useAuthState } from '../store';
import { processMimeType } from '../utils';

export const useSyncBooksWithBackend = (books: UploadedBook[]) => {
  const { isAuthenticated } = useAuthState();
  const [booksToSend, setBooksToSend] = useState<UploadedBook[]>([]);

  const { data: backendBooks } = useSWR(isAuthenticated ? endpoints.getBooks : null, async (url: string) => {
    const res = await apiService.get(url);
    return res.data.data;
  });

  const { trigger: handleMultipleBooksUpload, data: uploadResponse } = useSWRMutation(
    endpoints.saveMultipleBooks,
    async (url, { arg }: { arg: FormData[] }) => {
      const response = await apiService.post(url, arg);
      return response.data;
    }
  );

  useEffect(() => {
    if (isAuthenticated && backendBooks) {
      const bookDifference = books.filter((x) => !backendBooks?.includes(x));
      setBooksToSend(bookDifference);
    }
  }, [backendBooks, books, isAuthenticated]);

  useEffect(() => {
    if (booksToSend.length > 0 && isAuthenticated) {
      handleMultipleBooksUpload(prepareFormDataBooks(booksToSend));
    }
  }, [booksToSend, handleMultipleBooksUpload, isAuthenticated]);

  const prepareFormDataBooks = (values: UploadedBook[]) => {
    const formDataArray: FormData[] = [];
    values.forEach((item) => {
      const payload = new FormData();
      const file = {
        uri: item.filePath,
        name: `${item.title}.${processMimeType(item.mimeType)}`,
        type: item.mimeType
      };
      payload.append('file', file as unknown as Blob);
      formDataArray.push(payload);
    });

    return formDataArray;
  };

  return { uploadResponse };
};
