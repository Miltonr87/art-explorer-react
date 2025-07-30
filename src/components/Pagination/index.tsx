import iconLeftDouble from '../../assets/icons/icon-pagination-left-double.svg';
import iconLeft from '../../assets/icons/icon-pagination-left.svg';
import iconRightDouble from '../../assets/icons/icon-pagination-right-double.svg';
import iconRight from '../../assets/icons/icon-pagination-right.svg';

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  onGoToFirst: () => void;
  onGoToPrevious: () => void;
  onGoToNext: () => void;
  onGoToLast: () => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  lastPage,
  onGoToFirst,
  onGoToPrevious,
  onGoToNext,
  onGoToLast,
}) => {
  return (
    <nav>
      <ul className="pagination">
        <li>
          <button
            onClick={onGoToFirst}
            disabled={currentPage === 1}
            className="pagination__button"
          >
            <img src={iconLeftDouble} alt="Go to first page" />
          </button>
        </li>
        <li>
          <button
            onClick={onGoToPrevious}
            disabled={currentPage === 1}
            className="pagination__button"
          >
            <img src={iconLeft} alt="Go to previous page" />
          </button>
        </li>
        <li className="pagination__info">
          Page {currentPage} of {lastPage}
        </li>
        <li>
          <button
            onClick={onGoToNext}
            disabled={currentPage === lastPage}
            className="pagination__button"
          >
            <img src={iconRight} alt="Go to next page" />
          </button>
        </li>
        <li>
          <button
            onClick={onGoToLast}
            disabled={currentPage === lastPage}
            className="pagination__button"
          >
            <img src={iconRightDouble} alt="Go to last page" />
          </button>
        </li>
      </ul>
    </nav>
  );
};
