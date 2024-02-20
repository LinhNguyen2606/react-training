/**
 * Delays the response by the specified amount of time and resolves with the provided data.
 * @param data - The data to be resolved with.
 * @param delay - The delay in milliseconds (default: 2000ms).
 * @returns A promise that resolves with the provided data after the specified delay.
 */
export const delayRespone = <T>(data: T, delay = 2000): Promise<T> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
