// Gulp modules
const gulp = require('gulp');
const clean = require('gulp-clean');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const sequence = require('gulp-sequence');

// Helpers
const codepush = require('./gulp-helpers/codepush');
const zero = require('./gulp-helpers/zero');

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

gulp.task('zero:setup:clean', () => (
  gulp.src(['android', 'ios'].map(platform => `${platform}_cloned`))
    .pipe(clean()))
);

gulp.task('zero:setup:general', () => {

});

gulp.task('zero:setup:platforms', () => (
  ['android', 'ios'].forEach(platform => {
    const { moduleName, appId } = zero.readConfigs(platform);
    const nameReplacement = ['ZeroProj', moduleName];

    gulp.src(`./${platform}/**`)
      .pipe(replace(...nameReplacement))
      .pipe(replace('com.zeroproj', appId))
      .pipe(rename(path => {
        path.dirname = path.dirname.replace(...nameReplacement);
        path.basename = path.basename.replace(...nameReplacement);
      }))
      .pipe(gulp.dest(`./${platform}_cloned/`));
  })
));

gulp.task('zero:setup:android', () => {
  const platform = 'android';
  const { moduleName, appId } = zero.readConfigs(platform);

  const nameReplacement = ['ZeroProj', moduleName];

  gulp.src(`./${platform}/**`)
    .pipe(replace(...nameReplacement))
    .pipe(replace('com.zeroproj', appId))
    .pipe(rename(path => {
      path.dirname = path.dirname.replace(...nameReplacement);
      path.basename = path.basename.replace(...nameReplacement);
    }))
    .pipe(gulp.dest(`./${platform}_cloned`));
});

gulp.task('zero:setup', sequence(
  'zero:setup:clean',
  [
    'zero:setup:platforms',
  ]
));
