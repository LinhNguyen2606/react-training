// SCSS
import '@components/Status/Status.scss';

interface StatusProps {
  active?: string;
  isActive: boolean;
  notActive?: string;
}

const Status = ({
  active = 'Active',
  isActive,
  notActive = 'Not active',
}: StatusProps) => {
  return (
    <div className={`status ${isActive ? 'active' : 'not-active'}`}>
      <span className="status__text">{` ${
        isActive ? active : notActive
      }`}</span>
    </div>
  );
};

export default Status;
