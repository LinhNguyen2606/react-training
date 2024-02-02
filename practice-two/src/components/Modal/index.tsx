import {
  ChangeEvent,
  useEffect,
  useRef
} from 'react';

// Components
import ModalHeader from '@components/Modal/ModalHeader';
import ModalBody from '@components/Modal/ModalBody';
import ModalFooter from '@components/Modal/ModalFooter';

// SCSS
import '@components/Modal/Modal.scss';
import { useClickOutside } from '@hooks';

export type ModalType = 'submit' | 'confirm';

interface ModalProps {
  title: string;
  type: ModalType;
  isOpen: boolean;
  onHide: () => void;
  autoFocus?: boolean;
  onRemove?: () => void;
  onSubmit?: () => void;
  textConfirmation?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Modal = ({
  title,
  type,
  isOpen,
  onHide,
  autoFocus,
  onRemove,
  onSubmit,
  textConfirmation,
  onChange,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoFocus && modalRef.current) modalRef.current.focus();
  }, [autoFocus]);

  useClickOutside(modalRef, onHide, isOpen);

  return (
    <>
      {isOpen && (
        <div className="modal">
          <section className={`modal__wrapper modal--${type}`} ref={modalRef}>
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
          </section>
        </div>
      )}
    </>
  );
};

export default Modal;
