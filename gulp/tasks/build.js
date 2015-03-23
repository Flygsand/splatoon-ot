var gulp = require('gulp')
  , ejs = require('../plugins/ejs');

gulp.task('build', function() {
gulp.src(['./copy/{,**/}*.bbcode', '!./copy/{,**/}_*.bbcode'])
  .pipe(ejs())
});
