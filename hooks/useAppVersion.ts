import { compareVersions } from 'compare-versions';
import Constants from 'expo-constants';
import { useCallback } from 'react';
import { Platform } from 'react-native';
import useSWR from 'swr';

import { apiService, endpoints } from '../api';
import { AppVersionData, VersionCheckResult } from '../utils/checkAppVersion';
import { APP_VERSION_KEY } from '../utils/updateLogic';

const fetcher = async (): Promise<AppVersionData> => {
  const res = await apiService.get<{ success: boolean; data: AppVersionData }>(endpoints.appVersion, {
    params: { platform: Platform.OS }
  });
  return res.data.data;
};

export const useAppVersion = () => {
  const currentVersion = Constants.nativeAppVersion ?? Constants.expoConfig?.version ?? '0.0.0';

  const { data, error, isLoading, mutate } = useSWR(APP_VERSION_KEY, fetcher);

  const checkVersion = useCallback((): VersionCheckResult | null => {
    if (!data) return null;

    const { latestVersion, minSupportedVersion, storeUrl, message } = data;

    if (compareVersions(currentVersion, minSupportedVersion) < 0) {
      return { showModal: true, isMandatory: true, storeUrl, message };
    }

    if (compareVersions(currentVersion, latestVersion) < 0) {
      return { showModal: true, isMandatory: false, storeUrl, message };
    }

    return null;
  }, [data, currentVersion]);

  const shouldUpdate = checkVersion();

  return {
    versionData: data,
    shouldUpdate,
    isLoading,
    error,
    refetch: mutate,
    currentVersion
  };
};
