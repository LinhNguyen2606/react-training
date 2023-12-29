import { FC, ReactElement } from 'react';

// Components
import { Button } from '@components/Inputs';
import Icon from '@components/DataDisplay/Icon';
import DrawerItem from '@components/DataDisplay/Drawer/DrawerItem';

// Icon
import { UserGroup } from '@assets/icons';

// SCSS
import './Drawer.scss';

type DrawerProps = {
  width?: number;
  height?: number;
};

const Drawer: FC<DrawerProps> = ({ width, height }): ReactElement => {
  const widthDrawer = {
    width: `${width}px`,
  };

  const heightDrawer = {
    height: `${height}px`,
  };

  return (
    <aside className="drawer" style={{ ...widthDrawer, ...heightDrawer }}>
      <Button
        variants="primary"
        size="lg"
        additionalClass="drawer"
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
  );
};

export default Drawer;
