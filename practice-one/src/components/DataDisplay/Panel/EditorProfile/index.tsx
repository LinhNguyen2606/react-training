import { useState } from 'react';

// Components
import { Modal, Status } from '@components/DataDisplay';
import TextView from '@components/DataDisplay/Panel/Textview';
import { Button, TextArea, TextField, ToggleSwitch, UploadImage } from '@components/Inputs';

// Helper
import { dateFormat, generateRandomColor } from '@helpers';

// Interface
import { DataItems } from '@interfaces';

type EditorProfileProps = {
  id: number;
  dataItems: DataItems[];
  onRemove: (id: number) => void;
};

const EditorProfile = ({
  id,
  dataItems,
  onRemove
}: EditorProfileProps) => {
  const [data, setData] = useState(dataItems);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [randomColor, setRandomColor] = useState(generateRandomColor());

  const handleChange = (id: number, value: string | boolean) => {
    // Update the value of the element with the corresponding id in the data array
    setData(data.map((item) => (item.id === id ? { ...item, value } : item)));
  };

  return (
    <>
      <div className="panel__actions-btn">
        <Button
          additionalClass="remove"
          size="md" variants="secondary"
          onClick={() => setIsOpenModal(true)}>
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
        {data?.map((item) => {
          switch (item.type) {
            case 'TEXT_FIELD':
              return (
                <div className="panel__form-group" key={item.key}>
                  <TextField
                    label={item.label}
                    additionalClass="panel__form-group--label"
                    isShowLabel={true}
                    value={item.value as string}
                    onChange={(value) => handleChange(item.id, value)}
                  />
                </div>
              );

            case 'AVATAR_FIELD':
              return (
                <div className="panel__form-group" key={item.key}>
                  <label className="panel__form-group--label">{item.label}</label>
                  <UploadImage
                    originalImage={item.value as string}
                    alt={data.find((dataItem) => dataItem.key === 'userName')?.value as string}
                    bgColor={randomColor}
                    onChange={(value) => handleChange(item.id, value)}
                  />
                </div>
              );

            case 'STATUS_FIELD':
              return (
                <div className="panel__form-group" key={item.key}>
                  <label className="panel__form-group--label">{item.label}</label>
                  <ToggleSwitch isChecked={item.value as boolean} onChange={(value) => handleChange(item.id, value)}/>
                  <span className="panel__form-group--status">
                    <Status isActive={item.value as boolean} />
                  </span>
                </div>
              );

            case 'DATE_FIELD':
              return <TextView
                        key={item.key}
                        label={item.label}
                        value={dateFormat(item.value as string)}
                      />;

            case 'DETAILS_FIELD':
              return (
                <div className="panel__form-group" key={item.key}>
                  <span className="panel__form-group--label">{item.label}</span>
                  <TextArea value={item.value as string} onChange={(value) => handleChange(item.id, value)} />
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
          onHide={() => setIsOpenModal(false)}
          onRemove={() => {
            setIsOpenModal(false);
            onRemove(id);
          }}
        />
      )}
    </>
  );
};

export default EditorProfile;
