import { ReactNode } from 'react';

// SCSS
import './DrawerItem.scss';

type DrawerItemProps = {
  children: ReactNode;
  additionalClass?: string;
};

const DrawerItem = ({ children, additionalClass }: DrawerItemProps) => {
  return <div className={additionalClass}>{children}</div>;
};

export default DrawerItem;
