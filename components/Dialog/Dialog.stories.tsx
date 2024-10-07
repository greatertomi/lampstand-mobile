import { StoryFn } from '@storybook/react';
import { Dialog } from './Dialog';

const Template: StoryFn = () => <Dialog title="Cool Stuff" />;

export default {
  title: 'BottomSheet',
  component: Dialog
};

export const bottomSheet = Template.bind({});
