import { StoryFn } from '@storybook/react';
import { Feather } from '@expo/vector-icons';
import { ButtonProps } from '../BaseButton';
import { SecondaryButton } from '../SecondaryButton';
import { useTheme } from '../../../styles';

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
