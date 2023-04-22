'use strict';

const { getService } = require( '../utils' );

module.exports = async ( { strapi } ) => {
  const configService = getService( 'config' );
  const validateService = getService( 'validation' );
  const { contentTypes } = await configService.get();

  // Lifecycle hook to protect certain entries from being deleted.
  const beforeDelete = async ( event ) => {
    console.log( 'BEFORE DELETE', event );

    await validateService.validate();
  };

  // Subscribe to lifecycle hook.
  strapi.db.lifecycles.subscribe( {
    models,
    beforeDelete,
  } );
};
