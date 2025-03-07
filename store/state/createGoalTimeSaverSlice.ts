import { StateCreator } from 'zustand';

type ReadTimeSliceType = {
  bookId: string;
  startTime: string;
  endTime: string;
};

export type ReadTimeState = {
  readingTime: ReadTimeSliceType;
  addStartTime: (startTime: string, bookId: string) => void;
  addEndTime: (endTime: string) => Promise<void>;
  resetReadingTime: () => void;
};

const defaultReadingTime = {
  bookId: '',
  startTime: '',
  endTime: ''
};

export const createReadTimeSlice: StateCreator<ReadTimeState> = (set) => ({
  readingTime: defaultReadingTime,
  addStartTime: (startTime, bookId) => set({ readingTime: { bookId, startTime, endTime: '' } }),
  addEndTime: (endTime) =>
    new Promise<void>((resolve) => {
      set((state) => ({
        readingTime: {
          ...state.readingTime,
          endTime
        }
      }));
      resolve();
    }),
  resetReadingTime: () => set({ readingTime: defaultReadingTime })
});
