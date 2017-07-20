
const gulp = require('gulp');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const htmlMin = require('gulp-htmlmin');
const htmlPartial = require('gulp-html-partial');
const server = require('gulp-server-livereload');
const babel = require('gulp-babel');

const styleFiles = [
      './src/scss/app.scss'
  ];
const jsFiles = [
		'./src/js/*.js'
	];
const htmlFiles = [
		'./src/html/*.html'
	];

function onError(err) {
  console.log(err.toString());
  this.emit('end');
}



gulp.task('styles', () => {
  gulp.src(styleFiles)
    .pipe(concat('main.css'))
    .pipe(sass())
    .on('error', onError)
    .pipe(gulp.dest('./build/css/'));
});

gulp.task('scripts', () => {
  gulp.src(jsFiles)
    .pipe(concat('index.js'))
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(uglify())
    .on('error', onError)
    .pipe(gulp.dest('./build/js/'));
});

gulp.task('html', () => {
	gulp.src(htmlFiles)
    .pipe(htmlPartial({
      basePath: './src/html/partials/'
    }))
		.pipe(htmlMin({
			collapseWhitespace: true
		}))
    .on('error', onError)
		.pipe(gulp.dest('./build/'));
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