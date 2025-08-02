import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Sparkle } from './index';

describe('<Sparkle />', () => {
  it('renders the sparkle div with correct styles', () => {
    const { container } = render(<Sparkle />);
    const sparkleDiv = container.firstChild as HTMLElement;

    expect(sparkleDiv).toBeInTheDocument();
    expect(sparkleDiv).toHaveStyle({
      position: 'absolute',
      top: '-4px',
      left: '-4px',
      width: '66px',
      height: '66px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 200, 0, 0.6)',
      pointerEvents: 'none',
    });
  });
});
