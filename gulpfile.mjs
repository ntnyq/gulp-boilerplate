import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import browserSync from 'browser-sync'
import fs from 'fs-extra'
import gulp from 'gulp'
import gulpBabel from 'gulp-babel'
import gulpBase64 from 'gulp-base64'
import gulpCleanCSS from 'gulp-clean-css'
import gulpConcat from 'gulp-concat'
import gulpIf from 'gulp-if'
import gulpPlumber from 'gulp-plumber'
import gulpPostCSS from 'gulp-postcss'
import gulpSass from 'gulp-sass'
import gulpUglify from 'gulp-uglify'
import * as dartSass from 'sass'

const sass = gulpSass(dartSass)
const isMinify = Boolean(process.env.MINIFY)
const useServer = Boolean(process.env.SERVE)
const isProduction = process.env.NODE_ENV === 'production'

const config = {
  devTagretPath: 'dist',
  buildTagretPath: 'dist',

  // glob
  globCore: [
    'src/js/common/core/start.js',
    'src/js/common/core/!(start|end).js',
    'src/js/common/core/end.js',
  ],
  globScripts: ['src/js/**/*.js', '!src/js/common/core/*.js'],
}

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const resolve = (...args) => path.resolve(__dirname, ...args)
const destDir = () => (isProduction ? config.buildTagretPath : config.devTagretPath)

const clean = () =>
  Promise.all(['css', 'images', 'js', 'static'].map(dir => fs.remove(resolve(destDir(), dir))))

function styles() {
  return gulp
    .src(['src/scss/**/*.scss'], { since: gulp.lastRun(styles) })
    .pipe(gulpPlumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpPostCSS())
    .pipe(
      gulpIf(
        isMinify,
        gulpBase64({
          extensions: ['svg', 'png'],
          maxImageSize: 8 << 10, // 8kb
        }),
      ),
    )
    .pipe(gulpIf(isMinify, gulpCleanCSS()))
    .pipe(gulp.dest('src/css'))
    .pipe(gulp.dest(`${destDir()}/css`))
}

function scripts() {
  return gulp
    .src(config.globScripts, { since: gulp.lastRun(scripts) })
    .pipe(gulpPlumber())
    .pipe(gulpBabel())
    .pipe(gulpIf(isMinify, gulpUglify()))
    .pipe(gulp.dest(`${destDir()}/js`))
}

function core() {
  return gulp
    .src(config.globCore, { since: gulp.lastRun(core) })
    .pipe(gulpPlumber())
    .pipe(gulpConcat('core.js'))
    .pipe(gulpBabel())
    .pipe(gulpIf(isMinify, gulpUglify()))
    .pipe(gulp.dest(`${destDir()}/js/common`))
}

function images() {
  return gulp
    .src('src/images/**/*.{png,jpg,jpeg,gif}', { since: gulp.lastRun(images) })
    .pipe(gulp.dest(`${destDir()}/images`))
}

function statics() {
  return gulp
    .src('src/static/**', { since: gulp.lastRun(statics) })
    .pipe(gulp.dest(`${destDir()}/static`))
}

function htmls() {
  return gulp.src('src/*.html', { since: gulp.lastRun(htmls) }).pipe(gulp.dest(destDir()))
}

function watch(done) {
  gulp.watch('src/scss/**/*.scss', styles)
  gulp.watch(config.globScripts, scripts)
  gulp.watch(config.globCore, core)
  gulp.watch('src/images/**/*.{png,jpg,jpeg,gif}', images)
  gulp.watch('src/static/**', statics)

  if (!useServer) return done()

  const browser = browserSync.create()

  browser.init({
    server: {
      baseDir: destDir(),
    },
    serveStatic: [destDir()],
  })

  gulp.watch('src/*.html', htmls)
  gulp.watch([`${destDir()}/**`, `!${destDir()}/static/**`]).on('change', () => {
    browser.reload()
  })
}

const sharedTask = gulp.parallel(core, styles, scripts, images, statics)

export const dev = gulp.series(clean, sharedTask, ...(useServer ? [htmls] : []), watch)

export const build = gulp.series(clean, sharedTask)
