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


var number = "04";

var htmlFile = {
	Name: "index_04_HoverEffects.html"
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
	//log('cssClean не происходит закомментировано');
};


//----------------------------------------------------------------

var cssMin = function () {
	return gulp
		//.src(["source/css/" + number + "/*.css", "!source/css/" + number + "/*.min.css"])
		.src(["source/css/" + number + "/*.css", "!source/css/" + number + "/*.min.css"])
		//.pipe(concat("source/css_/" + nameFileCss + ".min.css"))
		.pipe(concat(nameFileCss + ".min.css"))
		.pipe(cssmin())
		//.pipe(gulp.dest("."))
		.pipe(gulp.dest("source/css/" + number))

		;

};

//----------------------------------------------------------------
var functionSass = function (done) {

	//deleteFiles;

	// Папка, где сохраняются файлы *.scss 
	// (ProjectCustomerDevelop/scss)
	//gulp.src(["source/css/" + number + "/*min.css","source/scss/" + number + "/*.scss"])
	//gulp.src(["source/css/" + number + "/*min.css"])
		//.pipe(deleteFiles)

	gulp.src(["source/scss/" + number + "/*.scss"])
		//параметр для минификации - compressed
		.pipe(sass({ outputStyle: 'expanded' }))

		//Расположение преобразованных файлов *.css 
		.pipe(gulp.dest("source/css/" + number))

		// соединение веб-браузера
		.pipe(browserSync.stream());

	//gulp.log("sdasd");

	done();

}



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

