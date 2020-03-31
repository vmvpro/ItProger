var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

var rimraf = require("rimraf");
var concat = require("gulp-concat");
var cssmin = require("gulp-cssmin");
var uglify = require("gulp-uglify");

var htmlFile = {
	Name: "index_03_AddStyles.html"
};

var nameFileCss = "vmv";

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

//gulp.task("clean:js", function (done) {
//	rimraf(paths.concatJsDest, done);
//});

var cssClean = function (done) {
	rimraf("source/scss/*.min.css", done);
	rimraf("source/scss/*.map", done);
};

//gulp.task("clean:css", function (done) {
//	rimraf("source/scss/*.min.css", done);
//	rimraf("source/scss/*.map", done);
//});

//gulp.task('Clean: css, js',
//	gulp.series('clean:css', 'clean:css'));

//----------------------------------------------------------------

var cssMin = function () {
	return gulp.src(["source/dist/css/*.css", "!source/dist/css/*.min.css"])
		.pipe(concat("source/css/" + nameFileCss + ".min.css"))
		.pipe(cssmin())
		.pipe(gulp.dest("."))
		
		// соединение веб-браузера
		//.pipe(browserSync.stream())
	;
};


//gulp.task("min:css", function () {
//	return gulp.src(["source/css/**/*.css", "!source/css/**/*.min.css"])
//		.pipe(concat(paths.concatCssDest))
//		.pipe(cssmin())
//		.pipe(gulp.dest("."));
//});


//gulp.task("min:js", function () {
//	return gulp.src([paths.webroot + "js/**/*.js", "!" + paths.webroot + "js/**/*.min.js"], { base: "." })
//		.pipe(concat(paths.concatJsDest))
//		.pipe(uglify())
//		.pipe(gulp.dest(""));
//});

//gulp.task("Min: css, js",
//	gulp.series("min:css", "min:js"));

//----------------------------------------------------------------
var functionSass = function (done) {

	// Папка, где сохраняются файлы *.scss 
	// (ProjectCustomerDevelop/scss)
	gulp.src("source/scss/*.scss")

		//параметр для минификации - compressed
		.pipe(sass({ outputStyle: 'expanded' }))

		//Расположение преобразованных файлов *.css 
		.pipe(gulp.dest("source/dist/css"))

		// соединение веб-браузера
		.pipe(browserSync.stream());

	//gulp.log("sdasd");
	gulp.series(cssClean);

	done();
}

var file_ = function () {

};

var functionService = function (done) {

	browserSync.init({
		//server: {
		//	baseDir: "./"
		//}
		//files: ["source/dist/css/vmv.min.css"],

		server: {
			baseDir: "./",
			index: htmlFile.Name
		}
		//socket: {
		//	domain: "localhost:41525"
		//}
		//port: 41525
		//server: ""
		//ui: "port: 41525" 
		//proxy: "http://localhost:41525"
		//proxy: "http://localhost:41525/03_CSS3_AddStyles.html"


	}

		// отклчение уведомлений сервера, 
		//{ notify: true } 
	);

	// В данном случае, файл в корневом 
	// размецении проекта
	

	// Подключение слежение за файлами
	gulp.watch(
		"source/scss/*.scss",
		gulp.series(functionSass, cssMin, cssClean));

	//minCss,

	//gulp.watch("source/css/" + nameFileCss + ".min.css",
	//	gulp.series(minCss));

	gulp.watch(
			"*.html")
		.on('change', () => {
			browserSync.reload("");
			//gulp.series(cssMin);
			done();
		});

	done();
}

// Создание задачи в Visual Studio
// Tasks Manager (Диспетчер выполнения задач)
gulp.task('run_service',
	gulp.series(functionSass, functionService, cssMin, cssClean));

