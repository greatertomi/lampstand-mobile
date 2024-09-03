import { StateCreator } from 'zustand';

type NotificationType = {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
};

export type NotificationState = {
  notifications: NotificationType[];
  addNotification: (notification: NotificationType) => void;
  popNotification: () => void;
};

export const createNotificationSlice: StateCreator<NotificationState> = (set, get) => ({
  notifications: [],
  addNotification: (notification) => set({ notifications: [...get().notifications, notification] }),
  popNotification: () => set({ notifications: get().notifications.slice(1) })
});
