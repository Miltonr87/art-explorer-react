import { ArtworksResponse } from '../types';

const baseURL = 'https://collectionapi.metmuseum.org/public/collection/v1';
const numberOfItems = 15;

export async function fetchAvailableArtworks(
  page: number = 1,
  query: string = 'painting'
): Promise<ArtworksResponse> {
  const searchURL = `${baseURL}/search?hasImages=true&q=${encodeURIComponent(query)}`;
  const searchResponse = await fetch(searchURL);
  if (!searchResponse.ok) {
    throw new Error('Failed to fetch artwork IDs.');
  }

  const searchData = await searchResponse.json();
  const allIds: number[] = searchData.objectIDs || [];
  console.log('Total artworks found:', allIds.length);

  const offset = (page - 1) * numberOfItems;
  const paginatedIds = allIds.slice(offset, offset + numberOfItems);
  console.log(`Fetching artworks for page ${page} with offset ${offset}...`);

  const artworks = await Promise.all(
    paginatedIds.map(async (id) => {
      try {
        const itemRes = await fetch(`${baseURL}/objects/${id}`);
        if (!itemRes.ok) return null;
        const itemData = await itemRes.json();

        return {
          id: itemData.objectID,
          title: itemData.title,
          artist_title: itemData.artistDisplayName,
          main_reference_number: itemData.accessionNumber,
          date_display: itemData.objectDate,
          place_of_origin: itemData.country,
          credit_line: itemData.creditLine,
          dimensions: itemData.dimensions,
          image_id: itemData.primaryImageSmall || itemData.primaryImage,
          thumbnail: {
            lqip: itemData.primaryImageSmall,
            alt_text: itemData.title,
          },
          is_public_domain: itemData.isPublicDomain,
        };
      } catch {
        return null;
      }
    })
  );

  const filteredArtworks = artworks.filter(Boolean);
  if (filteredArtworks.length === 0) {
    throw new Error('No artworks found.');
  }

  // Match expected response
  const responseData: ArtworksResponse = {
    pagination: {
      total: allIds.length,
      limit: numberOfItems,
      offset,
      total_pages: Math.ceil(allIds.length / numberOfItems),
      current_page: page,
    },
    data: filteredArtworks,
  };

  return responseData;
}
