/**
 * @file ESLint config
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  root: true,

  globals: {
    $: `readonly`,
    jQuery: `readonly`,
    layui: `readonly`,
    Swiper: `readonly`,
    echarts: `readonly`,
    CryptoJS: `readonly`,
  },

  extends: [
    `@qxy/typescript`,
  ],

  rules: {
    'max-lines-per-function': [`error`, 1000],
  },
})
