import { fireEvent, render, screen } from '@testing-library/react';
import { Header } from './index';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../hooks/useSparkNavigation', () => ({
  useSparkNavigation: () => ({
    isVisible: false,
    triggerSpark: jest.fn(),
  }),
}));

jest.mock('../../hooks/useDetectOutsideClick', () => ({
  useDetectOutsideClick: jest.fn(),
}));

jest.mock('../Sidebar', () => ({
  Sidebar: jest.fn(({ isOpen }) => (
    <aside data-testid="mock-sidebar">{isOpen ? 'Open' : 'Closed'}</aside>
  )),
}));

describe('<Header />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.body.style.overflow = ''; // reset between tests
  });

  it('renders logo and nav items when not on the homepage', () => {
    render(
      <MemoryRouter>
        <Header isHomePage={false} />
      </MemoryRouter>,
    );

    expect(screen.getByAltText('Art Collection Logo')).toBeInTheDocument();
    expect(screen.getByAltText('Home icon')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByAltText('Bookmark icon')).toBeInTheDocument();
    expect(screen.getByText('Favorites Gallery')).toBeInTheDocument();
  });

  it('hides home button when isHomePage is true', () => {
    render(
      <MemoryRouter>
        <Header isHomePage={true} />
      </MemoryRouter>,
    );

    expect(screen.queryByText('Home')).not.toBeInTheDocument();
  });

  it('opens sidebar when burger button is clicked', () => {
    render(
      <MemoryRouter>
        <Header isHomePage={false} />
      </MemoryRouter>,
    );

    const burgerButton = screen.getByRole('button', { name: /menu icon/i });
    fireEvent.click(burgerButton);

    expect(document.body.style.overflow).toBe('hidden');
  });
});
