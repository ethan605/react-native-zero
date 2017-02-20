/**
 * Zero helpers
 */

/* eslint-disable no-console */

// Gulp modules
import gulp from 'gulp';
import clean from 'gulp-clean';
import file from 'gulp-file';
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

gulp.task('zero:setup:clean', () => (
  gulp.src(CLONE_DIR).pipe(clean())
));

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

  // Replace content for text files
  gulp.src(['./ios/**', '!./ios/**/*.png'])
    .pipe(replace(...moduleNameReplacement))
    .pipe(replace('com.zeroproj', appId))
    .pipe(replace('code_push_release_key', codepushReleaseKey))
    .pipe(replace('code_push_staging_key', codepushStagingKey))
    .pipe(rename(path => {
      path.dirname = path.dirname.replace(...moduleNameReplacement);
      path.basename = path.basename.replace(...moduleNameReplacement);
    }))
    .pipe(gulp.dest(`${CLONE_DIR}/ios`));

  // Copy & rename only for asset files
  gulp.src('./ios/**/*.png')
    .pipe(rename(path => {
      path.dirname = path.dirname.replace(...moduleNameReplacement);
      path.basename = path.basename.replace(...moduleNameReplacement);
    }))
    .pipe(gulp.dest(`${CLONE_DIR}/ios`));
});

gulp.task('zero:setup:js', () => {
  const { moduleName } = readConfigs('general');

  // Replace and copy `index.android.js`, `index.ios.js`
  gulp.src('./index.*.js')
    .pipe(replace('ZeroProj', moduleName))
    .pipe(gulp.dest(`${CLONE_DIR}`));

  // Replace and copy JS files under `app/` dir
  gulp.src('./app/**/*.js')
    .pipe(replace('ZeroProj', moduleName))
    .pipe(gulp.dest(`${CLONE_DIR}/app`));

  // Copy `assets` file without content replaces
  gulp.src('./app/assets/**')
    .pipe(gulp.dest(`${CLONE_DIR}/app/assets`));
});

gulp.task('zero:setup:general', () => {
  const { packageName, moduleName } = readConfigs('general');

  gulp.src('./package.json')
    .pipe(replace('react-native-zero', packageName))
    .pipe(replace('ZeroProj', moduleName))
    .pipe(gulp.dest(CLONE_DIR));

  gulp.src('./gulp-helpers/codepush/configs.json')
    .pipe(replace('ZeroProj', moduleName))
    .pipe(gulp.dest(`${CLONE_DIR}/gulp-helpers/codepush`));

  file('README.md', `# ${moduleName}`, { src: true })
    .pipe(gulp.dest('.'));
});

gulp.task('zero:apply:clean-ios', () => (
  gulp.src('./ios').pipe(clean())
));

gulp.task('zero:apply:clean-clones', () => (
  gulp.src(CLONE_DIR).pipe(clean())
));

gulp.task('zero:apply:platforms', () => (
  gulp.src(`${CLONE_DIR}/**`).pipe(gulp.dest('.'))
));

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

gulp.task('zero:setup', sequence(
  'zero:setup:clean',
  'zero:setup:android',
  'zero:setup:ios',
  'zero:setup:js',
  'zero:setup:general'
));

gulp.task('zero:apply', sequence(
  'zero:apply:clean-ios',
  'zero:apply:platforms',
  'zero:apply:clean-clones',
  'zero:apply:git'
));

/* eslint-enable no-console */
