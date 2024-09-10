import { type DoNotDeleteRule } from '../../config';
import isProtectedEntity from '../isProtectedEntity';

describe('isProtectedEntity', () => {
  it('should return `true` if entity attribute matches the `is` rule', () => {
    const entity = { type: 'user' };
    const rules: DoNotDeleteRule[] = [['type', 'is', 'user']];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(true);
  });

  it('should return `false` if entity attribute does not match the `is` rule', () => {
    const entity = { type: 'user' };
    const rules: DoNotDeleteRule[] = [['type', 'is', 'admin']];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(false);
  });

  it('should return `true` if entity attribute matches the `isNot` rule', () => {
    const entity = { type: 'user' };
    const rules: DoNotDeleteRule[] = [['type', 'isNot', 'admin']];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(true);
  });

  it('should return `false` if entity attribute does not match the `isNot` rule', () => {
    const entity = { type: 'user' };
    const rules: DoNotDeleteRule[] = [['type', 'isNot', 'user']];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(false);
  });

  it('should return `true` if entity attribute matches the `in` rule', () => {
    const entity = { type: 'user' };
    const rules: DoNotDeleteRule[] = [['type', 'in', ['user', 'admin']]];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(true);
  });

  it('should return `false` if entity attribute does not match the `in` rule', () => {
    const entity = { type: 'guest' };
    const rules: DoNotDeleteRule[] = [['type', 'in', ['user', 'admin']]];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(false);
  });

  it('should return `true` if entity attribute matches the `notIn` rule', () => {
    const entity = { type: 'guest' };
    const rules: DoNotDeleteRule[] = [['type', 'notIn', ['user', 'admin']]];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(true);
  });

  it('should return `false` if entity attribute does not match the `notIn` rule', () => {
    const entity = { type: 'user' };
    const rules: DoNotDeleteRule[] = [['type', 'notIn', ['user', 'admin']]];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(false);
  });

  it('should return `true` if entity attribute matches the `has` rule', () => {
    const entity = { roles: ['admin', 'user'] };
    const rules: DoNotDeleteRule[] = [['roles', 'has', 'admin']];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(true);
  });

  it('should return `false` if entity attribute does not match the `has` rule', () => {
    const entity = { roles: ['user'] };
    const rules: DoNotDeleteRule[] = [['roles', 'has', 'admin']];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(false);
  });

  it('should return `true` if entity attribute matches the `hasNot` rule', () => {
    const entity = { roles: ['user'] };
    const rules: DoNotDeleteRule[] = [['roles', 'hasNot', 'admin']];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(true);
  });

  it('should return `false` if entity attribute does not match the `hasNot` rule', () => {
    const entity = { roles: ['admin', 'user'] };
    const rules: DoNotDeleteRule[] = [['roles', 'hasNot', 'admin']];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(false);
  });

  it('should return `true` if entity attribute matches the `matches` rule', () => {
    const entity = { email: 'test@example.com' };
    const rules: DoNotDeleteRule[] = [['email', 'matches', '^\\w+@example\\.com$']];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(true);
  });

  it('should return `false` if entity attribute does not match the `matches` rule', () => {
    const entity = { email: 'test@gmail.com' };
    const rules: DoNotDeleteRule[] = [['email', 'matches', '^\\w+@example\\.com$']];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(false);
  });

  it('should return `true` if entity attribute matches the `lt` rule', () => {
    const entity = { attribute: 1 };
    const rules: DoNotDeleteRule[] = [
      ['attribute', 'lt', 2],
      ['attribute', 'lt', 10],
    ];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(true);
  });

  it('should return `false` if entity attribute does not match the `lt` rule', () => {
    const entity = { attribute: 1 };
    const rules: DoNotDeleteRule[] = [
      ['attribute', 'lt', 0],
      ['attribute', 'lt', 1],
    ];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(false);
  });

  it('should return `true` if entity attribute matches the `lte` rule', () => {
    const entity = { attribute: 1 };
    const rules: DoNotDeleteRule[] = [
      ['attribute', 'lte', 1],
      ['attribute', 'lte', 2],
    ];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(true);
  });

  it('should return `false` if entity attribute does not match the `lte` rule', () => {
    const entity = { attribute: 1 };
    const rules: DoNotDeleteRule[] = [
      ['attribute', 'lte', -1],
      ['attribute', 'lte', 0],
    ];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(false);
  });

  it('should return `true` if entity attribute matches the `gt` rule', () => {
    const entity = { attribute: 1 };
    const rules: DoNotDeleteRule[] = [
      ['attribute', 'gt', -1],
      ['attribute', 'gt', 0],
    ];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(true);
  });

  it('should return `false` if entity attribute does not match the `gt` rule', () => {
    const entity = { attribute: 1 };
    const rules: DoNotDeleteRule[] = [
      ['attribute', 'gt', 1],
      ['attribute', 'gt', 2],
    ];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(false);
  });

  it('should return `true` if entity attribute matches the `gte` rule', () => {
    const entity = { attribute: 1 };
    const rules: DoNotDeleteRule[] = [
      ['attribute', 'gte', 0],
      ['attribute', 'gte', 1],
    ];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(true);
  });

  it('should return `false` if entity attribute does not match the `gte` rule', () => {
    const entity = { attribute: 1 };
    const rules: DoNotDeleteRule[] = [
      ['attribute', 'gte', 2],
      ['attribute', 'gte', 10],
    ];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(false);
  });

  it('should return `true` if entity attribute matches the `between` rule', () => {
    const entity = { attribute: 1 };
    const rules: DoNotDeleteRule[] = [
      ['attribute', 'between', [0, 2]],
      ['attribute', 'between', [0, 1]],
      ['attribute', 'between', [1, 2]],
    ];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(true);
  });

  it('should return `false` if entity attribute does not match the `between` rule', () => {
    const entity = { attribute: 1 };
    const rules: DoNotDeleteRule[] = [
      ['attribute', 'between', [-2, 0]],
      ['attribute', 'between', [2, 4]],
    ];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(false);
  });

  it('should return `true` if entity attribute matches the `after` rule', () => {
    const entity = { attribute: '2020-01-01' };
    const rules: DoNotDeleteRule[] = [
      ['attribute', 'after', 'Tue, 31 Dec 2019 19:12:27 GMT'],
      ['attribute', 'after', '2019-12-31T19:12:27.873Z'],
      ['attribute', 'after', '2019-12-31'],
    ];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(true);
  });

  it('should return `false` if entity attribute does not match the `after` rule', () => {
    const entity = { attribute: '2019-12-31' };
    const rules: DoNotDeleteRule[] = [
      ['attribute', 'after', 'Tue, 31 Dec 2019 19:12:27 GMT'],
      ['attribute', 'after', '2019-12-31T19:12:27.873Z'],
      ['attribute', 'after', '2019-12-31'],
      ['attribute', 'after', '2020-01-01'],
    ];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(false);
  });

  it('should return `true` if entity attribute matches the `before` rule', () => {
    const entity = { attribute: '2019-12-31' };
    const rules: DoNotDeleteRule[] = [
      ['attribute', 'before', 'Tue, 31 Dec 2019 19:12:27 GMT'],
      ['attribute', 'before', '2019-12-31T19:12:27.873Z'],
      ['attribute', 'before', '2020-01-01'],
    ];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(true);
  });

  it('should return `false` if entity attribute does not match the `before` rule', () => {
    const entity = { attribute: '2020-01-01' };
    const rules: DoNotDeleteRule[] = [
      ['attribute', 'before', 'Tue, 31 Dec 2019 19:12:27 GMT'],
      ['attribute', 'before', '2019-12-31T19:12:27.873Z'],
      ['attribute', 'before', '2019-12-31'],
      ['attribute', 'before', '2020-01-01'],
    ];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(false);
  });

  it('should return `true` if entity attribute matches the `day` rule', () => {
    const entity = { attribute: '2020-01-01' };
    const rules: DoNotDeleteRule[] = [
      ['attribute', 'day', 'Wed, 01 Jan 2020 19:12:27 GMT'],
      ['attribute', 'day', '2020-01-01T19:12:27.873Z'],
      ['attribute', 'day', '2020-01-01'],
    ];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(true);
  });

  it('should return `false` if entity attribute does not match the `day` rule', () => {
    const entity = { attribute: '2019-01-01' };
    const rules: DoNotDeleteRule[] = [
      ['attribute', 'day', 'Wed, 01 Jan 2020 19:12:27 GMT'],
      ['attribute', 'day', '2020-01-01T19:12:27.873Z'],
      ['attribute', 'day', '2020-01-01'],
    ];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(false);
  });

  it('should return `true` if entity attribute matches the `month` rule', () => {
    const entity = { attribute: '2020-01-01' };
    const rules: DoNotDeleteRule[] = [
      ['attribute', 'month', 'Fri, 31 Jan 2020 19:12:27 GMT'],
      ['attribute', 'month', '2020-01-31T19:12:27.873Z'],
      ['attribute', 'month', '2020-01-31'],
      ['attribute', 'month', '2020-01'],
    ];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(true);
  });

  it('should return `false` if entity attribute does not match the `month` rule', () => {
    const entity = { attribute: '2019-01-01' };
    const rules: DoNotDeleteRule[] = [
      ['attribute', 'month', 'Wed, 01 Jan 2020 19:12:27 GMT'],
      ['attribute', 'month', '2020-01-01T19:12:27.873Z'],
      ['attribute', 'month', '2020-01-01'],
      ['attribute', 'month', '2020-01'],
    ];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(false);
  });

  it('should return `true` if entity attribute matches the `year` rule', () => {
    const entity = { attribute: '2020-01-01' };
    const rules: DoNotDeleteRule[] = [
      ['attribute', 'year', 'Tue, 01 Dec 2020 19:12:27 GMT'],
      ['attribute', 'year', '2020-12-01T19:12:27.873Z'],
      ['attribute', 'year', '2020-12-01'],
      ['attribute', 'year', '2020-12'],
      ['attribute', 'year', '2020'],
    ];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(true);
  });

  it('should return `false` if entity attribute does not match the `year` rule', () => {
    const entity = { attribute: '2019-01-01' };
    const rules: DoNotDeleteRule[] = [
      ['attribute', 'year', 'Wed, 01 Jan 2020 19:12:27 GMT'],
      ['attribute', 'year', '2020-01-01T19:12:27.873Z'],
      ['attribute', 'year', '2020-01-01'],
      ['attribute', 'year', '2020-01'],
      ['attribute', 'year', '2020'],
    ];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(false);
  });

  it('should return `false` if the provided `comparator` is unknown', () => {
    const entity = { type: 'user' };
    // @ts-expect-error - Intentionally testing scenario with wrong type match. 
    const rules: DoNotDeleteRule[] = [['name', 'unknown_comparator', 'user']];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(false);
  });

  it('should return `false` if all the provided rules are falsy', () => {
    const entity = { attribute: 1 };
    const rules: DoNotDeleteRule[] = [
      ['attribute', 'is', 0],
      ['attribute', 'is', 2],
    ];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(false);
  });

  it('should return `true` if at least one of the provided rules is truthy', () => {
    const entity = { attribute: 1 };
    const rules: DoNotDeleteRule[] = [
      ['attribute', 'is', 0],
      ['attribute', 'is', 1],
    ];
    const result = isProtectedEntity(entity, rules);

    expect(result).toBe(true);
  });
});
