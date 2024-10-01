import React, { useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes';
import { useTheme } from '../../styles';
import { SettingContainer } from './SettingContainer';
import { ProfileCard } from '../../components';
import { SettingList } from './SettingList';
import { generalData, preferenceData } from './settingsItems';
import { LogOutModal } from './LogOutModal';

type NavigationScreens = NativeStackNavigationProp<RootStackParamList, 'ProfileSettings' | 'Login'>;

export const Settings = () => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const generalSettingsData = generalData(theme);
  const navigation = useNavigation<NavigationScreens>();
  const [isVisible, setIsVisible] = useState(false);

  const logoutPress = () => {
    setIsVisible(true);
  };

  return (
    <SettingContainer title="Settings">
      <View style={utils.gap_2}>
        <ProfileCard
          image={require('../../assets/images/profile.png')}
          name="Olivia Smith"
          email="OlivaSmith@gmail.com"
          onPress={() => navigation.navigate('ProfileSettings')}
        />
        <View style={utils.gap_2}>
          <SettingList data={generalSettingsData} title="General" />
          <SettingList data={preferenceData(theme, logoutPress)} title="Preference" />
        </View>
      </View>
      <LogOutModal isVisible={isVisible} onClose={() => setIsVisible(!isVisible)} />
    </SettingContainer>
  );
};
