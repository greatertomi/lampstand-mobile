import React from 'react';
import { View } from 'react-native';
import { useTheme, utilities } from '../../styles';
import { SettingContainer } from './SettingContainer';
import { ProfileCard } from '../../components';
import { SettingList } from './SettingList';
import { generalData, preferenceData } from './settingsItems';

export const Settings = () => {
  const { theme } = useTheme();
  const generalSettingsData = generalData(theme);
  const preferenceSettingsData = preferenceData(theme);

  return (
    <SettingContainer title="Settings">
      <View style={utilities.gap_2}>
        <ProfileCard
          image={require('../../assets/images/profile.png')}
          name="Olivia Smith"
          email="OlivaSmith@gmail.com"
        />
        <View style={utilities.gap_2}>
          <SettingList data={generalSettingsData} title="General" />
          <SettingList data={preferenceSettingsData} title="Preference" />
        </View>
      </View>
    </SettingContainer>
  );
};
