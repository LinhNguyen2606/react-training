// Component
import { Icons } from '@components';

interface TextViewProps {
  icon: string;
  label: string;
  value: string;
}

const TextView = ({
  icon,
  label,
  value
}: TextViewProps) => {
  return (
    <>
      <div className="sidebar--icon">
        <Icons src={icon} />
        <label>{label}</label>
      </div>
      <span className="sidebar__info">{value}</span>
    </>
  );
};

export default TextView;
