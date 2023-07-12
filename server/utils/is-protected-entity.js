'use strict';

const COMPARATORS = {
  is: 'is',
  isNot: 'isNot',
  in: 'in',
  notIn: 'notIn',
  has: 'has',
  hasNot: 'hasNot',
  matches: 'matches',
};

const COMPARATOR_ACTION_STRATEGY = {
  [COMPARATORS.is]: (value, entityAttr) => value === entityAttr,
  [COMPARATORS.isNot]: (value, entityAttr) => value !== entityAttr,
  [COMPARATORS.in]: (value, entityAttr) => value.includes(entityAttr),
  [COMPARATORS.notIn]: (value, entityAttr) => !value.includes(entityAttr),
  [COMPARATORS.has]: (value, entityAttr) => entityAttr.includes(value),
  [COMPARATORS.hasNot]: (value, entityAttr) => !entityAttr.includes(value),
  [COMPARATORS.matches]: (value) => RegExp(value).test(),
};

const isProtectedEntity = (entity, rules) =>
  rules.some((rule) => {
    const [attr, comparator, value] = rule;
    const entityAttr = entity[attr];
    return !!COMPARATOR_ACTION_STRATEGY[comparator](value, entityAttr);
  });

module.exports = isProtectedEntity;
