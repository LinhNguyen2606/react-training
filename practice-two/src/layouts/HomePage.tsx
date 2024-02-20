import { useMemo, useState } from 'react';
import useSWR from 'swr';

// Interfaces
import { EnitityColumn, User } from '@interfaces';

// Components
import {
  Avatar,
  SearchBar,
  Status,
  Table
} from '@components';
import { DrawerPosition } from '@components/Drawer';

// Helpers
import { fetcher, highlightKeyword } from '@helpers';

// Constants
import { API_BASE_URL, USER_API_ENDPOINT } from '@constants';

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

const UserPage = ({ position }: { position: DrawerPosition }) => {
  // Variables related to user data and state
  const [selectedRow, setSelectedRow] = useState<{
    index: number;
    data: User | null;
  }>({ index: -1, data: null });

  // Variables related to UI state
  const [keyword, setKeyword] = useState('');

  // Variables related to data processing
  const columns = generateUserTableColumns(keyword);

  const getUsers = () =>
    useSWR<User[]>(`${API_BASE_URL}/${USER_API_ENDPOINT}`, fetcher);

  const { data: users, isValidating } = getUsers();

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
      return;
    }

    setSelectedRow({ index, data: user });
  };

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

  return (
      <div style={contentWrapperStyle}>
        <SearchBar label="Users" placeholder="Search" onChange={handleSearch} />
        <Table
          rowData={filteredUsers}
          columns={columns}
          onRowClick={handleRowClick}
          selectedRow={selectedRow}
          loading={isValidating}
        />
      </div>
  );
};

export default UserPage;
