
// Component
import { Icons } from '@components';

export interface ListItemViewProps {
  icon: string;
  label: string;
  values: Array<{
    id: string;
    text: string;
    onClick: () => void;
  }>;
}

const ListItemView = ({
  icon,
  label,
  values
}: ListItemViewProps) => {
  return (
    <>
      <div className="sidebar__permission">
        <Icons src={icon} />
        <label className='sidebar__permission--label'>{label}</label>
      </div>
      <div className="sidebar-values">
        {values?.map((item) => (
          <div
            key={item.id}
            id={item.id}
            onClick={item.onClick}
            className="sidebar-values__label"
          >
            {item.text}
          </div>
        ))}
      </div>
    </>
  );
};

export default ListItemView;
