import React from 'react';
import { SettingContainer } from './SettingContainer';
import { SettingList } from './SettingList';
import { useTheme } from '../../styles';
import { accountData } from './settingsItems';

export const AccountSettings = () => {
  const { theme } = useTheme();
  const accountSettingData = accountData(theme);

  return (
    <SettingContainer title="Account Settings">
      <SettingList data={accountSettingData} />
    </SettingContainer>
  );
};
