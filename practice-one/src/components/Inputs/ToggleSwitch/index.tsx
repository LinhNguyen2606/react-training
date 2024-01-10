// SCSS
import '@components/Inputs/ToggleSwitch/ToggleSwitch.scss';

type ToggleSwitchProps = {
  isChecked?: boolean;
  onChange?: (value: boolean) => void
};

const ToggleSwitch = ({
  isChecked = false,
  onChange
}: ToggleSwitchProps) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    onChange && onChange(value);
  }

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
