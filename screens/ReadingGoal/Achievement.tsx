import React from 'react';

import { achievement } from '../../assets/svg';
import { MessagePopUp } from '../../components';
import { AuthContainer } from '../Auth';

export const Achievement = () => (
  <AuthContainer showImage={false}>
    <MessagePopUp
      svg={achievement}
      buttonTitle="Continue"
      message="Congratulations"
      description="You have successfully completed your 15 mins goal for today."
    />
  </AuthContainer>
);
