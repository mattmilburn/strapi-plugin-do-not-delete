'use strict';

const isProtectedEntity = require('../is-protected-entity');

describe('isProtectedEntity', () => {
  it('should return `true` if entity attribute matches the `is` rule', () => {
    const entity = { type: 'user' };
    const rules = [['type', 'is', 'user']];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(true);
  });

  it('should return `false` if entity attribute does not match the `is` rule', () => {
    const entity = { type: 'user' };
    const rules = [['type', 'is', 'admin']];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(false);
  });

  it('should return `true` if entity attribute matches the `isNot` rule', () => {
    const entity = { type: 'user' };
    const rules = [['type', 'isNot', 'admin']];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(true);
  });

  it('should return `false` if entity attribute does not match the `isNot` rule', () => {
    const entity = { type: 'user' };
    const rules = [['type', 'isNot', 'user']];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(false);
  });

  it('should return `true` if entity attribute matches the `in` rule', () => {
    const entity = { type: 'user' };
    const rules = [['type', 'in', ['user', 'admin']]];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(true);
  });

  it('should return `false` if entity attribute does not match the `in` rule', () => {
    const entity = { type: 'guest' };
    const rules = [['type', 'in', ['user', 'admin']]];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(false);
  });

  it('should return `true` if entity attribute matches the `notIn` rule', () => {
    const entity = { type: 'guest' };
    const rules = [['type', 'notIn', ['user', 'admin']]];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(true);
  });

  it('should return `false` if entity attribute does not match the `notIn` rule', () => {
    const entity = { type: 'user' };
    const rules = [['type', 'notIn', ['user', 'admin']]];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(false);
  });

  it('should return `true` if entity attribute matches the `has` rule', () => {
    const entity = { roles: ['admin', 'user'] };
    const rules = [['roles', 'has', 'admin']];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(true);
  });

  it('should return `false` if entity attribute does not match the `has` rule', () => {
    const entity = { roles: ['user'] };
    const rules = [['roles', 'has', 'admin']];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(false);
  });

  it('should return `true` if entity attribute matches the `hasNot` rule', () => {
    const entity = { roles: ['user'] };
    const rules = [['roles', 'hasNot', 'admin']];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(true);
  });

  it('should return `false` if entity attribute does not match the `hasNot` rule', () => {
    const entity = { roles: ['admin', 'user'] };
    const rules = [['roles', 'hasNot', 'admin']];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(false);
  });

  it('should return `true` if entity attribute matches the `matches` rule', () => {
    const entity = { email: 'test@example.com' };
    const rules = [['email', 'matches', '^\\w+@example\\.com$']];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(true);
  });

  it('should return `false` if entity attribute does not match the `matches` rule', () => {
    const entity = { email: 'test@gmail.com' };
    const rules = [['email', 'matches', '^\\w+@example\\.com$']];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(false);
  });

  it('should return `true` if entity attribute matches the `lt` rule', () => {
    const entity = { attribute: 1 };
    const rules = [['attribute', 'lt', 2]];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(true);
  });

  it('should return `false` if entity attribute does not match the `lt` rule', () => {
    const entity = { attribute: 1 };

    expect(isProtectedEntity(entity, [['attribute', 'lt', 1]])).toBe(false);
    expect(isProtectedEntity(entity, [['attribute', 'lt', 0]])).toBe(false);
  });

  it('should return `true` if entity attribute matches the `lte` rule', () => {
    const entity = { attribute: 1 };

    expect(isProtectedEntity(entity, [['attribute', 'lte', 1]])).toBe(true);
    expect(isProtectedEntity(entity, [['attribute', 'lte', 2]])).toBe(true);
  });

  it('should return `false` if entity attribute does not match the `lte` rule', () => {
    const entity = { attribute: 1 };
    const rules = [['attribute', 'lte', 0]];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(false);
  });

  it('should return `true` if entity attribute matches the `gt` rule', () => {
    const entity = { attribute: 1 };
    const rules = [['attribute', 'gt', 0]];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(true);
  });

  it('should return `false` if entity attribute does not match the `gt` rule', () => {
    const entity = { attribute: 1 };

    expect(isProtectedEntity(entity, [['attribute', 'gt', 1]])).toBe(false);
    expect(isProtectedEntity(entity, [['attribute', 'gt', 2]])).toBe(false);
  });

  it('should return `true` if entity attribute matches the `gte` rule', () => {
    const entity = { attribute: 1 };

    expect(isProtectedEntity(entity, [['attribute', 'gte', 1]])).toBe(true);
    expect(isProtectedEntity(entity, [['attribute', 'gte', 0]])).toBe(true);
  });

  it('should return `false` if entity attribute does not match the `gte` rule', () => {
    const entity = { attribute: 1 };
    const rules = [['attribute', 'gte', 2]];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(false);
  });

  it('should return `true` if entity attribute matches the `between` rule', () => {
    const entity = { attribute: 1 };

    expect(isProtectedEntity(entity, [['attribute', 'between', [0, 2]]])).toBe(true);
    expect(isProtectedEntity(entity, [['attribute', 'between', [0, 1]]])).toBe(true);
    expect(isProtectedEntity(entity, [['attribute', 'between', [1, 2]]])).toBe(true);
  });

  it('should return `false` if entity attribute does not match the `between` rule', () => {
    const entity = { attribute: 1 };

    expect(isProtectedEntity(entity, [['attribute', 'between', [-2, 0]]])).toBe(false);
    expect(isProtectedEntity(entity, [['attribute', 'between', [2, 4]]])).toBe(false);
  });

  it('should return `true` if entity attribute matches the `after` rule', () => {
    const entity = { attribute: '2020-01-01' };
    const rules = [['attribute', 'after', '2019-12-31']];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(true);
  });

  it('should return `false` if entity attribute does not match the `after` rule', () => {
    const entity = { attribute: '2019-12-31' };

    expect(isProtectedEntity(entity, [['attribute', 'after', '2019-12-31']])).toBe(false);
    expect(isProtectedEntity(entity, [['attribute', 'after', '2020-01-01']])).toBe(false);
  });

  it('should return `true` if entity attribute matches the `before` rule', () => {
    const entity = { attribute: '2019-12-31' };
    const rules = [['attribute', 'before', '2020-01-01']];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(true);
  });

  it('should return `false` if entity attribute does not match the `before` rule', () => {
    const entity = { attribute: '2020-01-01' };

    expect(isProtectedEntity(entity, [['attribute', 'before', '2019-12-31']])).toBe(false);
    expect(isProtectedEntity(entity, [['attribute', 'before', '2020-01-01']])).toBe(false);
  });

  it('should return `false` if the provided `comparator` is unknown', () => {
    const entity = { type: 'user' };
    const rules = [['name', 'unknown_comparator', 'user']];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(false);
  });

  it('should return `false` if all the provided rules are falsy', () => {
    const entity = { attribute: 1 };
    const rules = [
      ['attribute', 'is', 0],
      ['attribute', 'is', 2],
    ];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(false);
  });

  it('should return `true` if at least one of the provided rules is truthy', () => {
    const entity = { attribute: 1 };
    const rules = [
      ['attribute', 'is', 0],
      ['attribute', 'is', 1],
    ];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(true);
  });
});
