import { ReactNode } from 'react';

type DrawerItemProps = {
  children: ReactNode;
  additionalClass?: string;
  onClick: () => void;
};

const DrawerItem = ({
  children,
  additionalClass,
  onClick,
}: DrawerItemProps) => {
  return (
    <div className={additionalClass} onClick={onClick}>
      {children}
    </div>
  );
};

export default DrawerItem;
