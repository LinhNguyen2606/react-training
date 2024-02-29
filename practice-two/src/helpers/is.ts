export const isItemAssignedToUser = (
  userId: string,
  itemId: string,
  userItems: any[],
  key: string
) => userItems?.some((item) => item.userId === userId && item[key] === itemId);
