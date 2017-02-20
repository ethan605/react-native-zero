/**
 * Zero helpers
 */

/* eslint-disable no-console */

// Gulp modules
import gulp from 'gulp';
import clean from 'gulp-clean';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import run from 'gulp-run';
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

// function runSequence(...commands) {
//   if (DRY_RUN)
//     console.log(['Commands to be executed:\n', ...commands, '\n'].join('\n'));
//   else
//     run(commands.join('; ')).exec();
// }

gulp.task('zero:backup', () => {
  gulp.src('./android/**').pipe(gulp.dest('./bak/android'));
  gulp.src('./ios/**').pipe(gulp.dest('./bak/ios'));
  gulp.src('./package.json').pipe(gulp.dest('./bak'));
  gulp.src('./gulp-helpers/codepush/configs.json').pipe(gulp.dest('./bak/gulp-helpers/codepush'));
});

gulp.task('zero:restore', () => (
  execCommands(
    'cp -r ./bak/android .',
    'cp -r ./bak/ios .'
  )
));

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

  const filesToReplace = [
    'android/**/MainActivity.java',
    'android/**/build.gradle',
    'android/settings.gradle',
  ];

  // Replace specific files
  gulp.src(filesToReplace)
    .pipe(replace('ZeroProj', moduleName))
    .pipe(replace('com.zeroproj', appId))
    .pipe(replace('ZEROPROJ_RELEASE_STORE_FILE', storeFile))
    .pipe(replace('ZEROPROJ_RELEASE_STORE_PASSWORD', storePassword))
    .pipe(replace('ZEROPROJ_RELEASE_KEY_ALIAS', keyAlias))
    .pipe(replace('ZEROPROJ_RELEASE_KEY_PASSWORD', keyPassword))
    .pipe(replace('code_push_release_key', codepushReleaseKey))
    .pipe(replace('code_push_staging_key', codepushStagingKey))
    .pipe(gulp.dest(`${CLONE_DIR}/android`));

  // Copy other files
  gulp.src([
    './android/**',
    ...filesToReplace.map(filename => `!${filename}`),
  ])
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

gulp.task('zero:setup:git', () => {
  const { gitRemoteUrl } = readConfigs('general');
  
  execCommands(
    'rm -rf .git',
    'git init',
    `git remote add origin ${gitRemoteUrl}`,
    'git config --local --add branch.master.remote origin',
    'git config --local --add branch.master.merge refs/heads/master'
  );
});

gulp.task('zero:setup:apply', () => (
  execCommands(
    'rm -rf ./android ./ios',
    `cp -r ${CLONE_DIR}/android .`,
    `cp -r ${CLONE_DIR}/ios .`
  )
));

gulp.task('zero:setup', sequence(
  'zero:setup:cleanup',
  'zero:setup:general',
  'zero:setup:android',
  'zero:setup:ios'
));

gulp.task('zero:apply', sequence(
  'zero:setup:git',
  'zero:setup:apply'
));

gulp.task('zero', sequence(
  'zero:setup',
  'zero:apply'
));

/* eslint-enable no-console */
