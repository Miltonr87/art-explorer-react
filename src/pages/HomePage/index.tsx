import { useCallback, useContext, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArtworksContext } from '../../store';
import { PageLayout } from '../../components/PageLayout';
import { SectionLayout } from '../../components/SectionLayout';
import { Loader } from '../../components/Loader';
import { Pagination } from '../../components/Pagination';
import { ArtworkCard } from '../../components/ArtworkCard';
import { SearchForm } from '../../components/SearchForm';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

export const HomePage: React.FC = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const { darkMode, toggleTheme } = useTheme();

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
      <br />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1 className="title">
          <span className="title title_accent">Art Collection</span>
        </h1>
        <motion.div
          onClick={toggleTheme}
          style={{
            width: '60px',
            height: '30px',
            borderRadius: '999px',
            backgroundColor: darkMode ? '#f4f4f4' : '#333',
            display: 'flex',
            alignItems: 'center',
            padding: '4px',
            cursor: 'pointer',
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.2)',
          }}
          initial={false}
          animate={{
            justifyContent: darkMode ? 'flex-end' : 'flex-start',
          }}
          transition={{ type: 'spring', stiffness: 700, damping: 30 }}
        >
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 900, damping: 30 }}
            style={{
              width: '25px',
              height: '25px',
              borderRadius: '50%',
              backgroundColor: darkMode ? '#222' : '#f4f4f4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
            }}
          >
            {darkMode ? '🌙' : '☀️'}
          </motion.div>
        </motion.div>
      </div>

      <SearchForm />

      {(isFetching || isSearching) && <Loader />}
      {error && <p>{error}</p>}

      {!isFetching && !isSearching && !error && artworks.length > 0 && (
        <SectionLayout
          title="World Gallery of Art Masterpieces"
          subtitle=""
          data-testid="artwork-list-section"
        >
          <div className="artwork-list" data-testid="artwork-list-section">
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
      <br />
    </PageLayout>
  );
};
