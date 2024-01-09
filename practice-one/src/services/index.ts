// Constants
import { API_BASE_URL } from '@constants';
import { USER_API_ENDPOINT } from '@constants/config';

// Helper
import { delayRespone } from '@helpers';

// Interfaces
import { APIResponse, User } from '@interfaces';

/**
 * Handle API response
 * @param {Response} res The response object from the API
 * @returns {object} An object containing the response data or error message
 */
const handleRespone = async <T>(res: Response): Promise<APIResponse<T>> => {
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
const handleAPIRequest = async <T>(url: string, options?: RequestInit): Promise<APIResponse<T>> => {
  try {
    const res = await fetch(url, options);
    const data = await handleRespone<T>(res);

    if (!data.errMsg) {
      return delayRespone(data);
    }

    return data;
  } catch (err) {
    return handleError(err);
  }
};

/**
 * Handle fetching users
 * @returns {object} An object containing the response data or error message
 */
export const fetchUsers = async (): Promise<APIResponse<User[]>> => {
  try {
    const res = await fetch(`${API_BASE_URL}/${USER_API_ENDPOINT}`);
    return handleRespone<User[]>(res);
  } catch (err) {
    return handleError(err);
  }
};

/**
 * Create a new user with the provided data.
 * @param {User} usersData - The data for the new user.
 * @returns {Promise<{ data: any; errMsg: string | null }>} The created user data or an error message.
 */
export const createUser = async (usersData: User): Promise<APIResponse<User>> =>
  handleAPIRequest(`${API_BASE_URL}/${USER_API_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(usersData),
  });

/**
 * Deletes a user from the server.
 * @param {User} userId - The ID of the user to delete.
 * @returns {Promise<APIResponse<User>>} A promise that resolves to the API response containing the deleted user, or an error message.
 */
export const deleteUser = async (userId: Number): Promise<APIResponse<User>> =>
  handleAPIRequest(`${API_BASE_URL}/${USER_API_ENDPOINT}/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
