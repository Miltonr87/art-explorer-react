import { useContext } from 'react';
import { FavoritesContext } from '../../store';
import { Artwork } from '../../types';
import bookmarkIcon from '../../assets/icons/bookmark-icon.png';

interface FavoriteButtonProps {
  artwork: Artwork;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ artwork }) => {
  const { favoriteArtworks, handleFavoriteAdd, handleFavoriteRemove } =
    useContext(FavoritesContext);

  const isFavorite = favoriteArtworks.some(item => item.id === artwork.id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      handleFavoriteRemove(artwork.id);
      console.log(
        `Removing artwork with with ID: ${artwork.id} from favorites`,
      );
    } else {
      handleFavoriteAdd(artwork);
      console.log(`Adding artwork with ID: ${artwork.id} to favorites`);
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
