import { withCustomConfig } from '@sap/eslint-config'

const conf = withCustomConfig([
  {
    ignores: ['dist'],
  },
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/ban-ts-ignore': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/explicit-member-accessibility': 'off',
      'require-await': 'warn',
    },
  },
])

export default conf
