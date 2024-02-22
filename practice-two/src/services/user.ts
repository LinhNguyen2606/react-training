import useSWR from 'swr';

// Constants
import { API } from '@constants';

// Helper
import { fetcher } from '@helpers';

// Interfaces
import {
  ApiResponse,
  RoleRule,
  User,
  UserRole,
  UserRule
} from '@interfaces';

/**
 * Handle API response
 * @param {Response} res The response object from the API
 * @returns {object} An object containing the response data or error message
 */
const handleRespone = async <T>(res: Response): Promise<ApiResponse<T>> => {
  if (res.ok) {
    const data: T = await res.json();
    return {
      data,
      errMsg: null,
    };
  } else {
    return {
      data: null,
      errMsg: res.statusText,
    };
  }
};

/**
 * Handle API error
 * @param {Error} err The error object
 * @returns {object} An object containing the response data or error message
 */
const handleError = (err: unknown): { data: null; errMsg: string } => {
  return {
    data: null,
    errMsg: err instanceof Error ? err.message : 'Unknown error occurred',
  };
};

/**
 * A generic function to make API requests.
 * @param {string} url - The URL to make the request to.
 * @param {RequestInit} options - The options for the fetch request.
 * @returns {Promise<APIResponse<T>>} - The response data or an error message.
 */
const handleAPIRequest = async <T>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> => {
  try {
    const res = await fetch(url, options);
    const data = handleRespone<T>(res);

    return data;
  } catch (err) {
    return handleError(err);
  }
};

/**
 * Retrieves a list of users from the API.
 * @returns {{
 *   data: User[] | undefined; - The array of User objects or undefined.
 *   isValidating: boolean; - Indicates whether the request is currently being validated.
 * }}
 */
export const getUsers = (): {
  data: User[] | undefined;
  isValidating: boolean;
} => {
  const { data, isValidating } = useSWR<User[]>(
    `${API.BASE}/${API.USER}`,
    fetcher
  );
  return {
    data,
    isValidating,
  };
};

/**
 * Create a new user with the provided data.
 * @param {User} userData - The data for the new user.
 * @returns {Promise<{ data: any; errMsg: string | null }>} The created user data or an error message.
 */
export const createUser = (userData: User): Promise<ApiResponse<User>> =>
  handleAPIRequest(`${API.BASE}/${API.USER}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

/**
 * Delete a user with corresponding id.
 * @param {User} userId - The ID of the user to delete.
 * @returns {Promise<APIResponse<User>>} A promise that resolves to the API response containing the deleted user, or an error message.
 */
export const deleteUser = (userId: string): Promise<ApiResponse<User>> =>
  handleAPIRequest(`${API.BASE}/${API.USER}/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

/**
 * Edit a user with corresponding data.
 * @param {number} userId - The users'id.
 * @param {User} userData - The data for the user.
 * @returns {Promise<APIResponse<User>>} A promise that resolves to the API response containing the data to edit user, or an error message.
 */
export const editUser = (
  userId: string,
  userData: User
): Promise<ApiResponse<User>> =>
  handleAPIRequest(`${API.BASE}/${API.USER}/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

/**
 * Retrieves a list of user roles from the API.
 * @returns {{
 *   data: UserRole[] | undefined; - The array of UserRole objects or undefined.
 *
 * }}
 */
export const getUserRoles = (): {
  data: UserRole[] | undefined;
} => {
  const { data } = useSWR<UserRole[]>(`${API.BASE}/${API.USER_ROLES}`, fetcher);
  return {
    data,
  };
};

/**
 * Retrieves a list of user rules from the API.
 * @returns {{
 *   data: UserRule[] | undefined; - The array of UserRule objects or undefined.
 *
 * }}
 */
export const getUserRules = (): {
  data: UserRule[] | undefined;
} => {
  const { data } = useSWR<UserRule[]>(`${API.BASE}/${API.USER_RULES}`, fetcher);
  return {
    data,
  };
};

/**
 * Retrieves a list of role rules from the API.
 * @returns {{
 *   data: RoleRule[] | undefined; - The array of RoleRule objects or undefined.
 *
 * }}
 */
export const getRoleRules = (): {
  data: RoleRule[] | undefined;
} => {
  const { data } = useSWR<RoleRule[]>(`${API.BASE}/${API.ROLE_RULES}`, fetcher);
  return {
    data,
  };
};
