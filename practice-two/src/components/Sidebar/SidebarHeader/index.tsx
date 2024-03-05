// Icon
import { Pencil } from '@assets/icons';

// Components
import { Status, Icons } from '@components';

interface SidebarHeaderProps {
  icon?: string;
  title: string;
  isActive?: boolean;
  isShowIcon: boolean;
  onShowPanel?: () => void;
}

const SidebarHeader = ({
  icon = Pencil,
  title,
  isActive,
  isShowIcon = true,
  onShowPanel,
}: SidebarHeaderProps) => {
  return (
    <article className="sidebar__header">
      <h2 className="text--primary">{title}</h2>
      {isActive && <Status checked={isActive} />}
      {isShowIcon && (
        <div className="sidebar__header--icon">
          <Icons src={icon} onClick={onShowPanel} />
        </div>
      )}
    </article>
  );
};

export default SidebarHeader;
