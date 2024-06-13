import React from 'react';
import { MessagePopUp } from '../../components';
import { AuthContainer } from './AuthContainer';
import { resetPasswordSuccess } from '../../assets/svg';

export const AuthSuccess = () => (
  <AuthContainer showImage={false}>
    <MessagePopUp
      svg={resetPasswordSuccess}
      buttonTitle="Continue"
      message="Password reset e-mail has been sent!"
      description="A password email has been sent to your email address"
    />
  </AuthContainer>
);
