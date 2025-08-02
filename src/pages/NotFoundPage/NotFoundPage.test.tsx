import { render, screen } from '@testing-library/react';
import { NotFoundPage } from './index';
import { MemoryRouter } from 'react-router-dom';

describe('<NotFoundPage />', () => {
  it('renders the 404 title and fallback content', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
    expect(screen.getByTestId('not-found-title')).toHaveTextContent(
      /404 Not Found!/i,
    );
    expect(screen.getByTestId('not-found-message')).toHaveTextContent(
      /return to main/i,
    );
    expect(screen.getByText('Go to Home Page')).toHaveAttribute('href', '/');
  });
});
