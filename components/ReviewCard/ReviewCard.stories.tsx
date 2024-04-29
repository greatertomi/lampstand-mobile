import { StoryFn } from '@storybook/react';
import { ReviewCard, ReviewCardProps } from './ReviewCard';

const Template: StoryFn<ReviewCardProps> = (args) => <ReviewCard {...args} />;

export default {
  title: 'Review Card',
  component: ReviewCard
};

export const reviewCard = Template.bind({});
reviewCard.args = {
  name: 'John Doe',
  date: 'May, 2024',
  numberOfReply: 20,
  description: `Best book I have ever read. I placed an order and it was promptly Best book I have ever read
  I placed an order and it was promptly`
};
