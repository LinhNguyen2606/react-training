// Component
import { Button } from '@components/Inputs';

// Type
import { ModalType } from '@types';

type ModalFooterProps = {
  type?: ModalType;
};

const ModalFooter = ({ type }: ModalFooterProps) => {
  return (
    <div className="modal__footer">
      {type === 'confirm' && (
        <>
          <Button variants="secondary" size="md" additionalClass="cancel">
            Cancel
          </Button>
          <Button variants="primary" size="md" additionalClass="delete">
            Delete
          </Button>
        </>
      )}
    </div>
  );
};

export default ModalFooter;
