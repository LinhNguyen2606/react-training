// Interfaces
import {
  Role,
  Rule,
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
  // Get the userRoles for the specified user
  const userRoleRelations = userRoles?.filter(
    (item) => item.userId === userId
  );

  // Get roles for user based on userRolesRelations
  const userRolesItem = userRoleRelations?.map((item) =>
    roles.find((role) => role.id === item.roleId)
  );

  // Get roleRules for roles of user
  const userRuleRelations = userRules?.filter(
    (item) => item.userId === userId
  );

  // Get rules for user based on userRoleRuleRelations
  const userRulesItem = userRuleRelations?.map((item) =>
    rules.find((rule) => rule.id === item.ruleId)
  );

  return { userRolesItem, userRulesItem };
};
