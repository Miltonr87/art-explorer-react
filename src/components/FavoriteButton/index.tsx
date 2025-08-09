import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { addFavorite, removeFavorite } from '../../store/favoritesSlice';
import { Artwork } from '../../types';
import bookmarkIcon from '../../assets/icons/bookmark-icon.svg';

interface FavoriteButtonProps {
  artwork: Artwork;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ artwork }) => {
  const dispatch = useDispatch();
  const favoriteArtworks = useSelector((state: RootState) => state.favorites.favoriteArtworks);

  const isFavorite = favoriteArtworks.some(item => item.id === artwork.id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFavorite(artwork.id));
    } else {
      dispatch(addFavorite(artwork));
    }
  };

  return (
    <button
      onClick={handleFavoriteClick}
      className={`button button-favorite ${isFavorite && 'active'}`}
    >
      <img src={bookmarkIcon} alt="Bookmark icon" />
    </button>
  );
};