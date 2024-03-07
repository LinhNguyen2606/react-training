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
import {
  API,
  PATH,
  TYPES
} from '@constants';

// Helpers
import {
  dateFormat,
  extractData,
  generateRandomColor,
  getCorrespondingRoleItems,
  getCorrespondingUserItems,
  transformUserInfo,
  transformListViewRoleInfo,
  transformRoleInfo,
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
  // Context
  const {
    state,
    dispatch,
    selectedRow,
    setSelectedRow,
    setDataItems,
  } = useContext(Context);
  const { toast } = state 

  const navigate = useNavigate();

  // Get the data from API
  const { data: users } = getUsers();
  const { data: rules } = getRules();
  const { data: roles } = getRoles();
  const { data: userRoles } = getUserRoles();
  const { data: roleRules } = getRoleRules();

  // Handles the data
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
   * Add a new user.
   * @param {string} value - The value you fill in the input.
   * @returns {Promise<void>} - Promise when finished processing.
   */
  const handleAddUser = async (value: string): Promise<void> => {
    dispatch({ type: TYPES.PROCESSING });

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
      dispatch({ type: TYPES.FAILURE });
      return;
    }

    if (users) {
      mutate(`${API.BASE}/${API.USER}`, [...users, data], false);
      setSelectedRow({ index: users.length, data });
      setDataItems([...transformUserInfo(data)]);
      dispatch({ type: TYPES.SUCCESS });
    }
  };

  /**
   * Add a new role.
   * @param {string} value - The value you fill in the input.
   * @returns {Promise<void>} - Promise when finished processing.
   */
  const handleAddRole = async (value: string): Promise<void> => {
    dispatch({ type: TYPES.PROCESSING });

    const res = await createRole({
      name: value,
      avatar: '',
      bgColor: generateRandomColor(),
    });

    const data = extractData(res);

    if (!data) {
      dispatch({ type: TYPES.FAILURE });
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
        ...transformRoleInfo(data),
      ]);
      dispatch({ type: TYPES.SUCCESS });
      navigate(PATH.ROLES_PATH);
    }
  };

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
    switch (type) {
      case 'user':
        handleAddUser(value);
        break;
      case 'role':
        handleAddRole(value);
        break;
      default:
        throw new Error('Invalid type');
    }
  };

  /**
   * Resets the selected row by setting its index to -1 and data to null.
   */
  const handleResetSelectedRow = () =>
    setSelectedRow({ index: -1, data: null });

  const navigations = [
    {
      id: 1,
      label: 'Users',
      path: PATH.HOME_PATH,
      action: handleResetSelectedRow,
      icon: <FontAwesomeIcon icon={faUserGroup} />,
    },
    {
      id: 2,
      label: 'Roles',
      path: PATH.ROLES_PATH,
      action: handleResetSelectedRow,
      icon: <FontAwesomeIcon icon={faShield} />,
    },
    {
      id: 3,
      label: 'Rules',
      path: PATH.RULES_PATH,
      action: handleResetSelectedRow,
      icon: <FontAwesomeIcon icon={faListCheck} />,
    },
  ];

  return (
    <>
      <header className="header">
        <h1 className="header__heading text--primary">User Manager</h1>
        {toast === 'processing' ? (
          <Spin isProcessing={true} delay={2000} />
        ) : (
          <Toast
            status={toast}
            delay={3000}
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
