import axios from 'axios';

export async function fetchData<T>(rawPath: string): Promise<T> {
  const path = rawPath.toString();

  if (path.startsWith('http')) {
    throw new Error(
      'fetchData: The path should not include the full URL. Pass only the relative path like "search?...".'
    );
  }

  const url = new URL(`/api/public/collection/v1/${path}`, window.location.origin);

  try {
    const { data } = await axios.get<T>(url.toString());
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 'unknown';
      const message = error.message || 'Axios request failed';
      throw new Error(`Failed to fetch data. HTTP Error: ${status} - ${message}`);
    }
    throw new Error('An unexpected error occurred while fetching data.');
  }
}

