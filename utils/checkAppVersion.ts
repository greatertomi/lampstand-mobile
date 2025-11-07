import compareVersions from 'compare-versions';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

import { apiService, endpoints } from '../api';

import { logger } from './logger';

export type AppVersionData = {
  latestVersion: string;
  minSupportedVersion: string;
  storeUrl: string;
  message?: string;
};

export type VersionCheckResult = {
  showModal: boolean;
  mandatory: boolean;
  storeUrl: string;
  message?: string;
};

export const checkAppVersion = async (): Promise<VersionCheckResult | null> => {
  const currentVersion =
    Constants.nativeAppVersion ??
    Constants.expoConfig?.version ??
    '0.0.0';

  try {
    const res = await apiService.get<{ success: boolean; data: AppVersionData }>(endpoints.appVersion, {
      params: { platform: Platform.OS }
    });

    const { latestVersion, minSupportedVersion, storeUrl, message } = res.data.data;


    if (compareVersions(currentVersion, minSupportedVersion) < 0) {
      // Compulsory update
      return { showModal: true, mandatory: true, storeUrl, message };
    }

    if (compareVersions(currentVersion, latestVersion) < 0) {
      // Optional update
      return { showModal: true, mandatory: false, storeUrl, message };
    }

    return null;
  } catch (error) {
    logger.warn('Failed to check app version', error);
    return null;
  }
};
