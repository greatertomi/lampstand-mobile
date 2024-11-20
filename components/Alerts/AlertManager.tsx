import { useNotification } from '../../hooks';

import { Alert } from './Alert';

export const AlertManager = () => {
  const { currentNotification, dismiss } = useNotification();

  if (!currentNotification) return null;

  return <Alert message={currentNotification.message} variant={currentNotification.type} onDismiss={dismiss} />;
};
