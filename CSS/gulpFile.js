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



var htmlFile = {
	Name: "index_03_AddStyles.html"
};

var nameFileCss = "style03";

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
	rimraf("source/scss/*.min.css", done);
	rimraf("source/scss/*.map", done);
	log('cssClean');
};

//var deleteFiles = function() {

//	return del(['source/css_/*.css', '!source/css_/*.vmv']);
//	log('Delete files');
//};

//var deleteFiles = () => {
//	return del(['source/css_/*.css', 'source/scss/*.css', '!source/css_/*.vmv']);
//}

//gulp.task('deleteFiles', deleteFiles);


//gulp.task("clean:css", function (done) {
//	rimraf("source/scss/*.min.css", done);
//	rimraf("source/scss/*.map", done);
//});

//gulp.task('Clean: css, js',
//	gulp.series('clean:css', 'clean:css'));

//----------------------------------------------------------------


var cssMin = function () {
	return gulp.src(["source/css/03/*.css", "!source/css/03/*.min.css"])
		//.pipe(concat("source/css_/" + nameFileCss + ".min.css"))
		.pipe(concat(nameFileCss + ".min.css"))
		.pipe(cssmin())
		//.pipe(gulp.dest("."))
		.pipe(gulp.dest("source/css_"))

		;

};

//----------------------------------------------------------------
var functionSass = function (done) {

	//deleteFiles;

	// Папка, где сохраняются файлы *.scss 
	// (ProjectCustomerDevelop/scss)
	gulp.src("source/scss/*.scss")
		//.pipe(deleteFiles)

		//параметр для минификации - compressed
		.pipe(sass({ outputStyle: 'expanded' }))

		//Расположение преобразованных файлов *.css 
		.pipe(gulp.dest("source/css/03"))

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
		"source/scss/*.scss",
		gulp.series(functionSass, cssMin, cssClean));

	//gulp.watch("source/scss/*.scss", gulp.series(functionSass))
	//	.on('all', () => {
	//		log('on change');
	//		cssCleanFunc(done);
	//		gulp.series(cssMin, cssClean);
	//		done();
	//	});

	//---------------------------------------------------

	gulp.watch(htmlFile.Name)
		.on('change', () => {
			browserSync.reload();
			done();
		});

	done();
}

// Создание задачи в Visual Studio
// Tasks Manager (Диспетчер выполнения задач)
gulp.task('run_service',
	gulp.series(functionSass, functionService, cssMin, cssClean));

