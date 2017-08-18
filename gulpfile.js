const gulp          = require('gulp'),
      uglify        = require('gulp-uglify'),
      connect       = require('gulp-connect'),
      less          = require('gulp-less'),
      del           = require('del'),
      util          = require('gulp-util'),
      jshint        = require('gulp-jshint'),
      concat        = require('gulp-concat'),
      watch         = require('gulp-watch'),

      //BrowserSync
      browserSync   = require('browser-sync').create(),

      //Browserify + Watchify
      browserify    = require('browserify'),
      watchify      = require('watchify'),
      buffer        = require('vinyl-buffer'),
      source        = require('vinyl-source-stream'),
      sourcemaps    = require('gulp-sourcemaps'),
      assign        = require('lodash.assign')


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
    gulp.watch(paths.scripts, ['lint', 'browserify']).on("change", browserSync.reload);
    gulp.watch(paths.styles, ['styles']).on("change", browserSync.reload);
    gulp.watch(paths.html, ['html']).on("change", browserSync.reload);
    gulp.watch(paths.images, ['images']).on("change", browserSync.reload);
});

/*
* Browserify
*/
gulp.task('browserify', function(){
    return browserify('./app/scripts/app.js').bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dist'));
});

/*
* Options Browserify
*/
var customOpts = {
    entries: ['./app/app.js'],
    debug: true
};

/*
* Utilisation du module lodash.assign pour fusionner
* les options browserify et watchify dans un même objet
*/
var opts = assign({}, watchify.args, customOpts);

//Initialisation de Watchify
var bundler = watchify(browserify(opts));

bundler.on('update', bundle); //listener sur l'évènement 'update' pour maj le bundle
bundler.on('log', gutil.log); //log les sorties du bundler sur le terminal
gulp.task('scripts', bundle); //ajout de la tâche "gulp scripts" pour assemble le bundle

function bundle() {
    return bundler.bundle()
        //log les erreurs quand elles surviennent
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('bundle.js'))
        //optionnel, permet de bufferiser le contenu des fichiers pour améliorer les perf du build
        .pipe(buffer())
        //optionnel, permet d'ajouter les sourcemaps pour le debug
        .pipe(sourcemaps.init({loadMaps: true}))
        //Ecrit les fichiers .map
        .pipe(sourcemaps.write('./'))
        //Copie le tout dans le répertoire final
        .pipe(gulp.dest(paths.dist))
        //Stream le résultat à BrowserSync pour qu'il recharge auto la page
        .pipe(browserSync.stream());
}

/*
* Macro task to re-build the dist directory
*/
gulp.task('build', [
    'lint',
    'browserify',
    'html',
    'images',
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
