// Component
import { Icons } from '@components';

export interface ListItemViewProps {
  icon: string;
  label: string;
  value: string[];
}

const ListItemView = ({
  icon,
  label,
  value
}: ListItemViewProps) => {
  return (
    <>
      <div className="sidebar__permission">
        <Icons src={icon} />
        <label>{label}</label>
      </div>
      <div className="sidebar--values">
        {value.map((item, index) => (
          <label
            key={index}
            className="text--primary sidebar--values__label"
          >
            {item}
          </label>
        ))}
      </div>
    </>
  );
};

export default ListItemView;
