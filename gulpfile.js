var gulp = require('gulp'), 
    sass = require('gulp-ruby-sass') ,
    notify = require("gulp-notify") ,
    minify = require('gulp-minify-css');
    uglify  = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    convert = require('gulp-sass'),
    bower = require('gulp-bower');
    
var config = {
     sassPath: './resources/sass',
     bowerDir: './bower_components' 
};

gulp.task('bower', function () { 
    return bower()
         .pipe(gulp.dest(config.bowerDir)) 
});

gulp.task('css', function() { 
    return gulp.src(config.sassPath + '/app.scss')
         .pipe(sass({
             style: 'compressed',
             loadPath: [
                 config.sassPath
             ]
         }) 
        .on("error", notify.onError(function (error) {
            return "Error: " + error.message;
        }))) 
         .pipe(gulp.dest('./build/css')); 
});

gulp.task('taboga', ['js'], function () {
    return  gulp.src('./resources/**/app.scss')
        .pipe(convert().on('error', convert.logError))
        .pipe(rename('taboga.css'))
        .pipe(gulp.dest('./build/css'));
});

gulp.task('js', ['bower'], function () {
    return gulp.src('./bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js')
        .pipe(uglify())
        .pipe(rename('bootstrap.min.js'))
        .pipe(gulp.dest('./build/js'));
});

gulp.task('styles', function () {
    return gulp.src('./build/css/taboga.css')
        .pipe(minify({compatibility: 'ie8'}))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./build/css'));
});

gulp.task('scripts', function () {
    return gulp.src('./resources/js/taboga.js')
        .pipe(uglify())
        .pipe(rename('taboga.min.js'))
        .pipe(gulp.dest('./build/js'));
});

// Rerun the task when a file changes
 gulp.task('watch', function () {
     gulp.watch(config.sassPath + '/**/*.scss', ['css', 'taboga']); 
});

  gulp.task('default', ['bower', 'css', 'taboga', 'js', 'styles', 'scripts']);