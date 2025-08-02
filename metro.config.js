/* eslint-disable unicorn/prefer-spread, no-console */
const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(process.cwd());

if (process.env.STORYBOOK_ENABLED === 'true') {
  console.log('Including Storybook files in the bundle...');
} else {
  console.log('Excluding Storybook files from the bundle...');

  config.resolver.blockList = [].concat(config.resolver.blockList || [], /.*\.stories\.tsx?$/);
}

// Exclude Node.js-specific packages that are incompatible with React Native
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Block problematic packages that try to import Node.js modules
const problematicPackages = [/node_modules\/canvas-renderer\//, /node_modules\/jdenticon\//];

config.resolver.blockList = [].concat(config.resolver.blockList || [], problematicPackages);

module.exports = config;
