export type ActivityStreak = {
  date: Date;
  completed: boolean;
  dayOfWeek: string;
}

export type CurrentStreak = {
  count: number;
  startDate: Date;
  lastReadDate: Date;
}
