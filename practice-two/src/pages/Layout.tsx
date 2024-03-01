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
  getCorrespondingRoleItems,
  getCorrespondingUserItems,
  transformUserInfo,
  transformListViewRoleInfo,
} from '@helpers';

// Services
import {
  createRole,
  createUser,
  getRoleRules,
  getRoles,
  getRules,
  getUserRoles,
  getUsers,
} from '@services';

// Store
import { Context } from '@stores';

const Layout = () => {
  const navigate = useNavigate();

  
  const {
    selectedRow,
    setSelectedRow,
    isShowProgress,
    setIsShowProgress,
    setDataItems,
  } = useContext(Context);

  const { data: users } = getUsers();
  const { data: rules } = getRules();
  const { data: roles } = getRoles();
  const { data: userRoles } = getUserRoles();
  const { data: roleRules } = getRoleRules();

  const getCorrespondingRoleRules = getCorrespondingRoleItems(
    roleRules || [],
    rules || [],
    selectedRow.data?.id
  );
    

  const getCorrespondingUserRoles = getCorrespondingUserItems(
    userRoles || [],
    roles || [],
    selectedRow.data?.id
  );
    
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
        bgColor: generateRandomColor(),
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
    } else if (type === 'role') {
      setIsShowProgress('processing');

      const res = await createRole({
        name: value,
        avatar: '',
        bgColor: generateRandomColor(),
      });

      const data = extractData(res);

      if (!data) {
        setIsShowProgress('failure');
        return;
      }

      if (roles) {
        mutate(`${API.BASE}/${API.ROLE}`, [...roles, data], false);
        setSelectedRow({ index: roles.length, data });
        setDataItems([
          ...transformListViewRoleInfo(
            getCorrespondingRoleRules,
            getCorrespondingUserRoles
          ),
        ]);
        setIsShowProgress('success');
        navigate(PATH.ROLES_PATH);
      }
    }
  };

  const navigations = [
    {
      id: 1,
      label: 'Users',
      path: PATH.HOME_PATH,
      icon: <FontAwesomeIcon icon={faUserGroup} />,
    },
    {
      id: 2,
      label: 'Roles',
      path: PATH.ROLES_PATH,
      icon: <FontAwesomeIcon icon={faShield} />,
    },
    {
      id: 3,
      label: 'Rules',
      path: PATH.RULES_PATH,
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
