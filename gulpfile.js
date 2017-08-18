const gulp          = require('gulp'),
      uglify        = require('gulp-uglify'),
      connect       = require('gulp-connect'),
      buffer        = require('vinyl-buffer'),
      source        = require('vinyl-source-stream'),
      less          = require('gulp-less'),
      del           = require('del'),
      util          = require('gulp-util'),
      jshint        = require('gulp-jshint'),
      concat        = require('gulp-concat'),
      watch         = require('gulp-watch'),
      browserSync   = require('browser-sync').create()

//mutualisation des chemins
var paths = {
    dist    : './dist',
    scripts : './app/scripts/**/*.js',
    styles  : './app/css/**/*.less',
    html    : './app/*.html',
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
gulp.task('scripts', function(){
    return gulp.src(paths.scripts)
        .pipe(uglify())
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest(paths.dist + '/js'));
});

//return all html files into all app directories
gulp.task('html', function(){
    return gulp.src([paths.html])
        .pipe(gulp.dest(paths.dist));
});

//return stylesheets
gulp.task('styles', function(){
    return gulp.src(paths.styles)
        .pipe(less())
        .pipe(gulp.dest(paths.dist + '/css'));
});

//return images files to dist directory
gulp.task('images', function(){
    return gulp.src(paths.images)
        .pipe(gulp.dest(paths.dist + '/img'));
});

/*
 * Synchronizes the browser with the 'dist' directory
 */
gulp.task('serve', ['build'], function(){
    browserSync.init({
        name: 'localhost',
        notify: false,
        port: 8080,
        browser: "chrome",
        server: {
            //server files from the dist directory
            baseDir: ['dist']
        }
    });

    /*
    * Watches any change in source code and updates
    * the dist directory in real time
    */
    gulp.watch(paths.scripts, ['lint', 'scripts']).on("change", browserSync.reload);
    gulp.watch(paths.styles, ['styles']).on("change", browserSync.reload);
    gulp.watch(paths.html, ['html']).on("change", browserSync.reload);
    gulp.watch(paths.images, ['images']).on("change", browserSync.reload);
});

/*
* Macro task to re-build the dist directory
*/
gulp.task('build', [
    'lint',
    'html',
    'images',
    'scripts',
    'styles'
]);

/*
* Macro task to cleaning the dist directory
*/
gulp.task('cleaning', [
    'clean:html',
    'clean:scripts',
    'clean:styles',
    'clean:images'
]);

/*
* Default task, builds everything
*/
gulp.task('default', ['cleaning', 'build']);
