import { useLocation, useNavigate } from 'react-router-dom';
import { FavoriteButton } from '../FavoriteButton';
import { Artwork } from '../../types';
import { ROUTES } from '../../constants';

interface ArtworkCardProps {
  artwork: Artwork;
  variant?: 'small';
}

const PLACEHOLDER_IMAGE =
  'https://www.shutterstock.com/image-vector/no-painting-sign-forbidden-do-600nw-2647873923.jpg';

export const ArtworkCard: React.FC<ArtworkCardProps> = ({
  artwork,
  variant,
}) => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(search);
  const page = searchParams.get('page') || '1';

  const goToArtworkPage = (artworkId: number) => {
    const updatedSearchParams = new URLSearchParams(search);
    updatedSearchParams.set('page', page);
    updatedSearchParams.set('artworkId', String(artworkId));
    updatedSearchParams.delete('searchTerm');
    updatedSearchParams.delete('search');

    window.scrollTo(0, 0);
    navigate({
      pathname: ROUTES.artwork.replace(':id', String(artworkId)),
      search: updatedSearchParams.toString(),
    });
  };

  const imageUrl = artwork.image_id?.trim()
    ? artwork.image_id
    : PLACEHOLDER_IMAGE;

  return (
    <article className={`artwork ${variant === 'small' ? 'small' : ''}`}>
      <figure className="artwork__image-container">
        <button
          onClick={() => goToArtworkPage(artwork.id)}
          className="artwork__image-button"
          aria-label={`View artwork: ${artwork.title}`}
        >
          <img
            src={imageUrl}
            alt={artwork.thumbnail?.alt_text ?? artwork.title}
            className="artwork__image"
            data-testid="image"
          />
        </button>
      </figure>

      <div className="artwork__description">
        <button
          onClick={() => goToArtworkPage(artwork.id)}
          className="artwork__description-button"
          aria-label={`View description for ${artwork.title}`}
        >
          <div data-testid="description" className="artwork__heading">
            <div>
              <h5 className="artwork__title overflow">{artwork.title}</h5>
              <p className="artwork__artist overflow">{artwork.artist_title}</p>
            </div>
            {artwork.is_public_domain && (
              <span data-testid="public" className="artwork__is-public">
                Public
              </span>
            )}
          </div>
        </button>

        <FavoriteButton artwork={artwork} />
      </div>
    </article>
  );
};
