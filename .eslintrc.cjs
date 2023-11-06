module.exports = {
  env: {
    es6: true,
    jest: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2023, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'import', 'prettier'],
  settings: {
    'import/resolver': {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
    'plugin:prettier/recommended',
  ],
  root: true,
  rules: {
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-use-before-define': 'off', // Not relevant for Node.js
    '@typescript-eslint/prefer-regexp-exec': 'error',
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/no-unsafe-enum-comparison': 'off',
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {
        allowExpressions: true,
        allowHigherOrderFunctions: true,
      },
    ],
    '@typescript-eslint/no-namespace': ['error', { allowDeclarations: false, allowDefinitionFiles: false }],
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-default-export': 'error',
    'import/no-duplicates': 'error',
    'import/no-unassigned-import': 'error',
    complexity: ['error', 20],
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'linebreak-style': ['error', 'unix'],
    'no-console': 'off',
    'no-constant-condition': 'error',
    '@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: false, ignoreIIFE: false }],
    'no-return-await': 'error',
    'prefer-template': 'error',
    quotes: [1, 'single', { avoidEscape: true }],
    'prettier/prettier': 1,
    '@typescript-eslint/no-unsafe-call': 1,
    '@typescript-eslint/no-unsafe-assignment': 1,
  },
  overrides: [
    {
      files: ['tests/**/*.ts'],
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        'require-jsdoc': 'off',
      },
    },
  ],
}
