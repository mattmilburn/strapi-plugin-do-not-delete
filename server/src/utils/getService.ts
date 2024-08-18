import pluginId from './pluginId';

const getService = (name: string) => strapi.plugin(pluginId).service(name);

export default getService;
