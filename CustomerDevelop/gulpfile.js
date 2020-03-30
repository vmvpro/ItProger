/// <binding />
'use strict';

var gulp = require('gulp');
var	sass = require('gulp-sass'); // добавляем модуль sass
var uglifycss = require('gulp-uglifycss'); // добавляем модуль sass

//// регистрируем задачу для конвертации файла scss в css

var gulp_sass = gulp.task('sass', function () {
	return gulp.src('./scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('./dist/css'));
});

var gulp_css = gulp.task('css', function () {
	return gulp.src('./scss/*.css')
		.pipe(uglifycss({
			'uglyComments': true
		}))
		.pipe(gulp.dest('./dist/css'));
});

//gulp.series('default', gulp.parallel(gulp_sass, gulp_css));

//gulp.task('run', ['sass', 'css']);

//gulp.task('watch',
//	function () {
//		gulp.watch('./scss/*.scss', ['sass']);
//		gulp.watch('./css/*.css', ['css']);
//	});

//gulp.task('default', ['run', 'watch']);

//---------------------------------------------------

//gulp.task('css:watch', function () {
//	gulp.watch('./dist/', ['css']);
//});

//gulp.task('css:watch_', function () {
//	gulp.watch('./dist', ['css']);
//});

//gulp.task('default', gulp.parallel(styles, scripts));

//gulp.watch('./dist', ['css']);

//gulp.series('css:watch_', function () {
//	gulp.watch('./dist', ['css']);
//});

//gulp.task("watch",
//	function() {
//		'scss/style.sccs', gulp.parallel('sass');
//	});

