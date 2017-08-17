const gulp      = require('gulp'),
      uglify    = require('gulp-uglify'),
      connect   = require('gulp-connect'),
      buffer    = require('vinyl-buffer'),
      source    = require('vinyl-source-stream'),
      less      = require('gulp-less'),
      del       = require('del'),
      util      = require('gulp-util'),
      jshint    = require('gulp-jshint'),
      concat    = require('gulp-concat')

//mutualisation des chemins
var paths = {
    dist    : './dist',
    scripts : './app/**/*.js',
    styles  : './app/css/**/*.less',
    html    : './app/**/*.html',
    images  : './app/img/*.*'
};

/*
* Cleans the dist directory
*/
gulp.task('clean:scripts', function(cb){
    del(paths.dist + '/js', cb);
});

gulp.task('clean:styles', function(cb){
    del(paths.dist + '/css', cb);
});

gulp.task('clean:images', function(cb){
    del(paths.dist + '/img', cb);
});

gulp.task('clean:html', function(cb){
    del(paths.dist + '/**/*.html', cb);
});

/*
* Checks the validity of JS Code
*/
gulp.task('lint', function(){
    return gulp.src(paths.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

/*
* Concatenates & uglifies JS Scripts into a single file
*/
gulp.task('scripts', ['clean:scripts'], function(){
    return gulp.src(paths.scripts)
        .pipe(uglify())
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest(paths.dist + '/js'));
});

//return all html files into all app directories
gulp.task('html', ['clean:html'], function(){
    return gulp.src(['./app/*.html', './app/**/*.html'])
        .pipe(gulp.dest('./dist'));
});

//return stylesheets
gulp.task('styles', ['clean:styles'], function(){
    return gulp.src(paths.styles)
        .pipe(less())
        .pipe(gulp.dest(paths.dist + '/css'));
});

//return images files to dist directory
gulp.task('images', ['clean:images'], function(){
    return gulp.src(paths.images)
        .pipe(gulp.dest(paths.dist + '/img'));
});

gulp.task('default', ['html', 'scripts', 'styles']);