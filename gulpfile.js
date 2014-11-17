/* jshint ignore:start */
var gulp = require('gulp')
	, gutil = require('gulp-util')
	, notify = require('gulp-notify')
	, rename = require('gulp-rename')
	, browserify = require('gulp-browserify')
	, debowerify = require('debowerify')
	, livereload = require('gulp-livereload')
	, livereloadServer = require('tiny-lr')()
	, http = require('http')
	, path = require('path')
	, express = require('express');

gulp.task('browserify', function() {
	return gulp.src('./src/index.js', { read: false })
		.pipe(browserify({
			debug: !gutil.env.production
			, transform: ['debowerify']
		}))
		/*.on('prebundle', function(bundle) {
			bundle.require('../../../bower_components/masonry/masonry.js', {expose: 'masonry'});
		})*/
		.pipe(rename('app.js'))
		.pipe(gulp.dest('public/js'))
		.pipe(livereload())
		.pipe(notify({
			message: '<%= file.relative %> built'
		}));
});

gulp.task('uglify', ['browserify'], function() {
	return gulp.src('./public/js/app.js')
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('./public/js'))
		.pipe(notify({
			message: '<%= file.relative %> built'
		}));
});

gulp.task('server', function() {
	var port = 8080
		, express = require('express')
		, app = express();

	app.use(express.static('public'));

	app.listen(port, function() {

	});
});

gulp.task('watch', ['server'], function() {
	livereload.listen();

	gulp.watch(['src/**/*.js'], ['browserify']);
});


gulp.task('client', ['browserify', 'watch']);

gulp.task('default', ['client']);
