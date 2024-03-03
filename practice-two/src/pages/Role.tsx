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
import { DrawerPosition } from '@components/Drawer';
import EditorRole from '@components/Panel/EditorRole';

// Constants
import {
  API,
  PATH,
  TYPES
} from '@constants';

// Helpers
import {
  extractData,
  getCorrespondingRoleItems,
  getCorrespondingUserItems,
  getRulesOfRole,
  getUsersOfRole,
  highlightKeyword,
  transformListViewRoleInfo,
  transformRoleInfo,
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
          alt={item.name}
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
            __html: highlightKeyword(item.name, searchKeyword),
          }}
        />
      ),
    },
  ];
};

const RolePage = ({ position }: { position: DrawerPosition }) => {
  // Context and State
  const {
    selectedRow,
    setSelectedRow,
    dataItems,
    setDataItems,
    setIsShowProgress,
  } = useContext(Context);
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
  const { data: roles, isValidating } = getRoles();
  const { data: userRoles } = getUserRoles();
  const { data: roleRules } = getRoleRules();

  // Handles the data
  const rulesOfRole = getRulesOfRole(
    roleRules || [],
    rules || [],
    selectedRowData?.id
  );

  const usersOfRole = getUsersOfRole(
    userRoles || [],
    users || [],
    selectedRowData?.id
  );

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
      setSelectedRow({ index: -1, data: null });
      setDataItems([]);
      return;
    }

    setSelectedRow({ index, data: role });
    setDataItems([
      ...transformListViewRoleInfo(
        getCorrespondingRoleRules,
        getCorrespondingUserRoles
      ),
      ...transformRoleInfo(role),
    ]);
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
   * Navigates to an item based on its ID and path.
   *
   * @param id - The ID of the item.
   * @param path - The path to navigate to.
   * @param findData - A function that finds the data item based on its ID.
   */
  const handleNavigateToItem = (
    id: string,
    path: string,
    findData: (id: string) => any
  ) => {
    const dataItem = findData(id);
    setSelectedRow({ index: selectedRow.index, data: dataItem });
    navigate(path);
  };

  /**
   * Handles the click event to navigate to the correspod rule
   *
   * @param ruleId - The ID of the rule.
   */
  const handleRuleClick = (ruleId: string) => {
    handleNavigateToItem(ruleId, PATH.RULES_PATH, (id) =>
      roleRules?.find((roleRule) => roleRule.id === id)
    );
  };

  /**
   * Handles the click event to navigate to the correspod user
   *
   * @param userId - The ID of the user.
   */
  const handleUserClick = (userId: string) => {
    handleNavigateToItem(userId, PATH.HOME_PATH, (id) =>
      users?.find((user) => user.id === id)
    );
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
            onClick: () => handleRuleClick(roleRule?.id!),
          })),
        },
        {
          icon: UserGroup,
          label: `Members assigned (${usersOfRole.length})`,
          values: usersOfRole.map((userRole) => ({
            id: userRole?.id,
            text: userRole?.userName,
            onClick: () => handleUserClick(userRole?.id!),
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
    setIsShowProgress('processing');

    const res = await deleteRole(selectedRowData?.id);

    const data = extractData(res);

    if (!data) {
      setIsShowProgress('failure');
      return;
    }

    mutate(`${API.BASE}/${API.ROLE}`);
    setSelectedRow({ index: -1, data: null });
    setIsShowProgress('success');
  };

  /**
   * Edit a role.
   * @param {string} roleData - The role's data after updated.
   * @returns {Promise<void>} - Promise when finished processing.
   */
  const handleUpdate = async (roleData: Role) => {
    setIsShowProgress('processing');
    
    const updatedRoleData = {
      name: roleData.name,
      avatar: '',
      bgColor: roleData.bgColor,
    };

    const res = await editRole(selectedRowData?.id, updatedRoleData);

    const data = extractData(res);
    
    if (!data) {
      setIsShowProgress('failure');
      return;
    }

    mutate(`${API.BASE}/${API.ROLE}`);
    setSelectedRow({ index: selectedRow.index, data });
    setDataItems([
      ...transformListViewRoleInfo(
        getCorrespondingRoleRules,
        getCorrespondingUserRoles
      ),
      ...transformRoleInfo(data),
    ]);
    setIsShowProgress('success');
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
  ];

  return (
    <>
      <div style={contentWrapperStyle}>
        <SearchBar label="Roles" placeholder="Search" onChange={handleSearch} />
        <Table
          rowData={filteredRoles}
          columns={columns}
          onRowClick={handleRowClick}
          selectedRow={selectedRow}
          isLoading={isValidating}
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
