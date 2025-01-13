import path from 'path'
import { withCustomConfig } from '@sap/eslint-config'

const conf = withCustomConfig([
  {
    ignores: ['dist', 'reports', 'website/build/', 'website/.docusaurus/'],
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
    },
  },
  {
    files: ['website/**/*.ts', 'website/**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: path.resolve(import.meta.dirname, './website'),
      },
    },
  },
])

export default conf
