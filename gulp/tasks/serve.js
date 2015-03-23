var gulp = require('gulp')
  , browserSync = require('browser-sync')
  , phpcgi = require('node-phpcgi');

gulp.task('serve', ['clean', 'watch:copy'], function() {
  browserSync({
    server: {
      baseDir: '.tmp',
      index: 'main-gaf-light.html',
      routes: {
        '/assets': 'assets'
      },
      middleware: phpcgi({
        documentRoot: './server/htdocs'
      })
    }
  });
});