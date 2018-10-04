'use strict';

var gulp = require('gulp'),
	notify = require("gulp-notify"),
	livereload = require('gulp-livereload'),
	rev = require('gulp-rev'),
	revCollector = require('gulp-rev-collector'),
	revOutdated = require('gulp-rev-outdated'),
		gutil = require('gulp-util'),
		rimraf = require('rimraf'),
		path = require('path'),
		through = require('through2'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	cleanCSS = require('gulp-clean-css'),
	rename = require("gulp-rename"),
	clean = require('gulp-clean'),
	runSequence = require('run-sequence'),
	// concatCSS = require('gulp-concat-css'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglifyjs'),
	jade = require('gulp-jade'),
	strip = require('gulp-strip-comments'),
	jshint = require('gulp-jshint')
;


// Sass processing
gulp.task('sass', function () {
	gulp.src('resources/assets/sass/style.scss')
		.pipe(sass())
		// .pipe(rev())
		.pipe(autoprefixer('last 15 versions', '> 1%', 'ie 9'))
		.pipe(cleanCSS())
	    .pipe(gulp.dest('public/css/'))
		// .pipe(rev.manifest())
		// .pipe(gulp.dest('resources/assets/rev-manifests/'))
	;
});

// js-lib processing
gulp.task('js-lib', function () {
	return gulp.src([
			'resources/assets/libs/min/angular.min.js',
			'resources/assets/libs/min/angular-route.min.js',
			'resources/assets/libs/min/ngStorage.min.js',
			'resources/assets/libs/min/lodash.min.js',
		])
		.pipe(concat('lib.js'))
		.pipe(gulp.dest('public/js/'))
	;
});

// js processing
gulp.task('js', function () {
	var options = {
		// mangle: false,
		
		// mangle: {
		// 	toplevel: true,
		// 	eval: true,
		// },

		mangle: true,
		compress: {
			sequences: true,
			// dead_code: true,
			conditionals: true,
			booleans: true,
			// unused: true,
			if_return: true,
			join_vars: true,
			drop_console: true
		},
	};	
	return gulp.src([
			'resources/assets/js/app.js',
			'resources/assets/js/app/*.js',
			'resources/assets/js/fab/*.js',
			'resources/assets/js/ctrl/*.js',
			'resources/assets/js/dir/*.js',
		])
		.pipe(concat('app.js'))
		.pipe(strip()) //удаляем комментарии (хотя uglify тоже это делает)
		.pipe(uglify(options).on('error', function(e){
			console.log(e);
		}))
		.pipe(gulp.dest('public/js/'))
	;
});

// jade
gulp.task('jade-view', function() {
    return gulp.src('resources/assets/jade/*.jade')
        .pipe(jade({
        	pretty: true,
        })) 
        .pipe(gulp.dest('public/ru/'));
});

gulp.task('jade-email', function() {
    return gulp.src('resources/assets/emails/*.jade')
        .pipe(jade({
        	pretty: true,
        }))
        .pipe(rename(function(path) {
        	path.extname = ".php";
        }))
        .pipe(gulp.dest('resources/views/emails/'));
});

gulp.task('jade-app', function() {
    return gulp.src('resources/assets/app.jade')
        .pipe(jade({
        	pretty: true,
        }))
        .pipe(rename('app.php'))
        .pipe(gulp.dest('resources/views/'));
});

// Следить за папкой css, и при изменении внутри запускать task default
gulp.task('watch', function() {
	gulp.watch('resources/assets/sass/*.scss', ['sass']);
	gulp.watch('resources/assets/libs/min/*.js', ['js-lib']);
	gulp.watch('resources/assets/js/**/*.js', ['js']);
	gulp.watch('resources/assets/app.jade', ['jade-app']);
	gulp.watch('resources/assets/emails/*.jade', ['jade-email']);
	gulp.watch('resources/assets/jade/*.jade', ['jade-view']);
});

gulp.task('default', ['sass', 'js-lib', 'js', 'jade-view', 'jade-email', 'jade-app']);

// js validate
gulp.task('lint', function() {
  return gulp.src('resources/assets/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// gulp.task('default', ['sass', 'js', 'html-templates', 'watch']);

// gulp.task('rev_collector', ['sass'], function () {
//     return gulp.src(['rev-manifests/**/*.json', '*.html'])
//         .pipe( revCollector({
//             replaceReved: true,
//         }) )
//         .pipe( gulp.dest('./'))
//         // .pipe( gulp.dest('out-gulp/'))
//         .pipe(connect.reload());
// });

// function cleaner() {
//     return through.obj(function(file, enc, cb){
//         rimraf( path.resolve( (file.cwd || process.cwd()), file.path), function (err) {
//             if (err) {
//                 this.emit('error', new gutil.PluginError('Cleanup old files', err));
//             }
//             this.push(file);
//             cb();
//         }.bind(this));
//     });
// }

// gulp.task('rev_clean', ['rev_collector'], function() {
//     gulp.src( ['./**/*.*'], {read: false})
//         .pipe( revOutdated(1) ) // leave 1 latest asset file for every file name prefix. 
//         .pipe( cleaner() );
//     return;
// });

// // gulp.task('sass_rev', ['sass', 'rev_collector', 'rev_clean']);
// gulp.task('sass_rev', function(callback) {
//   runSequence('sass', 'rev_collector', 'rev_clean', callback);
// });

// // Css processing
// gulp.task('css', function () {
// 	gulp.src('css/style.css')
// 		// .pipe(concatCSS('bundle.css'))
// 		.pipe(autoprefixer('last 15 versions', '> 1%', 'ie 9'))
// 		.pipe(cleanCSS())
// 	    // .pipe(cleanCSS({compatibility: 'ie8'}))
// 	    .pipe(rename('style.min.css'))
// 	    .pipe(gulp.dest('out-gulp/css/'))
// 	    // .pipe(notify('Done!'))
// 	    .pipe(connect.reload()); // перезагрузка веб-сервера
// });


// // develop task
// // gulp.task('dev', ['connect', 'sass', 'watch']);

// // deploy task
// // gulp.task('default', ['connect', 'html', 'css', 'js', 'html-templates', 'watch']);

// gulp.task('clean', function () {  
//     return gulp.src('out-gulp', {read: false})
//         .pipe(clean());
// });