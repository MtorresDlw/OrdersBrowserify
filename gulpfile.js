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
gulp.task('styles', ['clean:styles'], function(){
    return gulp.src(paths.styles)
        .pipe(less())
        .pipe(gulp.dest(paths.dist + '/css'));
});

gulp.task('default', ['html', 'scripts', 'styles']);
