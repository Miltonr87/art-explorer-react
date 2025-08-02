import { fetchAvailableArtworks, fetchSearchResults } from './index';
import { fetchData } from '../utils/fetchData';
import { NUMBER_OF_ITEMS } from '../constants';
import { SearchResponse } from '../types';

jest.mock('../utils/fetchData', () => ({
  fetchData: jest.fn(),
}));

const mockFetchData = fetchData as jest.Mock;

const mockSearchResponse: SearchResponse = {
  objectIDs: [1, 2, 3],
};

const mockRawArtwork = (id: number) => ({
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

describe('API: fetchAvailableArtworks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns paginated artworks with metadata', async () => {
    mockFetchData
      .mockResolvedValueOnce(mockSearchResponse) // search
      .mockResolvedValue(mockRawArtwork(1)) // object fetch
      .mockResolvedValueOnce(mockRawArtwork(2))
      .mockResolvedValueOnce(mockRawArtwork(3));

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
      .mockResolvedValueOnce(mockRawArtwork(1))
      .mockRejectedValueOnce(new Error('fail')) // skip 2
      .mockResolvedValueOnce(mockRawArtwork(3));

    const response = await fetchAvailableArtworks(1);

    expect(response.data).toHaveLength(2);
    expect(response.data.find(a => a.id === 2)).toBeUndefined();
  });
});

describe('API: fetchSearchResults', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns artworks for a search term', async () => {
    const searchTerm = 'mona';
    mockFetchData
      .mockResolvedValueOnce(mockSearchResponse) // search response
      .mockResolvedValueOnce(mockRawArtwork(1))
      .mockResolvedValueOnce(mockRawArtwork(2))
      .mockResolvedValueOnce(mockRawArtwork(3));

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
  });
});
