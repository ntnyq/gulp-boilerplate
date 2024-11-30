/**
 * @file Babel config
 */

module.exports = {
  // Preserve transpile Chinese while build
  generatorOpts: {
    jsescOption: {
      minimal: true,
    },
  },

  presets: [['@babel/preset-env', { modules: false }]],
}
