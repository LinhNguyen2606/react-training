import useSWR from 'swr';

// Constant
import { API } from '@constants';

// Helper
import { fetcher } from '@helpers';

// Interfaces
import {
  ApiResponse,
  Item,
  Role
} from '@interfaces';

// Service
import { handleAPIRequest } from '@services';

/**
 * Retrieves a list of roles from the API.
 * @returns {{
 *   data: Role[] | undefined; - The array of Role objects or undefined.
 *   isValidating: boolean; - Indicates whether the request is currently being validated.
 * }}
 */
export const getRoles = (): {
  data: Role[] | undefined;
  isValidating: boolean;
} => {
  const { data, isValidating } = useSWR<Role[]>(
    `${API.BASE}/${API.ROLE}`,
    fetcher
  );
  return {
    data,
    isValidating,
  };
};

/**
 * Create a new role with the provided data.
 * @param {User} roleData - The data for the new role.
 * @returns {Promise<{ data: any; errMsg: string | null }>} The created user data or an error message.
 */
export const createRole = (roleData: Role): Promise<ApiResponse<Role>> =>
  handleAPIRequest(`${API.BASE}/${API.ROLE}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(roleData),
  });

/**
 * Delete a role with corresponding id.
 * @param {Role} roleId - The ID of the role to delete.
 * @returns {Promise<APIResponse<Role>>} A promise that resolves to the API response containing the deleted role, or an error message.
 */
export const deleteRole = (roleId: string): Promise<ApiResponse<Role>> =>
  handleAPIRequest(`${API.BASE}/${API.ROLE}/${roleId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

/**
 * Edit a role with corresponding data.
 * @param {number} roleId - The id of role.
 * @param {Role} roleData - The data for the role.
 * @returns {Promise<APIResponse<Role>>} A promise that resolves to the API response containing the data to edit role, or an error message.
 */
export const editRole = (
  roleId: string,
  roleData: Role
): Promise<ApiResponse<Role>> =>
  handleAPIRequest(`${API.BASE}/${API.ROLE}/${roleId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(roleData),
  });

/**
 * Assigns Role(s) to a user.
 *
 * @param userId - The ID of the user to assign the user to.
 * @param roleId - The ID of the role to be assigned.
 * @returns A promise that resolves to the API response.
 */
export const assignRoleToUser = (
  userId: string,
  roleId: string
): Promise<ApiResponse<Item>> =>
  handleAPIRequest(`${API.BASE}/${API.USER_ROLES}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: userId,
      roleId: roleId,
    }),
  });

/**
 * Unassigns role(s) from a user.
 *
 * @param userRoleId - The userRoleId to be unassigned.
 * @returns A promise that resolves to the API response.
 */
export const unAssignRoleFromUser = (
  userRoleId: string | null
): Promise<ApiResponse<Item>> =>
  handleAPIRequest(`${API.BASE}/${API.USER_ROLES}/${userRoleId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
