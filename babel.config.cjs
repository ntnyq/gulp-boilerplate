/**
 * @file Babel config
 */

module.exports = {
  presets: [
    [`@babel/preset-env`, { modules: false }],
  ],

  // Preserve transpile Chinese while build
  generatorOpts: {
    jsescOption: {
      minimal: true,
    },
  },
}
