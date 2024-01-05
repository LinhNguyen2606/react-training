// SCSS
import '@components/Inputs/ToggleSwitch/ToggleSwitch.scss';
import { useState } from 'react';

type ToggleSwitchProps = {
  isChecked?: boolean;
  onChange?: (value: boolean) => void
};

const ToggleSwitch = ({ isChecked, onChange }: ToggleSwitchProps) => {
  const [switchValue, setSwichValue ] = useState(isChecked);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setSwichValue(value);
    onChange && onChange(e.target.checked);
  }

  return(
    <input
      type="checkbox"
      className="toggle--switch"
      checked={switchValue}
      onChange={handleChange}
    />
  )
};

export default ToggleSwitch;
