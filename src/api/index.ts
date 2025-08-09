import { fetchData } from '../utils/fetchData';
import { NUMBER_OF_ITEMS } from '../constants';
import { ArtworksResponse, Artwork, SearchResponse, RawArtwork, Pagination } from '../types';

function transformArtwork(data: RawArtwork): Artwork {
  return {
    id: data.objectID,
    title: data.title,
    artist_title: data.artistDisplayName,
    main_reference_number: data.accessionNumber,
    date_display: data.objectDate,
    place_of_origin: data.country,
    credit_line: data.creditLine,
    dimensions: data.dimensions,
    image_id: data.primaryImageSmall || data.primaryImage || '',
    thumbnail: {
      lqip: data.primaryImageSmall || '',
      alt_text: data.title,
      height: 100,
      width: 100,
    },
    is_public_domain: Boolean(data.isPublicDomain),
  };
}

async function fetchArtworksByIds(ids: number[]): Promise<Artwork[]> {
  const results = await Promise.all(
    ids.map(async (id) => {
      try {
        const raw = await fetchData<RawArtwork>(`objects/${id}`);
        return transformArtwork(raw);
      } catch (err) {
        console.error('Error fetching artworks:', err);
        throw err;
      }
    })
  );
  return results.filter(Boolean) as Artwork[];
}

function buildPagination(total: number, page: number, limit: number): Pagination {
  const offset = (page - 1) * limit;
  return {
    total,
    limit,
    offset,
    total_pages: Math.ceil(total / limit),
    current_page: page,
  };
}

export async function fetchAvailableArtworks(page = 1): Promise<ArtworksResponse> {
  const searchResponse = await fetchData<SearchResponse>('search?hasImages=true&q=painting');
  const allIds = searchResponse.objectIDs ?? [];

  const start = (page - 1) * NUMBER_OF_ITEMS;
  const paginatedIds = allIds.slice(start, start + NUMBER_OF_ITEMS);
  const data = await fetchArtworksByIds(paginatedIds);

  return {
    pagination: buildPagination(allIds.length, page, NUMBER_OF_ITEMS),
    data,
  };
}

export async function fetchSearchResults(searchTerm: string): Promise<ArtworksResponse> {
  const q = encodeURIComponent(searchTerm.trim());
  const searchResponse = await fetchData<SearchResponse>(`search?artistOrCulture=true&q=${q}`);
  const allIds = searchResponse.objectIDs ?? [];
  const paginatedIds = allIds.slice(0, NUMBER_OF_ITEMS);
  const data = await fetchArtworksByIds(paginatedIds);

  return {
    pagination: buildPagination(allIds.length, 1, NUMBER_OF_ITEMS),
    data,
  };
}
