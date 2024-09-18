import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocalStorageItem, setLocalStorageItem } from '../localStorage';
import { logger } from '../logger';

jest.mock('@react-native-async-storage/async-storage');
jest.mock('../logger');

const errorValue = 'test error';

describe('Local Storage Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getLocalStorageItem', () => {
    const testValue = 'John Doe';
    const testKey = 'user';

    it('should return parsed value when item exists', async () => {
      AsyncStorage.getItem = jest.fn().mockResolvedValue(JSON.stringify(testValue));

      const result = await getLocalStorageItem(testKey);

      expect(result).toBe(testValue);
      expect(AsyncStorage.getItem).toHaveBeenCalledWith(testKey);
      expect(logger.error).not.toHaveBeenCalled();
    });

    it('should return null when item does not exist', async () => {
      AsyncStorage.getItem = jest.fn().mockResolvedValue(null);

      const result = await getLocalStorageItem(testKey);

      expect(result).toBeNull();
      expect(AsyncStorage.getItem).toHaveBeenCalledWith(testKey);
      expect(logger.error).not.toHaveBeenCalled();
    });

    it('should return null and log error when an error occurs', async () => {
      AsyncStorage.getItem = jest.fn().mockRejectedValue(errorValue);

      const result = await getLocalStorageItem(testKey);

      expect(result).toBeNull();
      expect(AsyncStorage.getItem).toHaveBeenCalledWith(testKey);
      expect(logger.error).toHaveBeenCalledWith(errorValue);
    });
  });

  describe('setLocalStorageItem', () => {
    const testKey = 'token';
    const testToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTYyMzkwMjQyfQ';

    it('should store item successfully', async () => {
      AsyncStorage.setItem = jest.fn().mockResolvedValue(null);

      await setLocalStorageItem(testKey, testToken);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(testKey, JSON.stringify(testToken));
      expect(logger.error).not.toHaveBeenCalled();
    });

    it('should log error when an error occurs', async () => {
      const error = new Error(errorValue);
      AsyncStorage.setItem = jest.fn().mockRejectedValue(error);

      await setLocalStorageItem(testKey, testToken);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(testKey, JSON.stringify(testToken));
      expect(logger.error).toHaveBeenCalledWith(error);
    });
  });
});
