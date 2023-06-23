'use strict';

const { getService } = require('../utils');

module.exports = async ({ strapi }) => {
  const configService = getService('config');
  const validateService = getService('validation');
  const { contentTypes } = await configService.get();
  const models = Object.keys(contentTypes);

  // Lifecycle hook to protect certain entries from being deleted.
  const beforeDelete = async (event) => {
    const { model, params } = event;
    const { uid } = model;
    const { where } = params;

    // Ensure the entity exists first.
    const entity = await strapi.db.query(uid).findOne({ where });

    if (!entity) {
      return;
    }

    validateService.validate(entity, contentTypes[uid]);
  };

  // Subscribe to lifecycle hook.
  strapi.db.lifecycles.subscribe({
    models,
    beforeDelete,
  });
};
