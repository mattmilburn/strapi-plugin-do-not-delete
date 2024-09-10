import { type Core } from '@strapi/strapi';

import { beforeDeleteLifecycle } from './lifecycles';

const bootstrap = ({ strapi }: { strapi: Core.Strapi }) => {
  // Lifecycles.
  beforeDeleteLifecycle(strapi);
};

export default bootstrap;

