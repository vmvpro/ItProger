// Для проверки
//function myVMV(done) {
//	console.log("myVMV");

//	done();
//}

//exports.myVMV = myVMV;
//-------------------------------

var gulp = require("gulp");
var rename = require("gulp-rename");
var sass = require("gulp-sass");

var autoprefixer = require("gulp-autoprefixer");
var sourcemaps = require("gulp-sourcemaps");
var browserSync = require("browser-sync");
var сoncat = require("gulp-concat");
var cleanCss = require("gulp-clean-css");
var rimraf = require("rimraf");

var ClearCssOfScss = function (done) {
	rimraf("./scss/*.css", done);
	//rimraf(source.ClearCssMapOfScss, done);
};

gulp.task('ClearCssOfScss', ClearCssOfScss);

// Задача на копирование css-файлов из преобразования scss
// Копирование будет происходить из папки scss в css
function workScss(done) {

	gulp.src(["./scss/**/*.scss"], "!./scss/**/*.css", "!./scss/**/*.map")
		// Предназначенно для просмотра стилей в браузере
		// Происходит инициализация
		//.pipe(sourcemaps.init())
		// Преобразование файлов:  
		.pipe(sass({
			errorLogConsole: true,
			//outputStyle: "compressed"
			outputStyle: "expanded"
		}))
		.on("error", console.error.bind(console))
		//----------------------------------------------
		// Предназначен для разных браузеров при отображении стилей
		.pipe(autoprefixer({
			overrideBrowserslist: ["last 2 versions"],
			cascade: false
		}))
		//.pipe(сoncat("style.min.css"))

		.pipe(сoncat("style.min.css"))
		.pipe(cleanCss())

		//----------------------------------------------
		// Переименование
		//.pipe(rename("main.css"))
		//.pipe(rename({ suffix: ".min" }))
		//----------------------------------------------
		//.pipe(sourcemaps.write("./"))
		//----------------------------------------------
		// Сохранить в конечную папку
		.pipe(gulp.dest("./css"))
		.pipe(browserSync.stream())
		;

	done();
}

gulp.task(workScss);

//--------------
function workCssMin(done) {

	gulp.src(["./css/**/*.css", "!./css/**/*.map"])
		
		.pipe(сoncat("style.min.css"))
		.pipe(cleanCss())
		
		//----------------------------------------------
		// Сохранить в конечную папку
		.pipe(gulp.dest("./css.min"))
		//.pipe(browserSync.stream())
		;

	done();

}


//--------------

gulp.task(workCssMin);

function workScssOutCss(done) {

	gulp.series(workScss, workCssMin);

	//workScss(done);
	//workCssMin(done);

	done();
}


//gulp.task("workScssOutCss_", gulp.series(workScss, workCssMin));

gulp.task("workScssOutCss_", gulp.series(workScss, workCssMin));



//-------------------------

function sync(done) {

	browserSync.init({
		server: {
			baseDir: "./"
		},
		port: 5000
	});

	done();
}

function browserReload(done) {

	browserSync.reload();
	done();
}

//-------------------------
//function watchSass() {
//	gulp.watch([
//		"./scss/**/*.scss", "!./scss/**/*.css", "!./scss/**/*.map"]
//		, workScss);
//}

function watchFiles() {
	gulp.watch([
		"./scss/**/*.scss"
		]
		, workScss);

	gulp.watch(["./scss/style.min.css"], browserReload);

	gulp.watch(["./**/*.html"], browserReload);
	gulp.watch(["./**/*.js"], browserReload);
	//gulp.watch(["./css/*.css", "!./css/*.map"], workCssMin);
	//gulp.watch(["./css.min/*.css"], browserReload);
}

//-------------------------

//gulp.task("allTasksVMV", gulp.parallel(sync, watchFiles, workScss, workCssMin));
gulp.task("allTasksVMV", gulp.parallel(sync, watchFiles, gulp.series(workScss, workCssMin)));


//gulp.task(sync);
