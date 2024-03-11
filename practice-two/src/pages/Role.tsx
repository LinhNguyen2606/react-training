import {
  useContext,
  useMemo,
  useState
} from 'react';
import { useNavigate } from 'react-router-dom';
import { mutate } from 'swr';

// Icons
import { ListCheck, UserGroup } from '@assets/icons';

// Components
import {
  Avatar,
  Panel,
  SearchBar,
  Sidebar,
  Table
} from '@components';
import EditorRole from '@components/Panel/EditorRole';
import AssignRoleRules from '@components/Panel/AssignRoleRules';
import AssignRoleMembers from '@components/Panel/AssignRoleMembers';

// Constants
import {
  API,
  PATH,
  TYPES
} from '@constants';

// Helpers
import {
  assignItems,
  extractData,
  getCorrespondingRoleItems,
  getCorrespondingUserItems,
  getRulesOfRole,
  getUsersOfRole,
  highlightKeyword,
  transformListViewRoleInfo,
  transformRoleInfo,
  transformUserInfo,
} from '@helpers';

import { EnitityColumn, Role } from '@interfaces';

// Services
import {
  deleteRole,
  editRole,
  getRoleRules,
  getRoles,
  getRules,
  getUserRoles,
  getUsers,
} from '@services';

// Context
import { Context } from '@stores';

/**
 * Defines the columns configuration for the role table.
 * @param {string} searchKeyword The keyword role for highlighting in the table.
 * @returns {Array<EnitityColumn<Role>>} The array of column configurations.
 */
const generateRoleTableColumns = (
  searchKeyword: string
): EnitityColumn<Role>[] => {
  return [
    {
      key: 'avatar',
      title: '',
      render: (_, item) => (
        <Avatar
          src={item.avatar}
          alt={item.name!}
          bgColor={item.bgColor}
          size="sm"
        />
      ),
    },
    {
      key: 'name',
      title: 'Name',
      render: (_, item) => (
        <span
          dangerouslySetInnerHTML={{
            __html: highlightKeyword(item.name!, searchKeyword),
          }}
        />
      ),
    },
  ];
};

