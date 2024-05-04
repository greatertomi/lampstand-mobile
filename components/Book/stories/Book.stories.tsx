import React from 'react';
import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { BookOverview, BookOverviewProps } from '../BookOverview';

const Template: StoryFn<BookOverviewProps> = (args) => <BookOverview {...args} />;

export default {
  title: 'Books/BookOverview',
  Component: BookOverview
};

export const book = Template.bind({});
book.args = {
  title: 'Typescript for Dummies',
  author: 'John Doe',
  image: require('../../../assets/bookImages/book.png'),
  onPress: action('BookOverview clicked')
};
