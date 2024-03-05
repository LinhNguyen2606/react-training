// Interfaces
import {
  Role,
  RoleRule,
  Rule,
  User,
  UserItem,
  UserRole,
  UserRule,
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
 * Returns an array of users who are assigned to a specific role.
 *
 * @param userRoles - An array of user-role relationships.
 * @param users - An array of users.
 * @param roleId - The ID of the role.
 * @returns An array of users who are assigned to the role.
 */
export const getUsersOfRole = (
  userRoles: UserRole[],
  users: User[],
  roleId: string
) => {
  const userRoleRelations = userRoles.filter(
    (userRole) => userRole.roleId === roleId
  );

  const usersOfRole = userRoleRelations
    .map((userRole) => users.find((user) => user.id === userRole.userId))
    .filter((user) => user !== undefined);

  return usersOfRole;
};

/**
 * Returns an array of users who are assigned to a specific rule.
 *
 * @param userRules - An array of user-rule relationships.
 * @param users - An array of users.
 * @param ruleId - The ID of the rule.
 * @returns An array of users who are assigned to the rule.
 */
export const getUsersOfRule = (
  userRules: UserRule[],
  users: User[],
  ruleId: string
) => {
  const userRuleRelations = userRules.filter(
    (userRule) => userRule.ruleId === ruleId
  );

  const userOfRule = userRuleRelations
    .map((userRule) => users.find((user) => user.id === userRule.userId))
    .filter((user) => user !== undefined);

  return userOfRule;
};

/**
 * Returns an array of rules that are assigned to a specific role.
 *
 * @param roleRules - An array of role-rule relationships.
 * @param rules - An array of rules.
 * @param roleId - The ID of the role.
 * @returns An array of rules that are assigned to the role.
 */
export const getRulesOfRole = (
  roleRules: RoleRule[],
  rules: Rule[],
  roleId: string
) => {
  const roleRulesRelations = roleRules.filter(
    (roleRule) => roleRule.roleId === roleId
  );

  const rulesOfRole = roleRulesRelations
    .map((roleRule) => rules.find((rule) => rule.id === roleRule.ruleId))
    .filter((rule) => rule !== undefined);

  return rulesOfRole;
};

/**
 * Returns an array of roles that are assigned to a specific rule.
 *
 * @param roleRules - An array of role-rule relationships.
 * @param roles - An array of roles.
 * @param ruleId - The ID of the rule.
 * @returns An array of roles that are assigned to the rule.
 */
export const getRolesOfRule = (
  roleRules: RoleRule[],
  roles: Role[],
  ruleId: string
) => {
  const roleRulesRelations = roleRules.filter(
    (roleRule) => roleRule.ruleId === ruleId
  );

  const rolesOfRule = roleRulesRelations
    .map((roleRule) => roles.find((role) => role.id === roleRule.roleId))
    .filter((role) => role !== undefined);

  return rolesOfRule;
};

/**
 * Get a list of items corresponding to the user.
 *
 * @param userItems - Array containing items assigned to users.
 * @param itemData - Data of items.
 * @param userId - User ID.
 * @returns Returns an array containing items corresponding to the user. If `userItems` is not an array, returns an empty array.
 */
export const getCorrespondingUserItems = <
  T extends (UserRule & UserItem) | (UserRole & UserItem),
  U extends Rule | Role
>(
  userItems: T[],
  itemData: U[],
  userId: string
) => {
  return Array.isArray(userItems)
    ? userItems
        ?.filter((userItem) => userItem.userId === userId)
        .flatMap(
          (userItem) =>
            itemData?.find((item: U) => item.id === userItem.itemId) || []
        )
    : [];
};

/**
 * Returns an array of role items that correspond to a specific role ID.
 *
 * @template T - A type that extends RoleRule.
 * @template U - A type that extends Rule.
 * @param roleRules - An array of role-rule relationships.
 * @param ruleData - An array of rules.
 * @param roleId - The ID of the role.
 * @returns An array of role items that correspond to the role ID. If `roleRules` is not an array, returns an empty array.
 */
export const getCorrespondingRoleItems = <T extends RoleRule, U extends Rule>(
  roleRules: T[],
  ruleData: U[],
  roleId: string
) => {
  return Array.isArray(roleRules)
    ? roleRules
        ?.filter((roleRule) => roleRule.roleId === roleId)
        .flatMap(
          (roleRule) =>
            ruleData?.find((rule: U) => rule.id === roleRule.ruleId) || []
        )
    : [];
};
