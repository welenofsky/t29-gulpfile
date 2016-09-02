gulp        = require 'gulp' 
less        = require 'gulp-less' 
path        = require 'path' 
rename      = require 'gulp-rename' 
cleanCSS    = require 'gulp-clean-css'
coffee      = require 'gulp-coffee'
gutil       = require 'gulp-util'
jshint      = require 'gulp-jshint' 
livereload  = require 'gulp-livereload' 
notify      = require 'gulp-notify' 
uglify      = require 'gulp-uglify' 


gulp.task 'js', ->
    gulp.src './wp-content/themes/**/skin/js/custom.js'
        .pipe jshint()
        .pipe notify((file) ->
            if file.jshint.success
                return false
            errors = file.jshint.results.map((data) ->
                if data.error 
                    "(#{data.error.line}: #{data.error.character}) #{data.error.reason}"
            ).join("\n");
            "#{file.relative} (#{file.jshint.results.length} errors)\n" + errors
        )
        .pipe uglify()
        .on 'error', notify.onError((error) ->
            'JS Minification failed: ' + error.message
        )
        .pipe rename((path) ->
            path.dirname    = path.dirname
            path.basename   = "custom"
            path.extname    = ".min.js"
            return
        )
        .pipe gulp.dest('./wp-content/themes/')
        .pipe livereload()


gulp.task 'less', ->
    gulp.src './wp-content/themes/**/less/custom-theme.less'
        .pipe less(
          paths : [ path.join(__dirname, 'less', 'includes') ]
        )
        .on 'error', notify.onError((error) ->
            "LESS compilation failed: #{error.message}"
        )
        .pipe(cleanCSS())
        .on 'error', notify.onError((error) ->
            "CSS minification failed: #{error.message}"
        )
        .pipe rename((path) ->
            path.dirname    += "/../skin/css"
            path.basename    = "custom-theme"
            path.extname     = ".min.css"
            return
        )
        .pipe gulp.dest('./wp-content/themes/')
        .pipe notify('LESS compiled successfully!')
        .pipe livereload();


gulp.task 'gulpfile', ->
    gulp.src './gulpfile.coffee'
        .pipe coffee( bare: true ).on 'error', gutil.log
        .on 'error', notify.onError((error) ->
            "Gulpfile.coffee failed to compile: #{error.message}"
        )
        .pipe jshint()
        .pipe notify((file) ->
            if file.jshint.success
                return false
            errors = file.jshint.results.map((data) ->
                if data.error 
                    "(#{data.error.line}: #{data.error.character}) #{data.error.reason}"
            ).join("\n");
            "#{file.relative} (#{file.jshint.results.length} errors)\n" + errors
        )
        .pipe rename('gulpfile.js')
        .pipe gulp.dest('./')
        .pipe notify('Gulpfile compiled successfully!')


gulp.task 'default', (callback) ->
    livereload.listen start: true
    gulp.watch '**/skin/js/custom.js', ['js']
    gulp.watch '**/less/*.less', ['less']
