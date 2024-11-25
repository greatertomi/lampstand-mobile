import { Meta, StoryFn } from '@storybook/react';
import { View } from 'react-native';

import { TypographyProps } from './BaseText';
import { BodyText } from './BodyText';
import { BodyTextLarge } from './BodyTextLarge';
import { BodyTextSmall } from './BodyTextSmall';
import { HeadingLarge } from './HeadingLarge';
import { HeadingMedium } from './HeadingMedium';
import { HeadingSmall } from './HeadingSmall';
import { LinkText } from './LinkText';
import { TagText } from './TagText';

interface TemplateArgs {
  [key: string]: TypographyProps;
}

const meta: Meta = {
  title: 'Typography'
};

const Template: StoryFn<TemplateArgs> = ({
  large,
  medium,
  small,
  body,
  bodyLarge,
  smallText,
  tag,
  link
}: TemplateArgs) => (
  <View>
    <HeadingLarge style={{ textAlign: 'center' }}>{large.children}</HeadingLarge>
    <HeadingMedium style={{ textAlign: 'center' }}>{medium.children}</HeadingMedium>
    <HeadingSmall style={{ textAlign: 'center' }}>{small.children}</HeadingSmall>
    <BodyTextLarge style={{ textAlign: 'center' }}>{bodyLarge.children}</BodyTextLarge>
    <BodyText style={{ textAlign: 'center' }}>{body.children}</BodyText>
    <BodyTextSmall style={{ textAlign: 'center' }}>{smallText.children}</BodyTextSmall>
    <TagText style={{ textAlign: 'center' }}>{tag.children}</TagText>
    <LinkText size="large" variant="primary" style={{ textAlign: 'center' }}>
      {link.children}
    </LinkText>
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
  bodyLarge: {
    children: 'This a body Large text'
  },
  body: {
    children: 'This is a body text'
  },
  smallText: {
    children: 'This is a small text'
  },
  tag: {
    children: 'This a tag text'
  },
  link: {
    children: 'This is a link text'
  }
};
