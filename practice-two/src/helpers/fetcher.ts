/**
 * Fetches data from the specified URL.
 * @param url - The URL to fetch the data from.
 * @returns A promise that resolves to the fetched data.
 * @throws An error if an error occurs while fetching the data.
 */
export const fetcher = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('An error occurred while fetching the data.');
  }
  return response.json();
};
