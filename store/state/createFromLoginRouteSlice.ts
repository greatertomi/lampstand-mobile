import { StateCreator } from 'zustand';

export type FromLoginRouteState = {
  isFromLogin: boolean;
  setIsFromLogin: (value: boolean) => void;
};

export const createFromLoginRouteSlice: StateCreator<FromLoginRouteState> = (set) => ({
  isFromLogin: false,
  setIsFromLogin: (value) => set({ isFromLogin: value })
});
