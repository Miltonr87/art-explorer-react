import { useContext, useState } from 'react';
import { FavoritesContext } from '../../store';
import { Artwork } from '../../types';
import bookmarkIcon from '../../assets/icons/bookmark-icon.svg';
import { motion } from 'framer-motion';

interface FavoriteButtonProps {
  artwork: Artwork;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ artwork }) => {
  const { favoriteArtworks, handleFavoriteAdd, handleFavoriteRemove } =
    useContext(FavoritesContext);

  const [pulse, setPulse] = useState(false);

  const isFavorite = favoriteArtworks.some(item => item.id === artwork.id);

  const handleFavoriteClick = () => {
    setPulse(true);
    setTimeout(() => setPulse(false), 300);

    if (isFavorite) {
      handleFavoriteRemove(artwork.id);
      console.log(`Removing artwork with ID: ${artwork.id} from favorites`);
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
      <motion.img
        key={pulse ? 'pulse' : 'static'}
        src={bookmarkIcon}
        alt="Bookmark icon"
        initial={{ scale: 1 }}
        animate={pulse ? { scale: [1, 1.4, 1] } : { scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{ width: '24px', height: '24px' }}
      />
    </button>
  );
};
