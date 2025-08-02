import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { ArtworksContextProvider, FavoritesContextProvider } from '../../store';

describe('<App />', () => {
  it('renders without crashing and shows route content', () => {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <div>Mock Home Page</div>,
        },
      ],
      {
        initialEntries: ['/'],
      },
    );

    render(
      <ArtworksContextProvider>
        <FavoritesContextProvider>
          <RouterProvider router={router} />
        </FavoritesContextProvider>
      </ArtworksContextProvider>,
    );

    expect(screen.getByText('Mock Home Page')).toBeInTheDocument();
  });
});
