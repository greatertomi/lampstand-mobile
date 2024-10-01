import { useMemo } from 'react';
import { MyBooks } from './MyBooks';
import { FinishedBooks } from './FinishedBooks';
import { ReadingGoals } from '../ReadingGoal';

const HOME_PAGE_TITLE = 'Homepage';
const FINISHED_BOOKS_TITLE = 'Finished Books';
const MY_BOOKS_TITLE = 'My Books';
const READING_GOALS_TITLE = 'Reading Goals';

export const useTabConfig = (isAuthenticated: boolean) =>
  useMemo(
    () => ({
      titles: isAuthenticated
        ? [HOME_PAGE_TITLE, READING_GOALS_TITLE, FINISHED_BOOKS_TITLE]
        : [HOME_PAGE_TITLE, FINISHED_BOOKS_TITLE],

      tabTitles: isAuthenticated
        ? [MY_BOOKS_TITLE, READING_GOALS_TITLE, FINISHED_BOOKS_TITLE]
        : [MY_BOOKS_TITLE, FINISHED_BOOKS_TITLE],

      Components: isAuthenticated ? [MyBooks, ReadingGoals, FinishedBooks] : [MyBooks, FinishedBooks]
    }),
    [isAuthenticated]
  );
