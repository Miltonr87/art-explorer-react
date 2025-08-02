import { render, screen } from '@testing-library/react';
import { SectionLayout } from './index';

describe('<SectionLayout />', () => {
  it('renders the title, subtitle, and children correctly', () => {
    render(
      <SectionLayout title="Featured Artworks" subtitle="Top Picks">
        <p>Artwork content here</p>
      </SectionLayout>,
    );

    expect(screen.getByText('Top Picks')).toBeInTheDocument();
    expect(screen.getByText('Featured Artworks')).toBeInTheDocument();
    expect(screen.getByText('Artwork content here')).toBeInTheDocument();
  });

  it('has proper HTML structure', () => {
    render(
      <SectionLayout title="Gallery" subtitle="Explore">
        <div>Child component</div>
      </SectionLayout>,
    );

    const section = document.querySelector('section');
    expect(section).toBeInTheDocument();
    expect(section?.querySelector('.section__heading')).toBeInTheDocument();
    expect(section?.querySelector('.section__title')?.textContent).toBe(
      'Gallery',
    );
    expect(section?.querySelector('.section__subtitle')?.textContent).toBe(
      'Explore',
    );
  });
});
