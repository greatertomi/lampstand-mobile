import React from 'react';
import Toast from 'react-native-root-toast';

import { useToastState } from '../../store';
import { useTheme } from '../../styles';

export const DefaultToast = () => {
  const { toast } = useToastState();
  const { theme } = useTheme();

  if (!toast.visible) return null;

  return (
    <Toast textColor={theme.colors.text} visible={toast.visible} backgroundColor={theme.colors.background}>
      {toast.message}
    </Toast>
  );
};
