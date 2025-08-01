import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { ArtworkCard } from './index';
import { MemoryRouter } from 'react-router-dom';
import { Artwork } from '../../types';
import { FavoritesContext } from '../../store';

// Mocked scrollTo
window.scrollTo = jest.fn();

jest.mock('../FavoriteButton', () => ({
  FavoriteButton: () => <button data-testid="favorite-button">Favorite</button>,
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({
    search: '?page=2&searchTerm=something',
  }),
}));

const mockArtwork: Artwork = {
  id: 123,
  title: 'Mona Lisa',
  artist_title: 'Leonardo da Vinci',
  main_reference_number: 'INV123',
  date_display: '1503',
  place_of_origin: 'Italy',
  credit_line: 'Louvre Museum',
  dimensions: '77 cm × 53 cm',
  image_id: '',
  thumbnail: {
    lqip: '',
    alt_text: 'Mona Lisa alt',
    height: 300,
    width: 200,
  },
  is_public_domain: true,
};

describe('<ArtworkCard />', () => {
  it('renders artwork data with placeholder image and public domain tag', () => {
    render(
      <FavoritesContext.Provider
        value={{
          favoriteArtworks: [],
          handleFavoriteAdd: jest.fn(),
          handleFavoriteRemove: jest.fn(),
        }}
      >
        <MemoryRouter>
          <ArtworkCard artwork={mockArtwork} />
        </MemoryRouter>
      </FavoritesContext.Provider>,
    );

    expect(screen.getByText('Mona Lisa')).toBeInTheDocument();
    expect(screen.getByText('Leonardo da Vinci')).toBeInTheDocument();
    expect(screen.getByTestId('public')).toBeInTheDocument();
    expect(screen.getByTestId('image')).toHaveAttribute(
      'src',
      'https://www.shutterstock.com/image-vector/no-painting-sign-forbidden-do-600nw-2647873923.jpg',
    );
    expect(screen.getByTestId('favorite-button')).toBeInTheDocument();
  });

  it('navigates to the correct artwork page on image click', () => {
    render(
      <FavoritesContext.Provider
        value={{
          favoriteArtworks: [],
          handleFavoriteAdd: jest.fn(),
          handleFavoriteRemove: jest.fn(),
        }}
      >
        <MemoryRouter>
          <ArtworkCard artwork={mockArtwork} />
        </MemoryRouter>
      </FavoritesContext.Provider>,
    );

    const imageButton = screen.getByLabelText('View artwork: Mona Lisa');
    fireEvent.click(imageButton);

    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: '/artwork/123',
      search: 'page=2&artworkId=123',
    });
  });
});
