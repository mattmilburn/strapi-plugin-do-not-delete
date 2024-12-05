import { type Core } from '@strapi/strapi';

import { defaultConfig, type DoNotDeletePluginConfig } from '../config';
import { pluginId } from '../utils';

type ConfigService = ReturnType<typeof configService>;

const configService = ({ strapi }: { strapi: Core.Strapi }) => ({
  get(): DoNotDeletePluginConfig {
    const config = strapi.config.get(`plugin::${pluginId}`, defaultConfig);

    return config;
  },
});

export { type ConfigService };
export default configService;
