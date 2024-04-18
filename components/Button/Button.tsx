import React from 'react';
import { Text, View } from 'react-native';
import { ButtonProps } from '../../types';


export const Button: React.FC<ButtonProps> = ({ title }) => (
  <View>
    <Text>{title}</Text>
  </View>
);

