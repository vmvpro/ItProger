//exports.myVMV = myVMV;

var gulp = require("gulp");
var rename = require("gulp-rename");
//var sass_ = require('gulp-sass');


// Задача на копирование css-файлов из преобразования scss
// Копирование будет происходить из папки scss в css
function CopyCss(done) {

	gulp.src("./scss/style.scss")
		.pipe(rename("main.css"))
		.pipe(gulp.dest("./css"));

	done();
}

gulp.task(functionSass);

