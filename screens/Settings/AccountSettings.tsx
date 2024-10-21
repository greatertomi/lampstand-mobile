import React from 'react';
import { SettingContainer } from './SettingContainer';
import { SettingList } from './SettingList';
import { accountData } from './settingsItems';
import { useAuthState } from '../../store';

export const AccountSettings = () => {
  const { isAuthenticated } = useAuthState();
  const accountSettingData = accountData(isAuthenticated);

  return (
    <SettingContainer title="Account Settings">
      <SettingList data={accountSettingData} />
    </SettingContainer>
  );
};
