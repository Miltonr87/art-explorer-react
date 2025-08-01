import { RouterProvider } from 'react-router-dom';
import { routes } from './pages/pagesData';
import { ArtworksContextProvider, FavoritesContextProvider } from './store';

function App() {
  return (
    <ArtworksContextProvider>
      <FavoritesContextProvider>
        <RouterProvider router={routes} />
      </FavoritesContextProvider>
    </ArtworksContextProvider>
  );
}

export default App;
