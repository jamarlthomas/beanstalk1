var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	minifyCss = require('gulp-minify-css'),
	rename = require("gulp-rename"),
	config = require('../config');


/**
 * Generate CSS from SCSS
 * Build sourcemaps
 */
gulp.task('styles', function() {

  return gulp.src(config.workingFiles + '/sass/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer(['IE 8', 'IE 9', 'last 5 versions']))
	.pipe(minifyCss())    
    .pipe(rename({suffix: '.min'})) // rename files to min
	.pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest(config.buildFiles + '/assets-layout/styles'));
	 
});