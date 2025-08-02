import axios from 'axios';
import { fetchData } from './index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchData', () => {
  const mockResponse = { foo: 'bar' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches data successfully with valid relative path', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const result = await fetchData('objects/123');

    expect(mockedAxios.get).toHaveBeenCalledWith(
      new URL(
        '/api/public/collection/v1/objects/123',
        window.location.origin,
      ).toString(),
    );
    expect(result).toEqual(mockResponse);
  });

  it('throws an error when full URL is passed', async () => {
    await expect(fetchData('http://example.com/invalid')).rejects.toThrow(
      'fetchData: The path should not include the full URL. Pass only the relative path like "search?...".',
    );
    expect(mockedAxios.get).not.toHaveBeenCalled();
  });

  it('throws detailed error when axios request fails with a response', async () => {
    mockedAxios.get.mockRejectedValueOnce({
      isAxiosError: true,
      response: { status: 404 },
      message: 'Not Found',
    });

    await expect(fetchData('objects/999')).rejects.toThrow(
      'An unexpected error occurred while fetching data.',
    );
  });

  it('throws generic error for non-axios error', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Unexpected failure'));

    await expect(fetchData('objects/999')).rejects.toThrow(
      'An unexpected error occurred while fetching data.',
    );
  });
});
