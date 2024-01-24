// Hooks
import {
  useEffect,
  useState
} from 'react';

// Components
import {
  Avatar,
  Drawer,
  Panel,
  Progress,
  SearchBar,
  Status,
  Table,
  Toast,
  ViewDetails,
} from '@components';
import EditorProfile from '@components/Panel/EditorProfile';

// Helpers
import {
  dateFormat,
  extractData,
  generateRandomColor,
  highlightKeyword,
} from '@helpers';

// Interfaces
import {
  EnitityColumn,
  User
} from '@interfaces';

// Services
import {
  createUser,
  deleteUser,
  editUser,
  fetchUsers
} from '@services';

// Constant
import {
  DATA_ITEMS,
  USER_INFORMATION
} from '@constants';

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
          additionalClass="avatar--circle"
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
      render: (_, item) => <Status isActive={item.isActive} />,
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

const App = () => {
  // Variables related to user data and state
  const [users, setUsers] = useState<User[]>([]);
  const [selectedRow, setSelectedRow] = useState<{
    index: number;
    data: User | null;
  }>({ index: -1, data: null });
  const selectedRowData = selectedRow.data;
  const [dataItems, setDataItems] = useState<any>([]);

  // Variables related to UI state
  const [keyword, setKeyword] = useState('');
  const [isShowProgress, setIsShowProgress] = useState<
    'idle' | 'processing' | 'success' | 'failure'
  >('idle');
  const [showCard, setShowCard] = useState(true);
  const isShowDetails = showCard && selectedRowData !== null;
  const isShowEdit = !showCard && selectedRowData !== null;

  // Variables related to data processing
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const columns = generateUserTableColumns(keyword);
  const generateUserInfo = (data: User) => USER_INFORMATION(data);
  const generateDataItems = (data: User) => DATA_ITEMS(data);

  useEffect(() => {
    handleGetUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.userName?.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [users, keyword]);

  /**
   * Asynchronously fetches users from an external service and updates the state of `users`.
   * If the response is successful and contains data, the state of `users` is updated with the fetched data.
   */
  const handleGetUsers = async () => {
    const res = await fetchUsers();
    const data = extractData(res);
    if (data) setUsers(data);
  };

  /**
   * Handles the search operation in the application.
   * Updates the state of `keyword` with the provided search keyword.
   *
   * @param {string} keyword - The search keyword.
   */
  const handleSearch = (keyword: string) => setKeyword(keyword);

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
    } else {
      setSelectedRow({ index, data: user });
      setDataItems([...generateUserInfo(user), ...generateDataItems(user)]);
    }
  };

  /**
   * Handle events to show the panel and hide the card
   */
  const handleTogglePanel = () => setShowCard((prevShowCard) => !prevShowCard);

  /**
   * Add a new user.
   * @param {string} userName - New user name.
   * @returns {Promise<void>} - Promise when finished processing.
   */
  const handleAddUser = async (userName: string): Promise<void> => {
    setIsShowProgress('processing');

    const res = await createUser({
      userName,
      avatar: '',
      isActive: false,
      email: '',
      registered: dateFormat(new Date().toString()),
      lastVisited: dateFormat(new Date().toString()),
      details: '',
      bgColor: generateRandomColor(),
    });

    const data = extractData(res);

    if (data) {
      setUsers((prevUsers) => [...prevUsers, data]);
      setSelectedRow({ index: users.length, data });
      setDataItems([...generateUserInfo(data), ...generateDataItems(data)]);
      setIsShowProgress('success');
    } else {
      setIsShowProgress('failure');
    }
  };

  /**
   * Handles the removal of a user.
   * This function sets the progress state to 'processing',
   * sends a request to delete the user with the specified ID,
   * and updates the UI based on the response.
   */
  const handleRemoveUser = async () => {
    setIsShowProgress('processing');

    const res = await deleteUser(Number(selectedRowData?.id));
    const data = extractData(res);

    if (data) {
      handleGetUsers();
      setSelectedRow({ index: -1, data: null });
      setIsShowProgress('success');
    } else {
      setIsShowProgress('failure');
    }
  };

  /**
   * Edit a user.
   * @param {string} userData - The user's data after updated.
   * @returns {Promise<void>} - Promise when finished processing.
   */
  const handleUpdateUser = async (userData: User): Promise<void> => {
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
    };

    const res = await editUser(Number(selectedRowData?.id), updatedUserData);
    const data = extractData(res);

    if (data) {
      handleGetUsers();
      setSelectedRow({ index: selectedRow.index, data });
      setDataItems([...generateUserInfo(data), ...generateDataItems(data)]);
      setIsShowProgress('success');
    } else {
      setIsShowProgress('failure');
    }
  };

  const tabsContent = [
    {
      content: (
        <EditorProfile
          id={selectedRowData?.id}
          dataItems={dataItems}
          onRemove={handleRemoveUser}
          onSubmit={handleUpdateUser}
          bgColor={selectedRowData?.bgColor}
        />
      ),
      title: 'General',
    },
  ];

  return (
    <>
      <header className="header">
        <h1 className="header__heading text--primary">User Manager</h1>
        {isShowProgress === 'processing' ? (
          <Progress isProcessing={true} delay={1000} />
        ) : (
          <Toast status={isShowProgress} delay={2000} />
        )}
      </header>
      <main className="main">
        <Drawer onSubmit={handleAddUser} />
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
          />
        </div>
        {isShowDetails && (
          <ViewDetails
            title="User information"
            isActive={selectedRowData.isActive}
            src={selectedRowData.avatar}
            bgColor={selectedRowData.bgColor}
            userName={selectedRowData.userName}
            infoItem={generateUserInfo(selectedRowData)}
            onShowPanel={handleTogglePanel}
          />
        )}
        {isShowEdit && (
          <Panel
            tabs={tabsContent}
            onBackClick={handleTogglePanel}
          />
        )}
      </main>
    </>
  );
};

export default App;
