import React from 'react';
import { View } from 'react-native';

import { BodyTextLarge } from '../../../components';
import { utilities } from '../../../styles';
import { SettingContainer } from '../SettingContainer';

import { FontSizes } from './FontSizes';
import { Theme } from './Theme';

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
