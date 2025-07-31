import { Artwork } from '../types';

export const SERVER_URL = 'https://collectionapi.metmuseum.org';

export const ARTWORKS_ENDPOINT = '/public/collection/v1/objects';
export const ARTWORKS_SEARCH_ENDPOINT = '/public/collection/v1/search';

export const NUMBER_OF_ITEMS = 15; // simulate pagination: 15 items/page

// The Met doesn't use field filtering, so keep only useful fields for your types
export const REQUESTED_FIELDS = [
  'objectID',
  'title',
  'artistDisplayName',
  'accessionNumber',
  'objectDate',
  'country',
  'creditLine',
  'dimensions',
  'primaryImage',
  'primaryImageSmall',
  'isPublicDomain',
];

export const IS_NOT_EMPTY_ERROR_VALUE = [
  'Input should have at least 3 characters',
];
export const HAS_LETTERS_OR_NUMBERS_ERROR_VALUE = [
  'Input should include letters or numbers',
];

export const ROUTES = {
  home: '/',
  favorites: '/favorites',
  artwork: '/artwork/:id',
};

export const LINK_TO_HOME_PAGE = {
  linkName: 'Go to Home Page',
  linkPath: ROUTES.home,
};

//Mock data for tests
export const MOCK_URL = new URL('https://example.com/api/v1/data');
export const MOCK_DATA = { data: 'mock data' };
export const MOCK_PARAMS = { q: 'Monet', limit: 100 };
export const MOCK_ARTWORKS: Partial<Artwork>[] = [
  { id: 1, title: 'California', artist_title: 'Vincent' },
  { id: 2, title: 'Amending', artist_title: null },
  { id: 3, title: 'Zummer', artist_title: 'Maria' },
  { id: 4, title: 'Capture', artist_title: 'Barry' },
  { id: 5, title: 'Apple', artist_title: 'Maria' },
  { id: 5, title: 'Apple', artist_title: null },
];
export const MOCK_ARTWORK: Artwork = {
  id: 18,
  title: 'Apples and computers',
  artist_title: 'Unknown Malevich',
  main_reference_number: '1695.23',
  date_display: '1890s',
  place_of_origin: 'Arctics',
  credit_line: 'Favorite private collection',
  dimensions: '190x100 and some other info',
  image_id: 'imageid8526',
  thumbnail: {
    lqip: 'lqip2642',
    width: 190,
    height: 100,
    alt_text: 'Alt text for Apples and Computers',
  },
  is_public_domain: true,
};
export const MOCK_ARTWORK_NOT_PUBLIC: Partial<Artwork> = {
  is_public_domain: false,
};
export const MOCK_ARTWORK_FAVORITE: Partial<Artwork> = {
  id: 18,
};

export const MOCK_ARTWORK_NOT_FAVORITE: Partial<Artwork> = {
  id: 5,
};
