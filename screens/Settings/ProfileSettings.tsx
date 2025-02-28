import { SimpleLineIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useFormik } from 'formik';
import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-root-toast';
import { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';

import { apiService, endpoints, parseHttpError } from '../../api';
import { BodyTextSmall, ProfileCard, TextField } from '../../components';
import { useAuthState, useNotificationState } from '../../store';
import { Theme, useTheme } from '../../styles';
import { logger } from '../../utils';
import { editProfileSchema } from '../Auth/formValidationSchema';

import { SettingContainer } from './SettingContainer';

const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const DEFAULT_TOAST_DURATION = 3000;

type UserDetailsType = {
  fullName?: string;
  phoneNumber?: string | null;
};

export const ProfileSettings = () => {
  const { user } = useAuthState();
  const [isFileTooLarge, setIsFileTooLarge] = useState<boolean>(false);
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const [optimisticPic, setOptimisticPic] = useState<string | null>(null);
  const userDetails = {
    fullName: user?.fullName,
    phoneNumber: user?.phoneNumber
  };
  const { addNotification } = useNotificationState();

  const { trigger: uploadImage } = useSWRMutation(endpoints.profilePicture, async (url, { arg }: { arg: FormData }) => {
    const response = await apiService.put(url, arg);
    return response.data;
  });

  const { trigger: updateUserDetails } = useSWRMutation(
    endpoints.editUserProfile,
    async (url, { arg }: { arg: UserDetailsType }) => {
      const response = await apiService.put(url, arg);
      await mutate(endpoints.currentUser);
      return response.data;
    }
  );

  const formik = useFormik<UserDetailsType>({
    initialValues: userDetails,
    validationSchema: editProfileSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const response = await updateUserDetails(values);
        addNotification({
          id: Date.now().toString(),
          message: response.message,
          type: 'success'
        });
      } catch (error) {
        addNotification({
          id: Date.now().toString(),
          message: parseHttpError(error).message,
          type: 'error'
        });
        logger.error(error);
      }
    }
  });

  const hasChanges = useMemo(
    () => formik.values.fullName !== user?.fullName || formik.values.phoneNumber !== user?.phoneNumber,
    [formik.values, user?.fullName, user?.phoneNumber]
  );

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
        setIsFileTooLarge(true);
        setTimeout(() => setIsFileTooLarge(false), DEFAULT_TOAST_DURATION);
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
    <SettingContainer
      title="My Profile"
      useButton={hasChanges}
      buttonTitle="Save changes"
      onPress={() => formik.handleSubmit()}
    >
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

        <BodyTextSmall bold style={styles.changePhoto}>
          Change Photo
        </BodyTextSmall>
        <View style={styles.inputFields}>
          <TextField label="Email Address" value={user?.email} readOnly />
          <TextField
            label="Full Name"
            value={formik.values.fullName}
            onChangeText={formik.handleChange('fullName')}
            error={formik.touched.fullName && formik.errors.fullName && formik.errors.fullName}
          />
          <TextField
            label="Phone Number"
            value={formik.values.phoneNumber || ''}
            onChangeText={formik.handleChange('phoneNumber')}
            error={formik.touched.phoneNumber && !!formik.errors.phoneNumber && formik.errors.phoneNumber}
          />
        </View>
      </View>
      {isFileTooLarge && (
        <Toast textColor={theme.colors.text} visible={isFileTooLarge} backgroundColor={theme.colors.background}>
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
      top: 36,
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
      backgroundColor: theme.colors.cardBackground
    }
  });
