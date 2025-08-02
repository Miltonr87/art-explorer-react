import { useState, useCallback, useContext } from 'react';
import { ArtworksContext } from '../store';
import { validateInput } from '../utils/validationFunctions';
import { runSearchAction } from '../utils/searchService';

export function useSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [noResults, setNoResults] = useState(false);

  const { setArtworks, isSearching, setIsSearching } =
    useContext(ArtworksContext);

  const handleSearchClick = async () => {
    const result = await runSearchAction(
      searchTerm,
      setArtworks,
      setIsSearching,
    );

    if (result.hasErrors) {
      setErrors(validateInput(searchTerm));
      setNoResults(false);
    } else {
      setErrors([]);
      setNoResults(result.results?.length === 0);
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

  return {
    searchTerm,
    errors,
    noResults,
    isSearching,
    handleSearchTermChange,
    handleClearSearchTerm,
    handleSearchClick,
  };
}