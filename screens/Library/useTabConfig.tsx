import { useMemo } from 'react';

import { ReadingGoals } from '../ReadingGoal';

import { FinishedBooks } from './FinishedBooks';
import { HomePageTitle } from './HomePageTitle';
import { MyBooks } from './MyBooks';

const FINISHED_BOOKS_TITLE = 'Finished Books';
const MY_BOOKS_TITLE = 'My Books';
const READING_GOALS_TITLE = 'Reading Goals';

export const useTabConfig = (hasFinishedBook: boolean) => {
  const titles = useMemo(
    () =>
      hasFinishedBook
        ? [<HomePageTitle key="homepage" />, READING_GOALS_TITLE, FINISHED_BOOKS_TITLE]
        : [<HomePageTitle key="homepage" />, READING_GOALS_TITLE],
    [hasFinishedBook]
  );

  const tabTitles = useMemo(
    () =>
      hasFinishedBook
        ? [MY_BOOKS_TITLE, READING_GOALS_TITLE, FINISHED_BOOKS_TITLE]
        : [MY_BOOKS_TITLE, READING_GOALS_TITLE],
    [hasFinishedBook]
  );

  const Components = useMemo(
    () => (hasFinishedBook ? [MyBooks, ReadingGoals, FinishedBooks] : [MyBooks, ReadingGoals]),
    [hasFinishedBook]
  );

  return { titles, tabTitles, Components };
};
