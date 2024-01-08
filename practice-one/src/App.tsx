// Hooks
import { useEffect, useState } from 'react';

// Components
import {
  Avatar,
  
  Drawer,
  Progress,
  SearchBar,
  Status,
  Table
} from '@components';

// Helpers
import {
  dateFormat,
  generateRandomColor,
  highlightKeyword
} from '@helpers';

// Interfaces
import { EnitityColumn, User } from '@interfaces';

// Services
import { createUser, fetchUsers } from '@services/index';

// Custom hooks
import { useFilteredUsers } from '@hooks';

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
    index: 0,
    data: null,
  });
  const [isShowProgress, setIsShowProgress] = useState(false);

  useEffect(() => {
    handleGetUsers();
  }, []);

  /**
   * Asynchronously fetches users from an external service and updates the state of `users`.
   * If the response is successful and contains data, the state of `users` is updated with the fetched data.
   */
  const handleGetUsers = async () => {
    const res = await fetchUsers();
    if (res && res.data) {
      setUsers(res.data);
    }
  };

  /**
   * Handles the search operation in the application.
   * Updates the state of `keyword` with the provided search keyword.
   *
   * @param {string} keyword - The search keyword.
   */
  const handleSearch = (keyword: string) => {
    setKeyword(keyword);
  };

  const filteredUsers = useFilteredUsers(users, keyword);

  const columns = generateUserTableColumns(keyword);

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
    } else {
      setSelectedRow({ index, data: user });
    }
  };

  /**
   * Add a new user.
   * @param {string} userName - Tên người dùng mới.
   * @returns {Promise<void>} - Hứa hẹn khi xử lý xong.
  */
  const handleAddUser = async (userName: string): Promise<void> => {
    setIsShowProgress(true);

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

    if (res && res.data) {
      setUsers((prevUsers) => [...prevUsers, res.data]);
      setSelectedRow({ index: users.length, data: res.data });
    }

    setIsShowProgress(false);
  };

  return (
    <>
      <header className="header">
        <h1 className="header__heading primary__text">User Manager</h1>
        {isShowProgress && <Progress successMessage="Done" />}
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
      </main>
    </>
  );
};

export default App;
