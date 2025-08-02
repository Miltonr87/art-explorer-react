import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { SortControls } from './index';

describe('<SortControls />', () => {
  const defaultProps = {
    id: 'sort-select',
    sortCriteria: 'title-asc',
    onSortCriteriaChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders label and select with correct value', () => {
    render(<SortControls {...defaultProps} />);

    const label = screen.getByText('Sort by:');
    const select = screen.getByLabelText('Sort by:') as HTMLSelectElement;

    expect(label).toBeInTheDocument();
    expect(select).toBeInTheDocument();
    expect(select.value).toBe('title-asc');
  });

  it('contains all sort options', () => {
    render(<SortControls {...defaultProps} />);

    expect(
      screen.getByRole('option', { name: 'Title (A-Z)' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: 'Title (Z-A)' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: 'Artist (A-Z)' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: 'Artist (Z-A)' }),
    ).toBeInTheDocument();
  });

  it('calls onSortCriteriaChange when option is selected', () => {
    render(<SortControls {...defaultProps} />);

    const select = screen.getByLabelText('Sort by:');
    fireEvent.change(select, { target: { value: 'artist-desc' } });

    expect(defaultProps.onSortCriteriaChange).toHaveBeenCalledWith(
      'artist-desc',
    );
  });
});
