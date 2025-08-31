import React from 'react';

import { resetPasswordSuccess } from '../../assets';
import { MessagePopUp } from '../../components';

import { AuthContainer } from './AuthContainer';

export const AuthSuccess = () => (
  <AuthContainer>
    <MessagePopUp
      svg={resetPasswordSuccess}
      buttonTitle="Continue"
      message="Password reset e-mail has been sent!"
      description="A password email has been sent to your email address"
    />
  </AuthContainer>
);
