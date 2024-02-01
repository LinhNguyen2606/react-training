import { useState } from 'react';

// Icons
import { UserGroup } from '@assets/icons';

// Components
import { Popover, Icon } from '@components';
import DrawerItem from '@components/Drawer/DrawerItem';
import { PopoverContentProps } from '@components/Popover/PopoverContent';

// SCSS
import '@components/Drawer/Drawer.scss';

type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';

interface DrawerProps {
  position?: DrawerPosition;
}

const Drawer = ({ position = 'left' }: DrawerProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  /**
   * Handle events when the user presses the Modal open or close button.
   */
  const handleToggleModal = () =>
    setIsOpenModal((prevIsOpenModal) => !prevIsOpenModal);

  const popoverContent: PopoverContentProps[] = [
    { id: 1, text: 'Add new user' },
    { id: 2, text: 'Add new role' },
  ];

  return (
    <>
      <aside className={`drawer drawer--${position}`}>
        <Popover
          content={popoverContent}
          children="New"
          additionalClass='drawer--pop-over'
        />
        <DrawerItem additionalClass="drawer__item">
          <Icon src={UserGroup} size="20" />
          <span className="drawer__item--text">Users</span>
        </DrawerItem>
      </aside>
    </>
  );
};

export default Drawer;
