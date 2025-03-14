import * as Notifications from 'expo-notifications';

import { logger } from './logger';

export const schedulePushNotification = async (
  expoPushToken: string,
  title: string,
  body: string,
  reminderTime?: string,
  delayInSeconds?: number
  // eslint-disable-next-line max-params
) => {
  try {
    if (delayInSeconds) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body
        },
        trigger: { seconds: delayInSeconds }
      });
    }
    if (reminderTime) {
      const [hours, minutes] = reminderTime.split(':').map(Number);
      const notificationDate = new Date();
      notificationDate.setHours(hours);
      notificationDate.setMinutes(minutes - 53);
      notificationDate.setSeconds(0);

      if (notificationDate.getMinutes() < 0) {
        notificationDate.setHours(notificationDate.getHours() - 1);
        notificationDate.setMinutes(notificationDate.getMinutes() + 60);
      }

      await Notifications.scheduleNotificationAsync({
        content: { title, body },
        trigger: {
          hour: notificationDate.getHours(),
          minute: notificationDate.getMinutes(),
          repeats: true
        }
      });
    }

    logger.info('Push notification sent successfully');
  } catch (error) {
    logger.error('Failed to send push notification:', error);
    throw error;
  }
};
