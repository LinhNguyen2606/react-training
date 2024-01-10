import { useEffect, useState } from 'react';

// Interface
import { User } from '@interfaces';

/**
 * Custom hook to filter users based on a keyword.
 *
 * @param {User[]} users - The array of users to filter.
 * @param {string} keyword - The keyword to filter users by.
 *
 * @returns {User[]} The array of users that match the keyword.
 */
export const useFilteredUsers = (users: User[], keyword: string): User[] => {
  const [filterUser, setFilterUser] = useState<User[]>([]);

  useEffect(() => {
    const filteredUsers = users.filter((user) => user.userName?.toLowerCase().includes(keyword.toLowerCase()));
    setFilterUser(filteredUsers);
  }, [users, keyword]);

  return filterUser;
};
