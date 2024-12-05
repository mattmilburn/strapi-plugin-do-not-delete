import { PLUGIN_ID } from '../constants';
import { type DoNotDeleteServices } from '../services';

const getService = <TName extends keyof DoNotDeleteServices>(
  name: TName
): DoNotDeleteServices[TName] =>
  global.strapi.plugin(PLUGIN_ID).service<DoNotDeleteServices[TName]>(name);

export default getService;
