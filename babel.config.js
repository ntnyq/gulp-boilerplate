/**
 * @file Babel config
 */

module.exports = {
  presets: [
    [`@babel/preset-env`, { modules: false }],
  ],

  generatorOpts: {
    jsescOption: {
      minimal: true,
    },
  },
}
