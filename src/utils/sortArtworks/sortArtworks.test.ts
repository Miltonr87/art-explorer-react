import { sortArtworks } from './index';
import { Artwork } from '../../types';

const MOCK_ARTWORKS: Artwork[] = [
  {
    id: 1,
    title: 'California',
    artist_title: 'Maria',
    main_reference_number: '',
    date_display: '',
    place_of_origin: '',
    credit_line: '',
    dimensions: '',
    image_id: '',
    thumbnail: {
      lqip: '',
      width: 100,
      height: 100,
      alt_text: '',
    },
    is_public_domain: true,
  },
  {
    id: 2,
    title: 'Apple',
    artist_title: 'Barry',
    main_reference_number: '',
    date_display: '',
    place_of_origin: '',
    credit_line: '',
    dimensions: '',
    image_id: '',
    thumbnail: {
      lqip: '',
      width: 100,
      height: 100,
      alt_text: '',
    },
    is_public_domain: true,
  },
  {
    id: 3,
    title: 'Apple',
    artist_title: 'Maria',
    main_reference_number: '',
    date_display: '',
    place_of_origin: '',
    credit_line: '',
    dimensions: '',
    image_id: '',
    thumbnail: {
      lqip: '',
      width: 100,
      height: 100,
      alt_text: '',
    },
    is_public_domain: true,
  },
  {
    id: 4,
    title: 'Capture',
    artist_title: 'Vincent',
    main_reference_number: '',
    date_display: '',
    place_of_origin: '',
    credit_line: '',
    dimensions: '',
    image_id: '',
    thumbnail: {
      lqip: '',
      width: 100,
      height: 100,
      alt_text: '',
    },
    is_public_domain: true,
  },
  {
    id: 5,
    title: 'Zummer',
    artist_title: null,
    main_reference_number: '',
    date_display: '',
    place_of_origin: '',
    credit_line: '',
    dimensions: '',
    image_id: '',
    thumbnail: {
      lqip: '',
      width: 100,
      height: 100,
      alt_text: '',
    },
    is_public_domain: true,
  },
  {
    id: 6,
    title: 'Amending',
    artist_title: null,
    main_reference_number: '',
    date_display: '',
    place_of_origin: '',
    credit_line: '',
    dimensions: '',
    image_id: '',
    thumbnail: {
      lqip: '',
      width: 100,
      height: 100,
      alt_text: '',
    },
    is_public_domain: true,
  },
];

describe('sortArtworks', () => {
  it('should sort artworks by artist_title in ascending order', () => {
    const sortedArtworks = sortArtworks(MOCK_ARTWORKS, 'artist-asc');

    expect(sortedArtworks[0].artist_title).toBe('Barry');
    expect(sortedArtworks[1].artist_title).toBe('Maria');
    expect(sortedArtworks[2].artist_title).toBe('Maria');
    expect(sortedArtworks[3].artist_title).toBe('Vincent');
    expect(sortedArtworks[4].artist_title).toBeNull();
    expect(sortedArtworks[5].artist_title).toBeNull();
  });

  it('should sort artworks by artist_title in descending order', () => {
    const sortedArtworks = sortArtworks(MOCK_ARTWORKS, 'artist-desc');

    expect(sortedArtworks[0].artist_title).toBe('Vincent');
    expect(sortedArtworks[1].artist_title).toBe('Maria');
    expect(sortedArtworks[2].artist_title).toBe('Maria');
    expect(sortedArtworks[3].artist_title).toBe('Barry');
    expect(sortedArtworks[4].artist_title).toBeNull();
    expect(sortedArtworks[5].artist_title).toBeNull();
  });

  it('should sort artworks by title in ascending order', () => {
    const sortedArtworks = sortArtworks(MOCK_ARTWORKS, 'title-asc');

    expect(sortedArtworks[0].title).toBe('Amending');
    expect(sortedArtworks[1].title).toBe('Apple');
    expect(sortedArtworks[2].title).toBe('Apple');
    expect(sortedArtworks[3].title).toBe('California');
    expect(sortedArtworks[4].title).toBe('Capture');
    expect(sortedArtworks[5].title).toBe('Zummer');
  });

  it('should sort artworks by title in descending order', () => {
    const sortedArtworks = sortArtworks(MOCK_ARTWORKS, 'title-desc');

    expect(sortedArtworks[0].title).toBe('Zummer');
    expect(sortedArtworks[1].title).toBe('Capture');
    expect(sortedArtworks[2].title).toBe('California');
    expect(sortedArtworks[3].title).toBe('Apple');
    expect(sortedArtworks[4].title).toBe('Apple');
    expect(sortedArtworks[5].title).toBe('Amending');
  });

  it('should return the original array if criteria is unknown', () => {
    const sortedArtworks = sortArtworks(MOCK_ARTWORKS, 'unknown-criteria');
    expect(sortedArtworks).toEqual(MOCK_ARTWORKS);
  });
});
