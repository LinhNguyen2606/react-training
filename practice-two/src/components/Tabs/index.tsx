import { ReactNode } from 'react';

// SCSS
import '@components/Tabs/Tabs.scss';

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
      className={`tab ${isActive ? 'active' : ''}`}
      onClick={handleOnClick}
    >
      {children}
    </button>
  );
};

export default Tabs;
