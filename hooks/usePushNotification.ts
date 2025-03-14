import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';

import { logger, setLocalStorageItem } from '../utils';

export interface PushNotificationState {
  notification?: Notifications.Notification;
  expoPushToken?: Notifications.ExpoPushToken;
}

export const usePushNotification = (): PushNotificationState => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldShowAlert: true,
      shouldSetBadge: false
    })
  });

  const [expoPushToken, setExpoPushToken] = useState<Notifications.ExpoPushToken | undefined>();
  const [notification, setNotification] = useState<Notifications.Notification | undefined>();

  const notificationsListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const registerForPushNotificationsAsync = async () => {
    let token;

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        throw new Error('Failed to get push Token');
      }

      token = await Notifications.getExpoPushTokenAsync({
        projectId: '821a8048-9a7e-4cf8-ad5c-cff0c4aa0eb7'
      });

      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250]
        });
      }

      await setLocalStorageItem('expoPushToken', token.data);
      return token;
    }
    throw new Error('Must use a physical device for push notifications');
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

    notificationsListener.current = Notifications.addNotificationReceivedListener((incomingNotification) => {
      setNotification(incomingNotification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      logger.info('Response Notification response', response);
    });
    return () => {
      Notifications.removeNotificationSubscription(notificationsListener.current!);

      Notifications.removeNotificationSubscription(responseListener.current!);
    };
  }, []);
  return {
    expoPushToken,
    notification
  };
};
