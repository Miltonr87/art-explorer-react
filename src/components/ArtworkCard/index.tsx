import { Link } from 'react-router-dom';
import { Artwork } from '../../types';
import { FavoriteButton } from '../FavoriteButton';

interface ArtworkCardProps {
  artwork: Artwork;
}

export const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork }) => {
  console.log('ArtworkCard rendered for:', artwork.title);
  return (
    <article className="artwork">
      <Link to={`/artwork/${artwork.id}`}>
        <figure className="artwork__image-container">
          {artwork.image_id ? (
            <img
              src={artwork.image_id}
              alt={artwork.thumbnail?.alt_text ?? artwork.title}
              className="artwork__image"
            />
          ) : (
            <div className="artwork__image--placeholder">
              No Image Available
            </div>
          )}
        </figure>
        <div className="artwork__description">
          <div className="artwork__heading">
            <div>
              <h5 className="artwork__title overflow">{artwork.title}</h5>
              <span className="artwork__artist overflow">
                {artwork.artist_title}
              </span>
            </div>
            {artwork.is_public_domain && (
              <span className="artwork__is-public">Public</span>
            )}
          </div>
          <FavoriteButton />
        </div>
      </Link>
    </article>
  );
};
