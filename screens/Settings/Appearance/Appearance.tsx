import React from 'react';
import { View } from 'react-native';
import { SettingContainer } from '../SettingContainer';
import { BodyTextLarge } from '../../../components';
import { utilities } from '../../../styles';
import { Theme } from './Theme';
import { FontSizes } from './FontSizes';

export const Appearance = () => (
  <SettingContainer title="Appearance">
    <BodyTextLarge bold style={utilities.mb_2}>
      Theme
    </BodyTextLarge>
    <View style={utilities.gap_4}>
      <Theme />
      <FontSizes />
    </View>
  </SettingContainer>
);
