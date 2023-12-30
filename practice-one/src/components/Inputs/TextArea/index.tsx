// SCSS
import '@components/Inputs/TextArea/TextArea.scss';

type TextAreaProps = {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
};

const TextArea = ({
  value,
  placeholder,
  onChange
}: TextAreaProps) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange && onChange(e.target.value);

  return (
    <textarea
      id="details"
      name="details"
      value={value}
      onChange={handleOnChange}
      placeholder={placeholder}
      className="textarea"
    >
    </textarea>
  );
};

export default TextArea;
