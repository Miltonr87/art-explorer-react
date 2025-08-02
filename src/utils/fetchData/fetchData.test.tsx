import axios from 'axios';
import { fetchData } from './index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchData', () => {
  it('fetches data successfully with valid relative path', async () => {
    const mockResponse = { data: { id: 123, title: 'Sample' } };
    mockedAxios.get.mockResolvedValueOnce(mockResponse);

    const result = await fetchData('objects/123');

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://collectionapi.metmuseum.org/public/collection/v1/objects/123',
    );
    expect(result).toEqual(mockResponse.data);
  });

  it('throws an error for full URL', async () => {
    await expect(fetchData('https://example.com/full/path')).rejects.toThrow(
      'fetchData: The path should not include the full URL.',
    );
  });

  it('throws an error when axios fails', async () => {
    mockedAxios.get.mockRejectedValueOnce({
      response: { status: 404 },
      message: 'Not found',
    });

    await expect(fetchData('objects/999')).rejects.toThrow(
      'An unexpected error occurred while fetching data.',
    );
  });
});
