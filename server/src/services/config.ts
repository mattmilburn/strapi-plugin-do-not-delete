import { type Core } from '@strapi/strapi';

import { defaultConfig, type DoNotDeletePluginConfig } from '../config';
import { PLUGIN_ID } from '../constants';

export type ConfigService = ReturnType<typeof configService>;

const configService = ({ strapi }: { strapi: Core.Strapi }) => ({
  get(): DoNotDeletePluginConfig {
    const config = strapi.config.get(`plugin::${PLUGIN_ID}`, defaultConfig);

    return config;
  },
});

export default configService;
