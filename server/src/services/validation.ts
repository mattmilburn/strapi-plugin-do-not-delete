import { errors } from '@strapi/utils';

import { type DoNotDeleteRule } from '../config';
import { isProtectedEntity } from '../utils';

export type ValidationService = ReturnType<typeof validationService>;

const validationService = () => ({
  validateDeleteAction(entity: any, rules: DoNotDeleteRule[]): void {
    if (!rules.length) {
      return;
    }

    // Do not delete if this is a protected entry.
    if (isProtectedEntity(entity, rules)) {
      throw new errors.ValidationError('This entry is protected and cannot be deleted.');
    }
  },
});

export default validationService;
