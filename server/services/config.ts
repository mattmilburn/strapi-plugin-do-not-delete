import { Strapi } from '@strapi/strapi';

import { default as defaultConfig } from '../config';
import { pluginId } from '../utils';

export default ({ strapi }: { strapi: Strapi }) => ({
  async get() {
    const config = await strapi.config.get(`plugin::${pluginId}`, defaultConfig);

    return config;
  },
});
