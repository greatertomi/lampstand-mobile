import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BodyText, LinkText } from '../../components';

type ScreenDescriptionProps = {
  description: string;
  link?: string;
};

export const ScreenDescription = ({ description, link }: ScreenDescriptionProps) => (
  <View style={styles.register}>
    <BodyText>{description}</BodyText>
    <LinkText variant="primary" fontWeight>
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
