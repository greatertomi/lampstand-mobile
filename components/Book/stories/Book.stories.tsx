import React from 'react';
import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Book, BookOverviewProps } from '../Book';

const Template: StoryFn<BookOverviewProps> = (args) => <Book {...args} />;

export default {
  title: 'Books/BookOverview',
  Component: Book
};

export const book = Template.bind({});
book.args = {
  title: 'Typescript for Dummies',
  author: 'John Doe',
  image: require('../../../assets/bookImages/book.png'),
  onPress: action('Book clicked')
};
