var gulp         = require('gulp'),                 // Подключаем Gulp
    sass         = require('gulp-sass'),            //Подключаем Sass пакет,
    browserSync  = require('browser-sync'),         // Подключаем Browser Sync
    cssnano      = require('gulp-cssnano'),         // Подключаем пакет для минификации CSS
    rename       = require('gulp-rename'),          // Подключаем библиотеку для переименования файлов
    autoprefixer = require('gulp-autoprefixer');    // Подключаем библиотеку для автоматического добавления префиксов

//преобразование scss и sass в css
gulp.task('sass', function(){                       // Создаем таск Sass
    return gulp.src('app/scss/**/*.+(scss|sass)')           // Берем источник
        .pipe(sass())                               // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
        .pipe(gulp.dest('app/css'))                 // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true}))   // Обновляем CSS на странице при изменении
});

// Перезагрузка сервака
gulp.task('browser-sync', function() {      // Создаем таск browser-sync
    browserSync({                           // Выполняем browserSync
        server: {                           // Определяем параметры сервера
            baseDir: 'app'                  // Директория для сервера - app
        },
        notify: false                       // Отключаем уведомления
    });
});



gulp.task('css-libs', ['sass'], function() {
    return gulp.src('app/css/style.css')              // Выбираем файл для минификации
        .pipe(cssnano())                             // Сжимаем
        .pipe(rename({suffix: '.min'}))              // Добавляем суффикс .min
        .pipe(gulp.dest('app/css'));                 // Выгружаем в папку app/css
});

gulp.task('watch', ['browser-sync', 'css-libs'], function() {
    gulp.watch('app/scss/**/*.+(scss|sass)', ['sass']);         // Наблюдение за sass файлами в папке sass
    gulp.watch('app/css/jquery-ui.css', browserSync.reload);         // Наблюдение за css файлами в папке sass
    gulp.watch('app/js/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
    gulp.watch('app/*.html', browserSync.reload);       // Наблюдение за HTML файлами в корне проекта
});



gulp.task('default', ['watch']);