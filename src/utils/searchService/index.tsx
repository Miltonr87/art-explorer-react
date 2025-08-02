import { validateInput } from '../validationFunctions';
import { fetchSearchResults } from '../../api';
import { Artwork } from '../../types';

export async function runSearchAction(
  rawTerm: string,
  setArtworks: (a: Artwork[]) => void,
  setIsSearching: (b: boolean) => void,
): Promise<{ hasErrors: boolean; results?: Artwork[] }> {
  const term = rawTerm.toLowerCase().trim();
  const errorsFound = validateInput(term);

  if (errorsFound.length > 0) {
    return { hasErrors: true };
  }

  setIsSearching(true);
  try {
    const response = await fetchSearchResults(term);
    const data = response.data || [];
    setArtworks(data);
    return { hasErrors: false, results: data };
  } catch (error) {
    console.error('Error fetching search results:', error);
    return { hasErrors: true };
  } finally {
    setIsSearching(false);
  }
}
