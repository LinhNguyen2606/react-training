import { ChangeEvent } from 'react';

// SCSS
import '@components/TextField/TextField.scss';

interface TextFieldProps {
  label?: string;
  value?: string;
  autoFocus?: boolean;
  placeholder?: string;
  isShowLabel?: boolean;
  additionalClass?: string;
  onChange: (value: string) => void;
}

const TextField = ({
  label,
  value,
  autoFocus,
  placeholder,
  isShowLabel,
  additionalClass,
  onChange,
}: TextFieldProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    onChange && onChange(e.target.value);

  return (
    <>
      <label
        className={`label__input ${additionalClass}`}
        style={{ display: `${!isShowLabel && 'none'}` }}
      >
        {label}
      </label>
      <input
        type="text"
        className="text-field"
        placeholder={placeholder}
        defaultValue={value}
        onChange={handleInputChange}
        autoFocus={autoFocus}
      />
    </>
  );
};

export default TextField;
