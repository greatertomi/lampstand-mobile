import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { updatePasswordSuccess } from '../../assets';
import { MessagePopUp } from '../../components';
import { ScreenNavigation } from '../../routes';

import { AuthContainer } from './AuthContainer';

export const OTPSuccess = () => {
  const navigation = useNavigation<ScreenNavigation<'SetPassword'>>();

  return (
    <AuthContainer>
      <MessagePopUp
        svg={updatePasswordSuccess}
        buttonTitle="Login"
        message="Password Changed!"
        description="Your password has been successfully changed. Your account is now secured with a new password"
        descriptionVariant="tertiary"
        onPress={() => navigation.navigate('Login')}
      />
    </AuthContainer>
  );
};
