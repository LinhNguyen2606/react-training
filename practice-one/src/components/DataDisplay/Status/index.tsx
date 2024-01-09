// SCSS
import '@components/DataDisplay/Status/Status.scss';

type StatusProps = {
  isActive?: boolean;
  active?: string;
  notActive?: string;
};

const Status = ({
  isActive,
  active = 'Active',
  notActive = 'Not active'
}: StatusProps) => {
  return (
    <div className={`status ${isActive ? 'active' : 'not-active'}`}>
      <span className="status__text">{` ${isActive ? active : notActive}`}</span>
    </div>
  );
};

export default Status;
