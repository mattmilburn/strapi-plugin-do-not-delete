'use strict';

module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'prettier',
    'plugin:import/recommended',

    // Backend
    'plugin:node/recommended',
  ],
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  globals: {
    strapi: true,
  },
  rules: {
    strict: ['error', 'global'],
    'no-return-await': 'error',
    'object-shorthand': ['error', 'always', { avoidExplicitReturnArrows: true }],
    'class-methods-use-this': 'off',
    'default-param-last': 'warn',
    'no-template-curly-in-string': 'warn',

    // Backend
    'node/no-unpublished-require': 'off',
    'node/no-extraneous-require': 'off',
    'node/exports-style': ['error', 'module.exports'],
    'node/no-new-require': 'error',
    'node/no-path-concat': 'error',
    'node/no-callback-literal': 'error',
    'node/handle-callback-err': 'error',
    'no-restricted-syntax': 'off',
    'no-await-in-loop': 'off',
    'no-console': 'off',
    'no-shadow': 'off',
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: true,
        variables: true,
        allowNamedExports: false,
      },
    ],
    'consistent-return': 'off',
  },
};
