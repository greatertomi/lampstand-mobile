import * as Notifications from 'expo-notifications';

import { logger } from '../../utils';

export const scheduleDailyNotification = async () => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Good Morning!',
        body: 'Start your day with Lampstand',
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
        hour: 8,
        minute: 0,
        repeats: true
      }
    });

    logger.debug('Daily 8am notification scheduled');
  } catch (error) {
    logger.error('Failed to schedule daily notification:', error);
  }
};
