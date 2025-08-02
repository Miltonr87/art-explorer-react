import { runSearchAction } from '../../utils/searchService';
import { fetchSearchResults } from '../../api';
import { validateInput } from '../../utils/validationFunctions';
import { Artwork } from '../../types';

jest.mock('../../api', () => ({
    fetchSearchResults: jest.fn(),
}));

jest.mock('../../utils/validationFunctions', () => ({
    validateInput: jest.fn(() => []),
}));

describe('runSearchAction (logic-only)', () => {
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

    it('returns error if validation fails', async () => {
        (validateInput as jest.Mock).mockReturnValue(['Invalid']);

        const result = await runSearchAction(
            '???',
            mockSetArtworks,
            mockSetIsSearching
        );

        expect(result.hasErrors).toBe(true);
        expect(fetchSearchResults).not.toHaveBeenCalled();
        expect(mockSetIsSearching).not.toHaveBeenCalled();
    });

    it('calls API and sets artworks when valid', async () => {
        const mockData: Artwork[] = [
            {
                id: 1,
                title: 'Test',
                artist_title: 'Someone',
                main_reference_number: '001',
                date_display: '2024',
                place_of_origin: 'TestLand',
                credit_line: 'Test Museum',
                dimensions: '100x200',
                image_id: 'img123',
                is_public_domain: true,
                thumbnail: {
                    lqip: 'image.jpg',
                    alt_text: 'test',
                    height: 100,
                    width: 100,
                },
            },
        ];

        (validateInput as jest.Mock).mockReturnValue([]);
        (fetchSearchResults as jest.Mock).mockResolvedValueOnce({ data: mockData });

        const result = await runSearchAction(
            'Picasso',
            mockSetArtworks,
            mockSetIsSearching
        );

        expect(result.hasErrors).toBe(false);
        expect(result.results).toEqual(mockData);
        expect(mockSetIsSearching).toHaveBeenCalledWith(true);
        expect(mockSetArtworks).toHaveBeenCalledWith(mockData);
        expect(mockSetIsSearching).toHaveBeenCalledWith(false);
    });

    it('handles empty results', async () => {
        (validateInput as jest.Mock).mockReturnValue([]);
        (fetchSearchResults as jest.Mock).mockResolvedValueOnce({ data: [] });

        const result = await runSearchAction(
            'NothingFound',
            mockSetArtworks,
            mockSetIsSearching
        );

        expect(result.hasErrors).toBe(false);
        expect(result.results).toEqual([]);
        expect(mockSetArtworks).toHaveBeenCalledWith([]);
    });

    it('handles API error gracefully', async () => {
        (validateInput as jest.Mock).mockReturnValue([]);
        (fetchSearchResults as jest.Mock).mockRejectedValueOnce(new Error('fail'));

        const result = await runSearchAction(
            'fail',
            mockSetArtworks,
            mockSetIsSearching
        );

        expect(result.hasErrors).toBe(true);
        expect(mockSetIsSearching).toHaveBeenCalledWith(true);
        expect(mockSetIsSearching).toHaveBeenCalledWith(false);
    });
});
