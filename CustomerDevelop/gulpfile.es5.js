﻿/// <binding />
//'use strict';

//var gulp = require('gulp');
//var	sass = require('gulp-sass'); // добавляем модуль sass
//var uglifycss = require('gulp-uglifycss'); // добавляем модуль sass

////// регистрируем задачу для конвертации файла scss в css

//var gulp_sass = gulp.task('sass', function () {
//	return gulp.src('./scss/*.scss')
//		.pipe(sass())
//		.pipe(gulp.dest('./dist/css'));
//});

//var gulp_css = gulp.task('css', function () {
//	return gulp.src('./scss/*.css')
//		.pipe(uglifycss({
//			'uglyComments': true
//		}))
//		.pipe(gulp.dest('./dist/css'));
//});
//----------------------------------------------------------

'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var uglifycss = require('gulp-uglifycss'); // добавляем модуль sass

gulp.task('sass', function (done) {
	gulp.src("scss/*.scss")
	//.pipe(sass({ outputStyle: 'compressed' }))
	.pipe(sass({ outputStyle: 'expanded' })).pipe(gulp.dest("dist/css")).pipe(browserSync.stream());

	done();
});

gulp.task('serve', function (done) {

	browserSync.init({ server: "" }
	//{ notify: true } // отклчение уведомлений
	);

	gulp.watch("scss/*.scss", gulp.series('sass'));
	gulp.watch("*.html").on('change', function () {
		browserSync.reload();
		done();
	});

	done();
});

gulp.task('default', gulp.series('sass', 'serve'));

//---------------------------------------------------

//gulp.task('css', function () {
//	gulp.src('./styles/**/*.css')
//		.pipe(uglifycss())
//		.pipe(gulp.dest('./dist/'));
//});

//gulp.task('css', function () {
//	gulp.src('css/*.css')
//		.pipe(uglifycss({
//			"maxLineLen": 80,
//			"uglyComments": true
//		}))
//		.pipe(gulp.dest('./dist/'));
//});

//----------------------------------------------------

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

