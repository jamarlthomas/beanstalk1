var gulp = require('gulp'),
	runSequence = require('run-sequence');

//Run these tasks in sequence
gulp.task('launch:publish', function(callback) {
  runSequence(
	  'deploy:publish',
	  'view:publish',
	  callback);
});

 
