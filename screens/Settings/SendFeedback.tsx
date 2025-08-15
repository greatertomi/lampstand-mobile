import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import Toast from 'react-native-root-toast';
import { SvgXml } from 'react-native-svg';
import useSWRMutation from 'swr/mutation';

import { apiService, endpoints, parseHttpError } from '../../api';
import { uploadImage } from '../../assets';
import { BodyText, BodyTextSmall, DropdownPicker, PressableItem, TextAreaField, TextField } from '../../components';
import { RootStackParamList } from '../../routes';
import { useAuthState, useNotificationState } from '../../store';
import { Theme, useTheme } from '../../styles';
import { sendSupportSchema } from '../Auth/formValidationSchema';

import { SettingContainer } from './SettingContainer';

const feedbackOptions = [
  { label: 'I Love the Reading Experience', value: 'I Love the Reading Experience' },
  { label: 'Accessibility Concern', value: 'Accessibility Concern' },
  { label: 'Improve an Existing Feature', value: 'Improve an Existing Feature' },
  { label: 'Something is confusing', value: 'Something is confusing' },
  { label: 'Other (Please describe below)', value: 'Complaint Listed in description' }
];

const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const DEFAULT_TOAST_DURATION = 3000;

type SendFeedbackValues = {
  email: string;
  title: string;
  description: string;
  image: string | string[];
};

type SendFeedbackScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SupportSuccess'>;

