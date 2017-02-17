/**
 * CodePush helpers
 */
/* eslint-disable no-console */

// Gulp modules
const gulp = require('gulp');
const shell = require('gulp-shell');

// Helper modules
const fs = require('fs');
const semver = require('semver');
const yargs = require('yargs');

// Output commands to be executed via "--dry" flag
const DRY_RUN = !!yargs.argv.dry;

const CODEPUSH_CONFIGS_FILE = './gulp-helpers/codepush/configs.json';
const CODEPUSH_RELEASE_DIR = './CodePushRelease';
const CODEPUSH_BUNDLE_FILE = {
  android: 'index.android.bundle',
  ios: 'main.jsbundle',
};
const CODEPUSH_ENTRY_FILE = {
  ios: 'index.ios.js',
  android: 'index.android.js',
};

function readConfigs() {
  const content = fs.readFileSync(CODEPUSH_CONFIGS_FILE);
  const { appName, buildNumber, deploymentName, versionName } = JSON.parse(content);

  console.assert(
    parseInt(buildNumber) > 0,
    `buildNumber must be natural number (current: ${buildNumber})`
  );

  console.assert(
    ['Staging', 'Release'].indexOf(deploymentName) !== -1,
    `deploymentName must be either "Staging" or "Release" (current: ${deploymentName})`
  );

  console.assert(
    semver.valid(versionName),
    `versionName must be a valid semver (current: ${versionName})`
  );
  
  return {
    appName,
    buildNumber: parseInt(buildNumber),
    deploymentName,
    versionName,
  };
}

function prepareCommand({ platform }) {
  const options = [
    { flag: 'assets-dest', value: CODEPUSH_RELEASE_DIR },
    { flag: 'bundle-output', value: `${CODEPUSH_RELEASE_DIR}/${CODEPUSH_BUNDLE_FILE[platform]}` },
    { flag: 'dev', value: false },
    { flag: 'entry-file', value: CODEPUSH_ENTRY_FILE[platform] },
    { flag: 'platform', value: platform },
  ];

  const command = 'react-native bundle';
  const compiledOptions = options.map(({ flag, value }) => `--${flag} ${value}`).join(' ');

  return `${command} ${compiledOptions}`;
}

function uploadCommand(configs) {
  const { appName, buildNumber, deploymentName, versionName } = configs;

  const readableVersion = `${deploymentName} ${versionName} build-${buildNumber}`;
  const description = `Universal iOS & Android update (${readableVersion})`;

  const params = [
    appName,
    CODEPUSH_RELEASE_DIR,
    `~${versionName}`,
  ];

  const options = [
    { flag: 'deploymentName', value: deploymentName },
    { flag: 'description', value: `'${description}'` },
    { flag: 'disabled', value: deploymentName === 'Release' },
  ];

  const command = 'code-push release';
  const compiledParams = params.join(' ');
  const compiledOptions = options.map(({ flag, value }) => `--${flag} ${value}`).join(' ');

  return `${command} ${compiledParams} ${compiledOptions}`;
}

function execCommands(...commands) {
  if (DRY_RUN)
    console.log(['Commands to be executed:\n', ...commands, '\n'].join('\n'));
  else
    gulp.src('.').pipe(shell(commands));
}

module.exports = {
  execCommands,
  prepareCommand,
  readConfigs,
  uploadCommand,
  constants: {
    CODEPUSH_CONFIGS_FILE,
    CODEPUSH_RELEASE_DIR,
    CODEPUSH_BUNDLE_FILE,
    CODEPUSH_ENTRY_FILE,
  },
};

/* eslint-enable no-console */
