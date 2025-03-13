import { DropdownDataType } from './types';

export const dateToFilter: DropdownDataType[] = [
  { label: 'Last 7 days', value: 'last_Seven_days' },
  { label: 'Last 2 weeks', value: 'last_two_weeks' },
  { label: 'Last month', value: 'last_month' },
  { label: 'Last 6 month', value: 'last_six_month' },
  { label: 'Last year', value: 'last_year' }
];

export const dates = [
  {
    day: 'Mon',
    num: 1
  },
  {
    day: 'Tue',
    num: 2
  },
  {
    day: 'Wed',
    num: 3
  },
  {
    day: 'Thur',
    num: 4
  },
  {
    day: 'Fri',
    num: 5
  },
  {
    day: 'Sat',
    num: 6
  }
];

export const reports = [
  {
    title: 'Total Hours Reading',
    value: '1h 30m'
  },
  {
    title: 'Average Hour Spent  ',
    value: '2h 10m'
  },
  {
    title: 'In my Library ',
    value: 20
  },
  {
    title: 'In my Library ',
    value: 10
  },
  {
    title: 'Total Authors',
    value: 20
  },
  {
    title: 'Total Pages Turned',
    value: 70
  }
];

export const readingSpeedData = [
  {
    data: '2min 43sec',
    label: 'Today'
  },
  {
    data: '1hr 20min',
    label: 'this Month'
  },
  {
    data: '6hr 13min',
    label: 'Last Month'
  }
];

export const bookAuthors = [
  {
    image: require('../../../assets/bookImages/bookOne.png'),
    name: 'J.K. Rowling',
    boolTitle: 'Harry Potter'
  },
  {
    image: require('../../../assets/bookImages/bookTwo.png'),
    name: 'Peter Sun',
    boolTitle: 'The Alchemist'
  },
  {
    image: require('../../../assets/bookImages/bookThree.png'),
    name: 'Job Steve ',
    boolTitle: 'The Great Gatsby'
  },
  {
    image: require('../../../assets/bookImages/bookFour.png'),
    name: 'Holly Black',
    boolTitle: 'The last man'
  }
];
