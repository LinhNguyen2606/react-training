import {
  useContext,
  useMemo,
  useState
} from 'react';
import { mutate } from 'swr';
import { useNavigate } from 'react-router-dom';

// Interfaces
import {
  EnitityColumn,
  Item,
  User
} from '@interfaces';

// Components
import {
  Avatar,
  Panel,
  SearchBar,
  Sidebar,
  Status,
  Table
} from '@components';
import { DrawerPosition } from '@components/Drawer';
import { SidebarProps } from '@components/Sidebar/SidebarInfo';
import EditorProfile from '@components/Panel/EditorProfile';
import AssignUserRules from '@components/Panel/AssignUserRules';
import AssignUserRoles from '@components/Panel/AssignUserRoles';

// Helpers
import {
  dateFormat,
  extractData,
  getUserRolesAndRules,
  highlightKeyword,
  transformUserInfo,
} from '@helpers';

// Context
import { Context } from '@stores';

// Services
import {
  deleteUser,
  editUser,
  getRoleRules,
  getRoles,
  getRules,
  getUserRoles,
  getUserRules,
  getUsers,
} from '@services';

// Constants
import {
  API,
  PATH,
  TYPES
} from '@constants';

// Icons
import {
  Clock,
  Envelope,
  ListCheck,
  Shield
} from '@assets/icons';

/**
 * Defines the columns configuration for the user table.
 * @param {string} searchKeyword The keyword used for highlighting in the table.
 * @returns {Array<EnitityColumn<User>>} The array of column configurations.
 */
const generateUserTableColumns = (
  searchKeyword: string
): EnitityColumn<User>[] => {
  return [
    {
      key: 'avatar',
      title: '',
      render: (_, item) => (
        <Avatar
          src={item.avatar}
          alt={item.userName!}
          bgColor={item.bgColor}
          size="sm"
        />
      ),
    },
    {
      key: 'userName',
      title: 'Full Name',
      render: (_, item) => (
        <span
          dangerouslySetInnerHTML={{
            __html: highlightKeyword(item.userName!, searchKeyword),
          }}
        />
      ),
    },
    {
      key: 'isActive',
      title: 'Status',
      render: (_, item) => <Status checked={item.isActive} />,
    },
    {
      key: 'email',
      title: 'Email',
      render: (_, item) => (
        <span
          dangerouslySetInnerHTML={{
            __html: highlightKeyword(item.email!, searchKeyword),
          }}
        />
      ),
    },
  ];
};

