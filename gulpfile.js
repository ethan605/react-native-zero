// Gulp modules
const gulp = require('gulp');
const sequence = require('gulp-sequence');

const {
  execCommands,
  prepareCommand,
  readConfigs,
  uploadCommand,
  constants: {
    CODEPUSH_RELEASE_DIR,
  },
} = require('./gulp-helpers/codepush');

/**
 * CodePush tasks
 */
gulp.task('codepush:clean', () => (
  // Clean CodePush release folder & rebuild typescript sources
  execCommands(
    `rm -rf ${CODEPUSH_RELEASE_DIR}`,
    `mkdir -p ${CODEPUSH_RELEASE_DIR}`
  )
));

gulp.task('codepush:prepare', () => (
  // Prepare bundle files for both Android & iOS
  execCommands(
    prepareCommand({ platform: 'android' }),
    prepareCommand({ platform: 'ios' })
  )
));

gulp.task('codepush:upload', () => (
  // Upload to CodePush server
  execCommands(uploadCommand(readConfigs()))
));

gulp.task('codepush:release', sequence(
  'codepush:clean',
  'codepush:prepare',
  'codepush:upload'
));
