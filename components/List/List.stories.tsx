import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { StoryFn } from '@storybook/react';
import { List, ListProp } from './List';

const Template: StoryFn<ListProp> = (args) => <List {...args} />;

export default {
  title: 'List',
  component: List
};

export const defaultList = Template.bind({});
defaultList.args = {
  title: 'Account Setting',
  icon: <MaterialIcons name="manage-accounts" size={24} color="black" />
};

export const secondaryList = Template.bind({});
secondaryList.args = {
  title: 'Profile',
  icon: <MaterialIcons name="manage-accounts" size={24} color="black" />,
  variant: 'secondary'
};
