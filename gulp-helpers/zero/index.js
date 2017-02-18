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

// Clone output files & folders via "--clone" flag
const CLONE_DIR = './.cloned';
const CLONE_RUN = !!yargs.argv.clone;

const CONFIGS_FILE = './gulp-helpers/zero/configs.json';

function readConfigs(platform) {
  const configs = fs.readFileSync(CONFIGS_FILE);

  const {
    packageName,
    moduleName,
    codepush: {
      release: codepushReleaseKey,
      staging: codepushStagingKey,
    },
    [platform]: platformBased,
  } = JSON.parse(configs);

  if (platform === 'general')
    return {
      packageName,
      moduleName,
    };

  const { applicationId, bundleId, ...rest } = platformBased;

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

gulp.task('zero:backup', () => {
  gulp.src('./android/**').pipe(gulp.dest('./bak/android'));
  gulp.src('./ios/**').pipe(gulp.dest('./bak/ios'));
  gulp.src('./package.json').pipe(gulp.dest('./bak'));
  gulp.src('./gulp-helpers/codepush/configs.json').pipe(gulp.dest('./bak/gulp-helpers/codepush'));
});

gulp.task('zero:setup:cleanup', () => (
  gulp.src(CLONE_DIR).pipe(clean())
));

gulp.task('zero:setup:prepare', () => (
  gulp.src([
    './android/**',
    '!./android/**/zeroproj-release-key.keystore',
  ]).pipe(gulp.dest(`./${CLONE_DIR}/android`))
));

gulp.task('zero:setup:general', () => {
  const { packageName, moduleName } = readConfigs('general');

  gulp.src('./gulp-helpers/codepush/configs.json')
    .pipe(replace('appName', moduleName))
    .pipe(gulp.dest(`./${CLONE_DIR}/gulp-helpers/codepush`));

  return gulp.src('./package.json')
    .pipe(replace('react-native-zero', packageName))
    .pipe(replace('ZeroProj', moduleName))
    .pipe(gulp.dest(`./${CLONE_DIR}`));
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
    .pipe(gulp.dest(`./${CLONE_DIR}/android`));

  gulp.src('./android/**/build.gradle')
    .pipe(replace('ZeroProj', moduleName))
    .pipe(replace('com.zeroproj', appId))
    .pipe(replace('ZEROPROJ_RELEASE_STORE_FILE', storeFile))
    .pipe(replace('ZEROPROJ_RELEASE_STORE_PASSWORD', storePassword))
    .pipe(replace('ZEROPROJ_RELEASE_KEY_ALIAS', keyAlias))
    .pipe(replace('ZEROPROJ_RELEASE_KEY_PASSWORD', keyPassword))
    .pipe(replace('code_push_release_key', codepushReleaseKey))
    .pipe(replace('code_push_staging_key', codepushStagingKey))
    .pipe(gulp.dest(`./${CLONE_DIR}/android`));
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
    .pipe(gulp.dest(`./${CLONE_DIR}/ios/`));
});

gulp.task('zero:setup:remove-old', () => (
  gulp.src(['./android', './ios']).pipe(clean())
));

gulp.task('zero:setup:copy-new', () => (
  gulp.src(`./${CLONE_DIR}/**`).pipe(gulp.dest('.'))
));

gulp.task('zero:setup', sequence(
  CLONE_RUN ? undefined : 'zero:backup',
  'zero:setup:cleanup',
  'zero:setup:prepare',
  [
    'zero:setup:general',
    'zero:setup:android',
    'zero:setup:ios',
  ],
  CLONE_RUN ? undefined : 'zero:setup:remove-old',
  CLONE_RUN ? undefined : 'zero:setup:copy-new',
  CLONE_RUN ? undefined : 'zero:setup:cleanup',
));

/* eslint-enable no-console */
