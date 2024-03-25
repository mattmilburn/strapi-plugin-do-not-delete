const COMPARATOR_ACTION_STRATEGY = {
  // Equality.
  is: (value, attr) => value === attr,
  isNot: (value, attr) => value !== attr,

  // Contains.
  has: (value, attr) => attr.includes(value),
  hasNot: (value, attr) => !attr.includes(value),
  in: (value, attr) => value.includes(attr),
  notIn: (value, attr) => !value.includes(attr),

  // Greater than or equal to.
  between: (value, attr) => attr >= value[0] && attr <= value[1],
  gt: (value, attr) => attr > value,
  gte: (value, attr) => attr >= value,
  lt: (value, attr) => attr < value,
  lte: (value, attr) => attr <= value,

  // Dates.
  after: (value, attr) => new Date(attr) > new Date(value),
  before: (value, attr) => new Date(attr) < new Date(value),
  day: (value, attr) => {
    const d1 = new Date(attr);
    const d2 = new Date(value);

    return (
      d1.getUTCDate() === d2.getUTCDate() &&
      d1.getUTCMonth() === d2.getUTCMonth() &&
      d1.getUTCFullYear() === d2.getUTCFullYear()
    );
  },
  month: (value, attr) => {
    const d1 = new Date(attr);
    const d2 = new Date(value);

    return d1.getUTCMonth() === d2.getUTCMonth() && d1.getUTCFullYear() === d2.getUTCFullYear();
  },
  year: (value, attr) => new Date(attr).getUTCFullYear() === new Date(value).getUTCFullYear(),

  // Regular expression.
  matches: (value, attr) => RegExp(value).test(attr),
};

const isProtectedEntity = (entity, rules) =>
  rules.some((rule) => {
    const [attr, comparator, value] = rule;
    const entityAttr = entity[attr];
    const comparatorAction = COMPARATOR_ACTION_STRATEGY[comparator];

    return !!(comparatorAction && comparatorAction(value, entityAttr));
  });

export default isProtectedEntity;
