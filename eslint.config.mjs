// @ts-check

import { defineESLintConfig } from '@ntnyq/eslint-config'

const globals = [
  // jQuery
  '$',
  'jQuery',

  // Layui
  'layui',
]

export default defineESLintConfig(
  {
    depend: false,
    ignores: ['**/.browserslistrc'],
  },
  {
    files: ['**/*.js', '**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.reduce((acc, key) => ({ ...acc, [key]: 'readonly' }), {}),
      },
    },
  },
)
