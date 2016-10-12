/* File: Three29 gulpfile.js */

var gulp        = require('gulp'),
    less        = require('gulp-less'),
    path        = require('path'),
    rename      = require('gulp-rename'),
    cleanCSS    = require('gulp-clean-css'),
    jshint      = require('gulp-jshint'),
    notify      = require('gulp-notify'),
    uglify      = require('gulp-uglify');


gulp.task('js', function() {
  return gulp.src('./wp-content/themes/**/skin/js/custom.js')
    .pipe(jshint())
    .pipe(notify(function (file) {
      if (file.jshint.success) {
        return false;
      }

      var errors = file.jshint.results.map(function (data) {
        if (data.error) {
          return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
        }
      }).join("\n");
      return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors;
    }))
    .pipe(uglify())
    .on('error', notify.onError(function (error) {
        return 'JS Minification failed: ' + error.message;
    }))
    .pipe(rename(function (path) {
        path.dirname = path.dirname;
        path.basename = "custom";
        path.extname = ".min.js";
    }))
    .pipe(gulp.dest('./wp-content/themes/'));
});

gulp.task('less', function () {
  return gulp.src('./wp-content/themes/**/less/custom-theme.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .on('error', notify.onError(function (error) {
        return 'LESS compilation failed: ' + error.message;
    }))
    .pipe(cleanCSS())
    .on('error', notify.onError(function (error) {
        return 'CSS minification failed: ' + error.message;
    }))
    .pipe(rename(function (path) {
        path.dirname += "/../skin/css";
        path.basename = "custom-theme";
        path.extname = ".min.css";
    }))
    .pipe(gulp.dest('./wp-content/themes/'))
    .pipe(notify('LESS compiled successfully!'));
});

gulp.task('default', function(callback) {
    gulp.watch('**/skin/js/custom.js', ['js']);
    gulp.watch('**/less/*.less', ['less']);
});
