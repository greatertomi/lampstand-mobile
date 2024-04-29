import React from 'react';
import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Book, BookProps } from '../Book';

const Template: StoryFn<BookProps> = (args) => <Book {...args} />;

export default {
  title: 'Book',
  Component: Book
};

export const book = Template.bind({});
book.args = {
  title: 'Typescript for Dummies',
  author: 'John Doe',
  image: require('../../../assets/bookImages/book.png'),
  onClick: action('Book clicked')
};
