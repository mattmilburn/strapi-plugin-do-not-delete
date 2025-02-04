import { type Core, type UID } from '@strapi/strapi';

import { PLUGIN_ID } from './constants';
import { type DoNotDeletePluginOptions } from './types';
import { getService } from './utils';

const bootstrap = ({ strapi }: { strapi: Core.Strapi }) => {
  const validateService = getService('validation');

  // Verify any "do not delete" plugin options.
  Object.keys(strapi.contentTypes).forEach((uid: UID.ContentType) => {
    const contentType = strapi.contentTypes[uid];
    const pluginOptions = contentType.pluginOptions
      ? (contentType.pluginOptions[PLUGIN_ID] as DoNotDeletePluginOptions)
      : null;

    if (pluginOptions) {
      validateService.validatePluginOptions(uid, pluginOptions);
    }
  });
};

export default bootstrap;
