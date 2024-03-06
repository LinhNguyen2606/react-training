import { useEffect, useState } from 'react';

// Interface
import { DataItems } from '@interfaces';

// Helpers
import {
  dateFormat,
  validateEmail,
  validateName
} from '@helpers';

// Components
import {
  Button,
  Modal,
  Status,
  Switch,
  TextArea,
  TextField,
  UploadImage,
  FormGroup,
  DateView,
} from '@components';

// Constant
import { TYPES } from '@constants';

type KeyIndexType = {
  [key: string]: string | boolean;
};

interface EditorProfileProps {
  id?: string;
  bgColor?: string;
  dataItems: DataItems[];
  onRemove: (id: string) => void;
  onSubmit: (userData: any) => void;
}

const EditorProfile = ({
  id,
  bgColor,
  dataItems,
  onRemove,
  onSubmit,
}: EditorProfileProps) => {
  const [dataChanged, setDataChanged] = useState<KeyIndexType>({});
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
    }, {} as KeyIndexType);

    // Update the dataChaanged state with newDataChanged
    setDataChanged(newDataChanged);
  }, [dataItems]);

  const validateInput = (key: string, value: string | boolean) => {
    if (key === 'userName') return validateName(value as string) || null;

    if (key === 'email') return validateEmail(value as string) || null;

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
   * Get the value of the `alt` attribute for Avatar from a data item (`DataItems`).
   *
   * @param {DataItems} item - Data item representing the Avatar.
   * @returns {string | boolean} - `alt` value for Avatar.
   */
  const getAvatarAlt = (item: DataItems) => {
    const { keyImageDefault } = item;

    const hasDataChanged = keyImageDefault && dataChanged[keyImageDefault];

    // Check if `keyImageDefault` exists and has a value in `dataChanged`
    if (hasDataChanged) return hasDataChanged as string;

    return item.value as string;
  };

  /**
   * Handle events when the user presses the Modal open or close button.
   */
  const handleToggleModal = () =>
    setIsOpenModal((prevIsOpenModal) => !prevIsOpenModal);

  /**
   * Handles the action of removing a user.
   * Closes the modal and triggers the `onRemove` callback if the `id` is a number.
   * @returns {void}
   */
  const handleOnRemove = () => {
    setIsOpenModal(false);

    if (id) onRemove(id);
  };

  /**
   * Handles the action of update a user.
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
            case TYPES.AVATAR_FIELD:
              return (
                <FormGroup item={item} key={item.key}>
                  <UploadImage
                    originalImage={item.value as string}
                    alt={getAvatarAlt(item)}
                    bgColor={bgColor}
                    onChange={(value) => handleChange(item.key, value)}
                  />
                </FormGroup>
              );
            case TYPES.STATUS_FIELD:
              return (
                <FormGroup item={item} key={item.key}>
                  <Switch
                    checked={dataChanged[item.key] as boolean}
                    onChange={(value) => handleChange(item.key, value)}
                  />
                  <span className="panel__form-group--status">
                    <Status checked={dataChanged[item.key] as boolean} />
                  </span>
                </FormGroup>
              );
            case TYPES.DATE_VIEW:
              return (
                <DateView
                  key={item.key}
                  label={item.label}
                  value={
                    item.key === 'lastVisited'
                      ? dateFormat(new Date().toString())
                      : (dataChanged[item.key] as string)
                  }
                />
              );
            case TYPES.DETAILS_FIELD:
              return (
                <FormGroup item={item} key={item.key}>
                  <TextArea
                    value={dataChanged[item.key] as string}
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
          textConfirmation="Are you sure to delete this user?"
          onHide={handleToggleModal}
          onRemove={handleOnRemove}
        />
      )}
    </>
  );
};

export default EditorProfile;
