import {
  useContext,
  useMemo,
  useState
} from 'react';
import { mutate } from 'swr';

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
import { DrawerPosition } from '@components/Drawer';
import { SidebarProps } from '@components/Sidebar/SidebarInfo';
import EditorProfile from '@components/Panel/EditorProfile';

// Helpers
import {
  dateFormat,
  extractData,
  getUserRolesAndRules,
  highlightKeyword,
  transformDataItems,
} from '@helpers';

// Context
import { Context } from '@stores';

// Services
import {
  deleteUser,
  editUser,
  getRoles,
  getRules,
  getUserRoles,
  getUserRules,
  getUsers,
} from '@services';

// Constant
import { API, TYPES } from '@constants';

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
  const {
    selectedRow,
    setSelectedRow,
    setIsShowProgress,
    dataItems,
    setDataItems,
  } = useContext(Context);
  const selectedRowData = selectedRow.data;

  // Variables related to UI state
  const [keyword, setKeyword] = useState('');
  const [showCard, setShowCard] = useState(true);
  const isShowDetails = showCard && selectedRowData !== null;
  const isShowEdit = !showCard && selectedRowData !== null;

  // Variables related to data processing
  const columns = generateUserTableColumns(keyword);
  const generateDataItems = (data: User) => transformDataItems(data);

  const { data: users, isValidating } = getUsers();
  const { data: roleData } = getRoles();
  const { data: ruleData } = getRules();
  const { data: userRolesData } = getUserRoles();
  const { data: userRulesData } = getUserRules();

  const { userRolesItem, userRulesItem } = getUserRolesAndRules(
    selectedRowData?.id!,
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
    setDataItems([...generateDataItems(user)]);
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

  /**
   * Handles the removal of a user.
   * This function sets the progress state to 'processing',
   * sends a request to delete the user with the specified ID,
   * and updates the UI based on the response.
   */
  const handleRemove = async () => {
    setIsShowProgress('processing');

    const res = await deleteUser(selectedRowData?.id!);

    const data = extractData(res);

    if (data) {
      mutate(`${API.BASE}/${API.USER}`, false);
      setSelectedRow({ index: -1, data: null });
      setIsShowProgress('success');
      return;
    }

    setIsShowProgress('failure');
  };

  /**
   * Edit a user.
   * @param {string} userData - The user's data after updated.
   * @returns {Promise<void>} - Promise when finished processing.
   */
  const handleUpdate = async (userData: User) => {
    setIsShowProgress('processing');

    const updatedUserData = {
      userName: userData.userName,
      avatar: userData.avatar,
      isActive: userData.isActive,
      email: userData.email,
      registered: selectedRowData?.registered || '',
      lastVisited: dateFormat(new Date().toString()),
      details: userData.details,
      bgColor: selectedRowData ? selectedRowData.bgColor : '',
      roles: [],
      rules: []
    }

    const res = await editUser(selectedRowData?.id!, updatedUserData)

    const data = extractData(res);

    if (data) {
      mutate(`${API.BASE}/${API.USER}`, false);
      setSelectedRow({ index: selectedRow.index, data });
      setDataItems([...generateDataItems(data)]);
      setIsShowProgress('success');
      return;
    }

    setIsShowProgress('failure');
  };

  const tabsContent = [
    {
      content: (
        <EditorProfile
          id={selectedRowData?.id}
          bgColor={selectedRowData?.bgColor}
          dataItems={dataItems}
          onRemove={handleRemove}
          onSubmit={handleUpdate}
        />
      ),
      title: 'General',
    },
  ];

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
      {isShowEdit && (
        <Panel tabs={tabsContent} onBackClick={handleTogglePanel} />
      )}
    </>
  );
};

export default Home;
