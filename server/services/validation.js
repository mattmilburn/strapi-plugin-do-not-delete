'use strict';

const { ValidationError } = require('@strapi/utils').errors;

const { isProtectedEntity } = require('../utils');

module.exports = () => ({
  validateDeleteAction(entity, rules) {
    if (!rules.length) {
      return;
    }

    // Do not delete if this is a protected entry.
    if (isProtectedEntity(entity, rules)) {
      throw new ValidationError('This entry is protected and cannot be deleted.');
    }
  },
});
