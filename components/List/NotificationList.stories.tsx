import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';
import { NotificationList, NotificationListProps } from './NotificationList';

const initialNotifications = [
  { name: 'Suspend notifications', value: true, type: 'push' },
  { name: 'Posts , Comments', value: false, type: 'push' },
  { name: 'Messages', value: true, type: 'push' }
];

const Template: StoryFn<NotificationListProps> = (args) => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleValueChange = (name: string, value: boolean) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => (notification.name === name ? { ...notification, value } : notification))
    );
  };

  return <NotificationList {...args} notifications={notifications} onValueChange={handleValueChange} />;
};

export default {
  title: 'NotificationList',
  component: NotificationList
};

export const notificationList = Template.bind({});
notificationList.args = {
  title: 'Push Notifications'
};
