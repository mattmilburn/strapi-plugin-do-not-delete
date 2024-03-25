import { beforeDelete } from './lifecycles';

export default async (params) => {
  // Lifecycles.
  await beforeDelete(params);
};
