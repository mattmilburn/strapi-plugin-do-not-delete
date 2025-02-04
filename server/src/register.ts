import { type Core } from '@strapi/strapi';

import { PLUGIN_ID } from './constants';
import { getService } from './utils';

const register = async ({ strapi }: { strapi: Core.Strapi }) => {
  const validateService = getService('validation');

  // Middleware for the documents "delete" action.
  strapi.documents.use(async (context: any, next) => {
    const { action, contentType, params, uid } = context;
    const { documentId } = params;
    const pluginOptions = contentType.pluginOptions[PLUGIN_ID];

    // Only run if this is a "delete" action and the contentType is configured for this plugin.
    if (!['delete'].includes(action) || !pluginOptions) {
      return next();
    }

    // Ensure the entity exists.
    const entity = await strapi.documents(uid).findOne({ documentId });

    if (!entity) {
      return;
    }

    // Validate the delete action.
    validateService.validateDeleteAction(entity, pluginOptions.rules);

    return next();
  });
};

export default register;
