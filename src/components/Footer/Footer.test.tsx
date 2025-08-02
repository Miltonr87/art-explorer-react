import { render, screen, fireEvent, act } from '@testing-library/react';
import { Footer } from './index';

describe('<Footer />', () => {
  const originalOpen = window.open;

  beforeAll(() => {
    window.open = jest.fn();
  });

  afterAll(() => {
    window.open = originalOpen;
  });

  it('renders logo and name correctly', () => {
    render(<Footer />);
    expect(screen.getByAltText('Github logo')).toBeInTheDocument();
    expect(screen.getByText('Milton Rodrigues')).toBeInTheDocument();
  });

  it('opens GitHub profile after sparkle animation', async () => {
    jest.useFakeTimers();

    render(<Footer />);

    const button = screen.getByRole('button', {
      name: /open github profile/i,
    });

    // Fire the click and advance
    act(() => {
      fireEvent.click(button);
      jest.advanceTimersByTime(400);
    });

    expect(window.open).toHaveBeenCalledWith(
      'https://github.com/Miltonr87',
      '_blank',
    );

    jest.useRealTimers();
  });
});