export const SendFeedback = () => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);
  const [isFileTooLarge, setIsFileTooLarge] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const navigation = useNavigation<SendFeedbackScreenNavigationProp>();
  const { addNotification } = useNotificationState();
  const { isAuthenticated, user } = useAuthState();

  const { trigger: uploadFeedback } = useSWRMutation(
    endpoints.sendFeedback,
    async (url, { arg }: { arg: FormData }) => {
      const response = await apiService.post(url, arg, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    }
  );

  const formik = useFormik<SendFeedbackValues>({
    initialValues: {
      email: isAuthenticated && user?.email ? user.email : '',
      title: '',
      description: '',
      image: []
    },
    validationSchema: sendSupportSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const formData = new FormData();
        formData.append('email', values.email);
        formData.append('title', values.title);
        formData.append('description', values.description);

        selectedImages.forEach((uri, index) => {
          formData.append('images', {
            uri,
            name: `feedback-image-${index}.jpg`,
            type: 'image/jpeg'
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any);
        });

        const response = await uploadFeedback(formData);
        if (response.success) {
          navigation.navigate('SupportSuccess', {
            message: 'Thank you for your suggestion',
            description: "We've received your feedback and will use it to improve your experience."
          });
        }
        formik.resetForm();
      } catch (error) {
        addNotification({
          id: Date.now().toString(),
          message: parseHttpError(error).message,
          type: 'error'
        });
      }
    }
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true
    });

    if (!result.canceled && result.assets) {
      const newImages = result.assets.map((asset) => asset.uri);
      const isOversized = result.assets.some((asset) => asset.fileSize && asset.fileSize > MAX_FILE_SIZE_BYTES);
      if (isOversized) {
        setIsFileTooLarge(true);
        setTimeout(() => setIsFileTooLarge(false), DEFAULT_TOAST_DURATION);
        return;
      }
      setSelectedImages((prev) => [...prev, ...newImages]);
    }
  };

  const removeImage = (uri: string) => {
    setSelectedImages((prev) => prev.filter((img) => img !== uri));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} style={styles.scrollView}>
      <SettingContainer
        title="Send a Feedback"
        useButton
        buttonTitle="Send Feedback"
        loading={formik.isSubmitting}
        onPress={formik.handleSubmit}
      >
        <View>
          <View style={[utils.mb_3]}>
            <DropdownPicker
              label="Type"
              data={feedbackOptions}
              dropdownStyles={{
                ...styles.dropDownStyles,
                borderColor: formik.errors.title ? theme.colors.error : theme.colors.cardBackground
              }}
              dropDownContainerStyles={{ borderColor: theme.colors.background }}
              placeholder="Choose here"
              onChange={(item) => formik.setFieldValue('title', item.value)}
              value={formik.values.title}
              error={!!formik.errors.title && formik.errors.title}
            />
          </View>
          <View style={[utils.mb_3]}>
            <TextField
              label="Email Address"
              placeholder="Enter your email"
              inputMode="email"
              autoCapitalize="none"
              style={{
                ...styles.emailContainer,
                borderColor: formik.touched.email && formik.errors.email ? theme.colors.error : theme.colors.background
              }}
              onChangeText={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              value={formik.values.email}
              error={formik.touched.email && !!formik.errors.email && formik.errors.email}
              readOnly={isAuthenticated}
            />
          </View>
          <View style={[utils.mb_3]}>
            <TextAreaField
              label="Description"
              placeholder="Describe your issue here"
              placeholderTextColor={theme.colors.text}
              style={{
                ...styles.textAreaStyles,
                borderColor:
                  formik.touched.description && formik.errors.description ? theme.colors.error : theme.colors.background
              }}
              onChangeText={formik.handleChange('description')}
              onBlur={formik.handleBlur('description')}
              value={formik.values.description}
              error={formik.touched.description && formik.errors.description}
            />
          </View>
          <View>
            <View style={[utils.flex_dir_row, utils.mb_1]}>
              <BodyText bold>Image Upload</BodyText>
              <BodyTextSmall style={[utils.ml_1]}>(Optional)</BodyTextSmall>
            </View>
            <PressableItem onPress={pickImage}>
              <View style={styles.imageContainer}>
                <BodyText>Upload screenshot</BodyText>
                <View style={styles.imageIcon}>
                  <SvgXml xml={uploadImage()} />
                </View>
              </View>
            </PressableItem>
            {selectedImages.length > 0 && (
              <View style={styles.imageGrid}>
                {selectedImages.map((uri, index) => (
                  <View key={`${uri}-${index}`} style={utils.p_relative}>
                    <Image source={{ uri }} style={styles.images} />
                    <PressableItem onPress={() => removeImage(uri)} style={styles.removeImageStyles}>
                      <MaterialIcons name="cancel" size={20} color={theme.colors.primary} />
                    </PressableItem>
                  </View>
                ))}
              </View>
            )}

            {isFileTooLarge && (
              <Toast textColor={theme.colors.text} visible={isFileTooLarge} backgroundColor={theme.colors.background}>
                Picture too large!
              </Toast>
            )}
          </View>
        </View>
      </SettingContainer>
    </ScrollView>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    scrollView: {
      backgroundColor: theme.colors.background,
      marginBottom: -30
    },
    scrollContent: {
      flexGrow: 1,
      paddingBottom: 34,
      backgroundColor: theme.colors.background
    },
    dropDownStyles: {
      backgroundColor: theme.colors.cardBackground,
      borderColor: theme.colors.cardBackground,
      marginTop: 5
    },
    textAreaStyles: {
      backgroundColor: theme.colors.cardBackground,
      minHeight: 146,
      textAlignVertical: 'top',
      marginTop: 5
    },
    imageContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.cardBackground,
      paddingHorizontal: 10,
      paddingVertical: 12,
      borderRadius: 5,
      alignItems: 'center'
    },
    imageIcon: {
      backgroundColor: theme.colors.tertiaryBackground,
      padding: 7,
      borderRadius: 20
    },
    emailContainer: {
      backgroundColor: theme.colors.cardBackground,
      borderColor: theme.colors.background
    },
    removeImageStyles: {
      position: 'absolute',
      top: -8,
      right: -8,
      backgroundColor: theme.colors.white,
      borderRadius: 12,
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center'
    },
    images: {
      width: 80,
      height: 80,
      borderRadius: 4
    },
    imageGrid: {
      marginVertical: 20,
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8
    }
  });
