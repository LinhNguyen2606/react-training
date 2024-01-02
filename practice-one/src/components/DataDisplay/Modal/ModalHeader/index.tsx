// Type
import { ModalType } from '@components/DataDisplay/Modal';

// Component
import Icon from '@components/DataDisplay/Icon';

// Icon
import { Xmark } from '@assets/icons';

type ModalProps = {
  type?: ModalType;
  title?: string;
  onHide?: () => void;
};

const ModalHeader = ({
  type,
  title,
  onHide
}: ModalProps) => {
  return (
    <div className={`modal__header--${type}`}>
      {type === 'submit' ? (
        <>
          <span className="primary__text">{title}</span>
          <Icon src={Xmark} onClick={onHide} />
        </>
      ) : (
        <>
          <span className="primary__text">{title}</span>
        </>
      )}
    </div>
  );
};

export default ModalHeader;
