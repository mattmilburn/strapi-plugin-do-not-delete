import type { Core } from '@strapi/strapi';

import lifecycles from './lifecycles';

const bootstrap = ({ strapi }: { strapi: Core.Strapi }) => {
  // Lifecycles.
  lifecycles.beforeDelete(strapi);
};

export default bootstrap;

