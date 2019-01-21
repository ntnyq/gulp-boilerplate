// See docs at https://github.com/eslint/eslint

module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true
  },
  extends: [ 'standard' ],
  rules: {
    semi: [ 2, 'always' ]
  },
  globals: {
    $: 'jQuery',
    Swiper: 'Swiper'
  }
}
