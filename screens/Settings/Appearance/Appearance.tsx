import React from 'react';

import { BodyTextLarge } from '../../../components';
import { utilities } from '../../../styles';
import { SettingContainer } from '../SettingContainer';

import { Theme } from './Theme';

export const Appearance = () => (
  <SettingContainer title="Appearance">
    <BodyTextLarge bold style={utilities.mb_2}>
      Theme
    </BodyTextLarge>
    <Theme />
  </SettingContainer>
);
