import { useState, useContext, useCallback } from 'react';
import { ArtworksContext } from '../../store';
import { fetchSearchResults } from '../../api';
import { validateInput } from '../../utils/validationFunctions';
import searchIcon from '../../assets/icons/search-icon.svg';

export const SearchForm: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [noResults, setNoResults] = useState(false);

  const { setArtworks, isSearching, setIsSearching } =
    useContext(ArtworksContext);

  const handleSearchClick = async () => {
    const term = searchTerm.toLowerCase().trim();
    const errorsFound = validateInput(term);
    setErrors(errorsFound);
    if (errorsFound.length > 0) return;

    setIsSearching(true);
    try {
      const response = await fetchSearchResults(term);
      if (!response.data.length) {
        setNoResults(true);
        setArtworks([]);
      } else {
        setNoResults(false);
        setArtworks(response.data);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchTermChange = useCallback((value: string) => {
    setSearchTerm(value.toLowerCase());
  }, []);

  const handleClearSearchTerm = useCallback(() => {
    setSearchTerm('');
    setErrors([]);
    setNoResults(false);
  }, []);

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
