import { StoryFn } from '@storybook/react';
import { BookDetails, BookDetailsProps } from '../BookDetails';

const Template: StoryFn<BookDetailsProps> = (args) => <BookDetails {...args} />;

export default {
  title: 'Book details',
  component: BookDetails
};

export const bookDetails = Template.bind({});
bookDetails.args = {
  image: require('../../../assets/bookImages/book.png'),
  categories: ['Fiction', 'Science', 'Sport'],
  progress: 0.5,
  title: 'The Voice Upstairs',
  author: 'Laura E. Weymouth'
};
