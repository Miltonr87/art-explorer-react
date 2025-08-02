import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { FavoritesPage } from './index';
import { FavoritesContext } from '../../store';
import { MemoryRouter } from 'react-router-dom';
import { Artwork } from '../../types';

const mockFavoriteArtworks: Artwork[] = [
  {
    id: 1,
    title: 'Mock Title',
    artist_title: 'Mock Artist',
    main_reference_number: 'REF.1',
    date_display: '2024',
    place_of_origin: 'Mockland',
    credit_line: 'Mock Credit Line',
    dimensions: '100x100',
    image_id: '',
    thumbnail: {
      lqip: '',
      alt_text: 'Mock Title',
      height: 100,
      width: 100,
    },
    is_public_domain: true,
  },
];

const renderWithContext = (artworks: Artwork[]) => {
  render(
    <FavoritesContext.Provider
      value={{
        favoriteArtworks: artworks,
        handleFavoriteAdd: jest.fn(),
        handleFavoriteRemove: jest.fn(),
      }}
    >
      <MemoryRouter>
        <FavoritesPage />
      </MemoryRouter>
    </FavoritesContext.Provider>,
  );
};

describe('<FavoritesPage />', () => {
  it('renders a list of favorite artworks when present', () => {
    renderWithContext(mockFavoriteArtworks);

    expect(screen.getAllByText('Favorites Gallery')).toHaveLength(2);
    expect(screen.getByText('Mock Title')).toBeInTheDocument();
    expect(screen.getByText('Mock Artist')).toBeInTheDocument();
  });

  it('shows fallback message when no favorites exist', () => {
    renderWithContext([]);

    expect(
      screen.getByText(/You haven't saved any artworks yet/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Explore artworks on home page/i),
    ).toBeInTheDocument();
  });
});
