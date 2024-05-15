import { StoryFn } from '@storybook/react';
import { CurrentBook, BookDetailsProps } from '../CurrentBook';

const Template: StoryFn<BookDetailsProps> = (args) => <CurrentBook {...args} />;

export default {
  title: 'Books/CurrentBook',
  component: CurrentBook
};

export const currentBook = Template.bind({});
currentBook.args = {
  image: require('../../../assets/bookImages/bookOne.png'),
  categories: ['Fiction', 'Science', 'Sport', 'Fiction', 'Science', 'Sport'],
  progress: 0.5,
  title: 'The Voice Upstairs',
  author: 'Laura E. Weymouth'
};
