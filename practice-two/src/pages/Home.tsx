import {
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react';
import { mutate } from 'swr';
import { useNavigate } from 'react-router-dom';

// Interfaces
import { EnitityColumn, User } from '@interfaces';

// Components
import {
  Avatar,
  Panel,
  SearchBar,
  Sidebar,
  Status,
  Table
} from '@components';
import { SidebarProps } from '@components/Sidebar/SidebarInfo';
import EditorProfile from '@components/Panel/EditorProfile';
import AssignUserRules from '@components/Panel/AssignUserRules';
import AssignUserRoles from '@components/Panel/AssignUserRoles';

// Helpers
import {
  assignItems,
  assignUserRules,
  dateFormat,
  extractData,
  getUserRolesAndRules,
  highlightKeyword,
  transformRoleInfo,
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

const Home = () => {
  // Context and State
  const { state, dispatch } = useContext(Context);
  const { selectedRow, dataItems } = state;
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
  
  const userRoles = useMemo(
    () =>
      assignItems(
        roleData!,
        userRolesData!,
        selectedRowData?.id,
        'userId',
        'roleId'
      ),
    [roleData, userRolesData, selectedRowData]
  );

  const assignUserRulesCallback = useCallback(assignUserRules, []);

  const userRules = useMemo(
    () =>
      assignUserRulesCallback(
        ruleData!,
        userRulesData!,
        roleRulesData!,
        roleData!,
        userRolesData!,
        selectedRowData!,
        'userId',
        'ruleId',
        'roleId'
      ),
    [
      ruleData,
      userRulesData,
      roleRulesData,
      roleData,
      userRolesData,
      selectedRowData,
      assignUserRulesCallback,
    ]
  );

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
      dispatch({
        type: TYPES.SELECTED_ROW,
        payload: { index: -1, data: null },
      });
      dispatch({ type: TYPES.DATA_ITEMS, payload: [] });
      return;
    }

    dispatch({
      type: TYPES.SELECTED_ROW,
      payload: { index: index, data: user },
    });

    dispatch({ type: TYPES.DATA_ITEMS, payload: [...transformUserInfo(user)] });
  };

  /**
   * Handle events to show the panel and hide the card
   */
  const handleTogglePanel = () =>
    setShowCard((prevShowPanel) => !prevShowPanel);

  /**
   * Handles the click event to navigate to the correspod role
   *
   * @param roleId - The ID of the role.
   */
  const handleNavigateToRoleClick = (roleId: string) => {
    const role = roleData?.find((role) => role.id === roleId);
    const index = roleData?.findIndex((role) => role.id === roleId) ?? -1;

    dispatch({
      type: TYPES.SELECTED_ROW,
      payload: { index, data: role },
    });

    dispatch({
      type: TYPES.DATA_ITEMS,
      payload: [
        ...transformRoleInfo(role!),
      ],
    });

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

    dispatch({
      type: TYPES.SELECTED_ROW,
      payload: { index, data: rule },
    });
    
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
    dispatch({ type: TYPES.PROCESSING });

    const res = await deleteUser(selectedRowData?.id!);

    const data = extractData(res);

    if (!data) {
      dispatch({ type: TYPES.FAILURE });
      return;
    }

    mutate(`${API.BASE}/${API.USER}`);

    dispatch({
      type: TYPES.SELECTED_ROW,
      payload: { index: -1, data: null },
    });

    dispatch({ type: TYPES.SUCCESS });
  };

  /**
   * Edit a user.
   * @param {string} userData - The user's data after updated.
   * @returns {Promise<void>} - Promise when finished processing.
   */
  const handleUpdate = async (userData: User) => {
    dispatch({ type: TYPES.PROCESSING });

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
      dispatch({ type: TYPES.FAILURE });
      return;
    }

    mutate(`${API.BASE}/${API.USER}`);

    dispatch({
      type: TYPES.SELECTED_ROW,
      payload: { index: selectedRow.index, data },
    });

    dispatch({
      type: TYPES.DATA_ITEMS,
      payload: [...transformUserInfo(data)],
    });

    dispatch({ type: TYPES.SUCCESS });
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
          rules={userRules}
          roles={roleData}
          heading={selectedRowData?.userName}
          ruleData={ruleData}
          userRules={userRulesData}
          userRoles={userRolesData}
          roleRules={roleRulesData}
        />
      ),
    },
    {
      title: 'Roles',
      content: (
        <AssignUserRoles
          key={selectedRowData?.id}
          roles={userRoles}
          rules={ruleData}
          heading={selectedRowData?.userName}
          roleData={roleData}
          userRules={userRulesData}
          userRoles={userRolesData}
        />
      ),
    },
  ];

  return (
    <>
      <div className="content__wrapper">
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
