import { StateCreator } from 'zustand';

type ReadTimeSliceType = {
  bookId: string;
  startTime: string;
  endTime: string;
};

export type ReadTimeState = {
  goal: ReadTimeSliceType[];
  addStartTime: (startTime: string, bookId: string) => void;
  addEndTime: (endTime: string, bookId: string) => Promise<void>;
  removeGoal: () => void;
};

export const createReadTimeSlice: StateCreator<ReadTimeState> = (set, get) => ({
  goal: [],
  addStartTime: (startTime, bookId) =>
    set((state) => ({
      goal: [...state.goal, { bookId, startTime, endTime: '' }]
    })),
  addEndTime: (bookId, endTime) => new Promise<void>((resolve) => {
    set((state) => ({
      goal: state.goal.map((goal) => (goal.bookId === bookId && goal.startTime ? { ...goal, endTime } : goal))
    }));
    resolve();
  }),
  removeGoal: () => set({ goal: get().goal.slice(1) })
});
