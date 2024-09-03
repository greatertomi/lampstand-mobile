import AsyncStorage from '@react-native-async-storage/async-storage';
import { logger } from './logger';

type LocalStorageItemType = 'user' | 'token';

export const getLocalStorageItem = async (key: LocalStorageItemType) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    logger.error(error);
    return null;
  }
};

export const setLocalStorageItem = async (key: LocalStorageItemType, value: string) => {
  try {
    return await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    logger.error(error);
    return null;
  }
};
