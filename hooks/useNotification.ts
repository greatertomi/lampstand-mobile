import { useEffect, useState } from 'react';
import { useNotificationState } from '../store';

type Notification = {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
};

export const useNotification = () => {
  const { notifications, popNotification } = useNotificationState();

  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);

  useEffect(() => {
    if (notifications.length > 0) {
      setCurrentNotification(notifications[0]);
      const timer = setTimeout(() => {
        popNotification();
      }, 3000);

      return () => clearTimeout(timer);
    }

    setCurrentNotification(null);
    return () => {};
  }, [notifications, popNotification]);

  return { currentNotification, dismiss: popNotification };
};
