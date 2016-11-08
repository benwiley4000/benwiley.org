var gulp = require('gulp');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');

gulp.task('copy', [
  'copy:html',
  'copy:libs',
  'copy:audio',
  'copy:images',
  'copy:documents',
  'copy:favicon'
]);

gulp.task('copy:html', function () {
  return gulp.src('src/index.html')
    .pipe(plumber())
    .pipe(gulp.dest('dist/'));
});

gulp.task('copy:libs', function () {
  return gulp.src([
    'jquery-2.1.4.min.js',
    'underscore-min.js',
    'backbone-min.js',
    'moment.min.js'
  ], { cwd: 'src/js/lib/' })
    .pipe(plumber())
    .pipe(concat('libs.js'))
    .pipe(gulp.dest('dist/'), { cwd: '../../../' });
});

gulp.task('copy:audio', function () {
  return gulp.src('src/audio/*')
    .pipe(plumber())
    .pipe(gulp.dest('dist/audio/'));
});

gulp.task('copy:images', function () {
  return gulp.src('src/img/*')
    .pipe(plumber())
    .pipe(gulp.dest('dist/img/'));
});

gulp.task('copy:documents', function () {
  return gulp.src('src/doc/*')
    .pipe(plumber())
    .pipe(gulp.dest('dist/doc/'));
});

gulp.task('copy:favicon', function () {
  return gulp.src('src/favicon.ico')
    .pipe(plumber())
    .pipe(gulp.dest('dist/'));
});

gulp.task('buildjs', function () {
  return gulp.src([
    'src/js/app/models/*.js',
    'src/js/app/!(models)/*.js',
    'src/js/app/*.js',
    'src/js/data/*.js'
  ]).pipe(plumber())
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(rename('index.js'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('lint', function () {
  return gulp.src('src/js/app/**/*.js')
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('styles', function () {
  return gulp.src('*.css', { cwd: 'src/css/' })
    .pipe(plumber())
    .pipe(concat('all.css'))
    .pipe(autoprefixer({ browsers: ['> 2%'] }))
    .pipe(minifyCSS())
    .pipe(rename('index.css'))
    .pipe(gulp.dest('dist/'), { cwd: '../../' });
});

gulp.task('watch', function () {
  gulp.watch('src/index.html', ['copy:html']);
  gulp.watch('src/js/**/*.js', ['buildjs', 'lint']);
  gulp.watch('src/css/*.css', ['styles']);
});

gulp.task('default', ['copy', 'buildjs', 'lint', 'styles', 'watch']);
