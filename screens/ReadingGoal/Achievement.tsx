import React from 'react';
import { AuthContainer } from '../Auth';
import { MessagePopUp } from '../../components';
import { achievement } from '../../assets/svg';

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
