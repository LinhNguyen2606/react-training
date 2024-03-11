import { Item } from '@interfaces';

/**
 * Assigns items based on assignments and selected ID.
 * @param items - An array of items.
 * @param assignments - An array of assignments.
 * @param selectedId - The selected ID.
 * @param assignmentKey - The key in the assignments object to match with selected ID.
 * @param itemKey - The key in the items object to match with assignment ID.
 * @returns An array of items with assignment information.
 */
export const assignItems = <T extends { [key: string]: any }>(
  items: Item[],
  assignments: T[],
  selectedId: string | undefined,
  assignmentKey: keyof T,
  itemKey: string
): Item[] => {
  return items?.map((item) => {
    let isAssigned = assignments?.some(
      (assignment) =>
        assignment[assignmentKey] === selectedId &&
        assignment[itemKey] === item.id
    );

    return {
      ...item,
      isAssigned,
    };
  });
};

/**
 * Assigns user rules based on ruleData, userRulesData, roleRulesData, roleData, userRolesData, and selectedRowData.
 * @param ruleData - An array of rule data.
 * @param userRulesData - An array of user rule data.
 * @param roleRulesData - An array of role rule data.
 * @param roleData - An array of role data.
 * @param userRolesData - An array of user role data.
 * @param selectedRowData - The selected row data.
 * @param userIdKey - The key for user ID in userRulesData and userRolesData.
 * @param ruleIdKey - The key for rule ID in userRulesData and roleRulesData.
 * @param roleIdKey - The key for role ID in roleRulesData and userRolesData.
 * @returns An array of rule data with assignment information.
 */
export const assignUserRules = <
  T extends { [key: string]: any },
  U extends { [key: string]: any },
  V extends { [key: string]: any }
>(
  ruleData: Item[],
  userRulesData: T[],
  roleRulesData: U[],
  roleData: Item[],
  userRolesData: V[],
  selectedRowData: { id?: string },
  userIdKey: keyof T & keyof V,
  ruleIdKey: keyof T & keyof U,
  roleIdKey: keyof U & keyof V
): Item[] => {
  return ruleData?.map((rule) => {
    let isAssigned = userRulesData?.some(
      (userRule) =>
        userRule[userIdKey] === selectedRowData?.id &&
        userRule[ruleIdKey] === rule.id
    );

    let assignedTo = roleRulesData
      ?.filter((roleRule) => roleRule[ruleIdKey] === rule.id)
      .map((roleRule) => {
        let role = roleData?.find((role) => role.id === roleRule[roleIdKey]);
        return { id: role?.id, name: role?.name, bgColor: role?.bgColor };
      });

    if (assignedTo) {
      assignedTo = assignedTo.filter((role) =>
        userRolesData?.some(
          (userRole) =>
            userRole[userIdKey] === selectedRowData?.id &&
            userRole[roleIdKey] === role.id
        )
      );
    }

    let isRoleAssigned = assignedTo?.length! > 0 && !isAssigned;

    return {
      ...rule,
      isAssigned: isAssigned || isRoleAssigned,
      isRoleAssigned: isRoleAssigned,
      assignedTo: assignedTo,
    };
  });
};
