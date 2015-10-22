var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	config = require('../config');

//copy fonts to build
gulp.task('fonts', function() {
  gulp.src(config.workingFiles + '/fonts/**/*')
    .pipe(plumber())
    .pipe(gulp.dest(config.buildFiles + '/assets-layout/fonts'))
  
});