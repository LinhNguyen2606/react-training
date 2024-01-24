import { API_BASE_URL, TODO_API_ENDPOINT } from '../constants';
import { APIResponse, Todo } from '../interfaces';

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
const handleAPIRequest = async <T>(
  url: string,
  options?: RequestInit
): Promise<APIResponse<T>> => {
  try {
    const res = await fetch(url, options);
    const data = handleRespone<T>(res);

    return data;
  } catch (err) {
    return handleError(err);
  }
};

export const addTodo = async (newTodo: Todo): Promise<APIResponse<Todo>> =>
  handleAPIRequest(`${API_BASE_URL}/${TODO_API_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTodo),
  });

export const deleteTodo = async (id: string): Promise<APIResponse<Todo>> =>
  handleAPIRequest(`${API_BASE_URL}/${TODO_API_ENDPOINT}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const editTodo = async (
  id: string,
  title: string
): Promise<APIResponse<Todo>> =>
  handleAPIRequest(`${API_BASE_URL}/${TODO_API_ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });
