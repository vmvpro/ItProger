var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

var functionSass = function (done) {

	// Папка, где сохраняются файлы *.scss 
	// (ProjectCustomerDevelop/scss)
	gulp.src("scss/*.scss")

		//параметр для минификации - compressed
		.pipe(sass({ outputStyle: 'expanded' }))

		//Расположение преобразованных файлов *.css 
		.pipe(gulp.dest("dist/css"))

		// соединение веб-браузера
		.pipe(browserSync.stream());

	done();
}

var functionService = function (done) {

	browserSync.init(
		{ server: "" }

		// отклчение уведомлений сервера, 
		//{ notify: true } 
	);

	// Подключение слежение за файлами
	gulp.watch(
		"scss/*.scss",
		gulp.series(functionSass));

	// В данном случае, файл в корневом 
	// размецении проекта
	gulp.watch(
		"*.html").on('change', () => {
		browserSync.reload();
		done();
	});

	done();
}

// Создание задачи в Visual Studio
// Tasks Manager (Диспетчер выполнения задач)
gulp.task('run_service',
	gulp.series(functionSass, functionService));

