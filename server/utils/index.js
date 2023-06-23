'use strict';

const getService = require('./get-service');
const isApiRequest = require('./is-api-request');
const isProtectedEntity = require('./is-protected-entity');
const pluginId = require('./plugin-id');

module.exports = {
  getService,
  isApiRequest,
  isProtectedEntity,
  pluginId,
};
