import fs from 'fs-extra'
import gulp from 'gulp'
import dartSass from 'sass'
// import gulpIf from 'gulp-if'
import gulpBabel from 'gulp-babel'
import gulpSass from 'gulp-sass'
import gulpPostCSS from 'gulp-postcss'
import gulpPlumber from 'gulp-plumber'

const sass = gulpSass(dartSass)
const isProduction = process.env.NODE_ENV === `production`
const destDir = () => (isProduction ? `dist` : `dist`)

const clean = () => fs.remove(destDir())

function styles () {
  return gulp
    .src(`src/scss/**/*.scss`, { since: gulp.lastRun(styles) })
    .pipe(gulpPlumber())
    .pipe(sass().on(`error`, sass.logError))
    .pipe(gulpPostCSS())
    .pipe(gulp.dest(`src/css`))
    .pipe(gulp.dest(`${destDir()}/css`))
}

function scripts () {
  return gulp
    .src(`src/js/**/*.js`, { since: gulp.lastRun(scripts) })
    .pipe(gulpPlumber())
    .pipe(gulpBabel())
    .pipe(gulp.dest(`${destDir()}/js`))
}

function images () {
  return gulp
    .src(`src/images/**/*.{png,jpg,jpeg,gif}`, { since: gulp.lastRun(images) })
    .pipe(gulp.dest(`${destDir()}/images`))
}

function statics () {
  return gulp
    .src(`src/static/**`, { since: gulp.lastRun(statics) })
    .pipe(gulp.dest(`${destDir()}/static`))
}

function watch () {
  gulp.watch(`src/scss/**/*.scss`, styles)
  gulp.watch(`src/js/**/*.js`, scripts)
  gulp.watch(`src/images/**/*.{png,jpg,jpeg,gif}`, images)
  gulp.watch(`src/static/**`, statics)
}

const sharedTask = gulp.parallel(
  styles,
  scripts,
  images,
  statics,
)

exports.dev = gulp.series(clean, sharedTask, watch)
exports.build = gulp.series(clean, sharedTask)
