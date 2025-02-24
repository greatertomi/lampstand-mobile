import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { ConfirmationDialog } from '../../components';
import { ScreenNavigation } from '../../routes';
import { useAuthState } from '../../store';
import { multiRemoveLocalStorageItem } from '../../utils';

type LogOutModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

export const LogOutModal = ({ isVisible, onClose }: LogOutModalProps) => {
  const { user, setToken, setUser, setIsAuthenticated, isAuthenticated } = useAuthState();
  const navigation = useNavigation<ScreenNavigation<'ProfileSettings' | 'Login'>>();

  const handleLogout = async () => {
    setIsAuthenticated(!isAuthenticated);
    setToken(null);
    setUser(null);
    await multiRemoveLocalStorageItem(['token', 'user']);
    onClose();
    navigation.navigate('MyBooks', { fromLogin: false });
  };

  return (
    <ConfirmationDialog
      isVisible={isVisible}
      onClose={onClose}
      onOkay={handleLogout}
      okayButtonText="Log out"
      title="Log Out"
      description={`You are signed in as ${user?.fullName}`}
    />
  );
};
