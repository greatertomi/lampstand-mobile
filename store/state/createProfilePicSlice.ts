import { StateCreator } from 'zustand';

export type ProfilePicState = {
  pic: string | null;
  setInitialPic: (profilePic: string) => void;
  setOptimisticPic: (newPic: string) => void;
  resetPic: (profilePic: string) => void;
};

export const createProfilePicSlice: StateCreator<ProfilePicState> = (set) => ({
  pic: null,
  setInitialPic: (profilePic) => set({ pic: profilePic }),
  setOptimisticPic: (newPic) => set({ pic: newPic }),
  resetPic: (profilePic) => set({ pic: profilePic })
});
