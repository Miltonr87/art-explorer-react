import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './index';

describe('<Pagination />', () => {
  const mockOnGoToFirst = jest.fn();
  const mockOnGoToPrevious = jest.fn();
  const mockOnGoToNext = jest.fn();
  const mockOnGoToLast = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders pagination controls and current page number', () => {
    render(
      <Pagination
        currentPage={3}
        lastPage={5}
        onGoToFirst={mockOnGoToFirst}
        onGoToPrevious={mockOnGoToPrevious}
        onGoToNext={mockOnGoToNext}
        onGoToLast={mockOnGoToLast}
      />,
    );

    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByAltText('left-double-arrow')).toBeInTheDocument();
    expect(screen.getByAltText('left-arrow')).toBeInTheDocument();
    expect(screen.getByAltText('right-arrow')).toBeInTheDocument();
    expect(screen.getByAltText('right-double-arrow')).toBeInTheDocument();
  });

  it('disables first/previous buttons on first page', () => {
    render(
      <Pagination
        currentPage={1}
        lastPage={5}
        onGoToFirst={mockOnGoToFirst}
        onGoToPrevious={mockOnGoToPrevious}
        onGoToNext={mockOnGoToNext}
        onGoToLast={mockOnGoToLast}
      />,
    );

    expect(
      screen.getByAltText('left-double-arrow').closest('button'),
    ).toBeDisabled();
    expect(screen.getByAltText('left-arrow').closest('button')).toBeDisabled();
    expect(
      screen.getByAltText('right-arrow').closest('button'),
    ).not.toBeDisabled();
    expect(
      screen.getByAltText('right-double-arrow').closest('button'),
    ).not.toBeDisabled();
  });

  it('disables next/last buttons on last page', () => {
    render(
      <Pagination
        currentPage={5}
        lastPage={5}
        onGoToFirst={mockOnGoToFirst}
        onGoToPrevious={mockOnGoToPrevious}
        onGoToNext={mockOnGoToNext}
        onGoToLast={mockOnGoToLast}
      />,
    );

    expect(screen.getByAltText('right-arrow').closest('button')).toBeDisabled();
    expect(
      screen.getByAltText('right-double-arrow').closest('button'),
    ).toBeDisabled();
    expect(
      screen.getByAltText('left-double-arrow').closest('button'),
    ).not.toBeDisabled();
    expect(
      screen.getByAltText('left-arrow').closest('button'),
    ).not.toBeDisabled();
  });

  it('calls appropriate handlers when buttons are clicked', () => {
    render(
      <Pagination
        currentPage={3}
        lastPage={5}
        onGoToFirst={mockOnGoToFirst}
        onGoToPrevious={mockOnGoToPrevious}
        onGoToNext={mockOnGoToNext}
        onGoToLast={mockOnGoToLast}
      />,
    );

    fireEvent.click(screen.getByAltText('left-double-arrow'));
    fireEvent.click(screen.getByAltText('left-arrow'));
    fireEvent.click(screen.getByAltText('right-arrow'));
    fireEvent.click(screen.getByAltText('right-double-arrow'));

    expect(mockOnGoToFirst).toHaveBeenCalled();
    expect(mockOnGoToPrevious).toHaveBeenCalled();
    expect(mockOnGoToNext).toHaveBeenCalled();
    expect(mockOnGoToLast).toHaveBeenCalled();
  });
});
