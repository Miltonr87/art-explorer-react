import { useSearch } from '../../hooks/useSearch';
import searchIcon from '../../assets/icons/search-icon.svg';

export const SearchForm = () => {
  const {
    searchTerm,
    errors,
    noResults,
    isSearching,
    handleSearchTermChange,
    handleClearSearchTerm,
    handleSearchClick,
  } = useSearch();

  return (
    <div className="search-form">
      <div className="search-form__input-container">
        <input
          type="text"
          placeholder="Search Artist..."
          value={searchTerm}
          onChange={e => handleSearchTermChange(e.target.value)}
          maxLength={60}
          className="search-form__input"
        />
        <button
          onClick={handleClearSearchTerm}
          disabled={searchTerm === ''}
          className="search-form__clear-button"
        >
          X
        </button>
        <button
          onClick={handleSearchClick}
          className="search-form__search-button"
          disabled={searchTerm.trim() === ''}
        >
          <img src={searchIcon} alt="Search icon" />
        </button>
      </div>

      {errors.length > 0 && (
        <ul className="search-form__error-list">
          {errors.map(error => (
            <li key={error} className="search-form__error">
              {error}
            </li>
          ))}
        </ul>
      )}

      {isSearching && <p>Searching for results...</p>}

      {noResults && !isSearching && (
        <p>
          Nothing was found for your request. Try out searching for something
          else :)
        </p>
      )}
    </div>
  );
};
