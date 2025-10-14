/* eslint-disable consistent-return */
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';

import { registerPushToken } from '../services/notification';
import { scheduleDailyNotification } from '../services/notification/scheduleDailyNotification';
import { logger, setLocalStorageItem } from '../utils';

export interface PushNotificationState {
  notification?: Notifications.Notification;
  expoPushToken?: Notifications.ExpoPushToken | null;
}

const ANDROID_NOTIFICATION_CHANNEL_ID = 'default';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldShowAlert: true,
    shouldSetBadge: true,
    shouldShowList: true,
    shouldShowBanner: true
  })
});

const isExpoGo = Constants.executionEnvironment === 'storeClient';

export const usePushNotification = (): PushNotificationState => {
  const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;

  const [expoPushToken, setExpoPushToken] = useState<Notifications.ExpoPushToken | null | undefined>();
  const [notification, setNotification] = useState<Notifications.Notification | undefined>();

  const notificationsListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);

  if (!projectId) {
    throw new Error(
      'Missing projectId configuration. Ensure that expoConfig.extra.eas.projectId or easConfig.projectId is set.'
    );
  }

  const registerForPushNotificationsAsync = useCallback(async () => {
    try {
      if (!Device.isDevice || isExpoGo) {
        logger.warn('Push notifications are not supported on simulators/emulators. Returning early.');
        return;
      }

      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      // Request permissions if not already granted
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      // If permissions are still not granted, log an error and return undefined
      if (finalStatus !== 'granted') {
        logger.warn('Failed to get push token: Permissions not granted.');
        return null;
      }

      const token = await Notifications.getExpoPushTokenAsync({
        projectId
      });

      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync(ANDROID_NOTIFICATION_CHANNEL_ID, {
          name: ANDROID_NOTIFICATION_CHANNEL_ID,
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250]
        });
      }

      await scheduleDailyNotification();

      try {
        await setLocalStorageItem('expoPushToken', token.data);
      } catch (localStorageError) {
        logger.error('Failed to save expoPushToken to local storage:', localStorageError);
      }

      return token;
    } catch (error) {
      logger.error('An unexpected error occurred during push notification registration:', error);
    }
  }, [projectId]);

  useEffect(() => {
    if (!Device.isDevice || isExpoGo) {
      logger.info('Skipping notification listeners setup - not a physical device');
      return;
    }

    const setupNotifications = async () => {
      try {
        const token = await registerForPushNotificationsAsync();
        setExpoPushToken(token);
        await registerPushToken({ expoPushToken: token });
      } catch (error) {
        logger.error('Error setting up push notifications in useEffect:', error);
        setExpoPushToken(null);
      }
    };

    setupNotifications();

    notificationsListener.current = Notifications.addNotificationReceivedListener((incomingNotification) => {
      setNotification(incomingNotification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      logger.info('Notification response received:', response);
    });

    return () => {
      if (notificationsListener.current) {
        Notifications.removeNotificationSubscription(notificationsListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, [registerForPushNotificationsAsync]);

  return {
    expoPushToken,
    notification
  };
};
