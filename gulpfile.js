
const gulp = require('gulp');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const server = require('gulp-server-livereload');
const babel = require('gulp-babel');

const styleFiles = [
      './src/scss/app.scss'
  ];
// const jsFiles = [
// 		'./src/js/**/*.js'
// 	];
const htmlFiles = [
		'./src/**/*.html'
	];

function onError(err) {
  console.log(err);
  this.emit('end');
}



gulp.task('styles', () => {
  gulp.src(styleFiles)
    .pipe(concat('main.css'))
    .pipe(sass())
    .pipe(gulp.dest('./build/css/'))
    .on('error', onError);
});

gulp.task('scripts', () => {
  gulp.src('./src/js/main.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('./build/js/'))
    .on('error', onError);
});

gulp.task('html', () => {
	gulp.src(htmlFiles)
		.pipe(htmlMin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('./build/'))
    .on('error', onError);
});

gulp.task('server', () => {
	gulp.src('./build')
		.pipe(server({
			livereload: true,
			open: false
		}));
});



gulp.task('watch', () => {
    gulp.watch(['./src/scss/**/*.scss'], ['styles']);
    gulp.watch(['./src/js/**/*.js'], ['scripts']);
    gulp.watch(['./src/**/*.html'], ['html'])
});

gulp.task('build', ['styles', 'scripts', 'html']);

gulp.task('default', ['build', 'watch', 'server']);