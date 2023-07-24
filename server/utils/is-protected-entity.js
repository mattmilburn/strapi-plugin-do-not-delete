'use strict';

const COMPARATOR_ACTION_STRATEGY = {
  is: (value, attr) => value === attr,
  isNot: (value, attr) => value !== attr,
  in: (value, attr) => value.includes(attr),
  notIn: (value, attr) => !value.includes(attr),
  has: (value, attr) => attr.includes(value),
  hasNot: (value, attr) => !attr.includes(value),
  lt: (value, attr) => attr < value,
  lte: (value, attr) => attr <= value,
  gt: (value, attr) => attr > value,
  gte: (value, attr) => attr >= value,
  between: (value, attr) => attr >= value[0] && attr <= value[1],
  before: (value, attr) => new Date(attr) < new Date(value),
  after: (value, attr) => new Date(attr) > new Date(value),
  matches: (value, attr) => RegExp(value).test(attr),
};

const isProtectedEntity = (entity, rules) =>
  rules.some((rule) => {
    const [attr, comparator, value] = rule;
    const entityAttr = entity[attr];
    const comparatorAction = COMPARATOR_ACTION_STRATEGY[comparator];

    return !!(comparatorAction && comparatorAction(value, entityAttr));
  });

module.exports = isProtectedEntity;
