import React from 'react';

import { useAuthState } from '../../store';

import { SettingContainer } from './SettingContainer';
import { SettingList } from './SettingList';
import { accountData } from './settingsItems';

export const AccountSettings = () => {
  const { isAuthenticated } = useAuthState();
  const accountSettingData = accountData(isAuthenticated);

  return (
    <SettingContainer title="Account Settings">
      <SettingList data={accountSettingData} />
    </SettingContainer>
  );
};
