import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes';
import { useTheme, utilities } from '../../styles';
import { SettingContainer } from './SettingContainer';
import { ProfileCard } from '../../components';
import { SettingList } from './SettingList';
import { generalData, preferenceData } from './settingsItems';

type ProfileSettingsNavigation = NativeStackNavigationProp<RootStackParamList, 'ProfileSettings'>;

export const Settings = () => {
  const { theme } = useTheme();
  const generalSettingsData = generalData(theme);
  const preferenceSettingsData = preferenceData(theme);
  const navigation = useNavigation<ProfileSettingsNavigation>();

  return (
    <SettingContainer title="Settings">
      <View style={utilities.gap_2}>
        <ProfileCard
          image={require('../../assets/images/profile.png')}
          name="Olivia Smith"
          email="OlivaSmith@gmail.com"
          onPress={() => navigation.navigate('ProfileSettings')}
        />
        <View style={utilities.gap_2}>
          <SettingList data={generalSettingsData} title="General" />
          <SettingList data={preferenceSettingsData} title="Preference" />
        </View>
      </View>
    </SettingContainer>
  );
};
