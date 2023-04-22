'use strict';

const { ValidationError } = require( '@strapi/utils' ).errors;

module.exports = ( { strapi } ) => ( {
  validate( entity, config ) {
    if ( ! config.length ) {
      return;
    }

    // If any of the rules return true, this entry should NOT delete.
    const isProtected = config.some( rule => {
      const [ attr, comparator, value ] = rule;

      switch ( comparator ) {
        case 'is':
          return entity[ attr ] === value;

        case 'in':
          return value.includes( entity[ attr ] );

        default:
          return false;
      }
    } );

    if ( isProtected ) {
      throw new ValidationError( 'This protected entry cannot be deleted.' );
    }
  },
} );
