import { StateCreator } from 'zustand';

import { getLocalStorageItem, setLocalStorageItem } from '../../utils';

export type LibraryOrientationState = {
  isVertical: boolean;
  setLibraryOrientation: (value: boolean) => Promise<void>;
  loadLibraryOrientation: () => Promise<void>;
};

export const createLibraryOrientationSlice: StateCreator<LibraryOrientationState> = (set) => ({
  isVertical: false,
  setLibraryOrientation: async (value) => {
    set({ isVertical: value });
    await setLocalStorageItem('libraryOrientation', value.toString());
  },
  loadLibraryOrientation: async () => {
    const storedPosition = await getLocalStorageItem('libraryOrientation');
    set({ isVertical: storedPosition === 'true' });
  }
});
