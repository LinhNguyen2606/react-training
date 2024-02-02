import { ChangeEvent, useState } from 'react';

// Components
import { Popover, Modal } from '@components';
import DrawerItem from '@components/Drawer/DrawerItem';
import { PopoverContentProps } from '@components/Popover/PopoverContent';

// SCSS
import '@components/Drawer/Drawer.scss';
import { NavigationItem } from '@interfaces';

type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';

interface DrawerProps {
  position: DrawerPosition;
  onSubmit: (value: string) => void;
  navigations: NavigationItem[];
}

const Drawer = ({ position = 'left', onSubmit, navigations }: DrawerProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [inputField, setInputField] = useState('');
  const [itemActive, setItemActive] = useState(navigations[0].id);

  /**
   * Handle events when the value of an input field changes.
   * @param {ChangeEvent<HTMLInputElement>} event - Input field value change event.
   */
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) =>
    setInputField(event.target.value);

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
  const handleToggleModal = () =>
    setIsOpenModal((prevIsOpenModal) => !prevIsOpenModal);

  const popoverContent: PopoverContentProps[] = [
    { id: 1, label: 'Add new user' },
    { id: 2, label: 'Add new role' },
  ];

  const handleItemClick = (item: NavigationItem) => () => {
    setItemActive(item.id);

    if (typeof item.action === 'function') {
      item.action(item);
    }
  };

  return (
    <>
      <aside className={`drawer drawer--${position}`}>
        <Popover
          content={popoverContent}
          buttonText="New"
          additionalClass="drawer--pop-over"
          onClick={handleToggleModal}
        />
        {navigations.map((navItem) => (
          <DrawerItem
            key={navItem.id}
            additionalClass={`drawer__item ${
              itemActive === navItem.id ? 'active' : ''
            }`}
            onClick={handleItemClick(navItem)}
          >
            {navItem.icon}
            <span className="drawer__item--text">{navItem.label}</span>
          </DrawerItem>
        ))}
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
