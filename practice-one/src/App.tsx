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
  ViewDetails
} from '@components';
import EditorProfile from '@components/DataDisplay/Panel/EditorProfile';
import { InfoItemProps } from '@components/Surfaces/Card/ViewDetails/InfoItem';

// Helpers
import {
  dateFormat,
  extractData,
  generateRandomColor,
  highlightKeyword
} from '@helpers';

// Interfaces
import {
  DataItems,
  EnitityColumn,
  User
} from '@interfaces';

// Services
import {
  createUser,
  fetchUsers
} from '@services';

// Custom hooks
import { useFilteredUsers } from '@hooks';

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
const generateUserTableColumns = (searchKeyword: string): EnitityColumn<User>[] => {
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
  const [users, setUsers] = useState<User[]>([]);
  const [keyword, setKeyword] = useState('');
  const [selectedRow, setSelectedRow] = useState<{
    index: number;
    data: User | null;
  }>({
    index: -1,
    data: null,
  });
  const [isShowProgress, setIsShowProgress] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');
  const [userDetailsInfo, setUserDetailsInfo] = useState<InfoItemProps[]>([]);
  const [showCard, setShowCard] = useState(true);
  const [dataItems, setDataItems] = useState<DataItems[]>([]);

  useEffect(() => {
    if (!showCard && selectedRow.data !== null) {
      setDataItems(DATA_ITEMS(selectedRow.data));
    }
    handleGetUsers();
  }, [!showCard, selectedRow.data]);

  /**
   * Asynchronously fetches users from an external service and updates the state of `users`.
   * If the response is successful and contains data, the state of `users` is updated with the fetched data.
   */
  const handleGetUsers = async () => {
    const res = await fetchUsers();
    const data = extractData(res);
    if (data) {
      setUsers(data);
    }
  };

  /**
   * Handles the search operation in the application.
   * Updates the state of `keyword` with the provided search keyword.
   *
   * @param {string} keyword - The search keyword.
   */
  const handleSearch = (keyword: string) => setKeyword(keyword);

  const filteredUsers = useFilteredUsers(users, keyword);

  const columns = generateUserTableColumns(keyword);

  const selectedRowData = selectedRow.data;

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
      setUserDetailsInfo([]);
    } else {
      setSelectedRow({ index, data: user });   
      setUserDetailsInfo(USER_INFORMATION(user));
    }
  };

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
      setIsShowProgress('success');
    } else {
      setIsShowProgress('failed');
    }
  };

  /**
   * Handle events to show the panel and hide the card
   */
  const handleTogglePanel = () => setShowCard((prevShowCard) => !prevShowCard)

  const handleRemoveUser = () => {}

  return (
    <>
      <header className="header">
        <h1 className="header__heading text--primary">User Manager</h1>
        <Progress status={isShowProgress} />
      </header>
      <main className="main">
        <Drawer onSubmit={handleAddUser} />
        <div className="content__wrapper">
          <SearchBar label="Users" placeholder="Search" onChange={handleSearch} />
          <Table
            rowData={filteredUsers}
            columns={columns}
            onRowClick={handleRowClick}
            selectedRow={selectedRow}
          />
        </div>
        {showCard && selectedRowData !== null && (
          <ViewDetails
            title="User information"
            isActive={selectedRowData.isActive}
            src={selectedRowData.avatar}
            bgColor={selectedRowData.bgColor}
            userName={selectedRowData.userName}
            infoItem={userDetailsInfo}
            onShowPanel={handleTogglePanel}
          />
        )}
        {!showCard && selectedRowData !== null && (
          <Panel
            tabs={[
              {
                content: (
                  <EditorProfile
                    id={selectedRowData.id}
                    dataItems={dataItems}
                    onRemove={handleRemoveUser}
                  />
                ),
                title: 'General'
              }
            ]}
            onBackClick={handleTogglePanel}
          />
        )}
      </main>
    </>
  );
};

export default App;
