// Gulp modules
import gulp from 'gulp';
import debug from 'gulp-debug';

// Helpers
import './gulp-helpers/codepush';
import './gulp-helpers/zero';

gulp.task('exp', () => (
  gulp.src('.').pipe(debug({ title: 'exp' }))
));
