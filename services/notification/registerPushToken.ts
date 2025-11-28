import { ExpoPushToken } from 'expo-notifications';
import { Platform } from 'react-native';

import { apiService, endpoints } from '../../api';
import { getLocalStorageItem, logger } from '../../utils';

type RegisterPushTokenParams = {
  userId?: string;
  expoPushToken?: ExpoPushToken | null;
};

export const registerPushToken = async ({ userId, expoPushToken }: RegisterPushTokenParams) => {
  try {
    const token = expoPushToken || (await getLocalStorageItem('expoPushToken'));

    if (!token) {
      logger.warn('No push token available to register.');
      return;
    }

    // Handle both ExpoPushToken object and string from localStorage
    const pushTokenString = typeof token === 'string' ? token : token.data;

    if (!userId) {
      logger.debug('Registering push token without userId (anonymous).');
    }
    const response = await apiService.post(endpoints.registerNotificationToken, {
      userId,
      pushToken: pushTokenString,
      platform: Platform.OS
    });

    logger.info('Push token registration response:', response.data);
    logger.debug(`Push token registration sent to backend for user: ${userId || 'anonymous'}`);
  } catch (error) {
    logger.error('Failed to register push token:', error);
  }
};
