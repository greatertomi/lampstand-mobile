import React, { useState } from 'react';
import { View } from 'react-native';
import { SettingContainer } from './SettingContainer';
import { NotificationList } from '../../components';
import { utilities } from '../../styles';

const initialNotifications = [
  { name: 'Suspend notifications', value: true },
  { name: 'Posts , Comments', value: true },
  { name: 'Messages', value: true },
  { name: 'Device Settings', value: true },
  { name: 'Calls and Messages', value: false },
  { name: 'Vibrations', value: false }
];

export const Notification = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const pushNotifications = notifications.slice(0, 3);
  const soundsAndVibration = notifications.slice(3);

  const handleNotificationChange = (name: string, value: boolean) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => (notification.name === name ? { ...notification, value } : notification))
    );
  };

  return (
    <SettingContainer title="Notifications" useButton buttonTitle="Save">
      <View style={utilities.gap_2}>
        <NotificationList
          title="Push Notification"
          notifications={pushNotifications}
          onValueChange={handleNotificationChange}
        />
        <NotificationList
          title="Sound and Vibration"
          notifications={soundsAndVibration}
          onValueChange={handleNotificationChange}
        />
      </View>
    </SettingContainer>
  );
};
