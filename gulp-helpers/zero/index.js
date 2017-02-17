/**
 * Zero helpers
 */

/* eslint-disable no-console */

// Gulp modules
import gulp from 'gulp';
import clean from 'gulp-clean';
// import debug from 'gulp-debug';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import sequence from 'gulp-sequence';

// Helper modules
import fs from 'fs';
// import semver from 'semver';
import yargs from 'yargs';

// Output commands to be executed via "--clone" flag
const CLONE_RUN = !!yargs.argv.clone;

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

gulp.task('zero:setup:clean', () => (
  gulp.src(['android.clone', 'ios.clone']).pipe(clean())
));

gulp.task('zero:setup:prepare', () => (
  gulp.src('./android/**').pipe(gulp.dest('./android.clone'))
));

gulp.task('zero:setup:general', () => {
});

gulp.task('zero:setup:android', () => {
  const {
    appId,
    codepushReleaseKey,
    codepushStagingKey,
    moduleName,
    keyStoreFileName,
    signingConfigs: {
      storeFile,
      storePassword,
      keyAlias,
      keyPassword,
    },
  } = readConfigs('android');

  gulp.src('./android/**/zeroproj-release-key.keystore')
    .pipe(rename((path => path.basename = keyStoreFileName)))
    .pipe(gulp.dest('./android.clone'));

  gulp.src('./android/**/build.gradle')
    .pipe(replace('ZeroProj', moduleName))
    .pipe(replace('com.zeroproj', appId))
    .pipe(replace('ZEROPROJ_RELEASE_STORE_FILE', storeFile))
    .pipe(replace('ZEROPROJ_RELEASE_STORE_PASSWORD', storePassword))
    .pipe(replace('ZEROPROJ_RELEASE_KEY_ALIAS', keyAlias))
    .pipe(replace('ZEROPROJ_RELEASE_KEY_PASSWORD', keyPassword))
    .pipe(replace('code_push_release_key', codepushReleaseKey))
    .pipe(replace('code_push_staging_key', codepushStagingKey))
    .pipe(gulp.dest('./android.clone'));
});

gulp.task('zero:setup:ios', () => {
  const {
    appId,
    codepushReleaseKey,
    codepushStagingKey,
    moduleName,
  } = readConfigs('ios');
  const moduleNameReplacement = ['ZeroProj', moduleName];

  gulp.src('./ios/**')
    .pipe(replace(...moduleNameReplacement))
    .pipe(replace('com.zeroproj', appId))
    .pipe(replace('code_push_release_key', codepushReleaseKey))
    .pipe(replace('code_push_staging_key', codepushStagingKey))
    .pipe(rename(path => {
      path.dirname = path.dirname.replace(...moduleNameReplacement);
      path.basename = path.basename.replace(...moduleNameReplacement);
    }))
    .pipe(gulp.dest('./ios.clone'));
});

gulp.task('zero:setup', sequence(
  'zero:setup:clean',
  'zero:setup:prepare',
  [
    'zero:setup:android',
    'zero:setup:ios',
  ]
));

/* eslint-enable no-console */
