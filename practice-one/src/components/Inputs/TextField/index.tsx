// SCSS
import '@components/Inputs/TextField/TextField.scss';

import {
  ChangeEvent,
  useState
} from 'react';

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
  const [inputValue, setInputValue] = useState(value);

  // Call onChange with new input value if provided
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    onChange && onChange(value);
  };

  return (
    <>
      <label className={`label__input ${additionalClass} ${!isShowLabel && "hide"}`}>{label}</label>
      <input
        type="text"
        className="text--field"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        autoFocus={autoFocus}
      />
    </>
  );
};

export default TextField;
