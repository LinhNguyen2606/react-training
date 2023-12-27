// SCSS
import './TextField.scss';

type TextFieldProps = {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
};

const TextField = ({
  value,
  placeholder,
  onChange
}: TextFieldProps) => {
  // Call onChange with new input value if provided
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => onChange && onChange(e.target.value);

  return (
    <input type="text" className="text--field" placeholder={placeholder} value={value} onChange={handleInputChange} />
  );
};

export default TextField;
