const gulp = require('gulp');

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
