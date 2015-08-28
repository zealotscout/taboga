var gulp = require('gulp'), 
    sass = require('gulp-ruby-sass') ,
    notify = require("gulp-notify") ,
    uglify  = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    convert = require('gulp-sass'),
    bower = require('gulp-bower');
    
var config = {
     sassPath: './resources/sass',
     bowerDir: './bower_components' 
}

gulp.task('bower', function() { 
    return bower()
         .pipe(gulp.dest(config.bowerDir)) 
});

gulp.task('icons', function() { 
    return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*') 
        .pipe(gulp.dest('./public/fonts')); 
});

gulp.task('css', function() { 
    return gulp.src(config.sassPath + '/style.scss')
         .pipe(sass({
             style: 'compressed',
             loadPath: [
                 './resources/sass',
                 config.bowerDir + '/bootstrap-sass-official/assets/stylesheets',
                 config.bowerDir + '/fontawesome/scss',
             ]
         }) 
            .on("error", notify.onError(function (error) {
                 return "Error: " + error.message;
             }))) 
         .pipe(gulp.dest('css')); 
});

gulp.task('sass', function () {
    return gulp.src('./bower_components/bootstrap-sass-official/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('taboga',['js'], function () {
return  gulp.src('./resources/**/app.scss')
    .pipe(convert().on('error', convert.logError))
    .pipe(rename('taboga.css'))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('js',['bower'], function () {
    return gulp.src('./bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js')
        .pipe(uglify())
        .pipe(rename('bootstrap.min.js'))

        .pipe(gulp.dest('./build/js'));
});

gulp.task('tabogaScripts', function () {
    return gulp.src('./resources/js/taboga.js')
        .pipe(uglify())
        .pipe(rename('taboga.min.js'))

        .pipe(gulp.dest('./build/js'));
});

// Rerun the task when a file changes
 gulp.task('watch', function() {
     gulp.watch(config.sassPath + '/**/*.scss', ['css']); 
});

  gulp.task('default', ['bower', 'icons', 'css','taboga','js','tabogaScripts']);
