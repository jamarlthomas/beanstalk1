var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	config = require('../config');

//Copy file Assets to build
gulp.task('copyFileAssets', function() {

  gulp.src(config.workingFiles + '/page-assets/**/*')
    .pipe(plumber())
    .pipe(gulp.dest(config.buildFiles + '/page-assets/'))
  
});