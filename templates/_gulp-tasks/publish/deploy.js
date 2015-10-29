var gulp = require('gulp'),
	gutil = require( 'gulp-util' ),
	ftp = require( 'vinyl-ftp' ),
	config = require('../config');

gulp.task('deploy:publish', function() {
	
	//FTP site
	if(config.ftpStatus){
	
		var conn = ftp.create( {
			host:     config.ftpHost,
			user:     config.username,
			password: config.password,
			port: 	  config.port,
			parallel: 10,		
			log: 	  gutil.log,
			debug: 	  true
		} );
		
		return gulp.src( config.buildFiles + '/**/*', { base: config.buildFiles + '/', buffer: false } )
			.pipe( conn.newer( config.remoteDirectory ) ) // only upload newer files 
			.pipe( conn.dest( config.remoteDirectory ) );
	
	}else {
		console.log("******")
		console.log("FTP Set to false in config")
		console.log("******")
	}
	

	
	//GIT Push
	
	
});
