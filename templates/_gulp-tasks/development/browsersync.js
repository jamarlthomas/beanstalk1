var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	config = require('../config');


//Setup browser-sync to watch for updates	
gulp.task('browsersync', ['build'], function() {
	
	browserSync.init({
		server: {
            baseDir: "./" + config.buildFiles + "/"
        },
		port: 9999,
		files: [
			
			config.buildFiles + '/**/*',
      ]
    });
	
});


//'_app-website/build/assets-layout/styles/*.css',
//'_app-website/build/assets-layout/js/custom/*.js',
//'_app-website/build/assets-layout/js/library/*.js',
//'_app-website/build/*.html',
//'_app-website/build/assets-layout/fonts/**/*',
//'_app-website/build/images/*',
//'_app-website/build/page-images/**/*',
//'_app-website/build/page-assets/**/*'
			
