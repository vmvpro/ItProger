var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

var rimraf = require("rimraf");
var concat = require("gulp-concat");
var cssmin = require("gulp-cssmin");
var uglify = require("gulp-uglify");
var log = require('fancy-log');
//var cleanFiles = require('gulp-clean');
//var del = require('del');


var number = "07";

var htmlFile = {
	Name: "index_06_BackgroundImage.html"
};

var nameFileCss = "style" + number;

var paths = {
	//webroot: "./wwwroot/"
	webroot: "source/"
};

paths.js = paths.webroot + "js/**/*.js";
paths.minJs = paths.webroot + "js/**/*.min.js";

paths.css = paths.webroot + "css/**/*.css";
paths.minCss = paths.webroot + "css/**/*.min.css";

//---------------------------------------------------------
paths.concatJsDest = paths.webroot + "js/*.min.js";
paths.concatJsMapDest = paths.webroot + "js/*.min.map";

paths.concatCssDest = paths.webroot + "css/*.min.css";
paths.concatCssMapDest = paths.webroot + "css/*.min.map";
//---------------------------------------------------------

var cssClean = function (done) {
	rimraf("source/scss/" + number +"/*.min.css", done);
	rimraf("source/scss/" + number +"/*.map", done);
};


//----------------------------------------------------------------

var cssMin = function () {
	return gulp
		.src(["source/css/" + number + "/*.css", "!source/css/" + number + "/*.min.css"])
		.pipe(concat(nameFileCss + ".min.css"))
		.pipe(cssmin())
		.pipe(gulp.dest("source/css/" + number))

		;

};



//----------------------------------------------------------------
var functionSass = function (done) {

	// Папка, где сохраняются файлы *.scss 
	gulp.src(["source/scss/" + number + "/*.scss"])
		//параметр для минификации - compressed
		.pipe(sass({ outputStyle: 'expanded' }))

		//Расположение преобразованных файлов *.css 
		.pipe(gulp.dest("source/css/" + number))

		// соединение веб-браузера
		.pipe(browserSync.stream());

	done();

}

// Создание задачи в Visual Studio
// Tasks Manager (Диспетчер выполнения задач)
gulp.task('Files SCSS',	functionSass);

var file_ = function () {

};

var functionService = function (done) {

	browserSync.init({
		server: {
			baseDir: "./",
			index: htmlFile.Name
		}
	}

		// отклчение уведомлений сервера, 
		//{ notify: true } 
	);

	// В данном случае, файл в корневом 
	// размецении проекта

	//---------------------------------------------------
	// Подключение слежение за файлами
	gulp.watch(
		["source/scss/" + number + "/*.scss"],
		gulp.series(functionSass, cssMin, cssClean));

	//---------------------------------------------------

	gulp.watch([htmlFile.Name])
		.on('change', () => {
			browserSync.reload();
			done();
		});

	done();
}

// Создание задачи в Visual Studio
// Tasks Manager (Диспетчер выполнения задач)
gulp.task('run_service',
	gulp.series(functionService, functionSass, cssMin, cssClean));

