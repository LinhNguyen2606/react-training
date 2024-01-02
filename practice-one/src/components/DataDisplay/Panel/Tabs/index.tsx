import { ReactNode } from 'react';

type TabsProps = {
  children: ReactNode;
  isActive: boolean;
  index: number;
  onClick: (index: number) => void;
};

const Tabs = ({
  children,
  isActive,
  index,
  onClick
}: TabsProps) => {
  return (
    <button
      type="button"
      className={`panel__header--tab ${isActive ? 'active' : 'not__active'}`}
      onClick={() => onClick(index)}
    >
      {children}
    </button>
  );
};

export default Tabs;
