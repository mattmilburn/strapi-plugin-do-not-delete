import { type UID } from '@strapi/strapi';
import { errors } from '@strapi/utils';

import { type DoNotDeletePluginOptions, type DoNotDeleteRule } from '../types';
import { isProtectedEntry } from '../utils';

export type ValidationService = ReturnType<typeof validationService>;

const validationService = () => ({
  validateDeleteAction(entry: any, rules: DoNotDeleteRule[]): void {
    if (!rules || !rules.length) {
      return;
    }

    // Do not delete if this is a protected entry.
    if (isProtectedEntry(entry, rules)) {
      throw new errors.ValidationError('This entry is protected and cannot be deleted.');
    }
  },

  validatePluginOptions(uid: UID.ContentType, options: DoNotDeletePluginOptions): void {
    // Require array for the `rules` prop.
    if (!Array.isArray(options.rules)) {
      throw new errors.ValidationError(
        `Must define delete protection rules as an array for ${uid}.`
      );
    }

    options.rules.forEach((rule) => {
      // Require an array for each rule.
      if (!Array.isArray(rule)) {
        throw new errors.ValidationError(
          `Must define delete protection rules as an array for ${uid}.`
        );
      }

      // Require all 3 arguments per rule.
      if (rule.length !== 3) {
        throw new errors.ValidationError(
          `Must define delete protection rules with all arguments for ${uid}.`
        );
      }

      const comparator = rule[1];
      const value = rule[2];
      const comparators = [
        'after',
        'before',
        'between',
        'has',
        'hasNot',
        'in',
        'notIn',
        'is',
        'isNot',
        'gt',
        'gte',
        'lt',
        'lte',
        'day',
        'month',
        'year',
        'matches',
      ];

      // Validate each `comparator` arg is a valid comparator.
      if (!comparators.includes(comparator)) {
        throw new errors.ValidationError(
          `Unknown comparator ${comparator} used for ${uid} protection rules.`
        );
      }

      // Validate `in` and `notIn` comparators are compared against an array `value`.
      if (['in', 'notIn', 'between'].includes(comparator) && !Array.isArray(value)) {
        throw new errors.ValidationError(
          `Invalid ${comparator} value for ${uid} protection rules.`
        );
      }

      // Validate `between` comparators are compared against an array of 2 `values`.
      if (comparator === 'between' && value.length !== 2) {
        throw new errors.ValidationError(
          `Invalid number of array values for between comparators for ${uid} protection rules.`
        );
      }

      // Validate date comparators are compared against a valid date string.
      if (['day', 'month', 'year'].includes(comparator)) {
        throw new errors.ValidationError(
          `Invalid date string for ${comparator} value for ${uid} protection rules.`
        );
      }
    });
  },
});

export default validationService;
