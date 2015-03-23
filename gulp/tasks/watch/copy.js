var gulp = require('gulp')
  , reload = require('browser-sync').reload
  , ejs = require('../../plugins/ejs')
  , bbcode = require('../../plugins/bbcode')
  , rename = require('gulp-rename');

function build() {
  ['gaf-dark', 'gaf-light', 'gaf-mobile'].forEach(function(layout) {
    gulp.src(['./copy/{,**/}*.bbcode', '!./copy/{,**/}_*.bbcode'])
      .pipe(ejs())
      .pipe(bbcode())
      .pipe(ejs({
        layout: './layouts/' + layout + '.html'
      }))
      .pipe(rename('main-' + layout + '.html'))
      .pipe(gulp.dest('.tmp'))
      .pipe(reload({stream: true}));
  });
}

gulp.task('watch:copy', function() {
  build();
  gulp.watch('./copy/{,**/}*.bbcode', build);
});