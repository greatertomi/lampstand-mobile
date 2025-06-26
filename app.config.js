const config = {
  expo: {
    name: 'lampstand Mobile',
    slug: 'lampstand-mobile',
    version: '0.1.1',
    orientation: 'portrait',
    icon: './assets/icon.jpg',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/splashscreen.png',
      resizeMode: 'cover',
      backgroundColor: '#ea4335'
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      userInterfaceStyle: 'automatic',
      bundleIdentifier: 'com.lampstand.mobile'
    },
    android: {
      package: 'com.lampstand.mobile',
      adaptiveIcon: {
        foregroundImage: './assets/icon.jpg',
        backgroundColor: '#ffffff'
      },
      userInterfaceStyle: 'automatic'
    },
    web: {
      favicon: './assets/icon.jpg'
    },
    plugins: [
      [
        'expo-image-picker',
        {
          photosPermission: 'Allow Lampstand to access your photos',
          cameraPermission: 'Allow Lampstand to access your camera.'
        }
      ],
      [
        'expo-notifications',
        {
          useNextNotificationsApi: true
        }
      ],
      ['expo-font']
    ],
    owner: 'lampstand-dev',
    extra: {
      eas: {
        projectId: 'afa06c24-b999-4e99-a9ac-c1c1b61d76e4'
      },
      storybookEnabled: process.env.STORYBOOK_ENABLED
    }
  }
};

export default () => {
  if (process.env.GOOGLE_SERVICES_JSON) {
    // For EAS Build, the value of the secret is directly used as the file content
    config.expo.android.googleServicesFile = process.env.GOOGLE_SERVICES_JSON;
  } else {
    // For local development, we'll use the local file path.
    config.expo.android.googleServicesFile = './google-services.json';
  }
  return config;
};
