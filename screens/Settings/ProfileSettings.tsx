import React, { useState } from 'react';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { SettingContainer } from './SettingContainer';
import { BodyTextSmall, DropdownPicker, ProfileCard, TextField } from '../../components';
import { Theme, useTheme } from '../../styles';

const dummyGenre = [
  {
    label: 'Fantasy',
    value: 'Fantasy'
  },
  {
    label: 'Action',
    value: 'Action'
  },
  {
    label: 'Romance',
    value: 'Romance'
  }
];

export const ProfileSettings = () => {
  const [genre, setGenre] = useState<string>('');
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);

  return (
    <SettingContainer title="My Profile" useButton buttonTitle="Save">
      <View style={styles.profileContainer}>
        <ProfileCard
          image={require('../../assets/images/profile.png')}
          name="Olivia Smith"
          email="OlivaSmith@gmail.com"
          showOverlay
        />
        <SimpleLineIcons style={styles.camera} name="camera" size={36} color={theme.colors.background} />
        <Pressable style={({ pressed }) => pressed && { opacity: 0.5 }}>
          <BodyTextSmall bold style={styles.changePhoto}>
            Change Photo
          </BodyTextSmall>
        </Pressable>
        <View style={styles.inputFields}>
          <TextField label="Email Address" />
          <TextField label="User Name" />
          <TextField label="Mobile Number" />
          <DropdownPicker
            label="Edit favourite genres"
            value={genre}
            data={dummyGenre}
            onChange={(item) => setGenre(item.value as string)}
          />
        </View>
      </View>
    </SettingContainer>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    profileContainer: {
      position: 'relative'
    },
    camera: {
      position: 'absolute',
      top: 30,
      left: 32
    },
    changePhoto: {
      paddingHorizontal: 16,
      paddingVertical: 4
    },
    inputFields: {
      marginTop: 16,
      borderRadius: 10,
      paddingVertical: 16,
      paddingHorizontal: 10,
      gap: 12,
      backgroundColor: theme.colors.background
    }
  });
