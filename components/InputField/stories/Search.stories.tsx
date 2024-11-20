import { StoryFn } from '@storybook/react';
import { useState } from 'react';

import { Search, SearchProps } from '../Search';

const Template: StoryFn<SearchProps> = (args) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTerm = (value: string) => {
    setSearchTerm(value);
  };
  return <Search {...args} searchTerm={searchTerm} onSearchTermChange={handleSearchTerm} />;
};

export default {
  title: 'InputFields/Search',
  component: Search
};

export const search = Template.bind({});
