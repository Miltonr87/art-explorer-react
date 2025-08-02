import axios from 'axios';

const BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';

export async function fetchData<T>(rawPath: string): Promise<T> {
  const path = rawPath.toString();

  if (path.startsWith('http')) {
    throw new Error(
      'fetchData: The path should not include the full URL. Pass only the relative path like "search?...".'
    );
  }

  const url = `${BASE_URL}/${path}`;

  try {
    const { data } = await axios.get<T>(url);
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 'unknown';
      const message = error.message || 'Axios request failed';
      throw new Error(
        `Failed to fetch data. HTTP Error: ${status} - ${message}`
      );
    }
    throw new Error('An unexpected error occurred while fetching data.');
  }
}
