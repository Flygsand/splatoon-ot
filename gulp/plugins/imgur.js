var gutil = require('gulp-util')
  , through = require('through2');
  
module.exports = function(options) {
  options = options || {};
  
  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
    }
    
    if (file.isStream()) {
      cb(new gutil.PluginError('gulp-imgur', 'Streaming not supported'));
      return;
    }  
};