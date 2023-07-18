'use strict';

/**
 * @TODO - Uncomment lines in this file once admin features are implemented.
 */

const backPaths = ['server/**/*.js', 'server/*.js'];
// const frontPaths = ['admin/src/**/*.js', 'admin/src/**/**/*.js'];

module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
  },
  overrides: [
    {
      files: backPaths,
      // excludedFiles: frontPaths,
      ...require('./.eslintrc.back.js'),
    },
    // {
    //   files: frontPaths,
    //   excludedFiles: backPaths,
    //   ...require('./.eslintrc.front.js'),
    // },
  ],
};
