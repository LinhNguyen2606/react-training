/**
 * Checks if an item is assigned to a user.
 *
 * @param userId - The ID of the user.
 * @param itemId - The ID of the item.
 * @param userItems - An array of user items.
 * @param key - The key to compare against the item ID.
 * @returns A boolean indicating whether the item is assigned to the user.
 */
export const isItemAssignedToUser = <T extends { [key: string]: any }>(
  userId: string,
  itemId: string,
  userItems: T[],
  key: string
) => userItems?.some((item) => item.userId === userId && item[key] === itemId);

/**
 * Checks if an item is assigned to a role.
 *
 * @param roleId - The ID of the role.
 * @param itemId - The ID of the item.
 * @param roleItems - An array of role items.
 * @param key - The key to compare against the item ID.
 * @returns A boolean indicating whether the item is assigned to the role.
 */
export const isItemAssignedToRole = <T extends { [key: string]: any }>(
  roleId: string,
  itemId: string,
  roleItems: T[],
  key: string
) => roleItems?.some((item) => item.roleId === roleId && item[key] === itemId);
