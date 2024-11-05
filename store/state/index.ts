/* eslint-disable indent */
import { create } from 'zustand';
import { createAuthSlice, AuthState } from './createAuthSlice';
import { createNotificationSlice, NotificationState } from './createNotificationSlice';
import { createToastSlice, ToastState } from './createToastSlice';

type AppState = AuthState & NotificationState & ToastState;

const useAppState = create<AppState>((...a) => ({
  ...createAuthSlice(...a),
  ...createNotificationSlice(...a),
  ...createToastSlice(...a)
}));

const createSelector =
  <T extends object>() =>
  () =>
    useAppState((state): T => {
      const keys = Object.keys(state) as Array<keyof T>;
      const result = {} as T;
      keys.forEach((key) => {
        if (key in state) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (result as any)[key] = state[key as keyof AppState];
        }
      });
      return result;
    });

export const useAuthState = createSelector<AuthState>();
export const useNotificationState = createSelector<NotificationState>();
export const useToastState = createSelector<ToastState>();