const RolePage = () => {
  // Context and State
  const { state, dispatch } = useContext(Context);
  const { selectedRow, dataItems } = state;
  const [keyword, setKeyword] = useState('');
  const [showCard, setShowCard] = useState(true);

  const navigate = useNavigate();
  const selectedRowData = selectedRow.data;
  const isShowDetails = showCard && selectedRowData !== null;
  const isShowEdit = !showCard && selectedRowData !== null;
  const columns = generateRoleTableColumns(keyword);

  // Get the data from API
  const { data: users } = getUsers();
  const { data: rules } = getRules();
  const { data: roles, isLoading } = getRoles();
  const { data: userRoles } = getUserRoles();
  const { data: roleRulesData } = getRoleRules();

  // Handles the data
  const rulesOfRole = getRulesOfRole(
    roleRulesData || [],
    rules || [],
    selectedRowData?.id!
  );

  const usersOfRole = getUsersOfRole(
    userRoles || [],
    users || [],
    selectedRowData?.id!
  );

  const getCorrespondingRoleRules = getCorrespondingRoleItems(
    roleRulesData || [],
    rules || [],
    selectedRow.data?.id!
  );

  const getCorrespondingUserRoles = getCorrespondingUserItems(
    userRoles || [],
    roles || [],
    selectedRow.data?.id!
  );

  const roleRules = useMemo(
    () =>
      assignItems(
        rules!,
        roleRulesData!,
        selectedRowData?.id,
        'roleId',
        'ruleId'
      ),
    [rules, roleRulesData, selectedRowData]
  );

  const roleMembers = useMemo(
    () =>
      assignItems(users!, userRoles!, selectedRowData?.id, 'roleId', 'userId'),
    [users, userRoles, selectedRowData]
  );

  /**
   * Handles the search operation in the application.
   * Updates the state of `keyword` with the provided search keyword.
   *
   * @param {string} keyword - The search keyword.
   */
  const handleSearch = (keyword: string) => setKeyword(keyword);

  /**
   * Handle events to show the panel and hide the panel
   */
  const handleTogglePanel = () =>
    setShowCard((prevShowPanel) => !prevShowPanel);

  /**
   * Handles the event when a row in the table is clicked.
   * Updates the state of `selectedRow` with the index and data of the clicked row.
   *
   * @param {number} index - The index of the clicked row.
   * @param {Role} role - The data of the user corresponding to the clicked row.
   */
  const handleRowClick = (index: number, role: Role) => {
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
      payload: { index, data: role },
    });

    dispatch({
      type: TYPES.DATA_ITEMS,
      payload: [
        ...transformListViewRoleInfo(
          getCorrespondingRoleRules,
          getCorrespondingUserRoles
        ),
        ...transformRoleInfo(role),
      ],
    });
  };

  /**
   * Filters the roles based on the search keyword.
   * @param roles - The array of roles to filter.
   * @param keyword - The search keyword.
   * @returns The filtered array of roles.
   */
  const filteredRoles = useMemo(() => {
    return (roles || []).filter((role: Role) =>
      role.name?.toLowerCase().includes(keyword.toLowerCase())
    );
  }, [roles, keyword]);

  /**
   * Handles the click event to navigate to the correspod rule
   *
   * @param ruleId - The ID of the rule.
   */
  const handleNavigateToRuleClick = (ruleId: string) => {
    const rule = rules?.find((rule) => rule.id === ruleId);
    const index =
      roleRulesData?.findIndex((roleRule) => roleRule.id === ruleId) ?? -1;

    dispatch({
      type: TYPES.SELECTED_ROW,
      payload: { index, data: rule },
    });

    navigate(PATH.RULES_PATH);
  };

  /**
   * Handles the click event to navigate to the correspod user
   *
   * @param userId - The ID of the user.
   */
  const handleNavigateToUserClick = (userId: string) => {
    const user = users?.find((user) => user.id === userId);
    const index = users?.findIndex((user) => user.id === userId) ?? -1;

    dispatch({
      type: TYPES.SELECTED_ROW,
      payload: { index, data: user },
    });

    dispatch({ type: TYPES.DATA_ITEMS, payload: [...transformUserInfo(user!)] });

    navigate(PATH.HOME_PATH);
  };

  const roleDetailsInfo = [
    {
      type: TYPES.AVATAR_LABEL_VIEW,
      src: selectedRowData?.avatar,
      alt: selectedRowData?.name,
      label: selectedRowData?.name,
      bgColor: selectedRowData?.bgColor,
    },
    {
      type: TYPES.LIST_VIEW,
      values: [
        {
          icon: ListCheck,
          label: `Rules assigned (${rulesOfRole.length})`,
          values: rulesOfRole.map((roleRule) => ({
            id: roleRule?.id,
            text: roleRule?.name,
            onClick: () => handleNavigateToRuleClick(roleRule?.id!),
          })),
        },
        {
          icon: UserGroup,
          label: `Members assigned (${usersOfRole.length})`,
          values: usersOfRole.map((userRole) => ({
            id: userRole?.id,
            text: userRole?.userName,
            onClick: () => handleNavigateToUserClick(userRole?.id!),
          })),
        },
      ],
    },
  ];

  /**
   * Handles the removal of a role.
   * This function sets the progress state to 'processing',
   * sends a request to delete the role with the specified ID,
   * and updates the UI based on the response.
   */
  const handleRemove = async () => {
    dispatch({ type: TYPES.PROCESSING });

    const res = await deleteRole(selectedRowData?.id!);

    const data = extractData(res);

    if (!data) {
      dispatch({ type: TYPES.FAILURE });
      return;
    }

    mutate(`${API.BASE}/${API.ROLE}`);

    dispatch({
      type: TYPES.SELECTED_ROW,
      payload: { index: -1, data: null },
    });

    dispatch({ type: TYPES.SUCCESS });
  };

  /**
   * Edit a role.
   * @param {string} roleData - The role's data after updated.
   * @returns {Promise<void>} - Promise when finished processing.
   */
  const handleUpdate = async (roleData: Role) => {
    dispatch({ type: TYPES.PROCESSING });

    const updatedRoleData = {
      name: roleData.name,
      avatar: '',
      bgColor: roleData.bgColor,
    };

    const res = await editRole(selectedRowData?.id!, updatedRoleData);

    const data = extractData(res);

    if (!data) {
      dispatch({ type: TYPES.FAILURE });
      return;
    }

    mutate(`${API.BASE}/${API.ROLE}`);
    dispatch({
      type: TYPES.SELECTED_ROW,
      payload: { index: selectedRow.index, data },
    });

    dispatch({
      type: TYPES.DATA_ITEMS,
      payload: [
        ...transformListViewRoleInfo(
          getCorrespondingRoleRules,
          getCorrespondingUserRoles
        ),
        ...transformRoleInfo(data),
      ],
    });

    dispatch({ type: TYPES.SUCCESS });
  };

  const tabsContent = [
    {
      title: 'General',
      content: (
        <EditorRole
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
        <AssignRoleRules
          key={selectedRowData?.id}
          heading={selectedRowData?.name}
          items={roleRules}
          ruleData={rules}
          roles={roles}
          roleRules={roleRulesData}
          userRoles={userRoles}
        />
      ),
    },
    {
      title: 'Members',
      content: (
        <AssignRoleMembers
          key={selectedRowData?.id}
          heading={selectedRowData?.name}
          items={roleMembers}
          rules={rules}
          roles={roles}
          roleRules={roleRulesData}
          userRoles={userRoles}
        />
      ),
    },
  ];

  return (
    <>
      <div className="content__wrapper">
        <SearchBar label="Roles" placeholder="Search" onChange={handleSearch} />
        <Table
          rowData={filteredRoles}
          columns={columns}
          onRowClick={handleRowClick}
          selectedRow={selectedRow}
          isLoading={isLoading}
        />
      </div>
      {isShowDetails && (
        <Sidebar
          key={selectedRowData?.id}
          title="Role information"
          onShowPanel={handleTogglePanel}
          data={roleDetailsInfo}
        />
      )}
      {isShowEdit && (
        <Panel tabs={tabsContent} onBackClick={handleTogglePanel} />
      )}
    </>
  );
};

export default RolePage;
