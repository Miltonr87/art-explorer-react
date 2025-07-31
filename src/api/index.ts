import { buildURL } from '../utils/buildURL';
import { fetchData } from '../utils/fetchData';
import {
  ARTWORKS_ENDPOINT,
  ARTWORKS_SEARCH_ENDPOINT,
  SERVER_URL,
  NUMBER_OF_ITEMS,
} from '../constants';
import { ArtworksResponse, Artwork, SearchResponse } from '../types';

function transformArtwork(data: any): Artwork {
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
    },
    is_public_domain: data.isPublicDomain,
  };
}
export interface Pagination {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
}
export async function fetchAvailableArtworks(page: number = 1): Promise<ArtworksResponse> {
  const searchURL = buildURL({
    serverURL: SERVER_URL,
    endpoint: ARTWORKS_SEARCH_ENDPOINT,
    params: {
      hasImages: true,
      q: 'painting',
    },
  });

  const searchResponse = await fetchData<SearchResponse>(searchURL);
  const allIds = searchResponse.objectIDs || [];

  const offset = (page - 1) * NUMBER_OF_ITEMS;
  const paginatedIds = allIds.slice(offset, offset + NUMBER_OF_ITEMS);

  const artworkDetails = await Promise.all(
    paginatedIds.map(async id => {
      const artworkURL = buildURL({
        serverURL: SERVER_URL,
        endpoint: `${ARTWORKS_ENDPOINT}/${id}`,
        params: {},
      });
      try {
        const rawData = await fetchData<any>(artworkURL);
        return transformArtwork(rawData);
      } catch {
        return null;
      }
    }),
  );

  const data = artworkDetails.filter(Boolean) as Artwork[];

  return {
    pagination: {
      total: allIds.length,
      limit: NUMBER_OF_ITEMS,
      offset,
      total_pages: Math.ceil(allIds.length / NUMBER_OF_ITEMS),
      current_page: page,
    },
    data,
  };
}

export async function fetchSearchResults(searchTerm: string): Promise<ArtworksResponse> {
  const searchURL = buildURL({
    serverURL: SERVER_URL,
    endpoint: ARTWORKS_SEARCH_ENDPOINT,
    params: {
      artistOrCulture: true,
      q: searchTerm
    },
  });

  const searchResponse = await fetchData<SearchResponse>(searchURL);
  const allIds = searchResponse.objectIDs || [];

  const paginatedIds = allIds.slice(0, NUMBER_OF_ITEMS);

  const artworkDetails = await Promise.all(
    paginatedIds.map(async id => {
      const artworkURL = buildURL({
        serverURL: SERVER_URL,
        endpoint: `${ARTWORKS_ENDPOINT}/${id}`,
        params: {},
      });
      try {
        const rawData = await fetchData<any>(artworkURL);
        return transformArtwork(rawData);
      } catch {
        return null;
      }
    }),
  );

  const data = artworkDetails.filter(Boolean) as Artwork[];

  return {
    pagination: {
      total: allIds.length,
      limit: NUMBER_OF_ITEMS,
      offset: 0,
      total_pages: Math.ceil(allIds.length / NUMBER_OF_ITEMS),
      current_page: 1,
    },
    data,
  };
}
