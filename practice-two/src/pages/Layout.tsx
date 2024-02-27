import { useContext } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserGroup,
  faShield,
  faListCheck,
} from '@fortawesome/free-solid-svg-icons';
import { mutate } from 'swr';

// Components
import {
  Drawer,
  Spin,
  Toast
} from '@components';

// Constants
import { API, PATH } from '@constants';

// Helpers
import {
  dateFormat,
  extractData,
  generateRandomColor,
  transformUserInfo,
} from '@helpers';

// Services
import { createUser, getUsers } from '@services';

// Store
import { Context } from '@stores';

const Layout = () => {
  const navigate = useNavigate();

  const { data: users } = getUsers();

  const {
    setSelectedRow,
    isShowProgress,
    setIsShowProgress,
    setDataItems
  } =
    useContext(Context);

  /**
   * Add a new user or new role.
   * @param {string} type - the type (user or role) you want to add.
   * @param {string} value - the value you fill in.
   * @returns {Promise<void>} - Promise when finished processing.
   */
  const handleAdd = async ({
    type,
    value,
  }: {
    type: string;
    value: string;
  }): Promise<void> => {
    if (type === 'user') {
      setIsShowProgress('processing');

      const res = await createUser({
        userName: value,
        avatar: '',
        isActive: false,
        email: '',
        registered: dateFormat(new Date().toString()),
        lastVisited: dateFormat(new Date().toString()),
        details: '',
        bgColor: generateRandomColor()
      });

      const data = extractData(res);

      if (!data) {
        setIsShowProgress('failure');
        return;
      }

      if (users) {
        mutate(`${API.BASE}/${API.USER}`, [...users, data], false);
        setSelectedRow({ index: users.length, data });
        setDataItems([...transformUserInfo(data)]);
        setIsShowProgress('success');
      }
    }
  };

  const navigations = [
    {
      id: 1,
      label: 'Users',
      action: () => {
        navigate(PATH.HOME_PATH);
      },
      icon: <FontAwesomeIcon icon={faUserGroup} />,
    },
    {
      id: 2,
      label: 'Roles',
      action: () => {
        navigate(PATH.ROLES_PATH);
      },
      icon: <FontAwesomeIcon icon={faShield} />,
    },
    {
      id: 3,
      label: 'Rules',
      action: () => {
        navigate(PATH.RULES_PATH);
      },
      icon: <FontAwesomeIcon icon={faListCheck} />,
    },
  ];

  return (
    <>
      <header className="header">
        <h1 className="header__heading text--primary">User Manager</h1>
        {isShowProgress === 'processing' ? (
          <Spin isProcessing={true} delay={1000} />
        ) : (
          <Toast
            status={isShowProgress}
            delay={2000}
            size={16}
          />
        )}
      </header>
      <main className="main">
        <Drawer
          position="left"
          onSubmit={handleAdd}
          navigations={navigations}
        />
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
