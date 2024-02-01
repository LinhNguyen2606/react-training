import { useState } from 'react';

// Icons
import { Plus, UserGroup } from '@assets/icons';

// Components
import { Button, Icon } from '@components';
import DrawerItem from '@components/Drawer/DrawerItem';

// SCSS
import '@components/Drawer/Drawer.scss';

type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';

type DrawerProps = {
  position?: DrawerPosition;
};

const Drawer = ({ position = 'left' }: DrawerProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  /**
   * Handle events when the user presses the Modal open or close button.
   */
  const handleToggleModal = () =>
    setIsOpenModal((prevIsOpenModal) => !prevIsOpenModal);

  return (
    <>
      <aside className={`drawer drawer--${position}`}>
        <Button
          variants="primary"
          size="lg"
          additionalClass="drawer__btn"
          onClick={handleToggleModal}
          startIcon={Plus}
        >
          <span className="drawer__text">New</span>
        </Button>
        <DrawerItem additionalClass="drawer__item">
          <Icon src={UserGroup} size="20" />
          <span className="drawer__item--text">Users</span>
        </DrawerItem>
      </aside>
    </>
  );
};

export default Drawer;
