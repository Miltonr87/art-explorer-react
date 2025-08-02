import { runSearchAction } from '../searchService';
import { fetchSearchResults } from '../../api';
import { validateInput } from '../validationFunctions';
import { Artwork } from '../../types';

jest.mock('../../api', () => ({
    fetchSearchResults: jest.fn(),
}));

jest.mock('../validationFunctions', () => ({
    validateInput: jest.fn(() => []),
}));

describe('runSearchAction', () => {
    const mockSetArtworks = jest.fn();
    const mockSetIsSearching = jest.fn();

    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterAll(() => {
        (console.error as jest.Mock).mockRestore();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('returns error if input is invalid', async () => {
        (validateInput as jest.Mock).mockReturnValue(['Invalid input']);

        const result = await runSearchAction(
            '???',
            mockSetArtworks,
            mockSetIsSearching
        );

        expect(validateInput).toHaveBeenCalledWith('???');
        expect(result.hasErrors).toBe(true);
        expect(fetchSearchResults).not.toHaveBeenCalled();
        expect(mockSetIsSearching).not.toHaveBeenCalled();
    });

    it('fetches results and sets artworks when input is valid', async () => {
        const mockResults: Artwork[] = [
            {
                id: 1,
                title: 'Mona Lisa',
                artist_title: 'Leonardo',
                main_reference_number: '123',
                date_display: '1503',
                place_of_origin: 'Italy',
                credit_line: 'Louvre',
                dimensions: '77 x 53 cm',
                image_id: 'abc123',
                is_public_domain: true,
                thumbnail: {
                    lqip: 'monalisa.jpg',
                    alt_text: 'Mona Lisa',
                    height: 100,
                    width: 100,
                },
            },
        ];

        (validateInput as jest.Mock).mockReturnValue([]);
        (fetchSearchResults as jest.Mock).mockResolvedValueOnce({ data: mockResults });

        const result = await runSearchAction(
            'Mona Lisa',
            mockSetArtworks,
            mockSetIsSearching
        );

        expect(validateInput).toHaveBeenCalledWith('mona lisa');
        expect(fetchSearchResults).toHaveBeenCalledWith('mona lisa');
        expect(mockSetIsSearching).toHaveBeenCalledWith(true);
        expect(mockSetArtworks).toHaveBeenCalledWith(mockResults);
        expect(mockSetIsSearching).toHaveBeenCalledWith(false);
        expect(result.hasErrors).toBe(false);
        expect(result.results).toEqual(mockResults);
    });

    it('handles empty results gracefully', async () => {
        (validateInput as jest.Mock).mockReturnValue([]);
        (fetchSearchResults as jest.Mock).mockResolvedValueOnce({ data: [] });

        const result = await runSearchAction(
            'Unknown Artist',
            mockSetArtworks,
            mockSetIsSearching
        );

        expect(mockSetArtworks).toHaveBeenCalledWith([]);
        expect(result.hasErrors).toBe(false);
        expect(result.results).toEqual([]);
    });

    it('handles API failure gracefully', async () => {
        (validateInput as jest.Mock).mockReturnValue([]);
        (fetchSearchResults as jest.Mock).mockRejectedValueOnce(new Error('API error'));

        const result = await runSearchAction(
            'error',
            mockSetArtworks,
            mockSetIsSearching
        );

        expect(mockSetIsSearching).toHaveBeenCalledWith(true);
        expect(mockSetIsSearching).toHaveBeenCalledWith(false);
        expect(result.hasErrors).toBe(true);
    });
});
