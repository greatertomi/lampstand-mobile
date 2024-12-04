import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { BodyText, PressableItem, NotificationList } from '../../components';
import { useAuthState } from '../../store';
import { Theme, useTheme, utilities } from '../../styles';

import { SettingContainer } from './SettingContainer';

export const Notification = () => {
  const { theme } = useTheme();
  const styles = createStyleSheet(theme);
  const { isAuthenticated } = useAuthState();

  const initialNotifications = [
    { name: 'Suspend notifications', value: true, type: 'push' },
    ...(isAuthenticated ? [{ name: 'Posts, Comments', value: true, type: 'push' }] : []),
    ...(isAuthenticated ? [{ name: 'Messages', value: true, type: 'push' }] : []),
    { name: 'Device Settings', value: true, type: 'sound' },
    ...(isAuthenticated ? [{ name: 'Calls and Messages', value: false, type: 'sound' }] : []),
    { name: 'Vibrations', value: false, type: 'sound' }
  ];

  const [notifications, setNotifications] = useState(initialNotifications);

  const pushNotifications = notifications.filter((notification) => notification.type === 'push');
  const soundsAndVibration = notifications.filter((notification) => notification.type === 'sound');

  const handleNotificationChange = (name: string, value: boolean) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => (notification.name === name ? { ...notification, value } : notification))
    );
  };

  return (
    <SettingContainer title="Notifications" buttonTitle="Save">
      <View style={utilities.gap_3}>
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
        <PressableItem>
          <View style={styles.reset}>
            <BodyText variant="error">Reset Notification Settings</BodyText>
          </View>
        </PressableItem>
      </View>
    </SettingContainer>
  );
};

const createStyleSheet = (theme: Theme) =>
  StyleSheet.create({
    reset: {
      backgroundColor: theme.colors.cardBackground,
      borderRadius: 10,
      padding: 16
    }
  });
