// Gulp modules
import gulp from 'gulp';
import clean from 'gulp-clean';
// import debug from 'gulp-debug';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import sequence from 'gulp-sequence';

// Helpers
import codepush from './gulp-helpers/codepush';
import zero from './gulp-helpers/zero';

/**
 * CodePush tasks
 */
gulp.task('codepush:clean', () => {
  const { CODEPUSH_RELEASE_DIR } = codepush.constants;

  // Clean CodePush release folder & rebuild typescript sources
  return codepush.execCommands(
    `rm -rf ${CODEPUSH_RELEASE_DIR}`,
    `mkdir -p ${CODEPUSH_RELEASE_DIR}`
  );
});

gulp.task('codepush:prepare', () => (
  // Prepare bundle files for both Android & iOS
  codepush.execCommands(
    codepush.prepareCommand({ platform: 'android' }),
    codepush.prepareCommand({ platform: 'ios' })
  )
));

gulp.task('codepush:upload', () => (
  // Upload to CodePush server
  codepush.execCommands(codepush.uploadCommand(codepush.readConfigs()))
));

gulp.task('codepush:release', sequence(
  'codepush:clean',
  'codepush:prepare',
  'codepush:upload'
));

gulp.task('exp', () => {
  // console.log(
  //   zero.readConfigs('android'),
  //   zero.readConfigs('ios')
  // );
  // zero.readNamesMapper('android');
  // zero.readNamesMapper('ios');
});

gulp.task('zero:setup:clean', () => gulp.src(['android.test', 'ios.test']).pipe(clean()));

gulp.task('zero:setup:prepare', () => (
  gulp.src('./android/**').pipe(gulp.dest('./android.test'))
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
  } = zero.readConfigs('android');

  gulp.src('./android/**/zeroproj-release-key.keystore')
    .pipe(rename((path => path.basename = keyStoreFileName)))
    .pipe(gulp.dest('./android.test'));

  gulp.src('./android/**/build.gradle')
    .pipe(replace('ZeroProj', moduleName))
    .pipe(replace('com.zeroproj', appId))
    .pipe(replace('ZEROPROJ_RELEASE_STORE_FILE', storeFile))
    .pipe(replace('ZEROPROJ_RELEASE_STORE_PASSWORD', storePassword))
    .pipe(replace('ZEROPROJ_RELEASE_KEY_ALIAS', keyAlias))
    .pipe(replace('ZEROPROJ_RELEASE_KEY_PASSWORD', keyPassword))
    .pipe(replace('code_push_release_key', codepushReleaseKey))
    .pipe(replace('code_push_staging_key', codepushStagingKey))
    .pipe(gulp.dest('./android.test'));
});

gulp.task('zero:setup:ios', () => {
  const {
    appId,
    codepushReleaseKey,
    codepushStagingKey,
    moduleName,
  } = zero.readConfigs('ios');
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
    .pipe(gulp.dest('./ios.test'));
});

gulp.task('zero:setup', sequence(
  'zero:setup:clean',
  'zero:setup:prepare',
  [
    'zero:setup:android',
    'zero:setup:ios',
  ]
));
