// SCSS
import '@components/TextField/TextField.scss';

import { ChangeEvent } from 'react';

type TextFieldProps = {
  autoFocus?: boolean;
  label?: string;
  additionalClass?: string;
  isShowLabel?: boolean;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
};

const TextField = ({
  autoFocus,
  label,
  additionalClass,
  isShowLabel,
  value,
  placeholder,
  onChange
}: TextFieldProps) => {

  // Call onChange with new input value if provided
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onChange && onChange(value);  
  };

  return (
    <>
      <label className={`label__input ${additionalClass} ${!isShowLabel && "hide"}`}>{label}</label>
      <input
        type="text"
        className="text--field"
        placeholder={placeholder}
        value={value || ''}
        onChange={handleInputChange}
        autoFocus={autoFocus}
      />
    </>
  );
};

export default TextField;
