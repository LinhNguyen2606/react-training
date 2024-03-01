import {
  useContext,
  useMemo,
  useState
} from 'react';

// Icons
import { ListCheck, UserGroup } from '@assets/icons';

// Components
import {
  Avatar,
  SearchBar,
  Sidebar,
  Table
} from '@components';
import { DrawerPosition } from '@components/Drawer';

// Constant
import { TYPES } from '@constants';

// Helpers
import {
  getCorrespondingRoleItems,
  getCorrespondingUserItems,
  getRulesOfRole,
  getUsersOfRole,
  highlightKeyword,
  transformListViewRoleInfo,
} from '@helpers';

import { EnitityColumn, Role } from '@interfaces';

// Services
import {
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
  const { selectedRow, setSelectedRow, setDataItems } = useContext(Context);

  const selectedRowData = selectedRow.data;

  const [keyword, setKeyword] = useState('');
  const [showCard, setShowCard] = useState(true);

  const isShowDetails = showCard && selectedRowData !== null;

  const columns = generateRoleTableColumns(keyword);

  const { data: users } = getUsers();
  const { data: rules } = getRules();
  const { data: roles, isValidating } = getRoles();
  const { data: userRoles } = getUserRoles();
  const { data: roleRules } = getRoleRules();

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
            text: roleRule?.name,
            link: '/',
          })),
        },
        {
          icon: UserGroup,
          label: `Members assigned (${usersOfRole.length})`,
          values: usersOfRole.map((userRole) => ({
            text: userRole?.userName,
            link: '/',
          })),
        },
      ],
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
    </>
  );
};

export default RolePage;
