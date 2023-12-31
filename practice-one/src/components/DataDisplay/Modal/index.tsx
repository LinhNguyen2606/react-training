// Type
import { ModalType } from '@types';

// Components
import ModalHeader from '@components/DataDisplay/Modal/ModalHeader'
import ModalBody from '@components/DataDisplay/Modal/ModalBody'
import ModalFooter from '@components/DataDisplay/Modal/ModalFooter'

// SCSS
import '@components/DataDisplay/Modal/Modal.scss';

type ModalProps = {
  isOpen?: boolean;
  type?: ModalType;
  title?: string;
  textConfirmation?: string;
  onHide?: () => void;
  onChange?: () => void;
};

const Modal = ({
  isOpen,
  type,
  title,
  textConfirmation,
  onHide,
  onChange
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
            onChange={onChange} />
          
          <ModalFooter type={type} />
        </div>
      )}
    </>
  );
};

export default Modal;
