import { render, screen, fireEvent } from '@testing-library/react';
import { Sidebar } from './index';
import { MemoryRouter } from 'react-router-dom';
import { createRef } from 'react';

describe('<Sidebar />', () => {
  const setup = (isHomePage = false, isOpen = true) => {
    const mockRef = createRef<HTMLElement>();
    const mockOnClose = jest.fn();

    render(
      <MemoryRouter>
        <Sidebar
          isHomePage={isHomePage}
          isOpen={isOpen}
          ref={mockRef}
          onClose={mockOnClose}
        />
      </MemoryRouter>,
    );

    return { mockOnClose };
  };

  it('renders with correct links and close button', () => {
    setup();

    expect(screen.getByAltText('Clear icon')).toBeInTheDocument();
    expect(screen.getByAltText('Bookmark icon')).toBeInTheDocument();
    expect(screen.getByText('Favorites')).toBeInTheDocument();
  });

  it('renders home link when not on home page', () => {
    setup(false);

    expect(screen.getByAltText('Home icon')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('does not render home link on home page', () => {
    setup(true);

    expect(screen.queryByText('Home')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const { mockOnClose } = setup();

    fireEvent.click(screen.getByRole('button'));

    expect(mockOnClose).toHaveBeenCalled();
  });
});
