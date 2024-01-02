// SCSS
import '@components/Inputs/ToggleSwitch/ToggleSwitch.scss';

type ToggleSwitchProps = {
  isChecked?: boolean;
  onChange?: (value: boolean) => void
};

const ToggleSwitch = ({ isChecked, onChange }: ToggleSwitchProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => onChange && onChange(e.target.checked);

  return(
    <input
      type="checkbox"
      className="toggle--switch"
      checked={isChecked}
      onChange={handleChange}
    />
  )
};

export default ToggleSwitch;
