import { StateCreator } from 'zustand';

import { ReadingLogLocation } from '../../screens/Library/types';

type ReadTimeSliceType = {
  bookId: string;
  startTime: string;
  endTime: string;
  startLocation: ReadingLogLocation | null;
  endLocation: ReadingLogLocation | null;
};

export type ReadTimeState = {
  readingTime: ReadTimeSliceType;
  addStartTime: (startTime: string, bookId: string, startLocation: ReadingLogLocation) => void;
  addEndTime: (endTime: string, endLocation: ReadingLogLocation) => Promise<void>;
  resetReadingTime: () => void;
};

const defaultReadingTime = {
  bookId: '',
  startTime: '',
  endTime: '',
  startLocation: null,
  endLocation: null
};

export const createReadTimeSlice: StateCreator<ReadTimeState> = (set) => ({
  readingTime: defaultReadingTime,
  addStartTime: (startTime, bookId, startLocation) => {
    set({
      readingTime: {
        ...defaultReadingTime,
        bookId,
        startTime,
        startLocation
      }
    });
  },
  addEndTime: (endTime, endLocation) =>
    new Promise<void>((resolve) => {
      set((state) => ({
        readingTime: {
          ...state.readingTime,
          endTime,
          endLocation
        }
      }));
      resolve();
    }),
  resetReadingTime: () => set({ readingTime: defaultReadingTime })
});
