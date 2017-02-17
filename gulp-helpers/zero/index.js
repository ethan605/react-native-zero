/**
 * Zero helpers
 */

/* eslint-disable no-console */

// Gulp modules
// const gulp = require('gulp');
// const shell = require('gulp-shell');

// Helper modules
const fs = require('fs');
// const semver = require('semver');
// const yargs = require('yargs');

// Output commands to be executed via "--dry" flag
// const DRY_RUN = !!yargs.argv.dry;

const ZERO_CONFIGS_FILE = './gulp-helpers/zero/configs.json';

function readConfigs(platform) {
  const configs = fs.readFileSync(ZERO_CONFIGS_FILE);

  const {
    moduleName,
    codepush: {
      release: codepushReleaseKey,
      staging: codepushStagingKey,
    },
    [platform]: { applicationId, bundleId, ...rest },
  } = JSON.parse(configs);

  const appId = applicationId || bundleId;
  const appIdNames = {
    android: 'Android applicationId',
    ios: 'iOS bundleId',
  };

  console.assert(
    appId != null,
    `${appIdNames[platform]} must be valid (current: ${appId})`
  );

  return {
    appId,
    codepushReleaseKey,
    codepushStagingKey,
    moduleName,
    ...rest,
  };
}

module.exports = {
  readConfigs,
  constants: {
    ZERO_CONFIGS_FILE,
  },
};

/* eslint-enable no-console */
