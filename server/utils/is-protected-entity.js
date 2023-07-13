'use strict';

const isProtectedEntity = (entity, rules) =>
  rules.some((rule) => {
    const [attr, comparator, value] = rule;
    const entityAttr = entity[attr];

    switch (comparator) {
      case 'is':
        return entityAttr === value;

      case 'in':
        return value.includes(entityAttr);

      case 'has':
        return entityAttr.includes(value);

      case 'matches':
        return new RegExp(value).test(entityAttr);

      default:
        return false;
    }
  });

module.exports = isProtectedEntity;
