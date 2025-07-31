import axios from 'axios';

/**
 * The function fetches data from the specified URL using Axios
 *
 * @param {URL} url - URL to fetch data from
 *
 * @returns {Promise<T>} - a promise that resolves to the fetched data
 */
export async function fetchData<T>(url: URL): Promise<T> {
  try {
    const response = await axios.get<T>(url.toString());
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.message || 'Axios request failed';
      throw new Error(`Failed to fetch data. HTTP Error: ${status ?? 'unknown'} - ${message}`);
    } else {
      throw new Error('An unexpected error occurred while fetching data.');
    }
  }
}
