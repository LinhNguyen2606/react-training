export type UserType = {
  id: number;
  userName: string;
  isActive: boolean;
  email: string;
  avatar: string;
  registered: string;
  lastVisited: string;
  details: string;
  bgColor: string;
};

export type InfoItemType = {
  icon: string;
  label?: string;
  value?: string;
};

export type EnitityColumnType<T> = {
  key: keyof T;
  title: string;
  render?: (column: EnitityColumnType<T>, item: T) => JSX.Element;
  width?: string;
};

export type ModalType = 'submit' | 'confirm';
