export default ({ config }) => ({
  ...config,
  extra: {
    storybookEnabled: process.env.STORYBOOK_ENABLED
  },
  plugins: ['expo-font']
});
