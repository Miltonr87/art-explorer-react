import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { FavoritesContext } from '../../store';
import { FavoriteButton } from './index';
import { Artwork } from '../../types';
import {
  MOCK_ARTWORK_FAVORITE,
  MOCK_ARTWORK_NOT_FAVORITE,
} from '../../constants';

it('should add artwork to favorites', () => {
  const mockFavoriteContextValue = {
    favoriteArtworks: [MOCK_ARTWORK_FAVORITE as Artwork],
    handleFavoriteAdd: jest.fn(),
    handleFavoriteRemove: jest.fn(),
  };

  render(
    <FavoritesContext.Provider value={mockFavoriteContextValue}>
      <FavoriteButton artwork={MOCK_ARTWORK_NOT_FAVORITE as Artwork} />
    </FavoritesContext.Provider>,
  );

  fireEvent.click(screen.getByRole('button'));

  expect(mockFavoriteContextValue.handleFavoriteAdd).toHaveBeenCalledWith(
    MOCK_ARTWORK_NOT_FAVORITE,
  );
  expect(mockFavoriteContextValue.handleFavoriteRemove).not.toHaveBeenCalled();
});

it('should remove artwork from favorites', () => {
  const mockFavoriteContextValue = {
    favoriteArtworks: [MOCK_ARTWORK_FAVORITE as Artwork],
    handleFavoriteAdd: jest.fn(),
    handleFavoriteRemove: jest.fn(),
  };

  render(
    <FavoritesContext.Provider value={mockFavoriteContextValue}>
      <FavoriteButton artwork={MOCK_ARTWORK_FAVORITE as Artwork} />
    </FavoritesContext.Provider>,
  );

  fireEvent.click(screen.getByRole('button'));

  expect(mockFavoriteContextValue.handleFavoriteRemove).toHaveBeenCalledWith(
    MOCK_ARTWORK_FAVORITE.id,
  );
  expect(mockFavoriteContextValue.handleFavoriteAdd).not.toHaveBeenCalled();
});
