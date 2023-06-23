'use strict';

const isProtectedEntity = (entity, rules) =>
  rules.some((rule) => {
    const [attr, comparator, value] = rule;

    switch (comparator) {
      case 'is':
        return entity[attr] === value;

      case 'in':
        return value.includes(entity[attr]);

      case 'has':
        return entity[attr].includes(value);

      case 'matches':
        return new RegExp(value).test(entity[attr]);

      default:
        return false;
    }
  });

module.exports = isProtectedEntity;
