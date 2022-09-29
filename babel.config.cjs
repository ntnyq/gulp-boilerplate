/**
 * @file Babel config
 */

module.exports = {
  presets: [
    [`@babel/preset-env`, { modules: false }],
  ],

  // Preserve chinese while build
  generatorOpts: {
    jsescOption: {
      minimal: true,
    },
  },
}
