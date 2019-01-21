// See docs at https://github.com/postcss/postcss

module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 50 * 2,
      unitPrecision: 5,
      propList: [ '*' ],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0
    }
  }
};
