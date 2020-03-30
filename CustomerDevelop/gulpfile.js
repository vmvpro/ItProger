"use strict";

var _gulp = require("gulp");
var _rimraf = require("rimraf");
var _concat = require("gulp-concat");
var _cssmin = require("gulp-cssmin");
var _uglify = require("gulp-uglify");
var _sass = require("gulp-sass"); // добавляем модуль sass


var paths = {
	//webroot: "./wwwroot/"
	webroot: "./"
};

//paths.js = paths.webroot + "js/**/*.js";
//paths.minJs = paths.webroot + "js/**/*.min.js";
//paths.css = paths.webroot + "css/**/*.css";
//paths.minCss = paths.webroot + "css/**/*.min.css";
//paths.concatJsDest = paths.webroot + "js/site.min.js";
//paths.concatCssDest = paths.webroot + "css/site.min.css";

paths.js = paths.webroot + "js/*.js";
paths.minJs = paths.webroot + "js/*.min.js";
paths.css = paths.webroot + "css/*.css";
paths.minCss = paths.webroot + "css/*.min.css";
paths.concatJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";
paths.Scss = paths.webroot + "css/*.scss";


_gulp.task("clean:js", function (cb) {
	_rimraf(paths.concatJsDest, cb);
});

_gulp.task("clean:css", function (cb) {
	_rimraf(paths.concatCssDest, cb);
});

_gulp.task("clean", _gulp.series(["clean:js", "clean:css"]));

_gulp.task("min:js", function () {
	return _gulp.src( [paths.js, "!" + paths.minJs], { base: "." })
		.pipe(_concat(paths.concatJsDest))
		.pipe(_uglify())
		.pipe(_gulp.dest("."));
});

_gulp.task("min:css", function () {
	return _gulp.src([paths.css, "!" + paths.minCss])
		.pipe(_concat(paths.concatCssDest))
		.pipe(_cssmin())
		.pipe(_gulp.dest("."));
});

_gulp.task("sass", function () {
	return _gulp.src([paths.Scss])
		.pipe(_sass())
		.pipe(_gulp.dest('./css'));
});



_gulp.task("min", _gulp.series(["min:js", "min:css"]));