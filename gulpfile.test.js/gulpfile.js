var cleanCSS, gulp, jshint, less, livereload, notify, path, rename, uglify;

gulp = require('gulp');

less = require('gulp-less');

path = require('path');

rename = require('gulp-rename');

cleanCSS = require('gulp-clean-css');

jshint = require('gulp-jshint');

livereload = require('gulp-livereload');

notify = require('gulp-notify');

uglify = require('gulp-uglify');

gulp.task('js', function() {
  return gulp.src('./wp-content/themes/**/skin/js/custom.js').pipe(jshint()).pipe(uglify()).pipe(rename(function(path) {
    path.dirname = path.dirname;
    path.basename = "custom";
    return path.extname = ".min.js";
  })).pipe(gulp.dest('./wp-content/themes/')).pipe(livereload());
});
