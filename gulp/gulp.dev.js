const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const del = require('del');
const loadPlugins = require('gulp-load-plugins');
const config = require('./gulp.config');

const $ = loadPlugins();

/**
 * @description
 */
function clean () {
  return del([ config.dist ]);
}

/**
 * @description
 */
function styles () {
  return (
    gulp
      .src(config.scss.src)
      // .pipe($.wait())
      .pipe($.plumber())
      .pipe($.sassLint())
      .pipe($.sassLint.format())
      .pipe(
        $.sass(config.sassConfig)
      )
      .on('error', $.sass.logError)
      .pipe($.postcss())
      .pipe(gulp.dest(config.scss.dest))
      .pipe(gulp.dest(config.css.dest))
  );
}

/**
 * @description
 */
function scripts () {
  return (
    gulp
      .src(config.js.src)
      .pipe($.plumber())
      .pipe(
        $.eslint(config.eslintConfig)
      )
      .pipe($.eslint.format())
      // .pipe($.eslint.failAfterError())
      .pipe($.babel())
      .on('error', err => {
        console.log(err);
      })
      .pipe(gulp.dest(config.js.dest))
  );
}

/**
 * @description
 */
function images () {
  return gulp.src(config.img.src).pipe($.changed(config.img.dest)).pipe(gulp.dest(config.img.dest));
}

/**
 * @description
 */
function html () {
  return gulp.src(config.html.src).pipe($.changed(config.html.dest)).pipe(gulp.dest(config.html.dest));
}

/**
 * @description
 */
function assets () {
  return gulp.src(config.static.src).pipe($.changed(config.static.dest)).pipe(gulp.dest(config.static.dest));
}

/**
 * @description
 */
function fonts () {
  return gulp.src(config.fonts.src).pipe($.changed(config.fonts.dest)).pipe(gulp.dest(config.fonts.dest));
}

/**
 * @description
 */
function server () {
  browserSync.init({
    server: {
      baseDir: `./${config.dist}`
    }
  });

  gulp.watch(config.scss.src, styles);
  gulp.watch(config.js.src, scripts);
  gulp.watch(config.img.src, images);
  gulp.watch(config.html.src, html);
  gulp.watch(config.static.src, assets);
  gulp.watch([ `${config.dist}/**` ]).on('change', browserSync.reload);
}

module.exports = gulp.series(clean, gulp.parallel(styles, scripts, images, html, assets, fonts), server);
