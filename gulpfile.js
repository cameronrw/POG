//initialize variables
var gulp, sass, concat, uglify, rename, imagemin, cache, autoprefixer, markdown, connect, del;

//load dependencies
gulp = require('gulp');
sass = require('gulp-ruby-sass');
concat = require('gulp-concat');
uglify = require('gulp-uglify');
rename = require('gulp-rename');
imagemin = require('gulp-imagemin');
cache = require('gulp-cache');
autoprefixer = require('gulp-autoprefixer');
markdown = require('gulp-markdown');
connect = require('gulp-connect');
del = require('del');

//Webserver
gulp.task('connect', function() {
	connect.server({
		root: 'dist',
		livereload: true
	});
});

//HTML
gulp.task('html', function () {
	return gulp.src('src/**/*.html')
	.pipe(gulp.dest('dist'))
	.pipe(connect.reload());
});

//Sass
gulp.task('sass', function () {
	return gulp.src('src/scss/*.scss')
	.pipe(rename({suffix: '.min'}))
	.pipe(sass({sourcemap: true, style: 'compressed'}))
	.pipe(autoprefixer({
		browsers: ['last 2 version', "> 1%", 'ie 8', 'ie 9'],
		cascade: false
	}))
	.on('error', function (err) { console.log(err.message); })
	.pipe(gulp.dest('dist/css'))
	.pipe(connect.reload());
});

//Vendor
gulp.task('vendor', function() {  
	return gulp.src('src/js/vendor/*.js')
	.pipe(concat('vendor.js'))
	.pipe(rename({suffix: '.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'))
});

//Modernizr
gulp.task('modernizr', function() {
	return gulp.src('src/js/vendor/modernizr/*.js')
	.pipe(rename('modernizr.min.js'))
	.pipe(gulp.dest('dist/js/vendor'))
});

//Scripts
gulp.task('scripts', function() {
	return gulp.src(['src/js/plugins/*.js','src/js/*.js'])
	.pipe(concat('scripts.js'))
	.pipe(rename({suffix: '.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'))
	.pipe(connect.reload());
});

//Images
gulp.task('images', function() {
	return gulp.src('src/images/**/*')
	.pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
	.pipe(gulp.dest('dist/img'))
	.pipe(connect.reload());
});

//Watch
gulp.task('watch', function() {
	gulp.watch('src/**/*.html', ['html']);
	// Watch .scss files
	gulp.watch('src/scss/*.scss', ['sass']);
	// Watch .js files
	gulp.watch('src/js/**/*.js', ['vendor','scripts']);
	// Watch image files
	gulp.watch('src/images/**/*', ['images']);
});

//Clean
gulp.task('clean', function(cb) {
	del(['dist'], cb);
});

// Default task
gulp.task('default', ['connect','html','sass','vendor','modernizr','scripts','images','watch']);

// Cleanup task
gulp.task('cleanup', ['clean']);