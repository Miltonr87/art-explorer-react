import { useLocation, useNavigate } from 'react-router-dom';
import { FavoriteButton } from '../FavoriteButton';
import { Artwork } from '../../types';
import { ROUTES } from '../../constants';

interface ArtworkCardProps {
  artwork: Artwork;
  variant?: 'small';
}

export const ArtworkCard: React.FC<ArtworkCardProps> = ({
  artwork,
  variant,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { search } = location;

  const searchParams = new URLSearchParams(search);
  const page = searchParams.get('page') || 1;

  const goToArtworkPage = (artworkId: number) => {
    const updatedSearchParams = new URLSearchParams(search);
    updatedSearchParams.set('page', String(page));
    updatedSearchParams.set('artworkId', String(artworkId));
    updatedSearchParams.delete('searchTerm'); // Clear search term if navigating to artwork page
    updatedSearchParams.delete('search'); // Clear search if navigating to artwork page
    console.log(`Navigating to artwork page with ID: ${artworkId}`);

    window.scrollTo(0, 0);
    navigate({
      pathname: `${ROUTES.artwork.replace(':id', String(artworkId))}`,
      search: updatedSearchParams.toString(),
    });
  };

  return (
    <article className={`artwork ${variant === 'small' && 'small'}`}>
      <figure className="artwork__image-container">
        <a onClick={() => goToArtworkPage(artwork.id)}>
          <img
            src={artwork.image_id}
            alt={artwork.thumbnail?.alt_text ?? artwork.title}
            onError={e => {
              e.currentTarget.src =
                'https://placehold.co/843/f7d5a2/383838?text=no-image&font=lato';
            }}
            className="artwork__image"
            data-testid="image"
          />
        </a>
      </figure>

      <div className="artwork__description">
        <a onClick={() => goToArtworkPage(artwork.id)}>
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
        </a>
        <FavoriteButton artwork={artwork} />
      </div>
    </article>
  );
};
