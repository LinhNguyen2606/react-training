// Type
import { Status as StatusType } from '../../../types';

// SCSS
import './Status.scss';

type StatusProps = {
  isActive?: boolean;
  active?: StatusType;
  notActive?: StatusType;
};

const Status = ({
  isActive,
  active = 'Active',
  notActive = 'Not active'
}: StatusProps) => {
  return (
    <div className={`status ${isActive ? 'active' : 'not__active'}`}>
      <span className="status__text">{` ${isActive ? active : notActive}`}</span>
    </div>
  );
};

export default Status;
