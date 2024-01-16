// Interface
import { APIResponse } from '@interfaces';

/**
 * Extracts the data from an API response.
 * @param {APIResponse<T>} res - The API response object.
 * @returns {T | null} - The extracted data or null if the response is falsy.
 */
export const extractData = <T>(res: APIResponse<T>): T | null => res && res.data;
