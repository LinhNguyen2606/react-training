// SCSS
import '@components/Inputs/TextArea/TextArea.scss';
import { useState } from 'react';

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
  const [textareaValue, setTextareaValue] = useState(value);

  
  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setTextareaValue(value);
    onChange && onChange(value); 
  }

  return (
    <textarea
      id="details"
      name="details"
      value={textareaValue}
      onChange={handleOnChange}
      placeholder={placeholder}
      className="textarea"
    >
    </textarea>
  );
};

export default TextArea;
