import { render, screen } from '@testing-library/react';
import { PageLayout } from './index';

jest.mock('../Header', () => ({
  Header: () => <header data-testid="mock-header">Mock Header</header>,
}));

jest.mock('../Footer', () => ({
  Footer: () => <footer data-testid="mock-footer">Mock Footer</footer>,
}));

describe('<PageLayout />', () => {
  it('renders header, footer, and children correctly', () => {
    render(
      <PageLayout isHomePage={false} className="test-class">
        <div>Page content here</div>
      </PageLayout>,
    );

    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByText('Page content here')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
  });

  it('applies custom className to wrapper div', () => {
    const { container } = render(
      <PageLayout isHomePage={true} className="custom-layout">
        <p>Test Content</p>
      </PageLayout>,
    );

    expect(container.firstChild).toHaveClass('custom-layout');
  });
});
