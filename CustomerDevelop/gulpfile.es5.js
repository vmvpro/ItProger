/// <binding AfterBuild='sass, css.min' />
'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass'); // добавляем модуль sass
var uglifycss = require('gulp-uglifycss'); // добавляем модуль sass

// регистрируем задачу для конвертации файла scss в css

gulp.task('sass', function () {
	return gulp.src('./scss/style.scss').pipe(sass()).pipe(gulp.dest('./dist/css'));
});

gulp.task('css', function () {
	return gulp.src('./scss/*.css').pipe(uglifycss({
		'uglyComments': true
	})).pipe(gulp.dest('./dist/css'));
});

gulp.task('run', ['sass', 'css']);

gulp.task('watch', function () {
	gulp.watch('./scss/*.scss', ['sass']);
	gulp.watch('./css/*.css', ['css']);
});

gulp.task('default', ['run', 'watch']);

