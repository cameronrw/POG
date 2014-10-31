//initialize variables
var gulp, sass, concat, uglify, rename;

//load dependencies
gulp = require('gulp');
sass = require('gulp-ruby-sass');
concat = require('gulp-concat');
uglify = require('gulp-uglify');
rename = require('gulp-rename');

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
// Default task
gulp.task('default', ['sass','scripts']);