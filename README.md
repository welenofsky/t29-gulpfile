# T29 Gulpfile

This is a gulpfile.js that I use at work. It works with wordpress installations. For livereload I use the chrome plugin. This file watches/processes/minifies a JS file (custom.js) and a less file (custom-theme.less) file. I used file globs to enable use of this file in other projects.

## The Files
The two files it is configured to process are:

./wp-content/themes/{THEME_NAME}/skin/js/custom.js  
./wp-content/themes/{THEME_NAME}/less/custom-theme.less
