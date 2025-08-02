/* eslint-disable @typescript-eslint/no-explicit-any */
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { ArtworkPage } from './index';
import { ArtworksContext, FavoritesContext } from '../../store';
import { MemoryRouter } from 'react-router-dom';

const mockArtwork = {
  id: 123,
  title: 'Mock Title',
  artist_title: 'Mock Artist',
  main_reference_number: '123.456',
  date_display: '2022',
  place_of_origin: 'Italy',
  credit_line: 'Mock Credit',
  dimensions: '30x40',
  image_id: 'mock-image-id',
  thumbnail: {
    alt_text: 'Mock image',
    lqip: '',
    height: 100,
    width: 100,
  },
  is_public_domain: true,
};

// Mocks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '123' }),
  useSearchParams: () => [new URLSearchParams('page=1')],
}));

jest.mock('../../components/FavoriteButton', () => ({
  FavoriteButton: () => <button data-testid="favorite-button">Fav</button>,
}));

jest.mock('../../components/Modal', () => ({
  Modal: ({ onClose }: { onClose: () => void }) => (
    <div data-testid="modal">
      Modal is open
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

const renderWithContexts = ({
  artworks = [],
  favoriteArtworks = [],
}: {
  artworks?: any[];
  favoriteArtworks?: any[];
}) => {
  render(
    <FavoritesContext.Provider
      value={{
        favoriteArtworks,
        handleFavoriteAdd: jest.fn(),
        handleFavoriteRemove: jest.fn(),
      }}
    >
      <ArtworksContext.Provider
        value={{
          artworks,
          setArtworks: jest.fn(),
          isSearching: false,
          setIsSearching: jest.fn(),
          isFetching: false,
          error: null,
          sortCriteria: '',
          setSortCriteria: jest.fn(),
        }}
      >
        <MemoryRouter>
          <ArtworkPage />
        </MemoryRouter>
      </ArtworksContext.Provider>
    </FavoritesContext.Provider>,
  );
};

describe('<ArtworkPage />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders artwork details from ArtworksContext', () => {
    renderWithContexts({ artworks: [mockArtwork] });

    expect(screen.getByText('Mock Title')).toBeInTheDocument();
    expect(screen.getByText('Mock Artist')).toBeInTheDocument();
    expect(screen.getByText('123-456')).toBeInTheDocument();
    expect(screen.getByText('Date:')).toBeInTheDocument();
    expect(screen.getByText('Italy')).toBeInTheDocument();
    expect(screen.getByText('30x40')).toBeInTheDocument();
    expect(screen.getByText('Mock Credit')).toBeInTheDocument();
    expect(screen.getByText('Public')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-button')).toBeInTheDocument();
  });

  it('renders artwork from FavoritesContext if not found in ArtworksContext', () => {
    renderWithContexts({ favoriteArtworks: [mockArtwork] });

    expect(screen.getByText('Mock Title')).toBeInTheDocument();
  });

  it('renders fallback when artwork is not found', () => {
    renderWithContexts({ artworks: [], favoriteArtworks: [] });

    expect(screen.getByText(/Artwork not found!/i)).toBeInTheDocument();
    expect(
      screen.getByText(/find another one on home page/i),
    ).toBeInTheDocument();
  });

  it('opens modal when image is clicked', () => {
    renderWithContexts({ artworks: [mockArtwork] });

    const image = screen.getByAltText('Mock image');
    fireEvent.click(image);

    expect(screen.getByTestId('modal')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Close'));
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('fallbacks to placeholder if image fails to load', () => {
    renderWithContexts({ artworks: [mockArtwork] });

    const image = screen.getByAltText('Mock image') as HTMLImageElement;
    fireEvent.error(image);

    expect(image.src).toContain('no-painting-sign-forbidden-do');
  });
});
