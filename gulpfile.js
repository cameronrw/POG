var gulp, sass;

gulp = require('gulp');
sass = require('gulp-ruby-sass');

gulp.task('default', function () {
    return gulp.src('src/scss/*.scss')
        .pipe(sass({sourcemap: true, sourcemapPath: '../scss'}))
        .on('error', function (err) { console.log(err.message); })
        .pipe(gulp.dest('dist/css'));
});