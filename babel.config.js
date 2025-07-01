module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['module:react-native-dotenv', 'react-native-reanimated/plugin'],
    overrides: [
      {
        test: './metro.config.js',
        sourceType: 'script'
      }
    ]
  };
};
