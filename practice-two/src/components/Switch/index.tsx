// SCSS
import '@components/Switch/Switch.scss';

interface SwitchProps {
  checked: boolean;
  onChange: (value: boolean) => void;
}

const Switch = ({ checked = false, onChange }: SwitchProps) => {
  /**
   * Handles the change event of the Switch.
   * @param e - The change event object.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange && onChange(e.target.checked);

  return (
    <input
      type="checkbox"
      className="switch"
      checked={checked}
      onChange={handleChange}
    />
  );
};

export default Switch;
