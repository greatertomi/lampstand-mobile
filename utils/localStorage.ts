import AsyncStorage from '@react-native-async-storage/async-storage';

import { logger } from './logger';

type LocalStorageItemType =
  | 'user'
  | 'token'
  | 'passwordToken'
  | 'expoPushToken'
  | 'themeMode'
  | 'readerState'
  | 'libraryOrientation'
  | string;

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

export const removeLocalStorageItem = async (key: LocalStorageItemType) => {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (error) {
    logger.error(error);
    return null;
  }
};

export const multiRemoveLocalStorageItem = async (keys: LocalStorageItemType[]) => {
  try {
    return await AsyncStorage.multiRemove(keys);
  } catch (error) {
    logger.error(error);
    return null;
  }
};
