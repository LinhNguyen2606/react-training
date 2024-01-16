import {
  ChangeEvent,
  useEffect,
  useRef
} from 'react';

// Components
import ModalHeader from '@components/Modal/ModalHeader'
import ModalBody from '@components/Modal/ModalBody'
import ModalFooter from '@components/Modal/ModalFooter'

// SCSS
import '@components/Modal/Modal.scss';

export type ModalType = 'submit' | 'confirm';

type ModalProps = {
  isOpen?: boolean;
  autoFocus?: boolean; 
  type?: ModalType;
  title?: string;
  textConfirmation?: string;
  onHide?: () => void;
  onRemove?: () => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: () => void;
};

const Modal = ({
  isOpen,
  autoFocus,
  type,
  title,
  textConfirmation,
  onHide,
  onRemove,
  onChange,
  onSubmit
}: ModalProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if(autoFocus && inputRef.current) inputRef.current.focus();
  }, [autoFocus])

  return (
    <>
      {isOpen && (
        <div className={`modal`}>
          <div className={`modal__wrapper modal__${type}`}>
            <ModalHeader
              type={type}
              title={title}
              onHide={onHide}
            />

            <ModalBody
              type={type}
              textConfirmation={textConfirmation}
              onChange={onChange}
              onSubmit={onSubmit}
              autoFocus={true}
            />
            
            <ModalFooter
              type={type}
              onHide={onHide}
              onRemove={onRemove}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
