import pluginId from './plugin-id';

const getService = (name) => strapi.plugin(pluginId).service(name);

export default getService;
