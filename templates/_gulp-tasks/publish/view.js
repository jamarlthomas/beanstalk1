var gulp = require('gulp'),
	opn = require('opn'),
	config = require('../config');

//View Live Site thats been published
gulp.task('view:publish', function() {
	opn(config.liveURL);
});


