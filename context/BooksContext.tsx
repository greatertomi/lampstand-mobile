import { ReactNode, createContext, useState, useEffect, useContext, useMemo, useCallback } from 'react';

import { TrackedState } from '../package/epub-reader';
import { BookEventTypes, fetchBooks, UploadedBook, bookEvents } from '../store';
import { logger } from '../utils';

interface BooksContextType {
  books: UploadedBook[];
  refreshBooks: () => Promise<void>;
}

const BooksContext = createContext<BooksContextType | null>(null);

type BooStateTypes = {
  title: string;
  author: string;
  state: TrackedState;
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

  const handleUpdateBookState = ({ title, author, state }: BooStateTypes) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.title === title && book.author === author ? { ...book, state } : book))
    );
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

  const eventHandlers = useMemo(
    () => ({
      [BookEventTypes.BOOK_ADDED]: handleBookAdded,
      [BookEventTypes.BOOK_UPDATED]: handleBookUpdate,
      [BookEventTypes.BOOK_DELETED]: refreshBooks,
      [BookEventTypes.BOOK_STATE_UPDATED]: handleUpdateBookState,
      [BookEventTypes.BOOK_STATE_FETCHED]: handleUpdateBookState,
      [BookEventTypes.TABLE_EXISTS_CHECKED]: handleTableExistsChecked,
      [BookEventTypes.TABLE_CREATED]: refreshBooks,
      [BookEventTypes.TABLE_DROPPED]: refreshBooks
    }),
    [handleTableExistsChecked, refreshBooks]
  );

  useEffect(() => {
    (async () => {
      await refreshBooks();
      Object.entries(eventHandlers).forEach(([eventType, handler]) => {
        bookEvents.on(eventType as BookEventTypes, handler);
      });

      return () => {
        Object.entries(eventHandlers).forEach(([eventType, handler]) => {
          bookEvents.off(eventType as BookEventTypes, handler);
        });
      };
    })();
  }, [refreshBooks, eventHandlers]);

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
