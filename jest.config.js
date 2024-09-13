module.exports = {
  setupFilesAfterEnv: ['./jest-setup/jest.setup.ts'], // or './setupTests.js',
  preset: 'jest-expo',
  transformIgnorePatterns: [
    // eslint-disable-next-line max-len
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg)'
  ]
  // other configurations
};
