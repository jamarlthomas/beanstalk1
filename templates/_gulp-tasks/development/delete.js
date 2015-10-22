var gulp = require('gulp'),
	del = require('del'),
	config = require('../config');

//delete everyting for fresh build
gulp.task('delete', function() {

	return del([ config.buildFiles + '/**/*']);

});
