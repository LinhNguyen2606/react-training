import { ChangeEvent } from 'react';

// SCSS
import '@components/RadioField/RadioField.scss';

interface RadioFieldProps {
  id: string;
  name?: string;
  label: string;
  value: string;
  checked: boolean;
  actions: (event: ChangeEvent<HTMLInputElement>) => void;
}

const RadioField = ({
  id,
  name,
  label,
  value,
  actions,
  checked,
}: RadioFieldProps) => {
  return (
    <div className="radio-field">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={actions}
        className="radio-field--input"
      />
      <label htmlFor={id} className="radio-field--label">{label}</label>
    </div>
  );
};

export default RadioField;
