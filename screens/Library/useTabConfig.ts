import { useMemo } from 'react';

import { ReadingGoals } from '../ReadingGoal';

import { FinishedBooks } from './FinishedBooks';
import { MyBooks } from './MyBooks';

const HOME_PAGE_TITLE = 'Homepage';
const FINISHED_BOOKS_TITLE = 'Finished Books';
const MY_BOOKS_TITLE = 'My Books';
const READING_GOALS_TITLE = 'Reading Goals';

export const useTabConfig = (hasFinishedBook: boolean) =>
  useMemo(
    () => ({
      titles: hasFinishedBook
        ? [HOME_PAGE_TITLE, READING_GOALS_TITLE, FINISHED_BOOKS_TITLE]
        : [HOME_PAGE_TITLE, READING_GOALS_TITLE],

      tabTitles: hasFinishedBook
        ? [MY_BOOKS_TITLE, READING_GOALS_TITLE, FINISHED_BOOKS_TITLE]
        : [MY_BOOKS_TITLE, READING_GOALS_TITLE],

      Components: hasFinishedBook ? [MyBooks, ReadingGoals, FinishedBooks] : [MyBooks, ReadingGoals]
    }),
    [hasFinishedBook]
  );
