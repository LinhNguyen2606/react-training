// Components
import ModalHeader from '@components/DataDisplay/Modal/ModalHeader'
import ModalBody from '@components/DataDisplay/Modal/ModalBody'
import ModalFooter from '@components/DataDisplay/Modal/ModalFooter'

// SCSS
import '@components/DataDisplay/Modal/Modal.scss';

export type ModalType = 'submit' | 'confirm';

type ModalProps = {
  isOpen?: boolean;
  isAutoFocus?: boolean; 
  type?: ModalType;
  title?: string;
  textConfirmation?: string;
  onHide?: () => void;
  onRemove?: () => void;
  onChange?: () => void;
  onSubmit?: () => void;
};

const Modal = ({
  isOpen,
  isAutoFocus = true,
  type,
  title,
  textConfirmation,
  onHide,
  onRemove,
  onChange,
  onSubmit
}: ModalProps) => {
  return (
    <>
      {isOpen && (
        <div className={`modal modal__${type}`}>
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
            isAutoFocus={isAutoFocus}
          />
          
          <ModalFooter
            type={type}
            onHide={onHide}
            onRemove={onRemove}
          />
        </div>
      )}
    </>
  );
};

export default Modal;
