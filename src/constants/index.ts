export const NUMBER_OF_ITEMS = 8;

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
