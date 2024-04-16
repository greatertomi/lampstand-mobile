import { Button, ButtonProps } from './Button';

export default {
  title: 'Button',
  component: Button
};

export const Default = (args: ButtonProps) => <Button {...args} />;

Default.args = {
  label: 'Click me'
};
