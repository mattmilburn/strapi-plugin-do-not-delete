const { errors } = require('@strapi/utils');

import { isProtectedEntity } from '../utils';

export default () => ({
  validateDeleteAction(entity, rules) {
    if (!rules.length) {
      return;
    }

    // Do not delete if this is a protected entry.
    if (isProtectedEntity(entity, rules)) {
      throw new errors.ValidationError('This entry is protected and cannot be deleted.');
    }
  },
});
