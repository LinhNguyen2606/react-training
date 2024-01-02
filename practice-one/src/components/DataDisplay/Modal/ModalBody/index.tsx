import { ChangeEventHandler } from 'react'

// Component
import { Button } from '@components/Inputs';

// Type
import { ModalType } from '@components/DataDisplay/Modal';

type ModalBodyProps = {
  type?: ModalType;
  textConfirmation?: string;
  isAutoFocus?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onSubmit?: () => void;
};

const ModalBody = ({
  type,
  textConfirmation,
  isAutoFocus,
  onChange,
  onSubmit
}: ModalBodyProps) => {
  return (
    <div className={`modal__body--${type}`}>
      {type === 'confirm' ? (
        <p className="modal__body--text primary__text">{textConfirmation}</p>
      ) : (
        <>
            <input
              type="text"
              className="modal__body--input"
              onChange={onChange}
              autoFocus={isAutoFocus ? true : false}
            />
            <Button
              variants="primary"
              size="sm"
              additionalClass="save"
              onClick={onSubmit}
            >
              Save
            </Button>
        </>
      )}
    </div>
  );
};

export default ModalBody;
