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


//---------------------------------------------------------

// Переменные

var number = "Base";

var htmlFile = {
	Name: "./base/index" + number + ".html"

};

var nameFileCss = "styles" + number;
var nameFileJs = "scripts" + number;


var source = {
	//webroot: "./wwwroot/"
	//webroot: "source/"
	webroot: "base/"

};

//---------------------------------------------------------

// Размещение файлов scss
source.Scss = source.webroot + "scss/*.scss";
source.Js = source.webroot + "js/*.js";
source.JsMin = source.webroot + "js/*.min.js";

// Размещение файлов scss, где при образовании файлов в css необходимо очищать
source.ClearCssMinOfScss = source.webroot + "scss/*.min.css";
source.ClearCssMapOfScss = source.webroot + "scss/*.map";

// Размещение файлов которые требуется минимизировать
// (получаются при обработке функции преобразовании файлов scss)
source.Css = source.webroot + "css/*.css";
source.CssMin = source.webroot + "css/*.min.cs";

//Окончательная папка, где сохраняюся файлы css при минимизации
source.distDirectoryPathCSS = source.webroot + "source/css.min";
source.distDirectoryPathJS = source.webroot + "source/js.min";
source.distDirectoryPath = source.webroot + "css/" + number;

source.webroot + "css/" + number;

//---------------------------------------------------------

// Функция для очистки ненужных файлов css после scss 
var ClearCssOfScss = function (done) {
	rimraf(source.ClearCssMinOfScss, done);
	rimraf(source.ClearCssMapOfScss, done);
};

gulp.task('ClearCssOfScss', ClearCssOfScss);

//----------------------------------------------------------------

// Минимизация файлов css
// Минимизация файлов css
var cssMin = function () {
	return gulp
		.src([source.Css, "!" + source.CssMin])
		// Имя файла при минимизации
		.pipe(concat(nameFileCss + ".min.css"))
		.pipe(cssmin())
		.pipe(gulp.dest(source.distDirectoryPathCSS));
};

gulp.task('cssMin', cssMin);
//----------------------------------------------------------------

var jsMin = function (done) {
	return gulp.src([source.Js, "!" + source.JsMin])
		.pipe(concat(nameFileJs + ".min.js"))
		.pipe(uglify())
		.pipe(gulp.dest(source.distDirectoryPathJS))
		// соединение веб-браузера
		.pipe(browserSync.stream());
		done();
};

gulp.task("minJs", jsMin);
//----------------------------------------------

// Работа с файлами scss
var functionSass = function (done) {

	// Папка, где сохраняются файлы *.scss 
	gulp.src([source.Scss])
		//параметр для минификации - compressed
		.pipe(sass({ outputStyle: 'expanded' }))

		//Расположение преобразованных файлов *.css 
		.pipe(gulp.dest("base/css"))
		
		// соединение веб-браузера
		.pipe(browserSync.stream());

	done();
}

// Создание задачи в Visual Studio
// Tasks Manager (Диспетчер выполнения задач)
gulp.task('FilesSCSS', functionSass);

//----------------------------------------------


var functionService = function (done) {

	browserSync.init({
		server: {
			baseDir: "./",
			// Переопределение файла Index при запуске сервера
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
		source.Scss,
		//gulp.series(functionSass));
		gulp.series(functionSass, cssMin));

	gulp.watch(
		source.Js,
		gulp.series(jsMin));

	//---------------------------------------------------

	gulp.watch([htmlFile.Name, "./base/js.min/stylesBase.min.js"])
		.on('change', () => {
			browserSync.reload();
			done();
		});

	done();
}



// Создание задачи в Visual Studio
// Tasks Manager (Диспетчер выполнения задач)
gulp.task('run_service',
	gulp.series(functionService, functionSass, cssMin, jsMin, ClearCssOfScss));

