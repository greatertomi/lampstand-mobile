import { ButtonProps } from '../../types';
import { Button } from './Button';
import { Meta, StoryFn } from '@storybook/react';

const meta: Meta = {
  title: 'Components/Button',
  component: Button
};

const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />;

export default {
  ...meta,
  component: Button
};

export const Overview = Template.bind({});
Overview.args = {
  title: 'Click me'
};
