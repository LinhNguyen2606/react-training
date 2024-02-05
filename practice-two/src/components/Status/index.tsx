// SCSS
import '@components/Status/Status.scss';

interface StatusProps {
  active?: string;
  checkedLabel: boolean;
  notActive?: string;
}

const Status = ({
  active = 'Active',
  checkedLabel,
  notActive = 'Not active',
}: StatusProps) => {
  return (
    <div className={`status ${checkedLabel ? 'active' : 'not-active'}`}>
      <span className="status__text">{` ${
        checkedLabel ? active : notActive
      }`}</span>
    </div>
  );
};

export default Status;
