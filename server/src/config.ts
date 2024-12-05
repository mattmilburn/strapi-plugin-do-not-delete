import { errors } from '@strapi/utils';

export type DoNotDeleteComparator =
  | 'after'
  | 'before'
  | 'between'
  | 'has'
  | 'hasNot'
  | 'in'
  | 'notIn'
  | 'is'
  | 'isNot'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'day'
  | 'month'
  | 'year'
  | 'matches';

export type DoNotDeleteRule = [string, DoNotDeleteComparator, any];

export interface DoNotDeletePluginConfig {
  contentTypes?: Record<string, DoNotDeleteRule[]>;
}

export const defaultConfig: DoNotDeletePluginConfig = {
  contentTypes: {},
};

export default {
  default: defaultConfig,
  validator(config: DoNotDeletePluginConfig) {
    if (!config.contentTypes) {
      return;
    }

    Object.keys(config.contentTypes).forEach((uid) => {
      // Require array for `contentTypes` prop.
      if (!Array.isArray(config.contentTypes[uid])) {
        throw new errors.ValidationError(
          `Must define delete protection rules as an array for ${uid}.`
        );
      }

      config.contentTypes[uid].forEach((rule) => {
        // Require arrays for `contentTypes` values.
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
    });
  },
};
