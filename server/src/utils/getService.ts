import pluginId from './pluginId';

import { type DoNotDeleteServices } from 'src/services';

const getService = <TName extends keyof DoNotDeleteServices>(name: TName): DoNotDeleteServices[TName] =>
  global.strapi.plugin(pluginId).service<DoNotDeleteServices[TName]>(name);

export default getService;
