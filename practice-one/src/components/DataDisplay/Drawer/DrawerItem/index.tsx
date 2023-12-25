import { ReactNode } from 'react';

// SCSS
import './DrawerItem.scss';

type DrawerItemProps = {
  children: ReactNode;
  className?: string;
};

const DrawerItem = ({ children, className }: DrawerItemProps) => {
  return <div className={className}>{children}</div>;
};

export default DrawerItem;
