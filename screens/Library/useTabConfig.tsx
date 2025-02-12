import { useMemo } from 'react';

import { ReadingGoals } from '../ReadingGoal';

import { FinishedBooks } from './FinishedBooks';
import { HomePageTitle } from './HomePageTitle';
import { MyBooks } from './MyBooks';

const TITLE = 'Library';
const MY_BOOKS = 'My Books';
const READING_GOALS_TITLE = 'Reading goal';
const FINISHED_BOOKS_TITLE = 'Finished books';

export const useTabConfig = (hasFinishedBook: boolean, doesUserHasBooks?: boolean) => {
  const titles = useMemo(
    () =>
      hasFinishedBook
        ? [<HomePageTitle key="Lampstand" doesUserHasBooks={doesUserHasBooks} />, READING_GOALS_TITLE, TITLE]
        : [<HomePageTitle key="Lampstand" doesUserHasBooks={doesUserHasBooks} />, READING_GOALS_TITLE],
    [hasFinishedBook, doesUserHasBooks]
  );

  const tabTitles = useMemo(
    () => (hasFinishedBook ? [TITLE, READING_GOALS_TITLE, FINISHED_BOOKS_TITLE] : [MY_BOOKS, READING_GOALS_TITLE]),
    [hasFinishedBook]
  );

  const Components = useMemo(
    () => (hasFinishedBook ? [MyBooks, ReadingGoals, FinishedBooks] : [MyBooks, ReadingGoals]),
    [hasFinishedBook]
  );

  return { titles, tabTitles, Components };
};
