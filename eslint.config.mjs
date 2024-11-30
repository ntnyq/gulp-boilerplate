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
