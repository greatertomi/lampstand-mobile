import React from 'react';
import { StyleSheet } from 'react-native';

import { BaseField, BaseFieldProps } from './BaseField';

export const TextAreaField = ({ placeholder, style, ...rest }: BaseFieldProps) => (
  <BaseField multiline placeholder={placeholder} style={[styles.textArea, style]} {...rest} />
);

const styles = StyleSheet.create({
  textArea: {
    borderWidth: 0,
    fontWeight: '600',
    minHeight: '80%'
  }
});
