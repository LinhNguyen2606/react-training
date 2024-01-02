import { useEffect, useState } from 'react';

// Components
import { Modal, Status } from '@components/DataDisplay';
import TextView from '@components/DataDisplay/Panel/Textview';
import { Button, TextArea, TextField, ToggleSwitch, UploadImage } from '@components/Inputs';

// Helper
import { dateConversion } from '@helpers';

type ProfileFormProps = {
  id: number;
  userName: string;
  email: string;
  avatar: string;
  isActive: boolean;
  registered?: string;
  lastVisited?: string;
  details: string;
  bgColor: string;
  onRemove: (id: number) => void;
};

const ProfileForm = ({
  id,
  userName,
  email,
  avatar,
  isActive,
  registered,
  lastVisited,
  details,
  bgColor,
  onRemove,
}: ProfileFormProps) => {
  const [user, setUser] = useState({
    avatar,
    userName,
    email,
    status: isActive,
    details,
  });
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    setUser({
      userName,
      email,
      avatar,
      status: isActive,
      details,
    });
  }, [userName, email, avatar, isActive, details]);

  const handleChange = (key: string, value: string | boolean) =>
    // The setUser function is called to update the state of the user
    setUser((prevUser) => ({
      // Copy all current properties of the user
      ...prevUser,
      // The value of the property specified by key is updated
      [key]: value,
    }));
  
  return (
    <>
      <div className="panel__actions-btn">
        <Button additionalClass="remove" size="md" variants="secondary">
          Delete
        </Button>
        <Button additionalClass="store" size="md" variants="primary">
          Save
        </Button>
      </div>

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

      <form className="panel__form">
        <div className="panel__form-group">
          <TextField
            label="Full Name"
            additionalClass='panel__form-group--label'
            isShowLabel={true}
            value={user.userName}
            onChange={(value: string) => handleChange('userName', value)}
          />
        </div>

        <div className="panel__form-group">
          <TextField
            label="Email"
            additionalClass='panel__form-group--label'
            isShowLabel={true}
            value={user.email}
            onChange={(value: string) => handleChange('email', value)}
          />
        </div>

        <div className="panel__form-group">
          <label className="panel__form-group--label">Avatar</label>
          <UploadImage
            originalImage={user.avatar}
            alt={user.userName}
            bgColor={bgColor}
            onChange={(value: string) => handleChange('avatar', value)}
          />
        </div>

        <div className="panel__form-group">
          <label className="panel__form-group--label">Status</label>
          <ToggleSwitch isChecked={user.status} onChange={(value: boolean) => handleChange('status', value)} />
          <span className="panel__form-group--status">
            <Status isActive={user.status} />
          </span>
        </div>

        <TextView label="Registered" value={registered === undefined ? 'Unknown' : dateConversion(registered)} />

        <TextView label="Last visited" value={lastVisited === undefined ? 'Unknown' : dateConversion(lastVisited)} />

        <div className="panel__form-group">
          <span className="panel__form-group--label">Details</span>
          <TextArea value={user.details} onChange={(value: string) => handleChange('details', value)} />
        </div>
      </form>
    </>
  );
};

export default ProfileForm;
