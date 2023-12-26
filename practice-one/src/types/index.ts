export type { Variant } from './Variant';
export type { ButtonSize } from './Size';
export type { Status } from './Status';
export type { User } from './User';

export type EnitityColumnType<T> = {
  key: keyof T;
  title: string;
  render?: (column: EnitityColumnType<T>, item: T) => JSX.Element;
};
