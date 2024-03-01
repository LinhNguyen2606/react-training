import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

interface DrawerItemProps {
  children: ReactNode;
  path: string;
  action: () => void;
}

const DrawerItem = ({
  children,
  path,
  action
}: DrawerItemProps) => {
  return (
    <NavLink
      className="drawer__item"
      to={path}
      onClick={action}
    >
      {children}
    </NavLink>
  );
};

export default DrawerItem;
