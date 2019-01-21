const config = {
  dist: 'dist',
  scss: {
    src: 'src/scss/**/*.scss',
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
    src: 'src/img/**/*.{jpg,jpeg,png,gif,svg}',
    dest: 'dist/img'
  },
  html: {
    src: 'src/*.{html,ico}',
    dest: 'dist'
  },
  static: {
    src: 'src/static/**',
    dest: 'dist/static'
  },
  fonts: {
    src: 'src/fonts/**',
    dest: 'dist/fonts'
  },

  base64Config: {
    extensions: [ 'svg', 'png' ],
    maxImageSize: 8 * 1024
  },

  sassConfig: {
    outputStyle: 'compact',
    precision: 5,
    sourceComments: false
  },

  eslintConfig: {
    globals: [ 'jQuery', '$', 'layer', 'echarts', 'Swiper' ]
  },

  htmlReplaceConfig: {
    css: `./css/style.min.css?ts=${Date.now()}`,
    js: `./js/index.min.js?ts=${Date.now()}`
  },

  dev: {},

  prod: {}
};

module.exports = config;
