// Icon
import { Pencil } from '@assets/icons';

// Components
import { Status, Icons } from '@components';

interface SidebarHeaderProps {
  icon?: string;
  title: string;
  isActive?: boolean;
  onShowPanel?: () => void;
}

const SidebarHeader = ({
  icon = Pencil,
  title,
  isActive,
  onShowPanel,
}: SidebarHeaderProps) => {
  return (
    <article className="sidebar__header">
      <h2 className="text--primary">{title}</h2>
      <Status checked={isActive} />
      <div className="sidebar__header--icon">
        <Icons src={icon} onClick={onShowPanel} />
      </div>
    </article>
  );
};

export default SidebarHeader;
