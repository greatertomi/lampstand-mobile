import { useMemo } from 'react';

import { UploadedBook } from '../../store';
import { ReadingGoals } from '../ReadingGoal';

import { FinishedBooks } from './FinishedBooks';
import { HomePageTitle } from './HomePageTitle';
import { MyBooks } from './MyBooks';

const TITLE = 'Library';
const READING_GOALS_TITLE = 'Reading goal';
const FINISHED_BOOKS_TITLE = 'Finished books';

export const useTabConfig = (hasFinishedBook: boolean, userHasBooks?: boolean) => {
  const titles = useMemo(
    () =>
      hasFinishedBook
        ? [<HomePageTitle key="Lampstand" doesUserHasBooks={userHasBooks} />, READING_GOALS_TITLE, TITLE]
        : [<HomePageTitle key="Lampstand" doesUserHasBooks={userHasBooks} />, READING_GOALS_TITLE],
    [hasFinishedBook]
  );

  const tabTitles = useMemo(
    () =>
      hasFinishedBook
        ? [TITLE, READING_GOALS_TITLE, FINISHED_BOOKS_TITLE]
        : [FINISHED_BOOKS_TITLE, READING_GOALS_TITLE],
    [hasFinishedBook]
  );

  const Components = useMemo(
    () => (hasFinishedBook ? [MyBooks, ReadingGoals, FinishedBooks] : [MyBooks, ReadingGoals]),
    [hasFinishedBook]
  );

  return { titles, tabTitles, Components };
};
