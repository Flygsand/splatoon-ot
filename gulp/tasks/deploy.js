var gulp = require('gulp')
  , imgur = require('imgur')
  , glob = require('glob')
  , Q = require('q')
  , config = require('../config/deploy')
  , fs = require('fs')
  , path = require('path')
  , rev = require('gulp-rev');

imgur.setClientId(config.imgur.clientId);
 
gulp.task('deploy', function() {
  var deferred = Q.defer();
  
  gulp.src('{,**/}*.{png,jpg,jpeg,gif}')
    .pipe(rev())
    .pipe()
  
  glob('{,**/}*.{png,jpg,jpeg,gif}', { cwd: 'assets' }, function(err, files) {
    if (files.length === 0) {
      deferred.reject(new Error('No assets to deploy'));
    } else {
      var uploads = files.map(function(file) {
        return imgur.uploadFile(path.join('assets', file)).then(function(json) {
          return [file, json.data.link];
        });
      });
      
      return Q.spread(uploads, function() {
        var map = {};
        
        Array.prototype.slice.call(arguments).forEach(function(upload) {
          var path = upload[0]
            , url = upload[1];
          
          map[path] = url;
        });
        
        return Q.nfcall(fs.writeFile, config.assetMapPath, JSON.stringify(map), 'utf8');
      });
    }
  });
  
  return deferred.promise;
});