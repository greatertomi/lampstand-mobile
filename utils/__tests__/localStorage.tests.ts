import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocalStorageItem, setLocalStorageItem } from '../localStorage';
import { logger } from '../logger';

jest.mock('@react-native-async-storage/async-storage');
jest.mock('../logger');

type TestBlock = {
  description: string;
  test: () => Promise<void>;
};

const USER = 'user';
const TOKEN = 'token';
const testValue = 'John Doe';
const testToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTYyMzkwMjQyfQ';
const errorValue = 'test error';

const getLocalStorageItemTests: TestBlock[] = [
  {
    description: 'should return parsed value when item exists',
    test: async () => {
      AsyncStorage.getItem = jest.fn().mockResolvedValue(JSON.stringify(testValue));

      const result = await getLocalStorageItem(USER);

      expect(result).toBe(testValue);
      expect(AsyncStorage.getItem).toHaveBeenCalledWith(USER);
      expect(logger.error).not.toHaveBeenCalled();
    }
  },
  {
    description: 'should return null when item does not exist',
    test: async () => {
      AsyncStorage.getItem = jest.fn().mockResolvedValue(null);

      const result = await getLocalStorageItem(USER);

      expect(result).toBeNull();
      expect(AsyncStorage.getItem).toHaveBeenCalledWith(USER);
      expect(logger.error).not.toHaveBeenCalled();
    }
  },
  {
    description: 'should return null and log error when an error occurs',
    test: async () => {
      AsyncStorage.getItem = jest.fn().mockRejectedValue(errorValue);

      const result = await getLocalStorageItem(USER);

      expect(result).toBeNull();
      expect(AsyncStorage.getItem).toHaveBeenCalledWith(USER);
      expect(logger.error).toHaveBeenCalledWith(errorValue);
    }
  }
];

const setLocalStorageItemTests: TestBlock[] = [
  {
    description: 'should store item successfully',
    test: async () => {
      AsyncStorage.setItem = jest.fn().mockResolvedValue(null);

      await setLocalStorageItem(TOKEN, testToken);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(TOKEN, JSON.stringify(testToken));
      expect(logger.error).not.toHaveBeenCalled();
    }
  },
  {
    description: 'should log error when an error occurs',
    test: async () => {
      const error = new Error(errorValue);
      AsyncStorage.setItem = jest.fn().mockRejectedValue(error);

      await setLocalStorageItem(TOKEN, testToken);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(TOKEN, JSON.stringify(testToken));
      expect(logger.error).toHaveBeenCalledWith(error);
    }
  }
];

describe('Local Storage Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getLocalStorageItem', () => {
    getLocalStorageItemTests.forEach(({ description, test }) => {
      it(description, test);
    });
  });

  describe('setLocalStorageItem', () => {
    setLocalStorageItemTests.forEach(({ description, test }) => {
      it(description, test);
    });
  });
});
