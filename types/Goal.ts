export type Goal = {
  goalInSeconds: number;
  reminderTime: string;
};

export type ReadingLog = {
  id: string;
  bookId: string;
  bookTitle: string;
  startTime: Date;
  endTime: Date;
  secondsRead: number;
};
