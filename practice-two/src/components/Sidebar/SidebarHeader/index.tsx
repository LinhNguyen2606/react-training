import { useLocation } from 'react-router-dom';

// Icon
import { Pencil } from '@assets/icons';

// Components
import { Status, Icons } from '@components';

interface SidebarHeaderProps {
  title: string;
  isActive?: boolean;
  onShowPanel?: () => void;
}

const SidebarHeader = ({
  title,
  isActive,
  onShowPanel,
}: SidebarHeaderProps) => {
  const location = useLocation();

  const showStatus = location.pathname === '/';
  const showIcon = location.pathname !== '/rules';

  return (
    <article className="sidebar__header">
      <h2 className="text--primary">{title}</h2>
      {showStatus && <Status checked={isActive} />}
      {showIcon && (
        <div className="sidebar__header--icon">
          <Icons src={Pencil} onClick={onShowPanel} />
        </div>
      )}
    </article>
  );
};

export default SidebarHeader;
