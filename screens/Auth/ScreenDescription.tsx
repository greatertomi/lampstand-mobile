import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BodyText, LinkText } from '../../components';
import { LinkTextProps } from '../../components/Typography/LinkText';

type ScreenDescriptionProps = {
  link?: string;
} & LinkTextProps;

export const ScreenDescription = ({ children, link, ...rest }: ScreenDescriptionProps) => (
  <View style={styles.register}>
    <BodyText>{children}</BodyText>
    <LinkText variant="primary" bold {...rest}>
      {link}
    </LinkText>
  </View>
);

const styles = StyleSheet.create({
  register: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 16
  }
});
