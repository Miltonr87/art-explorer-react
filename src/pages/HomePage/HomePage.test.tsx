import { render, screen } from '@testing-library/react';
import { HomePage } from './index';
import { ArtworksContext } from '../../store';
import { ThemeProvider } from '../../context/ThemeContext';
import { MemoryRouter } from 'react-router-dom';

const renderWithProviders = (contextOverrides = {}) => {
  const defaultContext = {
    artworks: [],
    isFetching: false,
    isSearching: false,
    error: '',
    setArtworks: jest.fn(),
    setIsSearching: jest.fn(),
    sortCriteria: 'title-asc',
    setSortCriteria: jest.fn(),
  };

  return render(
    <MemoryRouter>
      <ThemeProvider>
        <ArtworksContext.Provider
          value={{ ...defaultContext, ...contextOverrides }}
        >
          <HomePage />
        </ArtworksContext.Provider>
      </ThemeProvider>
    </MemoryRouter>,
  );
};

describe('<HomePage />', () => {
  it('shows loading indicator when fetching', () => {
    renderWithProviders({ isFetching: true });
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('shows error message if present', () => {
    renderWithProviders({ error: 'Failed to fetch' });
    expect(screen.getByText('Failed to fetch')).toBeInTheDocument();
  });

  it('renders artworks and pagination when data is available', () => {
    const artworks = new Array(6).fill(null).map((_, i) => ({
      id: i + 1,
      title: `Artwork ${i + 1}`,
      artist_title: `Artist ${i + 1}`,
      main_reference_number: '123.456',
      date_display: '2021',
      place_of_origin: 'Paris',
      dimensions: '100x100',
      credit_line: 'Museum',
      image_id: '',
      thumbnail: { lqip: '', alt_text: '', height: 100, width: 100 },
      is_public_domain: true,
    }));

    renderWithProviders({ artworks });

    expect(screen.getByTestId('artwork-list-section')).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(6);
  });
});
