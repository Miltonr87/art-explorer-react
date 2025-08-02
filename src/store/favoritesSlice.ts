import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Artwork } from '../types';

interface FavoritesState {
  favoriteArtworks: Artwork[];
}

const initialState: FavoritesState = {
  favoriteArtworks: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Artwork>) => {
      if (!state.favoriteArtworks.find(item => item.id === action.payload.id)) {
        state.favoriteArtworks.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favoriteArtworks = state.favoriteArtworks.filter(
        item => item.id !== action.payload
      );
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;