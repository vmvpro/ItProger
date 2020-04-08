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

var number = "Work";

var htmlFile = {
	Name: "index_Work.html"
};

var nameFileCss = "style" + number;

var source = {
	//webroot: "./wwwroot/"
	webroot: "source/"
};

//---------------------------------------------------------

// Размещение файлов scss
source.Scss = source.webroot + "scss/" + number + "/*.scss";

// Размещение файлов scss, где при образовании файлов в css необходимо очищать
source.ClearCssMinOfScss = source.webroot + "scss/" + number + "/*.min.css";
source.ClearCssMapOfScss = source.webroot + "scss/" + number + "/*.map";

// Размещение файлов которые требуется минимизировать
// (получаются при обработке функции преобразовании файлов scss)
source.Css = source.webroot + "css/" + number + "/*.css";
source.CssMin = source.webroot + "css/" + number + "/*.min.cs";

//Окончательная папка, где сохраняюся файлы css при минимизации
source.distDirectoryPath = source.webroot + "css/" + number;

//source.Js = source.webroot + "css/*.min.css";

//---------------------------------------------------------

// Функция для очистки ненужных файлов css после scss 
var ClearCssOfScss = function (done) {
	rimraf(source.ClearCssMinOfScss, done);
	rimraf(source.ClearCssMapOfScss, done);
};

gulp.task('ClearCssOfScss', ClearCssOfScss);

//----------------------------------------------------------------

// Минимизация файлов css
var cssMin = function () {
	return gulp
		.src([source.Css, "!" + source.CssMin])
		// Имя файла при минимизации
		.pipe(concat(nameFileCss + ".min.css"))
		.pipe(cssmin())
		.pipe(gulp.dest(source.distDirectoryPath));
};

gulp.task('cssMin', cssMin);

//----------------------------------------------------------------

// Работа с файлами scss
var functionSass = function (done) {

	// Папка, где сохраняются файлы *.scss 
	gulp.src([source.Scss])
		//параметр для минификации - compressed
		.pipe(sass({ outputStyle: 'expanded' }))

		//Расположение преобразованных файлов *.css 
		.pipe(gulp.dest(source.distDirectoryPath))

		// соединение веб-браузера
		.pipe(browserSync.stream());

	done();
}

// Создание задачи в Visual Studio
// Tasks Manager (Диспетчер выполнения задач)
gulp.task('FilesSCSS', functionSass);



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
		gulp.series(functionSass, cssMin, ClearCssOfScss));

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
	gulp.series(functionService, functionSass, cssMin, ClearCssOfScss));

