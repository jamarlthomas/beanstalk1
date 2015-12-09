var gulp = require('gulp'),
	config = require('../config');

/**
 * Start browsersync task and then watch files for changes
 */
gulp.task('watch', ['browsersync'], function() {
	gulp.watch(config.workingFiles + '/fonts/**/*', ['fonts'])
	gulp.watch(config.workingFiles + '/images/**/*', ['optimizeImages'])
	gulp.watch(config.workingFiles + '/sass/**/*.scss', ['styles'])
	gulp.watch(config.workingFiles + '/js/custom/*.js', ['scripts'])
    gulp.watch(config.workingFiles + '/js/library/*.js', ['copyScripts'])
	gulp.watch(config.workingFiles + '/page-assets/**/*', ['copyFileAssets'])
	gulp.watch(config.workingFiles + '/page-images/**/*', ['copyImgAssets'])
	gulp.watch(config.workingFiles + '/jade/**/*.jade', ['html'])
});