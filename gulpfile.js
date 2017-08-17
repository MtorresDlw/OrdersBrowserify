const gulp      = require('gulp'),
      uglify    = require('gulp-uglify'),
      connect   = require('gulp-connect'),
      buffer    = require('vinyl-buffer'),
      source    = require('vinyl-source-stream'),
      less      = require('gulp-less'),
      del       = require('del'),
      util      = require('gulp-util'),
      jshint    = require('gulp-jshint')

//mutualisation des chemins
var paths = {
    dist    : './dist',
    scripts : './app/**/*.js',
    styles  : './app/css/**/*.less',
    html    : './app/**/*.html',
    images  : './app/img/*.*'
};

//return all html files into all app directories
gulp.task('html', function(){
    return gulp.src(['./app/*.html', './app/**/*.html'])
        .pipe(gulp.dest('./dist'));
});

//return all scripts
gulp.task('scripts', function(){
    return gulp.src(['./app/scripts/*.js', './app/scripts/**/*.js'])
        .pipe(gulp.dest('./dist/js'));
});

//return stylesheets
gulp.task('styles', function(){
    return gulp.src('./app/css/**/*.css')
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('default', ['html', 'scripts', 'styles']);
