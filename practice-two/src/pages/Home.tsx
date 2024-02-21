import {
  useContext,
  useMemo,
  useState
} from 'react';

// Interfaces
import { EnitityColumn, User } from '@interfaces';

// Components
import {
  Avatar,
  SearchBar,
  Sidebar,
  Status,
  Table
} from '@components';
import { DrawerPosition } from '@components/Drawer';
import { SidebarProps } from '@components/Sidebar/SidebarInfo';

// Helpers
import { getUserRolesAndRules, highlightKeyword } from '@helpers';

// Context
import { Context } from '@stores';

// Services
import {
  getRoles,
  getRules,
  getUserRoles,
  getUserRules,
  getUsers,
} from '@services';

// Constants
import { TYPES, USER_INFORMATION } from '@constants';

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
          alt={item.userName}
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
            __html: highlightKeyword(item.userName, searchKeyword),
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
            __html: highlightKeyword(item.email, searchKeyword),
          }}
        />
      ),
    },
  ];
};

const Home = ({ position }: { position: DrawerPosition }) => {
  // Variables related to user data and state
  const { selectedRow, setSelectedRow, setDataItems } = useContext(Context);
  const selectedRowData = selectedRow.data;

  // Variables related to UI state
  const [keyword, setKeyword] = useState('');
  const [showCard, setShowCard] = useState(true);
  const isShowDetails = showCard && selectedRowData !== null;

  // Variables related to data processing
  const columns = generateUserTableColumns(keyword);
  const generateUserInfo = (data: User) => USER_INFORMATION(data);

  const { data: users, isValidating } = getUsers();
  const { data: roleData } = getRoles();
  const { data: ruleData } = getRules();
  const { data: userRolesData } = getUserRoles();
  const { data: userRulesData } = getUserRules();

  const { userRolesItem, userRulesItem } = getUserRolesAndRules(
    Number(selectedRowData?.id!),
    roleData!,
    ruleData!,
    userRolesData!,
    userRulesData!
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
      setSelectedRow({ index: -1, data: null });
      setDataItems([]);
      return;
    }

    setSelectedRow({ index, data: user });
    setDataItems([...generateUserInfo(user)]);
  };

  /**
   * Handle events to show the panel and hide the card
   */
  const handleTogglePanel = () => setShowCard((prevShowCard) => !prevShowCard);

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
          values: userRolesItem?.map((role) => ({
            text: role?.name,
            link: '/',
          })),
        },
        {
          icon: ListCheck,
          label: `Rules (${userRulesItem?.length})`,
          values: userRulesItem?.map((rule) => ({
            text: rule?.description,
            link: '/',
          })),
        },
      ],
    },
  ] as SidebarProps['data'];

  return (
    <>
      <div style={contentWrapperStyle}>
        <SearchBar label="Users" placeholder="Search" onChange={handleSearch} />
        <Table
          rowData={filteredUsers}
          columns={columns}
          onRowClick={handleRowClick}
          selectedRow={selectedRow}
          isLoading={isValidating}
        />
      </div>
      {isShowDetails && (
        <Sidebar
          title="User information"
          isActive={selectedRowData.isActive}
          onShowPanel={handleTogglePanel}
          data={userDetailsInfo}
        />
      )}
    </>
  );
};

export default Home;
