var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	imagemin = require('gulp-imagemin'),
	gifsicle = require('imagemin-gifsicle'),
	jpegtran = require('imagemin-jpegtran'),
	pngquant = require('imagemin-optipng'),
	watch = require('gulp-watch'),
	config = require('../config');


//optimize images
gulp.task('optimizeImages', function() {
  gulp.src(config.workingFiles + '/images/**/*')
    .pipe(plumber())
	.pipe(watch(config.workingFiles + '/images/**/*'))
	.pipe(imagemin({
		optimizationLevel: 3,
		progessive: true,
		interlaced: true,
		use: [pngquant(), jpegtran(), gifsicle()]
	}))
    .pipe(gulp.dest(config.buildFiles + '/images'))
});


//Optimize and move page assets
gulp.task('copyImgAssets', function() {

  gulp.src(config.workingFiles + '/page-images/**/*')
    .pipe(plumber())
    .pipe(watch(config.workingFiles + '/page-images/**/*'))
	.pipe(imagemin({
		optimizationLevel: 3,
		progessive: true,
		interlaced: true,
		use: [pngquant(), jpegtran(), gifsicle()]
	}))
    .pipe(gulp.dest(config.buildFiles + '/page-images'))
  
});

