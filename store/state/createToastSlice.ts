import { StateCreator } from 'zustand';

type ToastType = {
  message: string | null;
  visible: boolean;
};

export type ToastState = {
  toast: ToastType;
  setToastMessage: (message: string | null) => void;
};

export const createToastSlice: StateCreator<ToastState> = (set) => ({
  toast: { message: null, visible: false },
  setToastMessage: (message) => {
    if (message) {
      set({ toast: { message, visible: true } });

      setTimeout(() => {
        set({ toast: { message: null, visible: false } });
      }, 3000);
    } else {
      set({ toast: { message: null, visible: false } });
    }
  }
});
