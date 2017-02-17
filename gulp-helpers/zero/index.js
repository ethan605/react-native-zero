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
const NAMES_MAPPER_FILE = './gulp-helpers/zero/names_mapper.json';

function readConfigs(platform) {
  const configs = fs.readFileSync(ZERO_CONFIGS_FILE);

  const {
    packageName,
    moduleName,
    codepush,
    [platform]: { applicationId, bundleId },
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
    packageName,
    moduleName,
    codepush,
    appId,
  };
}

function readNamesMapper(platform) {
  const namesMapper = fs.readFileSync(NAMES_MAPPER_FILE);
  const {
    [platform]: {
      fileContents = [],
      fileNames = [],
    },
  } = JSON.parse(namesMapper);

  return {
    fileContents,
    fileNames,
  };
}

module.exports = {
  readConfigs,
  readNamesMapper,
  constants: {
    ZERO_CONFIGS_FILE,
    NAMES_MAPPER_FILE,
  },
};

/* eslint-enable no-console */
