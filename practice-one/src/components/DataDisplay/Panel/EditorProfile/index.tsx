import { useState } from 'react';

// Components
import {
  Modal,
  Status
} from '@components/DataDisplay';
import TextView from '@components/DataDisplay/Panel/Textview';
import {
  Button,
  TextArea,
  TextField,
  ToggleSwitch,
  UploadImage
} from '@components/Inputs';

// Helper
import {
  dateFormat,
  generateRandomColor
} from '@helpers';

// Interface
import { DataItems } from '@interfaces';

type KeyIndexType = {
  [key: string]: string | boolean;
}

type EditorProfileProps = {
  id: number;
  dataItems: DataItems[];
  onRemove: (id: number) => void;
};

const EditorProfile = ({ id, dataItems, onRemove }: EditorProfileProps) => {
  const [dataChanged, setDataChanged] = useState<KeyIndexType>({});
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [randomColor, setRandomColor] = useState(generateRandomColor());

  const handleChange = (key: string, value: string | boolean) => {
    setDataChanged((prevState) => ({
      ...prevState,
      [key]: value,
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
    // Check if `keyImageDefault` exists and has a value in `dataChanged`
    if (keyImageDefault && dataChanged[keyImageDefault]) {
      return dataChanged[keyImageDefault] as string; 
    }else {
      return item.value as string;
    }
  };

  /**
   * Handle events when the user presses the Modal open or close button.
   */
  const handleToggleModal = () => setIsOpenModal((prevIsOpenModal) => !prevIsOpenModal);

  const handleOnRemove = () => {
    setIsOpenModal(false);
    onRemove(id)
  }

  return (
    <>
      <div className="panel__actions-btn">
        <Button
          additionalClass="remove"
          size="md"
          variants="secondary"
          onClick={handleToggleModal}>
            Delete
        </Button>
        <Button
          additionalClass="store"
          size="md"
          variants="primary">
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
                    value={item.value as string}
                    onChange={(value) => handleChange(item.key, value)}
                  />
                </div>
              );

            case 'AVATAR_FIELD':
              return (
                <div className="panel__form-group" key={item.key}>
                  <label className="panel__form-group--label">{item.label}</label>
                  <UploadImage
                    originalImage={item.value as string}
                    alt={getAvatarAlt(item)}
                    bgColor={randomColor}
                    onChange={(value) => handleChange(item.key, value)}
                  />
                </div>
              );

            case 'STATUS_FIELD':
              return (
                <div className="panel__form-group" key={item.key}>
                  <label className="panel__form-group--label">{item.label}</label>
                  <ToggleSwitch isChecked={dataChanged[item.key] as boolean} onChange={(value) => handleChange(item.key, value)} />
                  <span className="panel__form-group--status">
                    <Status isActive={dataChanged[item.key] as boolean} />
                  </span>
                </div>
              );

            case 'DATE_FIELD':
              return <TextView
                      key={item.key}
                      label={item.label}
                      value={item.value ? dateFormat(item.value as string) : "Unknown"}
                    />;

            case 'DETAILS_FIELD':
              return (
                <div className="panel__form-group" key={item.key}>
                  <span className="panel__form-group--label">{item.label}</span>
                  <TextArea value={item.value as string} onChange={(value) => handleChange(item.key, value)} />
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
