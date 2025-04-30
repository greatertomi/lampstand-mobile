import { ReactNode, createContext, useState, useEffect, useContext, useMemo, useCallback } from 'react';

import { BookTrackedState } from '../package/types';
import { BookEventTypes, fetchBooks, UploadedBook, bookEvents } from '../store';
import { logger } from '../utils';

interface BooksContextType {
  books: UploadedBook[];
  refreshBooks: () => Promise<void>;
}

const BooksContext = createContext<BooksContextType | null>(null);

type BookStateTypes = {
  id: string;
  state: BookTrackedState;
};

export const BookProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<UploadedBook[]>([]);

  const refreshBooks = useCallback(async () => {
    try {
      const fetchedBooks = await fetchBooks();
      setBooks(fetchedBooks);
    } catch (error) {
      logger.error('Failed to refresh books:', error);
    }
  }, []);

  const handleUpdateBookState = ({ id, state }: BookStateTypes) => {
    setBooks((prevBooks) => prevBooks.map((book) => (book.id === id ? { ...book, state } : book)));
  };

  const handleBookAdded = (book: UploadedBook) => {
    setBooks((prevBooks) => [...prevBooks, book]);
  };

  const handleBookUpdate = (updatedBook: UploadedBook) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.title === updatedBook.title && book.author === updatedBook.author ? updatedBook : book
      )
    );
  };

  const handleTableExistsChecked = useCallback(
    async ({ tableName, exists }: { tableName: string; exists: boolean }) => {
      if (tableName === 'books' && exists) await refreshBooks();
    },
    [refreshBooks]
  );

  useEffect(() => {
    (async () => {
      await refreshBooks();

      const eventHandlers = {
        [BookEventTypes.BOOK_ADDED]: handleBookAdded,
        [BookEventTypes.BOOK_UPDATED]: handleBookUpdate,
        [BookEventTypes.BOOK_STATE_UPDATED]: handleUpdateBookState,
        [BookEventTypes.BOOK_STATE_FETCHED]: handleUpdateBookState,
        [BookEventTypes.TABLE_EXISTS_CHECKED]: handleTableExistsChecked,
        [BookEventTypes.REFRESH_BOOK]: refreshBooks
      };

      Object.entries(eventHandlers).forEach(([eventType, handler]) => {
        bookEvents.on(eventType as BookEventTypes, handler);
      });

      return () => {
        Object.entries(eventHandlers).forEach(([eventType, handler]) => {
          bookEvents.off(eventType as BookEventTypes, handler);
        });
      };
    })();
  }, [handleTableExistsChecked, refreshBooks]);

  const contextValue = useMemo(() => ({ books, refreshBooks }), [books, refreshBooks]);

  return <BooksContext.Provider value={contextValue}>{children}</BooksContext.Provider>;
};

export const useBooks = () => {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};
