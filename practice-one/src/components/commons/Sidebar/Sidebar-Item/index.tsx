import { ReactNode } from 'react';

// SCSS
import './SidebarItem.scss';

type SidebarItemProps = {
  children: ReactNode;
  className?: string;
};

const SidebarItem = ({ children, className }: SidebarItemProps) => {
  return <div className={className}>{children}</div>;
};

export default SidebarItem;
