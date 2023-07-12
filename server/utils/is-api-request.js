'use strict';

const isApiRequest = (ctx) => ctx.state?.route?.info?.type === 'content-api';

module.exports = isApiRequest;
