import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './index';

describe('<Modal />', () => {
  const mockOnClose = jest.fn();
  const imageId = 'https://example.com/image.jpg';
  const altText = 'Test Artwork';

  beforeEach(() => {
    // Create the container for the modal
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  it('renders modal with correct content', () => {
    render(<Modal imageId={imageId} altText={altText} onClose={mockOnClose} />);

    expect(screen.getByAltText('Zoomed artwork image')).toHaveAttribute(
      'src',
      imageId,
    );
    expect(screen.getByText(altText)).toBeInTheDocument();
    expect(screen.getByAltText('Clear icon')).toBeInTheDocument();
  });

  it('calls onClose when clicking outside content or close button', () => {
    render(<Modal imageId={imageId} altText={altText} onClose={mockOnClose} />);

    fireEvent.click(screen.getByText(altText));
    expect(mockOnClose).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByAltText('Clear icon'));
    expect(mockOnClose).toHaveBeenCalledTimes(3);
  });

  it('does not call onClose when clicking inside modal content', () => {
    render(<Modal imageId={imageId} altText={altText} onClose={mockOnClose} />);

    fireEvent.click(screen.getByAltText('Zoomed artwork image'));
    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
