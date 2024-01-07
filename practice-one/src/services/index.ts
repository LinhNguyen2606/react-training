import { API_BASE_URL } from '@constants';
import { USER_API_ENDPOINT } from '@constants/config';

/**
 * Handle API response
 * @param {Response} res The response object from the API
 * @returns {object} An object containing the response data or error message
 */
const handleRespone = async (res: Response): Promise<{ data: any; errMsg: string | null }> => {
  if (res.ok) {
    const data = await res.json();
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
 * Handle fetching users
 * @returns {object} An object containing the response data or error message
 */
export const fetchUsers = async (): Promise<{ data: any; errMsg: string | null }> => {
  try {
    const res = await fetch(`${API_BASE_URL}/${USER_API_ENDPOINT}`);
    return handleRespone(res);
  } catch (err) {
    return handleError(err);
  }
};
