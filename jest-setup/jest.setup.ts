import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('expo-notifications', () => ({
  setNotificationHandler: jest.fn(),
  scheduleNotificationAsync: jest.fn(),
  getExpoPushTokenAsync: jest.fn(() => Promise.resolve('mock-token')),
  addNotificationReceivedListener: jest.fn(),
  addNotificationResponseReceivedListener: jest.fn()
}));
