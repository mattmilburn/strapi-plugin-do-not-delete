import type { Core } from '@strapi/strapi';

import { defaultConfig } from '../config';
import { pluginId } from '../utils';

const configService = ({ strapi }: { strapi: Core.Strapi }) => ({
  async get() {
    const config = await strapi.config.get(`plugin::${pluginId}`, defaultConfig);

    return config;
  },
});

export default configService;
