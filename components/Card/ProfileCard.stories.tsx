import { StoryFn } from '@storybook/react';
import { ProfileCard, ProfileCardProps } from './ProfileCard';

const Template: StoryFn<ProfileCardProps> = (args) => <ProfileCard {...args} />;

export default {
  title: 'ProfileCard',
  component: ProfileCard
};

export const profileCard = Template.bind({});
profileCard.args = {
  optimisticPic: require('../../assets/images/profile.png'),
  showOverlay: false,
  onPress: () => {}
};
