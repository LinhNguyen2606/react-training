import { useState } from 'react';
import { SketchPicker } from 'react-color';

// SCSS
import '@components/ColorField/ColorField.scss';

interface ColorField {
  label?: string;
  bgColor?: string;
  onChange: (value: string) => void;
}

const ColorField = ({ label, bgColor, onChange }: ColorField) => {
  const [color, setColor] = useState(bgColor);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  /**
   * Handles the click event to toggle the display of the color picker.
   */
  const handleClick = () => setDisplayColorPicker(!displayColorPicker);

  /**
   * Handles the close event of the color picker.
   */
  const handleClose = () => setDisplayColorPicker(false);

  /**
   * Handles the change event of the color picker.
   *
   * @param color - The selected color object.
   */
  const handleChange = (color: any) => {
    setColor(color.hex);

    if (onChange) onChange(color.hex);
  };

  return (
    <>
      <label className="color-field--label">{label}</label>
      <input
        type="text"
        value={color}
        readOnly
        className="color-field--input"
      />
      <div
        className="color-field__wrapper"
        style={{
          backgroundColor: color,
        }}
        onClick={handleClick}
      />
      {displayColorPicker ? (
        <div style={{ marginLeft: '150px' }} onClick={handleClose}>
          <SketchPicker color={color} onChange={handleChange} />
        </div>
      ) : null}
    </>
  );
};

export default ColorField;
