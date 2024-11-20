import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';

import { ProfileCard } from '../../components';
import { ScreenNavigation } from '../../routes';
import { useAuthState } from '../../store';
import { useTheme } from '../../styles';

import { LogOutModal } from './LogOutModal';
import { SettingContainer } from './SettingContainer';
import { SettingList } from './SettingList';
import { generalData, preferenceData } from './settingsItems';

export const Settings = () => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const { isAuthenticated } = useAuthState();
  const generalSettingsData = generalData(theme, isAuthenticated);
  const navigation = useNavigation<ScreenNavigation<'Settings'>>();
  const [isVisible, setIsVisible] = useState(false);

  const logoutPress = () => {
    setIsVisible(true);
  };

  return (
    <SettingContainer title="Settings">
      <View style={utils.gap_2}>
        {isAuthenticated && <ProfileCard onPress={() => navigation.navigate('ProfileSettings')} />}
        <View style={utils.gap_2}>
          <SettingList data={generalSettingsData} title="General" />
          <SettingList data={preferenceData(theme, logoutPress, isAuthenticated)} title="Preference" />
        </View>
      </View>
      <LogOutModal isVisible={isVisible} onClose={() => setIsVisible(!isVisible)} />
    </SettingContainer>
  );
};
