// Gulp modules
const gulp = require('gulp');
const clean = require('gulp-clean');
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

gulp.task('zero:setup:clean', () => gulp.src('cloned').pipe(clean()));

gulp.task('zero:setup:prepare', () => (
  ['android', 'ios'].forEach(platform => (
    gulp.src(`./${platform}/**`)
      .pipe(gulp.dest(`cloned/${platform}`))
  ))
));

gulp.task('zero:setup:ios', () => {
  // const { packageName } = zero.readConfigs('ios');
  const { fileContents } = zero.readNamesMapper('ios');
  gulp.src(fileContents)
    .pipe(replace('ZeroProj', 'ZeroApp'))
    .pipe(gulp.dest('cloned/ios'));
});

gulp.task('zero:setup', sequence(
  'zero:setup:clean',
  'zero:setup:prepare',
  [
    'zero:setup:ios',
  ]
));
