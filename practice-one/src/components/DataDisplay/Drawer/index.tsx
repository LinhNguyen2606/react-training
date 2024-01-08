import { ChangeEvent, FC, ReactElement, useState } from 'react';

// Components
import { Button } from '@components/Inputs';
import {Icon, Modal} from '@components/DataDisplay/index'
import DrawerItem from '@components/DataDisplay/Drawer/DrawerItem';

// Icon
import { UserGroup } from '@assets/icons';

// SCSS
import './Drawer.scss';


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

  return (
    <>
      <aside className="drawer" style={{ ...widthDrawer, ...heightDrawer }}>
        <Button
          variants="primary"
          size="lg" additionalClass="drawer"
          onClick={() => setIsOpenModal(true)}
        >
          <span className="btn__text">+ New</span>
        </Button>
        <DrawerItem additionalClass="drawer__item">
          <div className="drawer__item--icon">
            <Icon src={UserGroup}/>
          </div>
          <span className="drawer__item--text">Users</span>
        </DrawerItem>
      </aside>

      {isOpenModal && (
        <Modal
          isOpen={isOpenModal}
          type="submit"
          title="Enter user name"
          onChange={(event: ChangeEvent<HTMLInputElement>) => setInputField(event.target.value)}
          onSubmit={() => {
            onSubmit(inputField);
            setIsOpenModal(false);
          }}
          onHide= {() => setIsOpenModal(false)}
        />
      )}
    </>
  );
};

export default Drawer;
