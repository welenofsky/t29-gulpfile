/* File: Three29 gulpfile.js */

var gulp        = require('gulp'),
    less        = require('gulp-less'),
    path        = require('path'),
    rename      = require('gulp-rename'),
    cleanCSS    = require('gulp-clean-css'),
    jshint      = require('gulp-jshint'),
    livereload  = require('gulp-livereload'),
    notify      = require('gulp-notify'),
    coffee      = require('gulp-coffee'),
    gutil       = require('gulp-util'),
    uglify      = require('gulp-uglify');


gulp.task('js', function() {
  return gulp.src('./wp-content/themes/**/skin/js/custom.js')
    .pipe(jshint())
    .pipe(notify(function (file) {
      if (file.jshint.success) {
        // Don't show something if success 
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
    .pipe(gulp.dest('./wp-content/themes/'))
    .pipe(livereload());
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
    .pipe(notify('LESS compiled successfully!'))
    .pipe(livereload());
});

gulp.task('gulpfile', function(){
    return gulp.src('./gulpfile.coffee')
            .pipe(coffee({bare: true}).on('error', gutil.log))
            .pipe(jshint())
            .pipe(gulp.dest('./gulpfile.test.js'));
});

gulp.task('default', function(callback) {
    livereload.listen({ start: true });
    gulp.watch('**/skin/js/custom.js', ['js']);
    gulp.watch('**/less/*.less', ['less']);
});
