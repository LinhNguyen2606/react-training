import { ReactNode } from 'react';

interface TabsProps {
  index: number;
  isActive: boolean;
  children: ReactNode;
  onClick: (index: number) => void;
}

const Tabs = ({
  index,
  isActive,
  children,
  onClick
}: TabsProps) => {
  const handleOnClick = () => onClick(index);

  return (
    <button
      type="button"
      className={`panel__header--tab ${isActive ? 'active' : ''}`}
      onClick={handleOnClick}
    >
      {children}
    </button>
  );
};

export default Tabs;
