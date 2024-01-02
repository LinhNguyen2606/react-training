// SCSS
import '@components/Inputs/TextField/TextField.scss';

type TextFieldProps = {
  label?: string;
  additionalClass?: string;
  isShowLabel?: boolean;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
};

const TextField = ({
  label,
  additionalClass,
  isShowLabel,
  value,
  placeholder,
  onChange
}: TextFieldProps) => {
  // Call onChange with new input value if provided
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => onChange && onChange(e.target.value);

  return (
    <>
      <label className={`label__input ${additionalClass} ${!isShowLabel && "hide"}`}>{label}</label>
      <input
        type="text"
        className="text--field"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
      />
    </>
  );
};

export default TextField;
