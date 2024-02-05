// SCSS
import '@components/TextArea/TextArea.scss';

interface TextAreaProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const TextArea = ({
  value,
  placeholder,
  onChange
}: TextAreaProps) => {
  /**
   * Handles the change event of the textarea input.
   * @param e - The change event object.
   */
  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    onChange && onChange(e.target.value);

  return (
    <textarea
      name="details"
      value={value}
      onChange={handleOnChange}
      placeholder={placeholder}
      className="textarea"
    ></textarea>
  );
};

export default TextArea;
