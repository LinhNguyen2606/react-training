// Interfaces
import {
  Role,
  RoleRule,
  Rule,
  User,
  UserRole,
  UserRule
} from '@interfaces';


/**
 * This function retrieves the roles and rules for a specific user.
 *
 * @param userId - The ID of the user.
 * @param roles - An array of all available roles.
 * @param rules - An array of all available rules.
 * @param userRoles - An array of relations between users and roles.
 * @param userRules - An array of relations between users and rules.
 *
 * @returns An object containing two properties: `userRolesItem` and `userRulesItem`.
 * `userRolesItem` is an array of roles that the user has.
 * `userRulesItem` is an array of rules that the user has.
 */
export const getUserRolesAndRules = (
  userId: string,
  roles: Role[],
  rules: Rule[],
  userRoles: UserRole[],
  userRules: UserRule[]
) => {
  let userRuleRelations: UserRule[] = [];

  // Get the userRoles for the specified user
  const userRoleRelations = userRoles?.filter((item) => item.userId === userId);

  // Get roles for user based on userRolesRelations
  const userRolesItem = userRoleRelations?.map((item) =>
    roles.find((role) => role.id === item.roleId)
  );

  // Get roleRules for roles of user
  if (Array.isArray(userRules)) {
    userRuleRelations = userRules?.filter((item) => item.userId === userId);
  }

  // Get rules for user based on userRoleRuleRelations
  const userRulesItem =
    Array.isArray(rules) &&
    userRuleRelations?.map((item) =>
      rules.find((rule) => rule.id === item.ruleId)
    );

  return { userRolesItem, userRulesItem };
};

/**
 * This function retrieves the roles and the rules .
 *
 * @param roleRules - An array of all available roleRu;es.
 * @param rules - An array of all available rules.
 *
 * @returns An object containing  propertie: `roleRulesMap`.
 * `roleRulesMap` is an array of roles that the roleRules has.
 */
export const getRoleRulesMap = (roleRules: RoleRule[], rules: Rule[]) => {
  let roleRulesMap: { [key: string]: Rule[] } = {};

  roleRules?.forEach((roleRules) => {
    // If role doesn't have in map, generate new array
    if (!roleRulesMap[roleRules.roleId]) {
      roleRulesMap[roleRules.roleId] = [];
    }

    let rule = rules.find((rule) => rule.id === roleRules.roleId);

    if (rule) {
      roleRulesMap[roleRules.roleId].push({
        ...rule,
      });
    }
  });

  return roleRulesMap;
};

/**
 * Get a list of items corresponding to the user.
 *
 * @param userItems - Array containing items assigned to users.
 * @param itemData - Data of items.
 * @param userId - User ID.
 * @returns Returns an array containing items corresponding to the user. If `userItems` is not an array, returns an empty array.
 */
export const getCorrespondingUserItems = (
  userItems: any,
  itemData: any,
  userId: User
) => {
  return Array.isArray(userItems)
    ? userItems
        ?.filter((userItem) => userItem.userId === userId)
        .map((userItem) =>
          itemData?.find((item: any) => item.id === userItem.itemId)
        )
    : [];
};
