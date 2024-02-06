// SCSS
import '@components/Sidebar/Sidebar.scss';

// Components
import SidebarHeader from '@components/Sidebar/SidebarHeader';
import SidebarInfo, { SidebarProps } from '@components/Sidebar/SidebarInfo';

interface ViewDetailsProps {
  title: string;
  isActive?: boolean;
  onShowPanel?: () => void;
  data: SidebarProps['data'];
}

const Sidebar = ({
  title,
  isActive,
  onShowPanel,
  data,
}: ViewDetailsProps) => {
  return (
    <div className="sidebar">
      <SidebarHeader
        title={title}
        isActive={isActive}
        onShowPanel={onShowPanel}
      />
      <SidebarInfo data={data} />
    </div>
  );
};

export default Sidebar;
