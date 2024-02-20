import useSWR from 'swr';

// Constants
import { API_BASE_URL, USER_API_ENDPOINT } from '@constants';

// Helpers
import { delayRespone, fetcher } from '@helpers';

// Interfaces
import { ApiResponse, User } from '@interfaces';

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

    if (data) return delayRespone(data);
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
    `${API_BASE_URL}/${USER_API_ENDPOINT}`,
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
  handleAPIRequest(`${API_BASE_URL}/${USER_API_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
