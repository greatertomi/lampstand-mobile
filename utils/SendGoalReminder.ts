import { getLocalStorageItem } from './localStorage';
import { logger } from './logger';
import { schedulePushNotification } from './pushNotifications';

export const SendGoalReminder = async (reminderTime: string): Promise<void> => {
  try {
    const storedToken = await getLocalStorageItem('expoPushToken');
    if (storedToken) {
      await schedulePushNotification(
        storedToken,
        'Reading Reminder 📚',
        'Don\'t forget about your daily goal!!',
        reminderTime
      );
    }
  } catch (error) {
    logger.error('Failed to fetch reminder time:', error);
  }
};
