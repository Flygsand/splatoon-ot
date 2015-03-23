var gutil = require('gulp-util')
  , through = require('through2')
  , ejs = require('ejs')
  , _ = require('lodash')
  , fs = require('fs');
 
module.exports = function(options) {
  options = options || {};
  
  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
    }
    
    if (file.isStream()) {
      cb(new gutil.PluginError('gulp-ejs', 'Streaming not supported'));
      return;
    }
    
    try {
      var ejsOptions = _.extend({}, options.ejs, {
        filename: file.path
      });
      var body = ejs.render(file.contents.toString(), ejsOptions);
      
      if (options.layout) {
        ejsOptions = _.extend({}, options.ejs, {
          filename: options.layout,
          content: body
        });
        
        body = ejs.render(fs.readFileSync(options.layout, 'utf8'), ejsOptions);
      }
      
      file.contents = new Buffer(body);
      this.push(file);
    } catch (err) {
      this.emit('error', new gutil.PluginError('gulp-ejs', err));
    }
    
    cb();
  });  
};