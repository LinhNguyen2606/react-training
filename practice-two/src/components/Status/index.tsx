// SCSS
import '@components/Status/Status.scss';

interface StatusProps {
  checked: boolean;
  checkedLabel?: string;
  unCheckedLabel?: string;
}

const Status = ({
  checkedLabel = 'Active',
  checked,
  unCheckedLabel = 'Not active',
}: StatusProps) => {
  return (
    <div className={`status ${checked ? 'active' : 'not-active'}`}>
      <span className="status__text">{` ${
        checked ? checkedLabel : unCheckedLabel
      }`}</span>
    </div>
  );
};

export default Status;
