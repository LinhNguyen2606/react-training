import { Link } from 'react-router-dom';

// Component
import { Icons } from '@components';

export interface ListItemViewProps {
  icon: string;
  label: string;
  values: Array<{
    text: string;
    link: string;
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
        <label>{label}</label>
      </div>
      <div className="sidebar-values">
        {values?.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className="sidebar-values__label"
          >
            {item.text}
          </Link>
        ))}
      </div>
    </>
  );
};

export default ListItemView;
