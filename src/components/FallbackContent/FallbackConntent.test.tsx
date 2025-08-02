import { render, screen } from '@testing-library/react';
import { FallbackContent } from './index';
import { MemoryRouter } from 'react-router-dom';

describe('<FallbackContent />', () => {
  it('renders children correctly', () => {
    render(
      <FallbackContent>
        <p>Nothing to show here.</p>
      </FallbackContent>,
      { wrapper: MemoryRouter },
    );

    expect(screen.getByText('Nothing to show here.')).toBeInTheDocument();
  });

  it('renders link if link prop is provided', () => {
    render(
      <FallbackContent link={{ linkPath: '/home', linkName: 'Go Home' }}>
        <span>Error occurred.</span>
      </FallbackContent>,
      { wrapper: MemoryRouter },
    );

    expect(screen.getByText('Error occurred.')).toBeInTheDocument();
    const link = screen.getByRole('link', { name: 'Go Home' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/home');
  });

  it('does not render link if link prop is not provided', () => {
    render(
      <FallbackContent>
        <span>No results.</span>
      </FallbackContent>,
      { wrapper: MemoryRouter },
    );

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
