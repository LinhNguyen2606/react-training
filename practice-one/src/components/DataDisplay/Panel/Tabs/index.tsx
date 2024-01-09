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
  const handleOnClick = () => onClick(index);

  return (
    <button
      type="button"
      className={`panel__header--tab ${isActive ? 'active' : 'not-active'}`}
      onClick={handleOnClick}
    >
      {children}
    </button>
  );
};

export default Tabs;
