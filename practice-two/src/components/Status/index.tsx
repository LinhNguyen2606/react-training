// SCSS
import '@components/Status/Status.scss';

interface StatusProps {
  active?: string;
  checked: boolean;
  notActive?: string;
}

const Status = ({
  active = 'Active',
  checked,
  notActive = 'Not active',
}: StatusProps) => {
  return (
    <div className={`status ${checked ? 'active' : 'not-active'}`}>
      <span className="status__text">{` ${
        checked ? active : notActive
      }`}</span>
    </div>
  );
};

export default Status;
