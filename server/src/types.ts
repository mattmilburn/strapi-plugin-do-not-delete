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

export type DoNotDeletePluginOptions = {
  rules: DoNotDeleteRule[];
};
