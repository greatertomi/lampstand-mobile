import React from 'react';

import { achievement } from '../../assets';
import { MessagePopUp } from '../../components';
import { AuthContainer } from '../Auth';

export const Achievement = () => (
  <AuthContainer>
    <MessagePopUp
      svg={achievement}
      buttonTitle="Continue"
      message="Congratulations"
      description="You have successfully completed your 15 mins goal for today."
    />
  </AuthContainer>
);
