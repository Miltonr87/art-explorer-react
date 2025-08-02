import { fetchAvailableArtworks, fetchSearchResults } from './index';
import { fetchData } from '../utils/fetchData';
import { NUMBER_OF_ITEMS } from '../constants';
import { SearchResponse } from '../types';

jest.mock('../utils/fetchData', () => ({
  fetchData: jest.fn(),
}));

const mockFetchData = fetchData as jest.Mock;

// Helpers
const mockSearchResponse: SearchResponse = {
  objectIDs: [1, 2, 3],
};

const createMockArtwork = (id: number) => ({
  objectID: id,
  title: `Title ${id}`,
  artistDisplayName: `Artist ${id}`,
  accessionNumber: `ACC-${id}`,
  objectDate: '2020',
  country: 'USA',
  creditLine: `Credit ${id}`,
  dimensions: '20x30',
  primaryImageSmall: `img-small-${id}`,
  isPublicDomain: true,
});

// Setup
beforeEach(() => {
  jest.clearAllMocks();
});

describe('fetchAvailableArtworks', () => {
  it('returns paginated artworks with metadata', async () => {
    mockFetchData
      .mockResolvedValueOnce(mockSearchResponse) // search
      .mockResolvedValueOnce(createMockArtwork(1))
      .mockResolvedValueOnce(createMockArtwork(2))
      .mockResolvedValueOnce(createMockArtwork(3));

    const response = await fetchAvailableArtworks(1);

    expect(fetchData).toHaveBeenCalledWith('search?hasImages=true&q=painting');
    expect(response.data).toHaveLength(3);
    expect(response.pagination.total).toBe(3);
    expect(response.pagination.limit).toBe(NUMBER_OF_ITEMS);
    expect(response.pagination.current_page).toBe(1);
  });

  it('skips artworks that fail to load', async () => {
    mockFetchData
      .mockResolvedValueOnce(mockSearchResponse)
      .mockResolvedValueOnce(createMockArtwork(1))
      .mockRejectedValueOnce(new Error('Failed to load artwork 2'))
      .mockResolvedValueOnce(createMockArtwork(3));

    const response = await fetchAvailableArtworks(1);

    expect(response.data).toHaveLength(2);
    expect(response.data.find(a => a.id === 2)).toBeUndefined();
  });
});

describe('fetchSearchResults', () => {
  it('returns artworks for a search term', async () => {
    const searchTerm = 'mona';

    mockFetchData
      .mockResolvedValueOnce(mockSearchResponse)
      .mockResolvedValueOnce(createMockArtwork(1))
      .mockResolvedValueOnce(createMockArtwork(2))
      .mockResolvedValueOnce(createMockArtwork(3));

    const response = await fetchSearchResults(searchTerm);

    expect(fetchData).toHaveBeenCalledWith(
      'search?artistOrCulture=true&q=mona',
    );
    expect(response.data).toHaveLength(3);
    expect(response.pagination.total).toBe(3);
    expect(response.pagination.current_page).toBe(1);
  });

  it('returns empty data if objectIDs is undefined', async () => {
    mockFetchData.mockResolvedValueOnce({ objectIDs: undefined });

    const result = await fetchSearchResults('ghost');

    expect(result.data).toEqual([]);
    expect(result.pagination.total).toBe(0);
    expect(result.pagination.current_page).toBe(1);
  });
});
