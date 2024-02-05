import { ChangeEvent, useState } from 'react';

// Component
import { Button } from '@components';

// Type
import { ModalType } from '@components/Modal';

// Constant
import { ERROR_MESSAGE } from '@constants';

interface ModalBodyProps {
  type: ModalType;
  autoFocus?: boolean;
  onSubmit?: () => void;
  textConfirmation?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ModalBody = ({
  type,
  autoFocus,
  onSubmit,
  textConfirmation,
  onChange,
}: ModalBodyProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>('');

  /**
   * Handles the change event for an input field.
   *
   * @param e - The event object from the input field.
   *
   * This function does the following:
   * - Trims the input value and checks if it is an empty string.
   * - If the input value is an empty string, it sets the error message to `ERROR_MESSAGE.user` and returns.
   * - If the input value is not an empty string, it sets the error message to null.
   * - Finally, it calls the `onChange` function passed as a prop (if it exists) with the event object.
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim() === '') {
      setErrorMessage(ERROR_MESSAGE.EMPTY_INPUT);
      return;
    }

    setErrorMessage(null);

    if (onChange) onChange(e);
  };

  /**
   * Handles the modal submission.
   */
  const handleSubmit = () => {
    if (inputValue.trim() === '') {
      setErrorMessage(ERROR_MESSAGE.EMPTY_INPUT);
      return;
    }

    if (onSubmit) onSubmit();
  };

  return (
    <>
      <div className={`modal__body--${type}`}>
        {type === 'confirm' ? (
          <p className="modal__body--text text--primary">{textConfirmation}</p>
        ) : (
          <>
            <input
              type="text"
              className="modal__body--input"
              onChange={handleChange}
              autoFocus={autoFocus}
            />
            <Button
              variants="primary"
              size="sm"
              additionalClass='btn--save'
              onClick={handleSubmit}>
                Save
            </Button>
          </>
        )}
      </div>
      {errorMessage && <span className="modal__error">{errorMessage}</span>}
    </>
  );
};

export default ModalBody;
