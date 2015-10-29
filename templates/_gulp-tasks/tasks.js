var gulp = require('gulp');

//default
gulp.task('default', ['watch']);

//publish
gulp.task('publish', ['launch:publish']);