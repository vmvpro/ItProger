"use strict";

var gulp = require("gulp"),
	sass = require("gulp-sass"); // добавляем модуль sass

var paths = {
	//webroot: "./wwwroot/"
	webroot: "./wwwroot/"
};
// регистрируем задачу для конвертации файла scss в css
gulp.task("sass", function () {
	return gulp.src('sass/style.scss')
		.pipe(sass())
		.pipe(gulp.dest('./css'));
		//.pipe(gulp.dest(paths.webroot + '/css'));
});