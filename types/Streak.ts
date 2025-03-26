export type activityStreak = {
  date: Date;
  completed: boolean;
  dayOfWeek: string;
}

export type currentStreak = {
  count: number;
  startDate: Date;
  lastReadDate: Date;
}
