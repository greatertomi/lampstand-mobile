import { compareVersions } from 'compare-versions';
import * as Application from 'expo-application';
import { useEffect } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import useSWRMutation from 'swr/mutation';

import { apiService, endpoints } from '../api';
import { logger } from '../utils';

type PlatformType = 'ios' | 'android' | 'windows' | 'macos' | 'web';

export const useCheckAppVersion = (platform: PlatformType = Platform.OS as PlatformType) => {
  const { trigger: checkVersion } = useSWRMutation(
    endpoints.checkAppVersion,
    async (url, { arg }: { arg: { platform: string } }) => {
      const response = await apiService.get(url, { params: arg });
      return response.data;
    }
  );

  useEffect(() => {
    const performCheck = async () => {
      try {
        const currentVersion = Application.nativeApplicationVersion || '1.0.0';

        const data = await checkVersion({ platform });

        if (!data) return;

        const { latestVersion, minSupportedVersion, storeUrl } = data;

        if (!latestVersion || !minSupportedVersion || !storeUrl) return;

        if (compareVersions(currentVersion, minSupportedVersion) < 0) {
          Alert.alert(
            'Update Required',
            'A new version of this app is required to continue.',
            [
              {
                text: 'Update Now',
                onPress: () => {
                  Linking.openURL(storeUrl).catch((err) => logger.error('Failed to open store URL:', err));
                }
              }
            ],
            { cancelable: false }
          );
          return;
        }

        if (compareVersions(currentVersion, latestVersion) < 0) {
          Alert.alert('Update Available', 'A new version of this app is available. Would you like to update?', [
            { text: 'Later', style: 'cancel' },
            {
              text: 'Update',
              onPress: () => {
                Linking.openURL(storeUrl).catch((err) => logger.error('Failed to open store URL:', err));
              }
            }
          ]);
        }
      } catch (error) {
        logger.warn('Version check failed:', error);
      }
    };

    performCheck();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [platform]);
};
