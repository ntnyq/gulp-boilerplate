import { ntnyq } from '@ntnyq/eslint-config'

const globals = [
  // jQuery
  '$',
  'jQuery',

  // Layui
  'layui',
]

export default ntnyq([
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
])
