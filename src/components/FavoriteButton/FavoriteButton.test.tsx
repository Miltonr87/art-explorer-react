import { render, screen, fireEvent, act } from '@testing-library/react';
import { FavoriteButton } from './index';
import { FavoritesContext } from '../../store';
import { Artwork } from '../../types';

describe('<FavoriteButton />', () => {
  const artwork: Artwork = {
    id: 1,
    title: 'Starry Night',
    artist_title: 'Vincent van Gogh',
    main_reference_number: '123',
    date_display: '1889',
    place_of_origin: 'Netherlands',
    credit_line: 'MoMA',
    dimensions: '73.7 cm × 92.1 cm',
    image_id: 'starry-night',
    is_public_domain: true,
    thumbnail: {
      lqip: 'starry.jpg',
      alt_text: 'Starry Night',
      height: 100,
      width: 100,
    },
  };

  const handleFavoriteAdd = jest.fn();
  const handleFavoriteRemove = jest.fn();

  const renderComponent = (favoriteArtworks = []) =>
    render(
      <FavoritesContext.Provider
        value={{ favoriteArtworks, handleFavoriteAdd, handleFavoriteRemove }}
      >
        <FavoriteButton artwork={artwork} />
      </FavoritesContext.Provider>,
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the bookmark icon', () => {
    renderComponent();
    const icon = screen.getByAltText('Bookmark icon');
    expect(icon).toBeInTheDocument();
  });

  it('adds artwork to favorites if not already present', () => {
    jest.useFakeTimers();
    renderComponent([]);

    const button = screen.getByRole('button');
    act(() => {
      fireEvent.click(button);
      jest.advanceTimersByTime(300);
    });

    expect(handleFavoriteAdd).toHaveBeenCalledWith(artwork);
    expect(handleFavoriteRemove).not.toHaveBeenCalled();

    jest.useRealTimers();
  });

  it('removes artwork from favorites if already favorited', () => {
    jest.useFakeTimers();
    renderComponent([artwork]);

    const button = screen.getByRole('button');
    act(() => {
      fireEvent.click(button);
      jest.advanceTimersByTime(300);
    });

    expect(handleFavoriteRemove).toHaveBeenCalledWith(artwork.id);
    expect(handleFavoriteAdd).not.toHaveBeenCalled();

    jest.useRealTimers();
  });
});
