// Component
import { Button } from '@components';

// Type
import { ModalType } from '@components/Modal';

type ModalFooterProps = {
  type?: ModalType;
  onHide?: () => void;
  onRemove?: () => void;
};

const ModalFooter = ({
  type,
  onHide,
  onRemove
}: ModalFooterProps) => {
  return (
    <div className="modal__footer">
      {type === 'confirm' && (
        <>
          <Button
            variants="secondary"
            size="md" additionalClass="cancel"
            onClick={onHide}>
              Cancel
          </Button>
          <Button
            variants="primary"
            size="md"
            additionalClass="delete"
            onClick={onRemove}>
              Delete
          </Button>
        </>
      )}
    </div>
  );
};

export default ModalFooter;