const Home = ({ position }: { position: DrawerPosition }) => {
  // Context and State
  const {
    dispatchToast,
    selectedRow,
    setSelectedRow,
    dataItems,
    setDataItems,
  } = useContext(Context);
  const [keyword, setKeyword] = useState('');
  const [showCard, setShowCard] = useState(true);

  const navigate = useNavigate();
  const selectedRowData = selectedRow.data;
  const isShowDetails = showCard && selectedRowData !== null;
  const isShowEdit = !showCard && selectedRowData !== null;
  const columns = generateUserTableColumns(keyword);

  // Get the data from API
  const { data: users, isLoading } = getUsers();
  const { data: roleData } = getRoles();
  const { data: ruleData } = getRules();
  const { data: userRolesData } = getUserRoles();
  const { data: userRulesData } = getUserRules();
  const { data: roleRulesData } = getRoleRules();

  // Handles the data
  const { userRolesItem, userRulesItem } = getUserRolesAndRules(
    selectedRowData?.id!,
    roleData!,
    ruleData!,
    userRolesData!,
    userRulesData!
  );

  let userRoles: Item[] = [];

  if (roleData && userRolesData) {
    userRoles = roleData.map((role) => {
      // Check if the current user is assigned this role or not
      let isAssigned = userRolesData.some(
        (userRole) =>
          userRole.userId === selectedRowData?.id && userRole.roleId === role.id
      );

      return {
        ...role,
        isAssigned,
      };
    });
  }

  let userRules: Item[] = [];

  if (ruleData && userRulesData) {
    userRules = ruleData.map((rule) => {
      // Check if the current user is assigned this rule or not
      let isAssigned = userRulesData.some(
        (userRule) =>
          userRule.userId === selectedRowData?.id && userRule.ruleId === rule.id
      );

      // Find all roles assigned to this rule
      let assignedTo = roleRulesData
        ?.filter((roleRule) => roleRule.ruleId === rule.id)
        .map((roleRule) => {
          let role = roleData?.find((role) => role.id === roleRule.roleId);
          return { id: role?.id, name: role?.name, bgColor: role?.bgColor };
        });

      // Check if the current user is assigned roles corresponding to this rule
      if (assignedTo) {
        assignedTo = assignedTo.filter((role) =>
          userRolesData?.some(
            (userRole) =>
              userRole.userId === selectedRowData?.id &&
              userRole.roleId === role.id
          )
        );
      }

      let isRoleAssigned = assignedTo?.length! > 0 && !isAssigned;

      // Returns a new rule with the isAssigned and assignedTo properties set
      return {
        ...rule,
        isAssigned: isAssigned || isRoleAssigned,
        isRoleAssigned: isRoleAssigned,
        assignedTo: assignedTo,
      };
    });
  }

  /**
   * Handles the search operation in the application.
   * Updates the state of `keyword` with the provided search keyword.
   *
   * @param {string} keyword - The search keyword.
   */
  const handleSearch = (keyword: string) => setKeyword(keyword);

  /**
   * Filters the users based on the search keyword.
   * @param users - The array of users to filter.
   * @param keyword - The search keyword.
   * @returns The filtered array of users.
   */
  const filteredUsers = useMemo(() => {
    return (users || []).filter((user: User) =>
      user.userName?.toLowerCase().includes(keyword.toLowerCase())
    );
  }, [users, keyword]);

  /**
   * Handles the event when a row in the table is clicked.
   * Updates the state of `selectedRow` with the index and data of the clicked row.
   *
   * @param {number} index - The index of the clicked row.
   * @param {User} user - The data of the user corresponding to the clicked row.
   */
  const handleRowClick = (index: number, user: User) => {
    if (selectedRow && selectedRow.index === index) {
      setSelectedRow({ index: -1, data: null });
      setDataItems([]);
      return;
    }

    setSelectedRow({ index, data: user });
    setDataItems([...transformUserInfo(user)]);
  };

  /**
   * Handle events to show the panel and hide the card
   */
  const handleTogglePanel = () =>
    setShowCard((prevShowPanel) => !prevShowPanel);

  // Interface and display detailed information
  const placements = {
    left: '10px 10px 10px 222px',
    right: '10px 222px 10px 10px',
    top: '222px 10px 10px 10px',
    bottom: '10px 10px 222px',
  };

  const contentWrapperStyle = {
    padding: placements[position],
    width: '100%',
  };

  /**
   * Handles the click event to navigate to the correspod role
   *
   * @param roleId - The ID of the role.
   */
  const handleNavigateToRoleClick = (roleId: string) => {
    const role = roleData?.find((role) => role.id === roleId);
    const index = roleData?.findIndex((role) => role.id === roleId) ?? -1;

    setSelectedRow({ index, data: role });
    navigate(PATH.ROLES_PATH);
  };

  /**
   * Handles the click event to navigate to the correspod rule
   *
   * @param ruleId - The ID of the rule.
   */
  const handleNavigateToRuleClick = (ruleId: string) => {
    const rule = ruleData?.find((rule) => rule.id === ruleId);
    const index = ruleData?.findIndex((rule) => rule.id === ruleId) ?? -1;

    setSelectedRow({ index, data: rule });
    navigate(PATH.RULES_PATH);
  };

  const userDetailsInfo = [
    {
      type: TYPES.AVATAR_LABEL_VIEW,
      src: selectedRowData?.avatar,
      alt: selectedRowData?.userName,
      label: selectedRowData?.userName,
      bgColor: selectedRowData?.bgColor,
    },
    {
      type: TYPES.TEXT_VIEW,
      icon: Envelope,
      label: 'Email:',
      value: selectedRowData?.email,
    },
    {
      type: TYPES.TEXT_VIEW,
      icon: Clock,
      label: 'Last visited:',
      value: selectedRowData?.lastVisited,
    },
    {
      type: TYPES.LIST_VIEW,
      values: [
        {
          icon: Shield,
          label: `Roles (${userRolesItem?.length})`,
          values:
            userRolesItem?.map((role) => ({
              id: role?.id,
              text: role?.name,
              onClick: () => handleNavigateToRoleClick(role?.id!),
            })) ?? [],
        },
        {
          icon: ListCheck,
          label: `Rules (${
            Array.isArray(userRulesItem) ? userRulesItem.length : 0
          })`,
          values: Array.isArray(userRulesItem)
            ? userRulesItem.map((rule) => ({
                id: rule?.id,
                text: rule?.description,
                onClick: () => handleNavigateToRuleClick(rule?.id!),
              }))
            : [],
        },
      ],
    },
  ] as SidebarProps['data'];

  /**
   * Handles the removal of a user.
   * This function sets the progress state to 'processing',
   * sends a request to delete the user with the specified ID,
   * and updates the UI based on the response.
   */
  const handleRemove = async () => {
    dispatchToast({ type: 'PROCESSING' });

    const res = await deleteUser(selectedRowData?.id!);

    const data = extractData(res);

    if (!data) {
      dispatchToast({ type: 'FAILURE' });
      return;
    }

    mutate(`${API.BASE}/${API.USER}`);
    setSelectedRow({ index: -1, data: null });
    setDataItems([...transformUserInfo(data)]);
    dispatchToast({ type: 'SUCCESS' });
  };

  /**
   * Edit a user.
   * @param {string} userData - The user's data after updated.
   * @returns {Promise<void>} - Promise when finished processing.
   */
  const handleUpdate = async (userData: User) => {
    dispatchToast({ type: 'PROCESSING' });

    const updatedUserData = {
      userName: userData.userName,
      avatar: userData.avatar,
      isActive: userData.isActive,
      email: userData.email,
      registered: selectedRowData?.registered || '',
      lastVisited: dateFormat(new Date().toString()),
      details: userData.details,
      bgColor: selectedRowData ? selectedRowData.bgColor : '',
    };

    const res = await editUser(selectedRowData?.id!, updatedUserData);

    const data = extractData(res);

    if (!data) {
      dispatchToast({ type: 'FAILURE' });
      return;
    }

    mutate(`${API.BASE}/${API.USER}`);
    setSelectedRow({ index: selectedRow.index, data });
    setDataItems([...transformUserInfo(data)]);
    dispatchToast({ type: 'SUCCESS' });
  };

  const tabsContent = [
    {
      title: 'General',
      content: (
        <EditorProfile
          key={selectedRowData?.id}
          id={selectedRowData?.id}
          bgColor={selectedRowData?.bgColor}
          dataItems={dataItems}
          onRemove={handleRemove}
          onSubmit={handleUpdate}
        />
      ),
    },
    {
      title: 'Rules',
      content: (
        <AssignUserRules
          key={selectedRowData?.id}
          heading={selectedRowData?.userName}
          rules={userRules}
        />
      ),
    },
    {
      title: 'Roles',
      content: (
        <AssignUserRoles
          key={selectedRowData?.id}
          heading={selectedRowData?.userName}
          roles={userRoles}
        />
      ),
    },
  ];

  return (
    <>
      <div style={contentWrapperStyle}>
        <SearchBar
          label="Users"
          placeholder="Search"
          onChange={handleSearch}
        />
        <Table
          rowData={filteredUsers}
          columns={columns}
          onRowClick={handleRowClick}
          selectedRow={selectedRow}
          isLoading={isLoading}
        />
      </div>
      {isShowDetails && (
        <Sidebar
          key={selectedRowData?.id}
          title="User information"
          isActive={selectedRowData?.isActive}
          onShowPanel={handleTogglePanel}
          data={userDetailsInfo}
        />
      )}
      {isShowEdit && (
        <Panel tabs={tabsContent} onBackClick={handleTogglePanel} />
      )}
    </>
  );
};

export default Home;
