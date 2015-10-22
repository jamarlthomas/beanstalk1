var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	uglify = require('gulp-uglify'),
	rename = require("gulp-rename"),
	config = require('../config');

//custom scripts
gulp.task('scripts', function() {

  gulp.src(config.workingFiles + '/js/custom/*.js')
  .pipe(plumber())
  .pipe(uglify()) //minify scripts
  .pipe(rename({suffix: '.min'})) // rename files to min
  .pipe(gulp.dest(config.buildFiles + '/assets-layout/js/custom'))
  
});


//library scripts
gulp.task('copyScripts', function() {

  gulp.src(config.workingFiles + '/js/library/*.js')
    .pipe(plumber())
    .pipe(gulp.dest(config.buildFiles + '/assets-layout/js/library'))
  
});