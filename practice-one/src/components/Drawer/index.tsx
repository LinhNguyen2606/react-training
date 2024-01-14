import {
  ChangeEvent,
  FC,
  ReactElement,
  useState
} from 'react';

// Components
import {
  Icon,
  Modal,
  Button
} from '@components';
import DrawerItem from '@components/Drawer/DrawerItem';

// Icon
import { UserGroup } from '@assets/icons';

// SCSS
import '@components/Drawer/Drawer.scss';

type DrawerProps = {
  width?: number;
  height?: number;
  onSubmit: (value: string) => void;
};

const Drawer: FC<DrawerProps> = ({
  width,
  height,
  onSubmit
}): ReactElement => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [inputField, setInputField] = useState('');

  const widthDrawer = {
    width: `${width}px`,
  };

  const heightDrawer = {
    height: `${height}px`,
  };

  /**
   * Handle events when the value of an input field changes.
   * @param {ChangeEvent<HTMLInputElement>} event - Input field value change event.
   */
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => setInputField(event.target.value);

  /**
   * Handle the event when the user presses the submit button in Modal.
   */
  const handleOnSubmit = () => {
    onSubmit(inputField);
    setIsOpenModal(false);
  };

  /**
   * Handle events when the user presses the Modal open or close button.
   */
  const handleToggleModal = () => setIsOpenModal((prevIsOpenModal) => !prevIsOpenModal);

  return (
    <>
      <aside className="drawer" style={{ ...widthDrawer, ...heightDrawer }}>
        <Button
          variants="primary"
          size="lg"
          additionalClass="drawer"
          onClick={handleToggleModal}
        >
          <span className="btn__text">+ New</span>
        </Button>
        <DrawerItem additionalClass="drawer__item">
          <div className="drawer__item--icon">
            <Icon src={UserGroup} />
          </div>
          <span className="drawer__item--text">Users</span>
        </DrawerItem>
      </aside>

      {isOpenModal && (
        <Modal
          isOpen={isOpenModal}
          type="submit"
          title="Enter user name"
          onChange={handleOnChange}
          onSubmit={handleOnSubmit}
          onHide={handleToggleModal}
        />
      )}
    </>
  );
};

export default Drawer;
