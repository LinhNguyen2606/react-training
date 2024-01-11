import { useEffect, useState } from 'react';

// Components
import {
  Modal,
  Status,
  Button,
  TextArea,
  TextField,
  ToggleSwitch,
  UploadImage
} from '@components';
import TextView from '@components/DataDisplay/Panel/TextView';

// Helper
import { dateFormat, validateEmail, validateUsername } from '@helpers';

// Interface
import { DataItems } from '@interfaces';

type KeyIndexType = {
  [key: string]: string | boolean;
};

type EditorProfileProps = {
  id?: number;
  dataItems: DataItems[];
  onRemove?: (id: number) => void;
  onSubmit?: (userData: any) => void;
  bgColor?: string;
};

const EditorProfile = ({ id, dataItems, onRemove, onSubmit, bgColor }: EditorProfileProps) => {
  const [dataChanged, setDataChanged] = useState<KeyIndexType>({});
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string | null }>({});

  useEffect(() => {
    const newDataChanged = dataItems.reduce((acc, item) => {
      // Assign the value of `item.value` to the key `item.key` in `acc`.
      acc[item.key] = item.value;

      // Return `acc` to continue to the next `reduce` loop.
      return acc;
    }, {} as KeyIndexType);

    // Update the `dataChanged` state with `newDataChanged`.
    setDataChanged(newDataChanged);
  }, [dataItems]);

  const validateInput = (key: string, value: string | boolean) => {
    if (key === 'userName') {
      return validateUsername(value as string);
    }

    if (key === 'email') {
      return validateEmail(value as string);
    }

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
  const handleToggleModal = () => setIsOpenModal((prevIsOpenModal) => !prevIsOpenModal);

  /**
   * Handles the action of removing a user.
   * Closes the modal and triggers the `onRemove` callback if the `id` is a number.
   * @returns {void}
   */
  const handleOnRemove = () => {
    setIsOpenModal(false);
    if (typeof id === 'number') onRemove!(id);
  };

  /**
   * Handles the action of update a user.
   * @returns {void}
   */
  const handleOnUpdate = () => onSubmit!(dataChanged);

  return (
    <>
      <div className="panel__actions-btn">
        <Button
          additionalClass="remove"
          size="md" variants="secondary"
          onClick={handleToggleModal}>
            Delete
        </Button>
        <Button
          additionalClass="store"
          size="md" variants="primary"
          onClick={handleOnUpdate}>
            Save
        </Button>
      </div>

      <form className="panel__form">
        {dataItems?.map((item) => {
          switch (item.type) {
            case 'TEXT_FIELD':
              return (
                <div className="panel__form-group" key={item.key}>
                  <TextField
                    label={item.label}
                    additionalClass="panel__form-group--label"
                    isShowLabel={true}
                    value={dataChanged[item.key] as string}
                    onChange={(value) => handleChange(item.key, value)}
                  />
                  {errorMessages[item.key] && <span className="panel__error">{errorMessages[item.key]}</span>}
                </div>
              );

            case 'AVATAR_FIELD':
              return (
                <div className="panel__form-group" key={item.key}>
                  <label className="panel__form-group--label">{item.label}</label>
                  <UploadImage
                    originalImage={item.value as string}
                    alt={getAvatarAlt(item)}
                    bgColor={bgColor}
                    onChange={(value) => handleChange(item.key, value)}
                  />
                </div>
              );

            case 'STATUS_FIELD':
              return (
                <div className="panel__form-group" key={item.key}>
                  <label className="panel__form-group--label">{item.label}</label>
                  <ToggleSwitch
                    isChecked={dataChanged[item.key] as boolean}
                    onChange={(value) => handleChange(item.key, value)}
                  />
                  <span className="panel__form-group--status">
                    <Status isActive={dataChanged[item.key] as boolean} />
                  </span>
                </div>
              );

            case 'DATE_FIELD':
              return (
                <TextView
                  key={item.key}
                  label={item.label}
                  value={
                    item.key === 'registered' ? (dataChanged[item.key] as string) : dateFormat(new Date().toString())
                  }
                />
              );

            case 'DETAILS_FIELD':
              return (
                <div className="panel__form-group" key={item.key}>
                  <span className="panel__form-group--label">{item.label}</span>
                  <TextArea
                    value={dataChanged[item.key] as string}
                    onChange={(value) => handleChange(item.key, value)}
                  />
                </div>
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
