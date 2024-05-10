import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { important } from '../../assets/svg';
import { BaseText, TypographyProps } from './BaseText';
import { fontSizes } from '../../styles';

interface LabelTextProps extends TypographyProps {
  required: boolean;
}

export const LabelText = ({ required = false, children, style, ...rest }: LabelTextProps) => (
  <View style={styles.labelText}>
    <BaseText {...rest} style={[styles.text, style]}>
      {children}
    </BaseText>
    {required && <SvgXml xml={important} />}
  </View>
);

const styles = StyleSheet.create({
  labelText: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 2
  },
  text: {
    fontSize: fontSizes.body,
  }
});
