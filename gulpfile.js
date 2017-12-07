'use strict';

const   config = require('./gulpconfig.js'),
	gulp = require('gulp'),
	rigger = require('gulp-rigger'),
	less = require('gulp-less'),
	lesshint = require('gulp-lesshint'),
	autoprefixer = require('gulp-autoprefixer'),
	cleancss = require('gulp-clean-css'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	connect = require('gulp-connect'),
	gutil = require('gulp-util'),
	browserSync = require('browser-sync').create();


gulp.task('css',function() {
return gulp.src(config.paths.less)
	.pipe(less())
	.on('error', function(err) {
	const type = err.type || '';
	const message = err.message || '';
	const extract = err.extract || [];
	const line = err.line || '';
	const column = err.column || '';
	gutil.log(gutil.colors.red.bold('[Less error]') +' '+ gutil.colors.bgRed(type) +' ('+ line +':'+ column +')');
	gutil.log(gutil.colors.bold('message:') +' '+ message);
	gutil.log(gutil.colors.bold('codeframe:') +'\n'+ extract.join('\n'));
	this.emit('end');
	})
	.pipe(autoprefixer())
	// .pipe(cleancss({compatibility: 'ie8'}))
	.pipe(gulp.dest(config.paths.build +'/stylesheets'));
});






gulp.task('lessLint',function(){
    return gulp.src(config.paths.less)
	    .pipe(lesshint())
	    .pipe(lesshint.reporter('reporter-name'));
	    // .pipe(lesshint.failOnError()); // Use this to fail the task on lint errors
});



gulp.task('js',function(){
    return gulp.src(config.paths.js)
        // .pipe(uglify())
        .pipe(gulp.dest(config.paths.build + '/js'))
});


//html task
gulp.task('html',function(){
    return gulp.src(config.paths.mainHtml)
        .pipe(rigger())
        .pipe(gulp.dest(config.paths.build))
});

//img task
gulp.task('img',function(){
    return gulp.src(config.paths.img)
        .pipe(imagemin())
        .pipe(gulp.dest(config.paths.build + '/img'))
});

//server
gulp.task('server', function(){
    connect.server({root: config.paths.build, port: config.port});
});

//Gulp serve task - initializes browser synchronization
gulp.task('serve', ['server'], function() {
    browserSync.init(null, config.browserSync);
});


//watchers
gulp.task('watch', function(){
    gulp.watch(config.paths.img, ['img']);
    gulp.watch(config.paths.templateLess, [/*'lessLint',*/'css']);
    gulp.watch(config.paths.less, [/*'lessLint',*/'css']);
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.mainHtml, ['html']);
    gulp.watch(config.paths.js, ['js']);
});


gulp.task('default', ['img',/*'lessLint',*/'css', 'js', 'html', 'serve', 'watch']);
