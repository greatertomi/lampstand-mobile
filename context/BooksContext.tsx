import { ReactNode, createContext, useState, useEffect, useContext, useMemo, useCallback } from 'react';

import { TrackedState } from '../package/epub-reader';
import { bookEvents, BookEventTypes, fetchBooks, UploadedBook } from '../store';
import { logger } from '../utils';

interface BooksContextType {
  books: UploadedBook[];
  refreshBooks: () => Promise<void>;
}

const BooksContext = createContext<BooksContextType | null>(null);

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

  useEffect(() => {
    (async () => {
      await refreshBooks();

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

      const handleBookDelete = () => {
        refreshBooks();
      };

      const handleBookStateUpdated = ({
        title,
        author,
        state
      }: {
        title: string;
        author: string;
        state: TrackedState;
      }) => {
        setBooks((prevBooks) =>
          prevBooks.map((book) => (book.title === title && book.author === author ? { ...book, state } : book))
        );
      };

      const handleBookStateFetched = ({
        title,
        author,
        state
      }: {
        title: string;
        author: string;
        state: TrackedState;
      }) => {
        if (state !== null) {
          setBooks((prevBooks) =>
            prevBooks.map((book) => (book.title === title && book.author === author ? { ...book, state } : book))
          );
        }
      };

      const handleTableExistsChecked = ({ tableName, exists }: { tableName: string; exists: boolean }) => {
        if (tableName === 'books' && exists) {
          refreshBooks();
        }
      };

      const handleTableEvents = () => {
        refreshBooks();
      };

      bookEvents.on(BookEventTypes.BOOK_ADDED, handleBookAdded);
      bookEvents.on(BookEventTypes.BOOK_UPDATED, handleBookUpdate);
      bookEvents.on(BookEventTypes.BOOK_DELETED, handleBookDelete);
      bookEvents.on(BookEventTypes.BOOK_STATE_UPDATED, handleBookStateUpdated);
      bookEvents.on(BookEventTypes.BOOK_STATE_FETCHED, handleBookStateFetched);
      bookEvents.on(BookEventTypes.TABLE_CREATED, handleTableEvents);
      bookEvents.on(BookEventTypes.TABLE_DROPPED, handleTableEvents);
      bookEvents.on(BookEventTypes.TABLE_EXISTS_CHECKED, handleTableExistsChecked);

      return () => {
        bookEvents.off(BookEventTypes.BOOK_ADDED, handleBookAdded);
        bookEvents.off(BookEventTypes.BOOK_UPDATED, handleBookUpdate);
        bookEvents.off(BookEventTypes.BOOK_DELETED, handleBookDelete);
        bookEvents.off(BookEventTypes.BOOK_STATE_UPDATED, handleBookStateUpdated);
        bookEvents.off(BookEventTypes.BOOK_STATE_FETCHED, handleBookStateFetched);
        bookEvents.off(BookEventTypes.TABLE_CREATED, handleTableEvents);
        bookEvents.off(BookEventTypes.TABLE_DROPPED, handleTableEvents);
        bookEvents.off(BookEventTypes.TABLE_EXISTS_CHECKED, handleTableExistsChecked);
      };
    })();
  }, [refreshBooks]);

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
