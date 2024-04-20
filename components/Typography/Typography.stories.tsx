import { Meta, StoryFn } from '@storybook/react';
import { View } from 'react-native';
import { HeadingLarge } from './HeadingLarge';
import { HeadlineMedium } from './HeadlineMedium';
import { HeadlineSmall } from './HeadlineSmall';
import { BodyText } from './BodyText';
import { SmallText } from './SmallText';
import { Tag } from './Tag';
import { TypographyProps } from './BaseText';

interface TemplateArgs {
  [key: string]: TypographyProps;
}

const meta: Meta = {
  title: 'Typography'
};

const Template: StoryFn<TemplateArgs> = ({ large, medium, small, body, smallText, tag }) => (
  <View>
    <HeadingLarge style={{ textAlign: 'center' }}>{large.children}</HeadingLarge>
    <HeadlineMedium>{medium.children}</HeadlineMedium>
    <HeadlineSmall>{small.children}</HeadlineSmall>
    <BodyText>{body.children}</BodyText>
    <SmallText>{smallText.children}</SmallText>
    <Tag>{tag.children}</Tag>
  </View>
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
