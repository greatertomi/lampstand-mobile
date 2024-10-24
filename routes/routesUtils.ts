import { ScreenType } from './screen-paths';
import { myBooks, settingIcon } from '../assets';

type BottomNavItems = Pick<ScreenType, 'name'> & {
  icon: string;
  tabName: string;
};

const tabItems: BottomNavItems[] = [
  {
    name: 'MyBooks',
    icon: myBooks,
    tabName: 'My Books'
  },
  {
    name: 'Settings',
    icon: settingIcon,
    tabName: 'Settings'
  }
];

export const getTabIcon = (routeName: string) => {
  const tabItem = tabItems.find((item) => item.name === routeName);
  return tabItem || null;
};
