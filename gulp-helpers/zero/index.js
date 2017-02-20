/**
 * Zero helpers
 */

/* eslint-disable no-console */

// Gulp modules
import gulp from 'gulp';
import clean from 'gulp-clean';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import sequence from 'gulp-sequence';
import shell from 'gulp-shell';

// Helper modules
import fs from 'fs';
// import semver from 'semver';
import yargs from 'yargs';

// Output commands to be executed via "--dry" flag
const DRY_RUN = !!yargs.argv.dry;

// Cloned output files
const CLONE_DIR = './__cloned__';

const CONFIGS_FILE = './gulp-helpers/zero/configs.json';

function readConfigs(platform) {
  const configs = fs.readFileSync(CONFIGS_FILE);

  const {
    packageName,
    moduleName,
    gitRemoteUrl,
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
      gitRemoteUrl,
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

function execCommands(...commands) {
  if (DRY_RUN)
    console.log(['Commands to be executed:\n', ...commands, '\n'].join('\n'));
  else
    gulp.src('.').pipe(shell(commands));
}

gulp.task('zero:backup', () => {
  gulp.src(['./package.json', './index.*.js']).pipe(gulp.dest('./bak'));
  gulp.src('./android/**').pipe(gulp.dest('./bak/android'));
  gulp.src('./app/**/*.js').pipe(gulp.dest('./bak/app'));
  gulp.src('./ios/**').pipe(gulp.dest('./bak/ios'));
  gulp.src('./gulp-helpers/codepush/configs.json').pipe(gulp.dest('./bak/gulp-helpers/codepush'));
});

gulp.task('zero:setup:cleanup', () => (
  gulp.src(CLONE_DIR).pipe(clean())
));

gulp.task('zero:setup:general', () => {
  const { packageName, moduleName } = readConfigs('general');

  gulp.src('./gulp-helpers/codepush/configs.json')
    .pipe(replace('ZeroProj', moduleName))
    .pipe(gulp.dest(`${CLONE_DIR}/gulp-helpers/codepush`));

  gulp.src('./package.json')
    .pipe(replace('react-native-zero', packageName))
    .pipe(replace('ZeroProj', moduleName))
    .pipe(gulp.dest(CLONE_DIR));
});

gulp.task('zero:setup:android', () => {
  const {
    appId,
    codepushReleaseKey,
    codepushStagingKey,
    moduleName,
    signingConfigs: {
      storeFile,
      storePassword,
      keyAlias,
      keyPassword,
    },
  } = readConfigs('android');

  // Replace specific files
  gulp.src([
    'android/**/MainActivity.java',
    'android/**/build.gradle',
    'android/settings.gradle',
  ])
    .pipe(replace('ZeroProj', moduleName))
    .pipe(replace('com.zeroproj', appId))
    .pipe(replace('ZEROPROJ_RELEASE_STORE_FILE', storeFile))
    .pipe(replace('ZEROPROJ_RELEASE_STORE_PASSWORD', storePassword))
    .pipe(replace('ZEROPROJ_RELEASE_KEY_ALIAS', keyAlias))
    .pipe(replace('ZEROPROJ_RELEASE_KEY_PASSWORD', keyPassword))
    .pipe(replace('code_push_release_key', codepushReleaseKey))
    .pipe(replace('code_push_staging_key', codepushStagingKey))
    .pipe(gulp.dest(`${CLONE_DIR}/android`));
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
    .pipe(gulp.dest(`${CLONE_DIR}/ios`));
});

gulp.task('zero:setup:js', () => {
  const { moduleName } = readConfigs('general');

  gulp.src('./index.*.js')
    .pipe(replace('ZeroProj', moduleName))
    .pipe(gulp.dest(`${CLONE_DIR}`));

  gulp.src('./app/**/*.js')
    .pipe(replace('ZeroProj', moduleName))
    .pipe(gulp.dest(`${CLONE_DIR}/app`));
});

gulp.task('zero:apply:git', () => {
  const { gitRemoteUrl } = readConfigs('general');
  
  execCommands(
    'rm -rf .git',
    'git init',
    `git remote add origin ${gitRemoteUrl}`,
    'git config --local --add branch.master.remote origin',
    'git config --local --add branch.master.merge refs/heads/master'
  );
});

gulp.task('zero:apply:platforms', () => (
  execCommands(
    'rm -rf ./ios',               // Remove ios folder to avoid duplications
    `cp -r ${CLONE_DIR}/* .`
  )
));

gulp.task('zero:setup', sequence(
  'zero:setup:cleanup',
  'zero:setup:android',
  'zero:setup:ios',
  'zero:setup:js',
  'zero:setup:general'
));

gulp.task('zero:apply', sequence(
  'zero:apply:git',
  'zero:apply:platforms'
));

/* eslint-enable no-console */
