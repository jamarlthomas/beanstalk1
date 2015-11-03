var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	jade = require('gulp-jade'),
	config = require('../config');


gulp.task('html', function() {

    gulp.src(config.workingFiles + '/jade/**/!(_)*.jade')
   .pipe(plumber())
   .pipe(jade({
        pretty: true
        //client: true
   }))
   .pipe(gulp.dest(config.buildFiles + '/'))
   
});