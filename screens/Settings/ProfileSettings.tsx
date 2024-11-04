import React, { useState } from 'react';
import { SimpleLineIcons } from '@expo/vector-icons';
import useSWRMutation from 'swr/mutation';
import { Pressable, StyleSheet, View } from 'react-native';
import { mutate } from 'swr';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-root-toast';
import { SettingContainer } from './SettingContainer';
import { BodyTextSmall, ProfileCard, TextField } from '../../components';
import { Theme, useTheme } from '../../styles';
import { apiService, endpoints } from '../../api';
import { logger } from '../../utils';

const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const DEFAULT_TOAST_DURATION = 3000;

export const ProfileSettings = () => {
  const [fileTooLarge, setFileTooLarge] = useState<boolean>(false);
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const [optimisticPic, setOptimisticPic] = useState<string | null>(null);

  const { trigger: uploadImage } = useSWRMutation(endpoints.profilePicture, async (url, { arg }: { arg: FormData }) => {
    const response = await apiService.put(url, arg);
    return response.data;
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.canceled) {
      const { uri, fileName, mimeType, fileSize } = result.assets[0];
      if (fileSize && fileSize > MAX_FILE_SIZE_BYTES) {
        setFileTooLarge(true);
        setTimeout(() => setFileTooLarge(false), DEFAULT_TOAST_DURATION);
        return;
      }
      setOptimisticPic(uri);
      const formData = new FormData();
      formData.append('profilePicture', {
        uri,

        name: fileName || 'profile.jpg',
        type: mimeType || 'image/jpeg'
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);

      try {
        await uploadImage(formData);
        setOptimisticPic(null);
        await mutate(endpoints.currentUser);
      } catch (error) {
        setOptimisticPic(null);
        logger.error(error);
      }
    }
  };

  return (
    <SettingContainer title="My Profile" useButton buttonTitle="Save">
      <View style={styles.profileContainer}>
        <ProfileCard optimisticPic={optimisticPic} showOverlay={!optimisticPic} />
        {!optimisticPic && (
          <SimpleLineIcons
            onPress={pickImage}
            style={styles.camera}
            name="camera"
            size={36}
            color={theme.colors.background}
          />
        )}

        <Pressable style={({ pressed }) => pressed && { opacity: 0.5 }}>
          <BodyTextSmall bold style={styles.changePhoto}>
            Change Photo
          </BodyTextSmall>
        </Pressable>
        <View style={styles.inputFields}>
          <TextField label="Email Address" />
          <TextField label="User Name" />
          <TextField label="Mobile Number" />
        </View>
      </View>
      {fileTooLarge && (
        <Toast textColor={theme.colors.text} visible={fileTooLarge} backgroundColor={theme.colors.background}>
          Picture too large!
        </Toast>
      )}
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
