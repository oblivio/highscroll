var gulp = require('gulp')
, uglify = require("gulp-uglify");
var rename = require('gulp-rename');
var concat = require('gulp-concat');

var minifyCSS = require('gulp-minify-css');

// task
//Concatenate & Minify JS
gulp.task('minify-js', function() {
    return gulp.src('src/js/*.js')
        .pipe(concat('highscroll.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('highscroll.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

//create task
gulp.task('minify-css', function(){
    return gulp.src('src/stylesheets/*.css')
        .pipe(minifyCSS())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('dist/css'))
});

//Compile Our Sass
//gulp.task('sass', function() {
//    return gulp.src('scss/*.scss')
//        .pipe(sass())
//        .pipe(gulp.dest('dist/css'));
//});