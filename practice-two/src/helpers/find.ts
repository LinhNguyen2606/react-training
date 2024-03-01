/**
 * Search for the ID of the item assigned to the user.
 *
 * @param userId - User ID.
 * @param itemId - ID of the item to find (can be the ID of a rule or role).
 * @param userItems - Array containing items assigned to users.
 * @returns Returns the item ID if found, otherwise returns null.
 */
export const findUserIdFromAssigned = <T extends { [key: string]: any }>(
  userId: string,
  itemId: string,
  userItems: T[],
  key: string
) => {
  const userItem = userItems.find(
    (item) => item.userId === userId && item[key] === itemId
  );

  return userItem ? userItem.id : null;
};
