import { Meta, StoryFn } from '@storybook/react';
import { HeadlineLarge } from './HeadlineLarge';
import { TypographyProps } from './TypographyProps';
import { HeadlineMedium } from './HeadlineMedium';
import { HeadlineSmall } from './HeadlineSmall';
import { BodyText } from './BodyText';
import { ButtonText } from './ButtonText';
import { SmallText } from './SmallText';
import { Tag } from './Tag';

interface TemplateArgs {
  [key: string]: TypographyProps;
}

const meta: Meta = {
  title: 'Components/Typography'
};

const Template: StoryFn<TemplateArgs> = ({ large, medium, small, body, buttonText, smallText, tag }) => (
  <>
    <HeadlineLarge {...large} />
    <HeadlineMedium {...medium} />
    <HeadlineSmall {...small} />
    <BodyText {...body} />
    <ButtonText {...buttonText} />
    <SmallText {...smallText} />
    <Tag {...tag} />
  </>
);

export default {
  ...meta,
  component: Template
};

export const Typography = Template.bind({});

Typography.args = {
  large: {
    children: 'This is a large headline text'
  },
  medium: {
    children: 'This is a medium headline text'
  },
  small: {
    children: 'This is a small headline text'
  },
  buttonText: {
    children: 'This is a button text'
  },
  body: {
    children: 'this is a body text'
  },
  smallText: {
    children: 'This is a small text'
  },
  tag: {
    children: 'This a tag text'
  }
};
