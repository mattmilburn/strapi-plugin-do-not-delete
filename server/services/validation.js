'use strict';

const { ValidationError } = require('@strapi/utils').errors;

const { isProtectedEntity } = require('../utils');

module.exports = ({ strapi }) => ({
  validate(entity, rules) {
    if (!rules.length) {
      return;
    }

    // Do not delete if this is a protected entry.
    if (isProtectedEntity(entity, rules)) {
      /**
       * @TODO - i18n support for this error message.
       */
      throw new ValidationError('This entry is protected and cannot be deleted.');
    }
  },
});
