import { useContext, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { ArtworksContext, FavoritesContext } from '../../store';
import { PageLayout } from '../../components/PageLayout';
import { FavoriteButton } from '../../components/FavoriteButton';
import { Modal } from '../../components/Modal';
import { FallbackContent } from '../../components/FallbackContent';
import { LINK_TO_HOME_PAGE } from '../../constants';

export const ArtworkPage: React.FC = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const { artworks } = useContext(ArtworksContext);
  const { favoriteArtworks } = useContext(FavoritesContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const artworkId = Number(id);
  const currentArtwork =
    artworks.find(item => item.id === artworkId) ||
    favoriteArtworks.find(item => item.id === artworkId);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  if (!currentArtwork) {
    return (
      <PageLayout isHomePage={false} className="artwork-page">
        <FallbackContent link={LINK_TO_HOME_PAGE}>
          <p>
            Artwork not found! But don't worry, find another one on home page
          </p>
        </FallbackContent>
      </PageLayout>
    );
  }

  const {
    image_id,
    thumbnail,
    title,
    artist_title,
    main_reference_number,
    date_display,
    place_of_origin,
    dimensions,
    credit_line,
    is_public_domain,
  } = currentArtwork;

  return (
    <PageLayout isHomePage={false} className="artwork-page">
      {isModalOpen && image_id && (
        <Modal
          imageId={image_id}
          altText={thumbnail?.alt_text ?? title}
          onClose={handleCloseModal}
        />
      )}

      <div className="artwork-container">
        <Link
          to={`../..?${searchParams}`}
          relative="path"
          className="button button-navigate"
        >
          Back
        </Link>

        <article className="artwork-details">
          <div className="artwork-details__image-container">
            <img
              src={image_id}
              alt={thumbnail?.alt_text ?? title}
              onClick={handleOpenModal}
              onError={e => {
                e.currentTarget.src =
                  'https://placehold.co/843/f7d5a2/383838?text=no-image&font=lato';
              }}
              className="artwork-details__image"
            />
            <div className="artwork-details__button">
              <FavoriteButton artwork={currentArtwork} />
            </div>
          </div>

          <div className="artwork-details__description">
            <div className="artwork-details__heading">
              <h2 className="artwork-details__title artwork-details__title_first">
                {title}
              </h2>
              <span className="artwork-details__artist">{artist_title}</span>
              <span className="artwork-details__reference-number">
                {main_reference_number.replace('.', '-')}
              </span>
            </div>

            <div className="artwork-details__overview">
              <h2 className="artwork-details__title">Overview</h2>
              <ul className="artwork-details__list">
                <li className="artwork-details__item">
                  <span className="artwork-details__item_highlighted">
                    Date:
                  </span>{' '}
                  {date_display}
                </li>
                <li className="artwork-details__item">
                  <span className="artwork-details__item_highlighted">
                    Place Of Origin:
                  </span>{' '}
                  {place_of_origin}
                </li>
                <li className="artwork-details__item">
                  <span className="artwork-details__item_highlighted">
                    Dimensions:
                  </span>{' '}
                  {dimensions}
                </li>
                <li className="artwork-details__item">
                  <span className="artwork-details__item_highlighted">
                    Repository:
                  </span>{' '}
                  {credit_line}
                </li>
                {is_public_domain && (
                  <li className="artwork-details__item">Public</li>
                )}
              </ul>
            </div>
          </div>
        </article>
      </div>
    </PageLayout>
  );
};
