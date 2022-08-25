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
const destDir = () => isProduction ? `dist` : `dist`

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

const sharedTask = gulp.parallel(styles, scripts, images)

exports.dev = gulp.series(clean, sharedTask)
exports.build = gulp.series(clean, sharedTask)
