import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFormik } from 'formik';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import useSWRMutation from 'swr/mutation';

import { apiService, endpoints, parseHttpError } from '../../api';
import { DropdownPicker, TextAreaField, TextField } from '../../components';
import { RootStackParamList } from '../../routes';
import { useAuthState, useNotificationState } from '../../store';
import { Theme, useTheme } from '../../styles';
import { sendSupportSchema } from '../Auth/formValidationSchema';

import { SettingContainer } from './SettingContainer';

type SendComplaintValues = {
  email: string;
  title: string;
  description: string;
};

const complaintOptions = [
  { label: 'Search or Book Discovery Problem', value: 'Search or Book Discovery Problem' },
  { label: 'Accidentally Deleted a Book', value: 'Accidentally Deleted a Book' },
  { label: 'Account or Login Trouble', value: 'Account or Login Trouble' },
  { label: 'Book not Loading or Missing', value: 'Book not Loading or Missing' },
  { label: 'Other (Please describe below)', value: 'Complaint Listed in description' }
];

type SendComplaintScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SupportSuccess'>;

export const SendComplaint = () => {
  const { theme } = useTheme();
  const utils = theme.utilities;
  const styles = createStyleSheet(theme);
  const navigation = useNavigation<SendComplaintScreenNavigationProp>();
  const { addNotification } = useNotificationState();
  const { isAuthenticated, user } = useAuthState();

  const { trigger: sendUserComplaint } = useSWRMutation(
    endpoints.sendComplaint,
    async (url, { arg }: { arg: SendComplaintValues }) => {
      const response = await apiService.post(url, arg);
      return response.data;
    }
  );

  const formik = useFormik<SendComplaintValues>({
    initialValues: {
      email: isAuthenticated && user?.email ? user.email : '',
      title: '',
      description: ''
    },
    validationSchema: sendSupportSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const payload = {
          email: values.email,
          title: values.title,
          description: values.description
        };
        const response = await sendUserComplaint(payload);
        if (response.success) {
          navigation.navigate('SupportSuccess', {
            message: 'We’re Looking Into It',
            description: "We've received your complaint and will get back to you soon."
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

  return (
    <SettingContainer
      title="Send a Complaint"
      useButton
      loading={formik.isSubmitting}
      buttonTitle="Send Complaint"
      onPress={formik.handleSubmit}
    >
      <View>
        <View style={[utils.mb_5]}>
          <DropdownPicker
            label="Type"
            data={complaintOptions}
            dropdownStyles={{
              ...styles.dropdownStyles,
              borderColor: formik.errors.title ? theme.colors.error : theme.colors.cardBackground
            }}
            dropDownContainerStyles={{ borderColor: theme.colors.background }}
            placeholder="Choose here"
            onChange={(item) => {
              formik.setFieldValue('title', item.value);
            }}
            value={formik.values.title}
            error={!!formik.errors.title && formik.errors.title}
          />
        </View>
        <View style={[utils.mb_5]}>
          <TextField
            label="Email Address"
            placeholder="Enter your email"
            inputMode="email"
            autoCapitalize="none"
            style={[
              styles.emailContainer,
              formik.touched.email && formik.errors.email && { borderColor: theme.colors.error }
            ]}
            onChangeText={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            value={formik.values.email}
            error={formik.touched.email && !!formik.errors.email && formik.errors.email}
            readOnly={isAuthenticated}
          />
        </View>
        <View>
          <TextAreaField
            label="Description"
            placeholder="Describe your issue here"
            style={[
              styles.textAreaStyles,
              formik.touched.description && formik.errors.description && { borderColor: theme.colors.error }
            ]}
            onChangeText={formik.handleChange('description')}
            onBlur={formik.handleBlur('description')}
            value={formik.values.description}
            error={formik.touched.description && formik.errors.description}
          />
        </View>
      </View>
    </SettingContainer>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    dropdownStyles: {
      backgroundColor: theme.colors.cardBackground,
      borderColor: theme.colors.cardBackground,
      marginTop: 10
    },
    emailContainer: {
      backgroundColor: theme.colors.cardBackground,
      borderColor: theme.colors.background
    },
    textAreaStyles: {
      backgroundColor: theme.colors.cardBackground,
      minHeight: 146,
      textAlignVertical: 'top',
      marginTop: 10
    },
    actionLabelStyles: {
      backgroundColor: theme.colors.background,
      marginLeft: 0,
      marginTop: 3
    }
  });
