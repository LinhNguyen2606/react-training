// Type
import { ModalType } from '@components/Modal';

// Component
import { Icon } from '@components';

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
          <span className="text--primary">{title}</span>
          <Icon src={Xmark} onClick={onHide} />
        </>
      ) : (
        <>
          <span className="text--primary">{title}</span>
        </>
      )}
    </div>
  );
};

export default ModalHeader;
