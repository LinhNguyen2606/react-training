import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

interface DrawerItemProps {
  children: ReactNode;
  path: string;
}

const DrawerItem = ({ children, path }: DrawerItemProps) => {
  return (
    <NavLink className="drawer__item" to={path}>
      {children}
    </NavLink>
  );
};

export default DrawerItem;
