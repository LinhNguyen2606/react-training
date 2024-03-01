export const isItemAssignedToUser = <T extends { [key: string]: any }>(
  userId: string,
  itemId: string,
  userItems: T[],
  key: string
) => userItems?.some((item) => item.userId === userId && item[key] === itemId);
