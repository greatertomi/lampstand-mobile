import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';
import React from 'react';

import { HorizontalBookOverview, HorizontalBookOverviewProps } from '../HorizontalBookOverview';

const Template: StoryFn<HorizontalBookOverviewProps> = (args) => <HorizontalBookOverview {...args} />;

export default {
  title: 'Books/BookOverview',
  Component: HorizontalBookOverview
};

export const book = Template.bind({});
book.args = {
  title: 'Typescript for Dummies',
  author: 'John Doe',
  cover: require('../../../assets/bookImages/bookOne.png'),
  onPress: action('BookOverview clicked')
};
