const gulp          = require('gulp'),
      uglify        = require('gulp-uglify'),
      connect       = require('gulp-connect'),
      less          = require('gulp-less'),
      del           = require('del'),
      gutil         = require('gulp-util'),
      jshint        = require('gulp-jshint'),
      concat        = require('gulp-concat'),
      watch         = require('gulp-watch'),
      templateCache = require('gulp-angular-templatecache'),

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
    app         : './app',
    dist        : './dist',
    js          : ['./app/scripts/*.js', './app/scripts/**/*.js', '!./app/scripts/bundle.js'],
    less        : './app/css/less/themes/main.less',
    styles      : ['./app/css/less/*.less', './app/css/less/**/*.less'],
    html        : ['./app/*.html', './app/**/*.html'],
    templates   : './app/views/templates/*.html',
    images      : './app/img/*.*',
    fonts       : './node_modules/font-awesome/fonts/**'
};

/**************************************************************************************************
/******* TASKS RUNNER - GULP TEMPLATES - Result : app/scripts/template.js
/**************************************************************************************************/

gulp.task('templates', function(){
    return gulp.src(paths.templates)
        .pipe(templateCache({
            standalone: true
    }))
        .pipe(gulp.dest(paths.app + '/scripts'));
});

/**************************************************************************************************
/******* TASKS RUNNER - CLEANS THE "DIST" DIRECTORY
/**************************************************************************************************/

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

/**************************************************************************************************
/******* TASKS RUNNER
/**************************************************************************************************/

/*
* Checks the validity of JS Code
*/
gulp.task('lint', function(){
    return gulp.src(paths.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

//return all html files into all app directories
gulp.task('html', function(){
    return gulp.src(paths.html)
        .pipe(connect.reload());
});

//return stylesheets
gulp.task('less', function(){
    return gulp.src(paths.less)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest(paths.app + '/css'))
        .pipe(browserSync.reload({
        stream: true
        }));
});

//return images files to dist directory
gulp.task('images', function(){
    return gulp.src(paths.images)
        .pipe(gulp.dest(paths.app + '/img'));
});

/**************************************************************************************************
/******* TASK RUNNER BIBLIOTHEQUE BOOTSTRAP
/**************************************************************************************************/

//return fichier css bootstrap
gulp.task('bootstrap', function(){
    return gulp.src('./node_modules/bootstrap/dist/css/bootstrap.min.css')
        .pipe(gulp.dest(paths.app + '/css'));
});

/**************************************************************************************************
/******* TASK RUNNER BIBLIOTHEQUE FONT-AWESOME
/**************************************************************************************************/

//return fonts Awesome
gulp.task('fonts', function(){
    return gulp.src(paths.fonts)
        .pipe(gulp.dest(paths.app + '/fonts'));
});

//return css fonts Awesome
gulp.task('fontawesome', function(){
    return gulp.src('./node_modules/font-awesome/css/font-awesome.css')
        .pipe(gulp.dest(paths.app + '/css'));
});

/**************************************************************************************************
/******* CONNEXION SERVER
/**************************************************************************************************/

/*
 * Synchronizes the browser with the 'dist' directory
 */
gulp.task('connect', function(){
    browserSync
            .init({
                name: 'localhost',
                notify: false,
                port: 8080,
                browser: "chrome",
                server: {
                    //server files from the app directory with specific file
                    baseDir: 'app',
                    index: 'index.html'
                },
    })

    /*
    * Watches any change in source code and updates
    * the dist directory in real time
    */
    gulp.watch(paths.scripts, ['lint', 'scripts']);
    gulp.watch(['./gulpfile.js']).on("change", browserSync.reload);
    gulp.watch(paths.templates, ['templates']).on("change", browserSync.reload);
    gulp.watch(paths.less, ['less']);
    gulp.watch(paths.html, ['html']).on("change", browserSync.reload);
    gulp.watch(paths.images, ['images']).on("change", browserSync.reload);
});

/**************************************************************************************************
/******* BROWSERIFY + WATCHIFY => bundle.js
/**************************************************************************************************/

/*
* Options Browserify
*/
var customOpts = {
    entries: ['./app/scripts/app.js'],
    debug: true
};

/*
* Utilisation du module lodash.assign pour fusionner
* les options browserify et watchify dans un même objet
*/
var opts = assign({}, watchify.args, customOpts);

//Initialisation de Watchify
var bundler = watchify(browserify(opts));

gulp.task('scripts', bundle); //ajout de la tâche "gulp scripts" pour assembler le bundle
bundler.on('update', bundle); //listener sur l'évènement 'update' pour maj le bundle
bundler.on('log', gutil.log); //log les sorties du bundler sur le terminal

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
        .pipe(gulp.dest(paths.app + '/scripts'))
        //Stream le résultat à BrowserSync pour qu'il recharge auto la page
        .pipe(browserSync.stream());
}

/**************************************************************************************************
/******* MACROS TASK
/**************************************************************************************************/

/*
* Macro task to re-build the dist directory
*/
gulp.task('build', [
    'lint',
    'templates',
    'scripts',
    'html',
    'images',
    'fonts',
    'bootstrap',
    'fontawesome',
    'less'
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

/**************************************************************************************************
/******* BUILDS EXEC TASK
/**************************************************************************************************/

/*
* Default task, builds everything
*/
gulp.task('default', ['build', 'connect']);

