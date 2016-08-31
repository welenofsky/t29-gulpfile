/* File: Three29 gulpfile.js */

var gulp        = require('gulp'),
    less        = require('gulp-less'),
    path        = require('path'),
    rename      = require('gulp-rename'),
    cleanCSS    = require('gulp-clean-css'),
    jshint      = require('gulp-jshint'),
    livereload  = require('gulp-livereload'),
    uglify      = require('gulp-uglify');


gulp.task('js', function() {
  return gulp.src('./wp-content/themes/**/skin/js/custom.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'))
    .pipe(uglify())
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
    .pipe(cleanCSS())
    .pipe(rename(function (path) {
        path.dirname += "/../skin/css";
        path.basename = "custom-theme";
        path.extname = ".min.css";
    }))
    .pipe(gulp.dest('./wp-content/themes/'))
    .pipe(livereload());
});

gulp.task('default', function(callback) {
    livereload.listen({ start: true });
    gulp.watch('**/skin/js/custom.js', ['js']);
    gulp.watch('**/less/*.less', ['less']);
});
