'use strict';

const { beforeDelete } = require( './lifecycles' );

module.exports = async params => {
  // Lifecycles.
  await beforeDelete( params );
};
