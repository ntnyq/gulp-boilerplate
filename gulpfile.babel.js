import gulp from 'gulp';
import browserSync from 'browser-sync';
import del from 'del';
import loadPlugins from 'gulp-load-plugins';

const $ = loadPlugins();
const PATH = {
  scss: {
    src: 'src/scss/*.scss',
    dest: 'src/css'
  },
  css: {
    dest: 'dist/css'
  },
  js: {
    src: 'src/js/**/*.js',
    dest: 'dist/js'
  },
  img: {
    src: 'src/img/**/*.{jpg,jpeg,png,gif}',
    dest: 'dist/img'
  },
  html: {
    src: 'src/*.html',
    dest: 'dist'
  },
  static: {
    src: 'src/static/**',
    dest: 'dist/static'
  }
};

export const clean = () => del([ 'dist' ]);

/**
 * @description
 */
export function styles () {
  return gulp.src(PATH.scss.src)
    .pipe($.wait())
    .pipe($.sass({
      outputStyle: 'compact',
      precision: 5,
      sourceComments: false
    })).on('error', $.sass.logError)
    .pipe($.postcss())
    .pipe(gulp.dest(PATH.scss.dest))
    .pipe(gulp.dest(PATH.css.dest))
    .pipe($.rename({ suffix: '.min' }))
    .pipe($.cleanCss())
    .pipe(gulp.dest(PATH.css.dest))
    .pipe(browserSync.reload({ stream: true }));
}

/**
 * @description
 */
export function scripts () {
  return gulp.src(PATH.js.src)
    .pipe($.plumber())
    .pipe($.babel())
    .on('error', err => { console.log(err) })
    .pipe(gulp.dest(PATH.js.dest))
    .pipe($.rename({ suffix: '.min' }))
    .pipe($.uglify())
    .pipe(gulp.dest(PATH.js.dest))
    .pipe(browserSync.reload({ stream: true }));
}

/**
 * @description
 */
export function images () {
  return gulp.src(PATH.img.src)
    .pipe($.changed(PATH.img.dest))
    .pipe($.imagemin({
      progressive: true,
      interlaced: true,
      optimizationLevel: 5
    }))
    .pipe(gulp.dest(PATH.img.dest))
    .pipe($.size({ title: 'Images' }));
}

/**
 * @description
 */
export function html () {
  return gulp.src(PATH.html.src)
    .pipe($.changed(PATH.html.dest))
    .pipe(gulp.dest(PATH.html.dest));
}

/**
 * @description
 */
export function assets () {
  return gulp.src(PATH.static.src)
    .pipe($.changed(PATH.static.dest))
    .pipe(gulp.dest(PATH.static.dest));
}

/**
 * @description
 */
export function watch () {
  gulp.watch(PATH.scss.src, styles);
  gulp.watch(PATH.js.src, scripts);
  gulp.watch(PATH.img.src, images);
  gulp.watch(PATH.html.src, html);
  gulp.watch(PATH.static.src, assets);
}

/**
 * @description
 */
export function server () {
  browserSync({
    server: {
      baseDir: './dist/',
      injectChanges: true
    }
  });
  gulp.watch(['dist/**']).on('change', browserSync.reload);
}

/**
 * @description
 */
export const dev = gulp.series(clean, gulp.parallel(styles, scripts, images, html, assets, server, watch));

/**
 * @description
 */
export const build = gulp.series(clean, gulp.parallel(styles, scripts, images, html, assets));
