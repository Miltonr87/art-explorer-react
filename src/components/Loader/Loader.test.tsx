import { render } from '@testing-library/react';
import { Loader } from './index';

describe('<Loader />', () => {
  it('renders the loader container and span', () => {
    const { container } = render(<Loader />);

    expect(container.querySelector('.container')).toBeInTheDocument();

    const span = container.querySelector('.loader');
    expect(span).toBeInTheDocument();
  });
});
