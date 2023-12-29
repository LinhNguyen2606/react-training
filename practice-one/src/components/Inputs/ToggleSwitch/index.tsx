// SCSS
import './ToggleSwitch.scss';

type ToggleSwitchProps = {
  isChecked?: boolean;
};

const ToggleSwitch = ({ isChecked}: ToggleSwitchProps) => {
  return(
    <input
      type="checkbox"
      className="toggle--switch"
      checked={isChecked}
    />
  )
};

export default ToggleSwitch;
