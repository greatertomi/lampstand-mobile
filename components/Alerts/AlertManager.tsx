import { Alert } from './Alert';
import { useNotification } from '../../hooks';

export const AlertManager = () => {
  const { currentNotification, dismiss } = useNotification();

  if (!currentNotification) return null;

  return <Alert message={currentNotification.message} variant={currentNotification.type} onDismiss={dismiss} />;
};
