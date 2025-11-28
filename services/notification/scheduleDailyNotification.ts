import * as Notifications from 'expo-notifications';

import { logger } from '../../utils';

const dailyNotifications = [
  { title: 'Good Morning!', body: 'Start your day with Lampstand 📖' },
  { title: 'Time to Read!', body: 'Even 5 minutes of reading today moves you forward.' },
  { title: 'New Day, New Chapter!', body: 'What will you learn today?' },
  { title: 'Feed Your Mind 🌱', body: 'Open Lampstand and grow a little wiser today.' },
  { title: 'Consistency Wins', body: 'Keep your reading streak alive!' },
  { title: 'Just a Page Away', body: 'That insight you need might be on the next page.' },
  { title: 'Morning Inspiration ✨', body: 'Start your day with a good read.' },
  { title: 'Stay Curious!', body: 'Reading expands your world — let’s go!' },
  { title: 'Unlock New Ideas 🔓', body: 'Your next big idea might be in your current book.' },
  { title: 'Quiet Moments Matter', body: 'Take a pause and read. Your mind will thank you.' },
  { title: 'Lampstand Awaits 💡', body: 'Let your inner light shine — start reading today.' },
  { title: 'Nourish Your Mind', body: 'Reading daily keeps the mind bright and sharp.' },
  { title: 'Little Steps 📚', body: 'Even one chapter today is progress.' },
  { title: 'Learn Something New', body: 'Open a book and explore new worlds.' },
  { title: 'Your Story Continues', body: 'Pick up where you left off.' },
  { title: 'Book Time!', body: 'You deserve a peaceful reading moment.' },
  { title: 'Fuel for the Mind 🔥', body: 'A few minutes of reading can spark a new thought.' },
  { title: 'Calm and Clarity 🌤', body: 'Open Lampstand, take a breath, and read.' },
  { title: 'Wisdom Awaits', body: 'Today’s a great day to read something inspiring.' },
  { title: 'Stay Inspired 💫', body: 'Open Lampstand and light up your thoughts.' }
];

export const scheduleDailyNotification = async () => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    const randomNotification = dailyNotifications[Math.floor(Math.random() * dailyNotifications.length)];

    await Notifications.scheduleNotificationAsync({
      content: {
        title: randomNotification.title,
        body: randomNotification.body,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: 8,
        minute: 0
      }
    });

    logger.debug('Daily 8am notification scheduled');
  } catch (error) {
    logger.error('Failed to schedule daily notification:', error);
  }
};
