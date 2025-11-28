/* eslint-disable  @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { apiService, endpoints } from '../api';
import { UploadedBook, useAuthState, useBookSyncState } from '../store';
import { logger, processUploadMimeType, resolveBookPath } from '../utils';

export const useSyncBooksWithBackend = (books: UploadedBook[]) => {
  const { isAuthenticated } = useAuthState();
  const { shouldSync, setShouldSync } = useBookSyncState();

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

  const { trigger: handleManyBooksDelete } = useSWRMutation(
    endpoints.deleteManyBooks,
    async (url, { arg }: { arg: string[] }) => {
      const response = await apiService.delete(url, { data: { ids: arg } });
      return response.data;
    }
  );

  useEffect(() => {
    if (!shouldSync || !backendBooks || !isAuthenticated) {
      return;
    }

    (async () => {
      try {
        const booksToUpload = books.filter(
          (book: UploadedBook) =>
            !backendBooks.some(
              (backendBook: UploadedBook) =>
                backendBook.id === book.id || (backendBook.title === book.title && backendBook.author === book.author)
            )
        );

        const booksToDelete = backendBooks.filter(
          (book: UploadedBook) =>
            !books.some(
              (item: UploadedBook) => item.id === book.id || (item.title === book.title && item.author === book.author)
            )
        );

        if (booksToUpload.length > 0) {
          const formData = await prepareFormDataBooks(booksToUpload);
          await handleMultipleBooksUpload(formData);
        }

        if (booksToDelete.length > 0) {
          const ids = booksToDelete.map((book: UploadedBook) => book.id);
          await handleManyBooksDelete(ids);
        }
      } catch (err) {
        logger.error('Error during sync:', err);
      } finally {
        setShouldSync(false);
      }
    })();
  }, [
    backendBooks,
    books,
    handleMultipleBooksUpload,
    isAuthenticated,
    shouldSync,
    setShouldSync,
    handleManyBooksDelete
  ]);

  const prepareFormDataBooks = async (values: UploadedBook[]) => {
    const formData = new FormData();

    // Convert all relative paths to absolute paths before appending to FormData
    await Promise.all(
      values.map(async (value) => {
        const absolutePath = await resolveBookPath(value.filePath);
        formData.append('files', {
          uri: absolutePath,
          type: processUploadMimeType(value.mimeType),
          name: value.filePath.split('/').pop()
        } as any);
      })
    );

    formData.append('ids', JSON.stringify(values.map((file) => file.id)));
    return formData;
  };

  return {
    error: fetchError
  };
};
