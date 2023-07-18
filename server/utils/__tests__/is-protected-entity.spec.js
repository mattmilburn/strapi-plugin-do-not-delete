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

  it('should return `false` if the provided `comparator` is unknown', () => {
    const entity = { type: 'user' };
    const rules = [['name', 'unknown_comparator', 'user']];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(false);
  });
});
