const gulp = require('gulp');
const del = require('del');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
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
      .pipe($.sass(config.sassConfig))
      .on('error', $.sass.logError)
      .pipe($.postcss())
      // .pipe(gulp.dest(config.scss.dest))
      .pipe($.base64(config.base64Config))
      .pipe(gulp.dest(config.css.dest))
      .pipe($.rename({ suffix: '.min' }))
      .pipe($.cleanCss())
      .pipe(gulp.dest(config.css.dest))
  );
}

/**
 * @description
 */
function scripts () {
  return gulp
    .src(config.js.src)
    .pipe($.plumber())
    .pipe($.babel())
    .on('error', err => {
      console.log(err);
    })
    .pipe(gulp.dest(config.js.dest))
    .pipe($.rename({ suffix: '.min' }))
    .pipe($.uglify())
    .pipe(gulp.dest(config.js.dest));
}

/**
 * @description
 */
function images () {
  return gulp
    .src(config.img.src)
    .pipe(
      $.imagemin(
        [
          $.imagemin.gifsicle({ interlaced: true }),
          $.imagemin.jpegtran({ progressive: true }),
          $.imagemin.optipng({ optimizationLevel: 7 }),
          $.imagemin.svgo(),
          imageminMozjpeg({ quality: 70 }),
          imageminPngquant({ quality: '65-80' })
        ],
        { verbose: false }
      )
    )
    .pipe(gulp.dest(config.img.dest))
    .pipe($.size({ title: 'Images' }));
}

/**
 * @description
 */
function html () {
  return gulp.src(config.html.src).pipe($.htmlReplace(config.htmlReplaceConfig)).pipe(gulp.dest(config.html.dest));
}

/**
 * @description
 */
function assets () {
  return gulp.src(config.static.src).pipe(gulp.dest(config.static.dest));
}

/**
 * @description
 */
function fonts () {
  return gulp.src(config.fonts.src).pipe($.changed(config.fonts.dest)).pipe(gulp.dest(config.fonts.dest));
}

module.exports = gulp.series(clean, gulp.parallel(styles, scripts, images, assets, fonts), html);
