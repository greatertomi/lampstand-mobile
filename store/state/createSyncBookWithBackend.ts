import { StateCreator } from 'zustand';

export type SyncBookWithBackendState = {
  shouldSync: boolean;
  setShouldSync: (shouldSync: boolean) => void;
};

export const createSyncBookWithBackend: StateCreator<SyncBookWithBackendState> = (set) => ({
  shouldSync: false,
  setShouldSync: (shouldSync) => set({ shouldSync })
});
