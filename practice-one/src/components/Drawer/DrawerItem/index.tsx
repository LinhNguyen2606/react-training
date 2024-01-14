import { ReactNode } from 'react';

type DrawerItemProps = {
  children: ReactNode;
  additionalClass?: string;
};

const DrawerItem = ({ children, additionalClass }: DrawerItemProps) => {
  return <div className={additionalClass}>{children}</div>;
};

export default DrawerItem;
