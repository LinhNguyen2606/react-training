import { ChangeEventHandler } from 'react'

// Component
import { Button } from '@components/Inputs';

// Type
import { ModalType } from '@types';

type ModalBodyProps = {
  type?: ModalType;
  textConfirmation?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onSubmit?: () => void;
};

const ModalBody = ({
  type,
  textConfirmation,
  onChange,
  onSubmit
}: ModalBodyProps) => {
  return (
    <div className={`modal__body--${type}`}>
      {type === 'confirm' ? (
        <p className="modal__body--text primary__text">{textConfirmation}</p>
      ) : (
        <>
          <input type="text" className="modal__body--input" onChange={onChange} />
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
