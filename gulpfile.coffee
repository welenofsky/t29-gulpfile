gulp        = require 'gulp' 
less        = require 'gulp-less' 
path        = require 'path' 
rename      = require 'gulp-rename' 
cleanCSS    = require 'gulp-clean-css' 
jshint      = require 'gulp-jshint' 
livereload  = require 'gulp-livereload' 
notify      = require 'gulp-notify' 
uglify      = require 'gulp-uglify' 


gulp.task 'js', ->
  return gulp.src('./wp-content/themes/**/skin/js/custom.js')
    .pipe(jshint())
    .pipe(notify( (file) ->
        if file.jshint.success
            return false;
        errors = file.jshint.results.map( (data) ->
            if data.error 
                return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
        ).join("\n");
        return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors;
    ))
    .pipe(uglify())
    .pipe(rename( (path) ->
        path.dirname = path.dirname;
        path.basename = "custom";
        path.extname = ".min.js";
    ))
    .pipe(gulp.dest('./wp-content/themes/'))
    .pipe(livereload());

