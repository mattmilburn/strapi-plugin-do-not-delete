'use strict';

const { ValidationError } = require( '@strapi/utils' ).errors;

module.exports = ( { strapi } ) => ( {
  async validate() {
    throw new ValidationError( 'This entry is protected from deleting.' );
  },
} );
