import { StoryFn } from '@storybook/react';
import { ProfileCard, ProfileCardProps } from './ProfileCard';

const Template: StoryFn<ProfileCardProps> = (args) => <ProfileCard {...args} />;

export default {
  title: 'ProfileCard',
  component: ProfileCard
};

export const profileCard = Template.bind({});
profileCard.args = {
  image: require('../../assets/images/profile.png'),
  name: 'Olivia Goldsmith',
  email: 'OliviaGoldsmith@gmail.com'
};
