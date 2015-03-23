var gutil = require('gulp-util')
  , through = require('through2')
  , bbcode = require('bbcode');
  
module.exports = function(options) {
  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
    }
    
    if (file.isStream()) {
      cb(new gutil.PluginError('gulp-bbcode', 'Streaming not supported'));
      return;
    }
  
    try {
      file.contents = new Buffer(bbcode.parse(file.contents.toString()));
      file.path = gutil.replaceExtension(file.path, '.html');
      this.push(file);
    } catch (err) {
      this.emit('error', new gutil.PluginError('gulp-bbcode', err));
    }

    cb();
  });
};