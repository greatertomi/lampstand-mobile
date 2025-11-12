import { Linking } from 'react-native';

/**
 * The default message text used for update banners and screens.
 */
export const APP_VERSION_KEY = 'app-version';

/**
 * The default message text used for update banners and screens.
 */
export const DEFAULT_UPDATE_MESSAGE =
  'A brand new version of the Lampstand app is available in the App Store. ' +
  'Please update your use all of our amazing features';

/**
 * A reusable function to open the app store URL.
 */
export const openStoreUrl = (storeUrl: string) => {
  // handling the Promise returned by openURL.
  void Linking.openURL(storeUrl);
};
