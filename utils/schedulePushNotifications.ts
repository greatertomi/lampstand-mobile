import * as Notifications from 'expo-notifications';

import { logger } from './logger';

interface PushNotificationProps {
  expoPushToken: string;
  title: string;
  body: string;
  reminderTime: string;
}

export const schedulePushNotification = async ({
  title,
  body,
  reminderTime,
}: PushNotificationProps) => {
  try {
      const [hours, minutes] = reminderTime.split(':').map(Number);
      const notificationDate = new Date();
      notificationDate.setHours(hours);
      notificationDate.setMinutes(minutes);
      notificationDate.setSeconds(0);

      await Notifications.scheduleNotificationAsync({
        content: { title, body },
        trigger: {
          hour: notificationDate.getHours(),
          minute: notificationDate.getMinutes(),
          repeats: true
        }
      });
    logger.info('Push notification sent successfully');
  } catch (error) {
    logger.error('Failed to send push notification:', error);
    throw error;
  }
};
