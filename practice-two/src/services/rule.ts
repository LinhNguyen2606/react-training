import useSWR from 'swr';

// Constant
import { API } from '@constants';

// Helper
import { fetcher } from '@helpers';

// Interfaces
import {
  ApiResponse,
  Item,
  Rule
} from '@interfaces';

// Service
import { handleAPIRequest } from '@services';

/**
 * Retrieves a list of rules.
 *
 * @returns An object containing the rules data.
 */
export const getRules = (): {
  data: Rule[] | undefined;
  isLoading: boolean;
} => {
  const { data, isLoading } = useSWR<Rule[]>(
    `${API.BASE}/${API.RULE}`,
    fetcher
  );
  return {
    data,
    isLoading,
  };
};

/**
 * Assigns a rule to a user.
 *
 * @param userId - The ID of the user to assign the rule to.
 * @param ruleId - The ID of the rule to be assigned.
 * @returns A promise that resolves to the API response.
 */
export const assignRuleToUser = (
  userId: string,
  ruleId: string
): Promise<ApiResponse<Item>> =>
  handleAPIRequest(`${API.BASE}/${API.USER_RULES}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: userId,
      ruleId: ruleId,
    }),
  });

/**
 * Unassigns a rule from a user.
 *
 * @param userRuleId - The ID of the user rule to be unassigned.
 * @returns A promise that resolves to the API response.
 */
export const unAssignRuleFromUser = (
  userRuleId: string | null
): Promise<ApiResponse<Item>> =>
  handleAPIRequest(`${API.BASE}/${API.USER_RULES}/${userRuleId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

/**
 * Assigns a rule to a role.
 *
 * @param roleId - The ID of the role to assign the rule to.
 * @param ruleId - The ID of the rule to be assigned.
 * @returns A promise that resolves to the API response.
 */
export const assignRuleToRole = (
  roleId: string,
  ruleId: string
): Promise<ApiResponse<Item>> =>
  handleAPIRequest(`${API.BASE}/${API.ROLE_RULES}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      roleId: roleId,
      ruleId: ruleId,
    }),
  });

/**
 * Unassigns a rule from a role.
 *
 * @param roleRuleId - The roleRuleId to be unassigned.
 * @returns A promise that resolves to the API response.
 */
export const unAssignRuleFromRole = (
  roleRuleId: string | null
): Promise<ApiResponse<Item>> =>
  handleAPIRequest(`${API.BASE}/${API.ROLE_RULES}/${roleRuleId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
