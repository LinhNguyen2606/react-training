// SCSS
import '@components/TextView/TextView.scss';

// Component
import { Icons } from '@components';

interface TextViewProps {
  icon?: string;
  label?: string;
  value?: string;
  additionalClass?: string;
}

const TextView = ({
  icon,
  label,
  value,
  additionalClass
}: TextViewProps) => {
  return (
    <>
      <div className="text-view--icon">
        {icon && <Icons src={icon} />}
        {label && <label className='text-view--label'>{label}</label>}
      </div>
      <span className={`${additionalClass}`}>{value ? value : "Unknown"}</span>
    </>
  );
};

export default TextView;
