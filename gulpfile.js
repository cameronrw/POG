//initialize variables
var gulp, sass, concat, uglify, rename, imagemin, cache;

//load dependencies
gulp = require('gulp');
sass = require('gulp-ruby-sass');
concat = require('gulp-concat');
uglify = require('gulp-uglify');
rename = require('gulp-rename');
imagemin = require('gulp-imagemin');
cache = require('gulp-cache');

//Sass
gulp.task('sass', function () {
	return gulp.src('src/scss/*.scss')
	.pipe(rename({suffix: '.min'}))
	.pipe(sass({style: 'compressed'}))
	// .pipe(sass({sourcemap: true, sourcemapPath: '../scss'}))
	.on('error', function (err) { console.log(err.message); })
	.pipe(gulp.dest('dist/css'));
});
//Scripts
gulp.task('scripts', function() {
	return gulp.src('src/js/*.js')
	.pipe(concat('main.js'))
	.pipe(rename({suffix: '.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
});
//Images
gulp.task('images', function() {
	return gulp.src('src/images/**/*')
	.pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
	.pipe(gulp.dest('build/img'));
});
//Watch
gulp.task('watch', function() {
   // Watch .js files
   gulp.watch('src/js/*.js', ['scripts']);
   // Watch .scss files
   gulp.watch('src/scss/*.scss', ['sass']);
   // Watch image files
   gulp.watch('src/images/**/*', ['images']);
});
// Default task
gulp.task('default', ['sass','scripts','images','watch']);