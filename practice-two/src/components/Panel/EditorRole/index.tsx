import { useEffect, useState } from 'react';

// Components
import {
  Button,
  ColorField,
  Modal,
  TextField
} from '@components';
import FormGroup from '@components/Panel/FormGroup';

// Constant
import { TYPES } from '@constants';

// Helper
import { validateName } from '@helpers';

// Interface
import { DataItems } from '@interfaces';

interface KeyIndex {
  [key: string]: string | boolean;
}

interface EditorRole {
  id?: string;
  bgColor?: string;
  dataItems: DataItems[];
  onRemove: (id: string) => void;
  onSubmit: (roleData: any) => void;
}

const EditorRole = ({
  id,
  bgColor,
  dataItems,
  onRemove,
  onSubmit,
}: EditorRole) => {
  const [dataChanged, setDataChanged] = useState<KeyIndex>({});
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [errorMessages, setErrorMessages] = useState<{
    [key: string]: string | null;
  }>({});

  useEffect(() => {
    const newDataChanged = dataItems.reduce((acc, item) => {
      // Assign the value of `item.value` to the key `item.key` in `acc`.
      acc[item.key] = item.value;

      // Return acc to continue to the next reduce loop.
      return acc;
    }, {} as KeyIndex);

    // Update the dataChaanged state with newDataChanged
    setDataChanged(newDataChanged);
  }, [dataItems]);

  const validateInput = (key: string, value: string | boolean) => {
    if (key === 'roleName') return validateName(value as string) || null;

    return null;
  };

  /**
   * Handles the change event for a specific field.
   * @param {string} key - The key of the field being changed.
   * @param {string | boolean} value - The new value of the field.
   * @returns {void}
   */
  const handleChange = (key: string, value: string | boolean) => {
    const errorMessage = validateInput(key, value);

    setDataChanged((prevState) => ({
      ...prevState,
      [key]: value,
    }));

    setErrorMessages((prevErrorMessages) => ({
      ...prevErrorMessages,
      [key]: errorMessage,
    }));
  };

  /**
   * Handle events when the user presses the Modal open or close button.
   */
  const handleToggleModal = () =>
    setIsOpenModal((prevIsOpenModal) => !prevIsOpenModal);

  /**
   * Handles the action of removing a role.
   * Closes the modal and triggers the `onRemove` callback.
   * @returns {void}
   */
  const handleOnRemove = () => {
    setIsOpenModal(false);

    if (id) onRemove(id);
  };

  /**
   * Handles the action of update a role.
   * @returns {void}
   */
  const handleOnUpdate = () => {
    const hasErrors = Object.values(errorMessages).some(
      (message) => message !== null
    );

    if (hasErrors) return;

    if (onSubmit) onSubmit(dataChanged);
  };
  return (
    <>
      <div className="panel__actions-btn">
        <Button
          additionalClass="btn--remove"
          size="md"
          variants="secondary"
          onClick={handleToggleModal}
        >
          Delete
        </Button>
        <Button
          additionalClass="btn--store"
          size="md"
          variants="primary"
          onClick={handleOnUpdate}
        >
          Save
        </Button>
      </div>

      <form className="panel__form">
        {dataItems.map((item) => {
          switch (item.type) {
            case TYPES.TEXT_FIELD:
              return (
                <FormGroup item={item} key={item.key}>
                  <TextField
                    isShowLabel={true}
                    value={dataChanged[item.key] as string}
                    onChange={(value) => handleChange(item.key, value)}
                  />
                  {errorMessages[item.key] && (
                    <span className="panel__error">
                      {errorMessages[item.key]}
                    </span>
                  )}
                </FormGroup>
              );
            case TYPES.COLOR_FIELD:
              return (
                <FormGroup item={item} key={item.key}>
                  <ColorField
                    bgColor={bgColor}
                    onChange={(value) => handleChange(item.key, value)}
                  />
                </FormGroup>
              );
            default:
              return null;
          }
        })}
      </form>

      {isOpenModal && (
        <Modal
          isOpen={isOpenModal}
          type="confirm"
          title="Delete"
          textConfirmation="Are you sure to delete this role?"
          onHide={handleToggleModal}
          onRemove={handleOnRemove}
        />
      )}
    </>
  );
};

export default EditorRole;
