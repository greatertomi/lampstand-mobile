const config = {
  expo: {
    name: 'Lampstand',
    slug: 'lampstand-mobile',
    version: '1.0.5',
    scheme: 'com.lampstand.mobile',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/splashscreen.png',
      resizeMode: 'cover',
      backgroundColor: '#ea4335'
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: false,
      userInterfaceStyle: 'automatic',
      bundleIdentifier: 'com.lampstand.mobile',
      associatedDomains: ['applinks:lampstand.io'],
      usesAppleSignIn: true,
      entitlements: {
        'com.apple.developer.applesignin': ['Default']
      },
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
        UISupportsDocumentBrowser: true,
        LSSupportsOpeningDocumentsInPlace: true,
        CFBundleDocumentTypes: [
          {
            CFBundleTypeName: 'EPUB Document',
            CFBundleTypeRole: 'Editor',
            LSHandlerRank: 'Owner',
            LSItemContentTypes: ['org.idpf.epub-container'],
            CFBundleTypeIconFiles: [],
            CFBundleTypeExtensions: ['epub']
          }
        ],
        UTExportedTypeDeclarations: [
          {
            UTTypeIdentifier: 'org.idpf.epub-container',
            UTTypeReferenceURL: 'http://www.idpf.org/2007/opf',
            UTTypeDescription: 'Electronic Publication (EPUB)',
            UTTypeConformsTo: ['public.data', 'public.composite-content'],
            UTTypeTagSpecification: {
              'public.filename-extension': ['epub'],
              'public.mime-type': ['application/epub+zip']
            }
          }
        ],
        CFBundleURLTypes: [
          {
            CFBundleURLName: 'com.lampstand.mobile.epub',
            CFBundleURLRole: 'Editor',
            CFBundleURLSchemes: ['lampstand-epub']
          }
        ]
      }
    },
    android: {
      package: 'com.lampstand.mobile',
      adaptiveIcon: {
        foregroundImage: './assets/icon.png',
        backgroundColor: '#ffffff'
      },
      userInterfaceStyle: 'automatic',
      intentFilters: [
        {
          action: 'VIEW',
          autoVerify: true,
          data: [
            {
              scheme: 'file',
              mimeType: 'application/epub+zip'
            },
            {
              scheme: 'content',
              mimeType: 'application/epub+zip'
            },
            {
              scheme: 'file',
              pathPattern: '.*\\.epub'
            },
            {
              scheme: 'content',
              pathPattern: '.*\\.epub'
            }
          ],
          category: ['BROWSABLE', 'DEFAULT']
        }
      ]
    },
    web: {
      favicon: './assets/icon.png'
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
      ['expo-font'],
      ['expo-localization'],
      ['expo-web-browser'],
      ['expo-apple-authentication'],
      ['expo-sqlite']
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
