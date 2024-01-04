import { useState } from 'react';

// Components
import { Modal, Status } from '@components/DataDisplay';
import TextView from '@components/DataDisplay/Panel/Textview';
import { Button, TextArea, TextField, ToggleSwitch, UploadImage } from '@components/Inputs';

// Helper
import { dateFormat } from '@helpers';

// Interface
import { DataItems } from '@interfaces';


type EditorProfileProps = {
  id: number;
  userName: string;
  email: string;
  avatar: string;
  bgColor: string;
  isActive: boolean;
  registered?: string;
  lastVisited?: string;
  details: string;
  onRemove: (id: number) => void;
  dataItems: DataItems[];
};

const EditorProfile = ({
  id,
  userName,
  email,
  avatar,
  bgColor,
  isActive,
  registered,
  lastVisited,
  details,
  onRemove,
  dataItems,
}: EditorProfileProps) => {
  const [userData, setUserData] = useState({
    userName,
    email,
    avatar,
    status: isActive,
    details,
  });

  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleChange = (key: string, value: string | boolean) => {
    // The setUser function is called to update the state of the user
    setUserData((prevUser) => ({
      // Copy all current properties of the user
      ...prevUser,
      // The value of the property specified by key is updated
      [key]: value,
    }));
  };

  return (
    <>
      <div className="panel__actions-btn">
        <Button
          additionalClass="remove"
          size="md"
          variants="secondary"
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
        {dataItems.map((item) => {
          switch (item.type) {
            case 'TEXT_FIELD':
              return (
                <div className="panel__form-group" key={item.id}>
                  <TextField
                    label={item.label}
                    additionalClass="panel__form-group--label"
                    isShowLabel={true}
                    value={item.key === "userName" ? userData.userName : userData.email}
                    onChange={(value: string) => handleChange(item.key, value)}
                  />
                </div>
              );

            case 'AVATAR_FIELD':
              return (
                <div className="panel__form-group" key={item.key}>
                  <label className="panel__form-group--label">{item.label}</label>
                  <UploadImage
                    originalImage={userData.avatar}
                    alt={userData.userName}
                    bgColor={bgColor}
                    onChange={(value: string) => handleChange(item.key, value)}
                  />
                </div>
              );

            case 'STATUS_FIELD':
              return (
                <div className="panel__form-group" key={item.id}>
                  <label className="panel__form-group--label">{item.label}</label>
                  <ToggleSwitch isChecked={userData.status} onChange={(value: boolean) => handleChange(item.key, value)} />
                  <span className="panel__form-group--status">
                    <Status isActive={userData.status} />
                  </span>
                </div>
              );

            case 'DATE_FIELD':
              return (
                <TextView
                  key={item.id}
                  label={item.label}
                  value={
                    registered ? dateFormat(registered) : 'Unknown' && lastVisited ? dateFormat(lastVisited) : 'Unknown'
                  }
                />
              );

            case 'DETAILS_FIELD':
              return (
                <div className="panel__form-group" key={item.id}>
                  <span className="panel__form-group--label">{item.label}</span>
                  <TextArea value={userData.details} onChange={(value: string) => handleChange(item.key, value)} />
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
