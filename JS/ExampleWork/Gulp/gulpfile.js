// Подключение всех плагинов
var gulp = require('gulp');
var less = require('gulp-less');
var imagemin = require('gulp-imagemin');
var autopolyfiller = require('gulp-autopolyfiller');
var connect = require('gulp-connect');

// Функции для каждого из плагинов
function lessToCSS(done) { // Превращение Less в CSS
  gulp.src('./less/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('./public/css'))
    .pipe(connect.reload());
  done();
}

function imageSize(done) { // Уменьшение размера изображений
  gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
    .pipe(connect.reload());
  done();
}

function prefixJS(done) { // Префиксы для JS
  gulp.src('./lib/**/*.js')
    .pipe(autopolyfiller('some_new_file.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
  done();
}

function serverConnect(done) { // Старт сервера
  connect.server({
    port: 8888
  });
  done();
}

// Watch-таск
function watchAll() {
  // Проверка различных изменений в файлах и вызов соответсвующих функций
  gulp.watch('./less/**/*.less', lessToCSS);
  gulp.watch('src/images/*', imageSize);
  gulp.watch('./lib/**/*.js', prefixJS);
}

// Создаем задачу по-умолчанию и вызываем сервер и watch таски параллельно
gulp.task('default', gulp.parallel(serverConnect, watchAll));
