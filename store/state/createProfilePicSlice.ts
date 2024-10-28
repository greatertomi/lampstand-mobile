import { StateCreator } from 'zustand';

export type ProfilePicState = {
  optimisticPic: string | null;
  setOptimisticPic: (newPic: string | null) => void;
};

export const createProfilePicSlice: StateCreator<ProfilePicState> = (set) => ({
  optimisticPic: null,
  setOptimisticPic: (newPic) => set({ optimisticPic: newPic })
});
