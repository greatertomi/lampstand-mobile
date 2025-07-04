/* eslint-disable unicorn/prefer-spread, no-console */
const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(process.cwd());

if (process.env.STORYBOOK_ENABLED === 'true') {
  console.log('Including Storybook files in the bundle...');
} else {
  console.log('Excluding Storybook files from the bundle...');

  config.resolver.blockList = [].concat(config.resolver.blockList || [], /.*\.stories\.tsx?$/);
}

module.exports = config;
