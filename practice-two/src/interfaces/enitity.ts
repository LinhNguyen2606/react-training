export interface EnitityColumn<T> {
  key: keyof T;
  title: string;
  render?: (column: EnitityColumn<T>, item: T) => JSX.Element;
  width?: string;
}

export interface EnitityUserRoles {
  id?: string;
  userName?: string;
  avatar: string;
  bgColor: string;
}