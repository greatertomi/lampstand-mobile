import React, { ReactElement, useMemo } from 'react';

import { ReadingGoals } from '../ReadingGoal';

import { FinishedBooks } from './FinishedBooks';
import { HomePageTitle } from './HomePageTitle';
import { MyBooks } from './MyBooks';
import { TabComponentProps } from './types';

type TabConfig = {
  pageTitle: React.JSX.Element;
  title: string;
  Component: (() => ReactElement) | ((props: TabComponentProps) => ReactElement);
};

export const useTabConfig = (hasFinishedBook: boolean): TabConfig[] =>
  useMemo(
    () => [
      {
        pageTitle: <HomePageTitle />,
        title: 'My books',
        Component: MyBooks
      },
      {
        pageTitle: <HomePageTitle />,
        title: 'Reading goal',
        Component: ReadingGoals
      },
      ...(hasFinishedBook ? [{ pageTitle: <HomePageTitle />, title: 'Completed', Component: FinishedBooks }] : [])
    ],
    [hasFinishedBook]
  );
