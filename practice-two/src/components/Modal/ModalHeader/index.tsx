// Icon
import { Xmark } from '@assets/icons';

// Component
import { Icons } from '@components';

// Type
import { ModalType } from '@components/Modal';

interface ModalHeaderProps {
  title: string;
  type: ModalType;
  onHide: () => void;
}

const ModalHeader = ({
  title,
  type,
  onHide
}: ModalHeaderProps) => {
  return (
    <section className={`modal__header--${type}`}>
      {type === 'submit' ? (
        <>
          <h2 className="text--primary">{title}</h2>
          <Icons src={Xmark} onClick={onHide} />
        </>
      ) : (
        <h2 className="text--primary">{title}</h2>
      )}
    </section>
  );
};

export default ModalHeader;
