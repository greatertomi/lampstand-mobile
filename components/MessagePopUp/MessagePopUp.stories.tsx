import { StoryFn } from '@storybook/react';
import { MessagePopUp, MessagePopUpProps } from './MessagePopUp';
import { resetPasswordSuccess } from '../../assets/svg';

const Template: StoryFn<MessagePopUpProps> = (args) => <MessagePopUp {...args} />;

export default {
  title: 'MessagePopUp',
  component: MessagePopUp
};

export const messagePopUp = Template.bind({});
messagePopUp.args = {
  svg: resetPasswordSuccess,
  message: 'Message goes here',
  description: 'Message description foes here',
  buttonTitle: 'Continue'
};
