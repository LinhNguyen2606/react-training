export type EnitityColumn<T> = {
  key: keyof T;
  title: string;
  render?: (column: EnitityColumn<T>, item: T) => JSX.Element;
  width?: string;
};