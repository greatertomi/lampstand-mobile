import { Feather } from '@expo/vector-icons';
import { StoryFn } from '@storybook/react';

import { useTheme } from '../../../styles';
import { ButtonProps } from '../BaseButton';
import { SecondaryButton } from '../SecondaryButton';

const Template: StoryFn<ButtonProps> = (args) => {
  const { theme } = useTheme();
  return <SecondaryButton icon={<Feather name="upload" size={18} color={theme.colors.primary} />} {...args} />;
};

export default {
  title: 'Buttons/SecondaryButton',
  component: SecondaryButton,
  argTypes: {
    onPress: { action: 'onPress' }
  }
};

export const Secondary = Template.bind({});
Secondary.args = {
  title: 'Secondary'
};
