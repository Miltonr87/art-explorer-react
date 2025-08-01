import { useCallback, useContext, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArtworksContext } from '../../store';
import { PageLayout } from '../../components/PageLayout';
import { SectionLayout } from '../../components/SectionLayout';
import { Loader } from '../../components/Loader';
import { Pagination } from '../../components/Pagination';
import { ArtworkCard } from '../../components/ArtworkCard';
import { SearchForm } from '../../components/SearchForm';

export const HomePage: React.FC = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(search);
  const pageIndex = Number(searchParams.get('page') || 1) - 1;

  const { artworks, isFetching, error, isSearching } =
    useContext(ArtworksContext);

  const itemsOnPage = 6;
  const lastPageIndex = Math.ceil(artworks.length / itemsOnPage) - 1;

  const currentArtworks = useMemo(() => {
    return artworks.slice(
      pageIndex * itemsOnPage,
      (pageIndex + 1) * itemsOnPage,
    );
  }, [artworks, pageIndex]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      const newSearchParams = new URLSearchParams(search);
      newSearchParams.set('page', String(newPage));
      navigate({ search: newSearchParams.toString() });
    },
    [search, navigate],
  );

  return (
    <PageLayout isHomePage className="home">
      <h1 className="title">
        <span className="title title_accent">Art Collection</span>
      </h1>

      <SearchForm />

      {(isFetching || isSearching) && <Loader />}
      {error && <p>{error}</p>}

      {!isFetching && !isSearching && !error && artworks.length > 0 && (
        <SectionLayout
          subtitle="Artworks for you"
          title="World Gallery of Art Masterpieces"
          data-testid="artwork-list-section"
        >
          <div className="artwork-list">
            {currentArtworks.map(artwork => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>

          <Pagination
            currentPage={pageIndex + 1}
            lastPage={lastPageIndex + 1}
            onGoToFirst={() => handlePageChange(1)}
            onGoToPrevious={() => handlePageChange(Math.max(pageIndex, 1))}
            onGoToNext={() =>
              handlePageChange(Math.min(pageIndex + 2, lastPageIndex + 1))
            }
            onGoToLast={() => handlePageChange(lastPageIndex + 1)}
          />
        </SectionLayout>
      )}
    </PageLayout>
  );
};
