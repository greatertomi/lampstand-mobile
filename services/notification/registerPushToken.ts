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

    await apiService.post(endpoints.registerNotificationToken, {
      userId,
      pushToken: token.data,
      platform: Platform.OS
    });

    logger.debug('Push token registration/update sent to backend.');
  } catch (error) {
    logger.error('Failed to register push token:', error);
  }
};
